import { ref, watch, computed } from 'vue'
import type { Character } from '../types/character'
import { isEtatId, type EtatId } from '../data/etats'
import {
  fetchCharacters,
  fetchCharacter,
  createCharacter,
  updateCharacter,
  type ServerCharacter,
} from '../api/characters'
import { computeMaxHp, progressState, domainRanks } from '../utils/sindragosa/sheet'
import { initiative } from '../utils/sindragosa/combat'
import { unlockedAbilities } from '../utils/sindragosa/prerequisites'

/** Points de chance rendus à chaque séance. */
export const LUCK_PER_SESSION = 2

const obj = <T>(v: unknown, fallback: T): T => (v && typeof v === 'object' ? (v as T) : fallback)
const arr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

export function toCharacter(s: ServerCharacter): Character {
  return {
    id: String(s.id),
    name: s.name,
    histoire: s.histoire ?? '',
    race: s.race ?? '',
    portraitImageId: s.portraitImageId ?? null,
    stats: { str: s.str, agi: s.agi, end: s.end, int: s.int, wis: s.wis, cha: s.cha },
    hpCurrent: Math.max(0, Math.min(s.hpCurrent, s.hpMax)),
    hpMax: s.hpMax,
    hpBonus: s.hpBonus ?? 0,
    armor: s.armor ?? 0,
    domains: obj(s.domains, {}),
    specialties: arr(s.specialties),
    advancedDomains: obj(s.advancedDomains, {}),
    titles: arr(s.titles),
    abilityUses: obj(s.abilityUses, {}),
    sessionTicks: obj(s.sessionTicks, { success: 0, critFail: 0 }),
    resources: arr(s.resources),
    crafts: obj(s.crafts, {}),
    weapons: arr(s.weapons),
    items: arr(s.items),
    goldCoins: s.goldCoins ?? 0,
    silverCoins: s.silverCoins ?? 0,
    copperCoins: s.copperCoins ?? 0,
    pcCurrent: s.pcCurrent ?? LUCK_PER_SESSION,
    states: arr<string>(s.states).filter(isEtatId),
  }
}

export function toServerPayload(c: Character): Omit<ServerCharacter, 'id' | 'userId' | 'isActive'> {
  return {
    name: c.name,
    histoire: c.histoire,
    race: c.race,
    portraitImageId: c.portraitImageId,
    hpMax: c.hpMax,
    hpCurrent: c.hpCurrent,
    hpBonus: Number(c.hpBonus) || 0,
    armor: Number(c.armor) || 0,
    str: c.stats.str,
    agi: c.stats.agi,
    end: c.stats.end,
    int: c.stats.int,
    wis: c.stats.wis,
    cha: c.stats.cha,
    domains: c.domains,
    specialties: c.specialties,
    advancedDomains: c.advancedDomains,
    titles: c.titles,
    abilityUses: c.abilityUses,
    sessionTicks: c.sessionTicks,
    resources: c.resources,
    crafts: c.crafts,
    weapons: c.weapons,
    items: c.items,
    goldCoins: c.goldCoins,
    silverCoins: c.silverCoins,
    copperCoins: c.copperCoins,
    pcCurrent: c.pcCurrent,
    states: c.states,
  }
}

export function createDefaultCharacter(): Character {
  return {
    id: '',
    name: 'Nouveau héros',
    histoire: '',
    race: '',
    portraitImageId: null,
    stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20,
    hpMax: 20,
    hpBonus: 0,
    armor: 0,
    domains: {},
    specialties: [],
    advancedDomains: {},
    titles: [],
    abilityUses: {},
    sessionTicks: { success: 0, critFail: 0 },
    resources: [],
    crafts: {},
    weapons: [],
    items: [],
    goldCoins: 0,
    silverCoins: 0,
    copperCoins: 0,
    pcCurrent: LUCK_PER_SESSION,
    states: [],
  }
}

export const character = ref<Character>(createDefaultCharacter())
const serverId = ref<number | null>(null)

/** PV max selon les règles Sindragosa (+ bonus divers). */
export const computedHp = computed(() => computeMaxHp(character.value))

/** Initiative = AGI + SAG + rang en Perception & Sens. */
export const computedInitiative = computed(() => initiative(character.value.stats, domainRanks(character.value)))

/** Compétences dont tous les prérequis sont réunis. */
export const unlocked = computed(() => unlockedAbilities(progressState(character.value)))

// PV max calculés → stockés sur la fiche (le serveur s'en sert en combat et au repos).
watch(computedHp, (val) => {
  character.value.hpMax = val
  if (character.value.hpCurrent > val) character.value.hpCurrent = val
}, { immediate: true })

