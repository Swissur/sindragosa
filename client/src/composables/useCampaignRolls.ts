import { ref } from 'vue'
import { fetchCampaignRolls, type CharacterPatchEvent, type RestEvent, type RollEvent } from '../api/campaigns'
import { applyServerPatch } from './useCharacter'
import { user } from './useAuth'
import { receiveRest } from './useRest'
import { showToast } from './useToast'
import { useGmCampaign } from './useGmCampaign'
import { celebrate } from './useCriticalMoment'
import { playRemoteDiceRoll, type DieRoll } from './useDice3D'
import { rollOutcome, type RollOutcome } from '../utils/rollOutcome'
import { parseDiceStyle } from '../data/diceStyle'
import { POOL_DICE_STYLES } from '../data/poolDiceStyles'
import { refreshActiveCombat } from './useActiveCombat'
import { appendFeed, clearFeed, feedLineFor, secretLineFor } from './useViewerFeed'
import {
  codexRevealTick,
  incomingGmMessage,
  incomingSharedImage,
  liveCodexBoard,
  liveSessionActive,
  onlineUserIds,
  resetCampaignLive,
  type IncomingGmMessage,
  type IncomingSharedImage,
} from './useCampaignLive'
import type { Board } from '../api/codexBoard'

/** Filtre du panneau de log. */
export type RollFilter = 'all' | 'combat' | 'player' | 'monster'

const MAX_ROLLS = 200
const FILTER_KEY = 'arran-roll-filter'
const PANEL_KEY = 'arran-roll-panel'

// Le flux est relâché après cette durée sans activité : une connexion SSE
// ouverte en permanence empêcherait la machine Fly de s'endormir.
const IDLE_MS = 25 * 60 * 1000