const loading = ref(false)
const loadError = ref<string | null>(null)
const saveStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')

let debounceTimer: ReturnType<typeof setTimeout> | null = null

// Génération de chargement : si un loadCharacter plus récent démarre, les réponses
// des chargements précédents sont ignorées (évite qu'une réponse lente écrase la bonne).
let loadGen = 0
// Snapshot du dernier état connu du serveur : la sauvegarde auto ne part que si le
// personnage a réellement changé (bloque le PUT parasite déclenché par le load lui-même).
let lastSavedPayload = ''

function markSynced(): void {
  lastSavedPayload = JSON.stringify(toServerPayload(character.value))
}

function applyLoaded(row: ServerCharacter): void {
  serverId.value = row.id
  character.value = toCharacter(row)
  markSynced()
}

/**
 * Applique des PV qui viennent DÉJÀ du serveur (flux SSE du combat) sans
 * déclencher la sauvegarde auto : une fiche locale périmée écraserait le reste.
 */
export function applyServerHp(hpCurrent: number): void {
  if (character.value.hpCurrent === hpCurrent) return
  character.value.hpCurrent = hpCurrent
  markSynced()
}

/** Applique des états posés par le MJ depuis le combat, sans sauvegarde auto. */
export function applyServerStates(states: EtatId[]): void {
  const current = character.value.states
  if (current.length === states.length && current.every((id, i) => id === states[i])) return
  character.value.states = [...states]
  markSynced()
}

/** Applique un repos que le serveur a DÉJÀ écrit en base, sans sauvegarde auto. */
export function applyServerRest(state: {
  hpCurrent: number
  pcCurrent: number
  states: EtatId[]
  abilityUses: Character['abilityUses']
  sessionTicks: Character['sessionTicks']
}): void {
  const c = character.value
  c.hpCurrent = state.hpCurrent
  c.pcCurrent = state.pcCurrent
  c.states = state.states
  c.abilityUses = state.abilityUses
  c.sessionTicks = state.sessionTicks
  markSynced()
}

/**
 * Applique un réglage du MJ (caracs, rangs, titres…) que le serveur a DÉJÀ écrit,
 * sans sauvegarde auto : sinon la fiche locale, périmée, l'écraserait.
 */
export function applyServerPatch(characterId: number, patch: Partial<ServerCharacter>): void {
  if (character.value.id !== String(characterId)) return
  const merged = toCharacter({
    ...toServerPayload(character.value),
    ...patch,
    id: characterId,
    userId: 0,
    isActive: true,
  } as ServerCharacter)
  character.value = { ...merged, hpMax: character.value.hpMax, hpCurrent: character.value.hpCurrent }
  markSynced()
}

export async function loadCharacter(id?: number): Promise<void> {
  if (debounceTimer) { clearTimeout(debounceTimer); debounceTimer = null }
  const gen = ++loadGen
  loading.value = true
  loadError.value = null
  character.value = createDefaultCharacter()
  serverId.value = null
  try {
    if (id) {
      const row = await fetchCharacter(id)
      if (gen !== loadGen) return
      applyLoaded(row)
    } else {
      const list = await fetchCharacters()
      if (gen !== loadGen) return
      const active = list.find((c) => c.isActive) ?? list[0] ?? null
      if (active) {
        applyLoaded(active)
      } else {
        const created = await createCharacter({ name: 'Nouveau héros' })
        if (gen !== loadGen) return
        applyLoaded(created)
      }
    }
  } catch {
    if (gen !== loadGen) return
    loadError.value =
      "Impossible de charger le personnage (API arrêtée, erreur serveur ou base non à jour). Relance l’API et exécute npm run db:migrate si besoin."
  } finally {
    if (gen === loadGen) loading.value = false
  }
}

watch(
  character,
  () => {
    if (loading.value || !serverId.value) return
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      if (!serverId.value) return
      const payload = toServerPayload(character.value)
      const json = JSON.stringify(payload)
      if (json === lastSavedPayload) return
      saveStatus.value = 'saving'
      try {
        await updateCharacter(serverId.value, payload)
        lastSavedPayload = json
        saveStatus.value = 'saved'
        setTimeout(() => { saveStatus.value = 'idle' }, 2000)
      } catch {
        saveStatus.value = 'error'
      }
    }, 800)
  },
  { deep: true },
)

export function useCharacter() {
  return {
    character,
    loading,
    loadError,
    saveStatus,
    computedHp,
    computedInitiative,
    unlocked,
  }
}