function stored(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const { gmCampaignId } = useGmCampaign()
const rolls = ref<RollEvent[]>([])
const unread = ref(0)
const panelOpen = ref(stored(PANEL_KEY) === '1')
const filter = ref<RollFilter>((stored(FILTER_KEY) as RollFilter | null) ?? 'all')

let eventSource: EventSource | null = null
let connectedCampaignId: number | null = null
let idleTimer: ReturnType<typeof setTimeout> | null = null
/**
 * Mode table : le serveur nous traite en joueur (jamais de jet caché), tous
 * les jets sont « ceux des autres », et le flux ne se relâche jamais.
 */
let viewer = false

/** Le fil d'actions n'écrit une ligne qu'une fois le dé posé, pas avant. */
const FEED_DELAY_MS = 900

function closeStream(): void {
  eventSource?.close()
  eventSource = null
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = null
}

function resetIdleTimer(): void {
  if (idleTimer) clearTimeout(idleTimer)
  // Une tablette posée au milieu de la table ne bouge pas : sans ça, une
  // longue phase de roleplay la couperait sans prévenir.
  if (viewer) return
  idleTimer = setTimeout(closeStream, IDLE_MS)
}

function feedDelay(): number {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ? 0
    : FEED_DELAY_MS
}

function appendRoll(roll: RollEvent): void {
  if (rolls.value.some((r) => r.id === roll.id)) return
  rolls.value.push(roll)
  if (rolls.value.length > MAX_ROLLS) rolls.value = rolls.value.slice(-MAX_ROLLS)
  if (!panelOpen.value) unread.value += 1
}

/**
 * Le dé d'un autre joueur roule chez moi, en petit, dans sa couleur. Un jet
 * à plusieurs dés (bac à sable) les fait tous rouler ; sinon c'est le dé
 * principal du jet.
 *
 * `rolls` et `dropped` ne disent pas la même chose : les premiers s'additionnent
 * (un 3d6), les seconds ont été lancés puis jetés (avantage, relance). Les deux
 * roulent à l'écran, mais seuls les écartés se ternissent en se posant.
 */
export function remoteDiceFor(roll: RollEvent): DieRoll[] {
  const values = roll.rolls?.length ? roll.rolls : [roll.die]
  // Knight n'a pas de dé critique : seul le jet entier fait un exploit.
  const critFrom = roll.pool && roll.pool.system !== 'knight' ? roll.pool.critFrom : undefined
  // Jet de compétence : chaque dé garde la couleur de son origine, chez les autres aussi.
  const sources = roll.pool?.sources
  const styleAt = (i: number) => (sources?.[i] ? POOL_DICE_STYLES[sources[i]] : undefined)
  return [
    ...values.map((value, i) => ({ sides: roll.sides, value, kind: roll.kind, critFrom, style: styleAt(i) })),
    ...(roll.dropped ?? []).map((value, i) => ({ sides: roll.sides, value, kind: roll.kind, dropped: true, style: styleAt(values.length + i) })),
  ]
}

function showRemoteDice(roll: RollEvent): void {
  const style = parseDiceStyle(roll.diceStyle)
  if (!style) return
  playRemoteDiceRoll({ actorName: roll.actorName, style, rolls: remoteDiceFor(roll) })
}

/** Recharge l'historique et le fusionne avec ce qui est déjà affiché. */
async function syncHistory(campaignId: number): Promise<void> {
  try {
    const history = await fetchCampaignRolls(campaignId, viewer)
    const known = new Set(rolls.value.map((r) => r.id))
    const missing = history.filter((r) => !known.has(r.id))
    if (missing.length === 0) return
    rolls.value = [...rolls.value, ...missing]
      .sort((a, b) => a.id - b.id)
      .slice(-MAX_ROLLS)
  } catch { /* silencieux */ }
}

function connect(campaignId: number, options: { viewer?: boolean } = {}): void {
  const asViewer = !!options.viewer
  if (connectedCampaignId === campaignId && eventSource && viewer === asViewer) return
  disconnect()
  resetCampaignLive()
  connectedCampaignId = campaignId
  viewer = asViewer

  const url = `/api/campaigns/${campaignId}/events${viewer ? '?as=viewer' : ''}`
  eventSource = new EventSource(url, { withCredentials: true })
  resetIdleTimer()
  eventSource.addEventListener('roll', (e: MessageEvent) => {
    try {
      const roll = JSON.parse(e.data as string) as RollEvent
      appendRoll(roll)
      // Mes propres jets me reviennent par ce flux : la fanfare a déjà joué au
      // moment où mon dé s'est posé, on ne la rejoue pas.
      if (viewer || roll.userId !== user.value?.id) {
        showRemoteDice(roll)
        const outcome = rollOutcome(roll)
        if (outcome) celebrate(outcome, roll.actorName)
      }
      if (viewer) {
        const line = feedLineFor(roll)
        setTimeout(() => appendFeed(line), feedDelay())
      }
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  // Jets que je n'ai pas le droit de voir (monstres du MJ) : le serveur n'envoie
  // que l'issue et le nom. La table vibre, personne n'apprend le chiffre.
  // Le MJ a fait dormir le groupe : feu de camp pour tout le monde.
  // Le MJ a réglé une fiche (caracs, rangs, récompense, butin) : si c'est la mienne, je la prends.
  eventSource.addEventListener('character', (e: MessageEvent) => {
    try {
      const event = JSON.parse(e.data as string) as CharacterPatchEvent
      if (event.userId === user.value?.id) {
        applyServerPatch(event.characterId, event.patch)
        if (event.loot) showToast(event.from ? `🎁 ${event.from} te donne ${event.loot} !` : `🎁 ${event.loot} rejoint ton inventaire !`)
      }
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  eventSource.addEventListener('rest', (e: MessageEvent) => {
    try {
      receiveRest(JSON.parse(e.data as string) as RestEvent)
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  eventSource.addEventListener('critical', (e: MessageEvent) => {
    try {
      const moment = JSON.parse(e.data as string) as { outcome: RollOutcome; actorName: string }
      if (moment.outcome) celebrate(moment.outcome, moment.actorName)
      if (viewer) appendFeed(secretLineFor(moment))
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  // Pastille verte de l'écran MJ : qui a le flux ouvert.
  eventSource.addEventListener('presence', (e: MessageEvent) => {
    try {
      onlineUserIds.value = (JSON.parse(e.data as string) as { online: number[] }).online
    } catch { /* ignore */ }
  })

  eventSource.addEventListener('session', (e: MessageEvent) => {
    try {
      liveSessionActive.value = (JSON.parse(e.data as string) as { sessionActive: boolean }).sessionActive
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  // Le MJ m'écrit (ou un joueur, si je suis MJ) : le message s'ouvre au milieu de l'écran.
  eventSource.addEventListener('gm-message', (e: MessageEvent) => {
    try {
      if (!viewer) incomingGmMessage.value = JSON.parse(e.data as string) as IncomingGmMessage
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  // Quelqu'un a touché au tableau des fiches : l'onglet Fiches le redessine.
  eventSource.addEventListener('codex-board', (e: MessageEvent) => {
    try {
      liveCodexBoard.value = JSON.parse(e.data as string) as Board
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  // Le MJ montre une image (carte, portrait, indice) : elle s'ouvre en grand, mode table compris.
  // Le MJ, lui, sait ce qu'il vient de montrer.
  eventSource.addEventListener('image-shared', (e: MessageEvent) => {
    try {
      if (viewer || gmCampaignId.value !== campaignId) {
        incomingSharedImage.value = JSON.parse(e.data as string) as IncomingSharedImage
      }
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  // Le MJ révèle (ou recache) une de ses fiches PNJ.
  eventSource.addEventListener('codex-reveal', (e: MessageEvent) => {
    try {
      const event = JSON.parse(e.data as string) as { name: string; revealed: boolean }
      codexRevealTick.value += 1
      if (event.revealed && !viewer && gmCampaignId.value !== campaignId) showToast(`📜 Nouvelle fiche : ${event.name}`)
      resetIdleTimer()
    } catch { /* ignore */ }
  })

  // Un combat commence ou se termine : le bandeau des téléphones et le mode
  // table basculent sans qu'on touche l'écran.
  eventSource.addEventListener('combat', () => {
    void refreshActiveCombat()
    resetIdleTimer()
  })

  // Le SSE ne porte que le flux live — l'historique vient du GET. On le rejoue
  // à CHAQUE ouverture, y compris les reconnexions automatiques d'EventSource :
  // sinon les jets émis pendant une coupure réseau manquent pour toujours.
  eventSource.onopen = () => { void syncHistory(campaignId) }
  void syncHistory(campaignId)
}

function disconnect(): void {
  closeStream()
  connectedCampaignId = null
  viewer = false
  rolls.value = []
  unread.value = 0
  clearFeed()
}

/** Rouvre le flux s'il a été relâché pour inactivité (retour au premier plan, jet lancé…). */
function wake(): void {
  if (connectedCampaignId != null && !eventSource) connect(connectedCampaignId)
  else resetIdleTimer()
}

function togglePanel(open?: boolean): void {
  panelOpen.value = open ?? !panelOpen.value
  localStorage.setItem(PANEL_KEY, panelOpen.value ? '1' : '0')
  if (panelOpen.value) {
    unread.value = 0
    wake()
  }
}

function setFilter(value: RollFilter): void {
  filter.value = value
  localStorage.setItem(FILTER_KEY, value)
}

/** Applique le filtre du panneau à une liste de jets. */
export function filterRolls(list: RollEvent[], value: RollFilter): RollEvent[] {
  switch (value) {
    case 'combat': return list.filter((r) => r.combatId != null)
    case 'player': return list.filter((r) => r.actorKind === 'player')
    case 'monster': return list.filter((r) => r.actorKind === 'monster')
    default: return list
  }
}

export function useCampaignRolls() {
  return { rolls, unread, panelOpen, filter, connect, disconnect, wake, togglePanel, setFilter }
}
