import type { ServerCharacter } from './characters'
import type { ItemRow } from '../types/character'
import type { GameSystemId as CampaignSystem } from '../data/systems'
import type { EtatEntry } from '../data/etats'
import type { RollPool } from '../utils/rollOutcome'
import type { MonsterAbility, MonsterAttack } from '../utils/sindragosa/bestiary'
import type { ImportedEncounter } from '../utils/sindragosa/dungeons'

const BASE = '/api/campaigns'

export interface CampaignSummary {
  id: number
  name: string
  gmUserId: number
  gmUsername: string
  system: CampaignSystem
  memberCount: number
  isMember: boolean
  createdAt: string
}

export interface CampaignMember {
  userId: number
  username: string
  avatarUrl: string | null
  characterId: number | null
  characterName: string | null
  portraitUrl: string | null
  joinedAt: string
  /** Un flux SSE est ouvert sur la campagne (pastille verte). */
  online: boolean
}

export interface CampaignDetail {
  id: number
  name: string
  gmUserId: number
  gmUsername: string
  system: CampaignSystem
  sessionActive: boolean
  members: CampaignMember[]
  createdAt: string
}

/** Systèmes de jeu proposés à la création (plans/43). */
export { GAME_SYSTEMS as CAMPAIGN_SYSTEMS } from '../data/systems'
export type { CampaignSystem }

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchCampaigns(): Promise<CampaignSummary[]> {
  return request<CampaignSummary[]>('/')
}

export function createCampaign(name: string, system: CampaignSystem): Promise<{ id: number; name: string }> {
  return request('/', {
    method: 'POST',
    body: JSON.stringify({ name, system }),
  })
}

export function updateCampaign(id: number, patch: { name?: string; system?: CampaignSystem }): Promise<void> {
  return request(`/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })
}

/** Entre dans une campagne : elle devient la campagne active (log de jets, codex…). */
export function activateCampaign(id: number): Promise<void> {
  return request(`/${id}/activate`, { method: 'POST', body: JSON.stringify({}) })
}

/** Début / fin de session. La fin applique la fin de séance à tout le groupe, avec repos long si `longRest`. */
export function setCampaignSession(id: number, active: boolean, longRest = false): Promise<{ sessionActive: boolean }> {
  return request(`/${id}/session`, { method: 'POST', body: JSON.stringify({ active, longRest }) })
}

// ── Échange avec le MJ ──────────────────────────────────────────────────────

export interface GmMessage {
  id: number
  fromUserId: number
  fromUsername: string
  toUserId: number
  toUsername: string
  body: string
  /** Le destinataire a ouvert le fil. `null` = non lu. */
  readAt: string | null
  createdAt: string
}

/** Le MJ reçoit tous les échanges de la campagne, le joueur le sien. */
export function fetchGmMessages(campaignId: number): Promise<{ isGm: boolean; messages: GmMessage[] }> {
  return request(`/${campaignId}/messages`)
}

/** Le MJ écrit à un joueur. */
export function sendGmMessage(campaignId: number, toUserId: number, body: string): Promise<void> {
  return request(`/${campaignId}/messages`, { method: 'POST', body: JSON.stringify({ toUserId, body }) })
}

/** Messages pour moi pas encore lus dans la campagne. */
export function fetchGmUnread(campaignId: number): Promise<{ count: number }> {
  return request(`/${campaignId}/messages/unread`)
}

/** J'ouvre un fil : ses messages pour moi sont lus. Le MJ précise le joueur. */
export function markGmMessagesRead(campaignId: number, withUserId?: number): Promise<void> {
  return request(`/${campaignId}/messages/read`, { method: 'POST', body: JSON.stringify({ withUserId }) })
}

/** Le joueur écrit au MJ de la campagne. */
export function sendMessageToGm(campaignId: number, body: string): Promise<void> {
  return request(`/${campaignId}/messages`, { method: 'POST', body: JSON.stringify({ body }) })
}

export function fetchCampaign(id: number): Promise<CampaignDetail> {
  return request<CampaignDetail>(`/${id}`)
}

export function deleteCampaign(id: number): Promise<void> {
  return request(`/${id}`, { method: 'DELETE' })
}

export function joinCampaign(id: number): Promise<void> {
  return request(`/${id}/join`, { method: 'POST', body: JSON.stringify({}) })
}

export function leaveCampaign(id: number): Promise<void> {
  return request(`/${id}/leave`, { method: 'POST', body: JSON.stringify({}) })
}

export function fetchMemberCharacter(campaignId: number, userId: number): Promise<ServerCharacter> {
  return request<ServerCharacter>(`/${campaignId}/members/${userId}/character`)
}

/** Le MJ pose un nouveau mot de passe à un joueur qui l'a oublié. */
export function resetMemberPassword(campaignId: number, userId: number, password: string): Promise<void> {
  return request(`/${campaignId}/members/${userId}/password`, { method: 'POST', body: JSON.stringify({ password }) })
}

/** Ce que le MJ règle sur la fiche d'un joueur : caracs, rangs, récompenses, titres. */
export type GmCharacterPatch = Partial<Pick<ServerCharacter,
  'str' | 'agi' | 'end' | 'int' | 'wis' | 'cha'
  | 'domains' | 'specialties' | 'advancedDomains' | 'titles' | 'recipeGrants' | 'hpMax' | 'manaMax'>>

export function patchMemberCharacter(campaignId: number, userId: number, patch: GmCharacterPatch): Promise<ServerCharacter> {
  return request<ServerCharacter>(`/${campaignId}/members/${userId}/character`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  })
}

/** Évènement SSE `character` : le MJ vient de régler la fiche d'un joueur. */
export interface CharacterPatchEvent {
  userId: number
  characterId: number
  patch: GmCharacterPatch | Pick<ServerCharacter, 'items'>
  /** Nom de l'objet reçu quand le patch vient du butin d'un combat ou d'un autre joueur. */
  loot?: string
  /** Nom du personnage qui a donné l'objet. */
  from?: string
}

/** Donne un objet de mon personnage au personnage d'un autre joueur de la campagne. */
export function giveItem(campaignId: number, characterId: number, toUserId: number, item: ItemRow): Promise<void> {
  return request(`/${campaignId}/items/give`, {
    method: 'POST',
    body: JSON.stringify({ characterId, toUserId, item }),
  })
}

// ── Encounters ──────────────────────────────────────────────────────────────

/** Réserve d'attaque en d6 et dégâts fixes (plans/33). */
export type EncounterMonsterAttack = MonsterAttack
export type EncounterMonsterAbility = MonsterAbility

export interface EncounterMonster {
  id: number
  encounterId: number
  name: string
  /** Rang de menace R (0 à 5). */
  threat: number
  size: string
  armor: number
  /** Réserve de défense, en d6. */
  defense: number
  pv: number
  init: number
  statFor: number
  statAgi: number
  statEnd: number
  statInt: number
  statSag: number
  statCha: number
  attacks: EncounterMonsterAttack[]
  abilities: EncounterMonsterAbility[]
  description: string | null
  /** Démarre le combat en réserve : caché aux joueurs, hors initiative. */
  hidden: boolean
}

export interface EncounterSummary {
  id: number
  name: string
  description: string | null
  /** Donjon ou raid qui classe la rencontre ; null = rencontre libre. */
  dungeon: string | null
  monsterCount: number
  createdAt: string
}

export interface EncounterDetail {
  id: number
  campaignId: number
  name: string
  description: string | null
  dungeon: string | null
  monsters: EncounterMonster[]
  createdAt: string
}

export function fetchEncounters(campaignId: number): Promise<EncounterSummary[]> {
  return request(`/${campaignId}/encounters`)
}

export function createEncounter(campaignId: number, data: { name: string; description?: string }): Promise<EncounterDetail> {
  return request(`/${campaignId}/encounters`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function fetchEncounter(campaignId: number, eid: number): Promise<EncounterDetail> {
  return request(`/${campaignId}/encounters/${eid}`)
}

export function updateEncounter(campaignId: number, eid: number, data: { name?: string; description?: string; dungeon?: string }): Promise<void> {
  return request(`/${campaignId}/encounters/${eid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/** Crée d'un coup les combats tout prêts d'un donjon, classés sous son nom. */
export function importDungeonEncounters(campaignId: number, dungeon: string, encounters: ImportedEncounter[]): Promise<{ count: number }> {
  return request(`/${campaignId}/encounters/import`, {
    method: 'POST',
    body: JSON.stringify({ dungeon, encounters }),
  })
}

export function deleteEncounter(campaignId: number, eid: number): Promise<void> {
  return request(`/${campaignId}/encounters/${eid}`, { method: 'DELETE' })
}

/** Efface d'un coup toutes les rencontres d'un donjon importé. */
export function deleteDungeon(campaignId: number, dungeon: string): Promise<{ count: number }> {
  return request(`/${campaignId}/dungeons/${encodeURIComponent(dungeon)}`, { method: 'DELETE' })
}

export function addEncounterMonster(campaignId: number, eid: number, data: Omit<EncounterMonster, 'id' | 'encounterId'>): Promise<EncounterMonster> {
  return request(`/${campaignId}/encounters/${eid}/monsters`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function duplicateEncounterMonster(campaignId: number, eid: number, mid: number): Promise<EncounterMonster[]> {
  return request(`/${campaignId}/encounters/${eid}/monsters/${mid}/duplicate`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export function updateEncounterMonster(campaignId: number, eid: number, mid: number, data: Partial<Omit<EncounterMonster, 'id' | 'encounterId'>>): Promise<EncounterMonster> {
  return request(`/${campaignId}/encounters/${eid}/monsters/${mid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteEncounterMonster(campaignId: number, eid: number, mid: number): Promise<void> {
  return request(`/${campaignId}/encounters/${eid}/monsters/${mid}`, { method: 'DELETE' })
}

// ── Log de jets (portée campagne) ───────────────────────────────────────────

export interface RollEvent {
  id: number
  campaignId: number
  /** NULL quand le jet a été fait hors combat. */
  combatId: number | null
  userId: number
  actorName: string
  actorKind: 'player' | 'monster'
  visibility: 'public' | 'gm'
  kind: string
  label: string
  context: string
  die: number
  sides: number
  bonus: number
  total: number
  rolls: number[] | null
  /** Les dés lancés puis écartés par un avantage ou une relance. */
  dropped: number[] | null
  damage: { total: number; critical: boolean; fumble: boolean } | null
  /** Jet en réserve de d6 (`total` = succès). NULL pour un dé seul. */
  pool: RollPool | null
  createdAt: string
  /** Style de dé du lanceur. Présent sur le flux SSE seulement, pas en base. */
  diceStyle?: unknown
}

export interface RollInput {
  kind: string
  label: string
  context: string
  die: number
  sides: number
  bonus: number
  total: number
  rolls?: number[]
  /** Les dés lancés puis écartés par un avantage ou une relance. */
  dropped?: number[]
  damage?: { total: number; critical: boolean; fumble: boolean }
  pool?: RollPool
  /** MJ uniquement : poste le jet au nom d'un monstre (visible MJ seulement) */
  asMonster?: string
}

export function postCampaignRoll(campaignId: number, roll: RollInput): Promise<RollEvent> {
  return request(`/${campaignId}/rolls`, { method: 'POST', body: JSON.stringify(roll) })
}

export function fetchCampaignRolls(campaignId: number, viewer = false): Promise<RollEvent[]> {
  return request(`/${campaignId}/rolls${viewer ? '?as=viewer' : ''}`)
}

// ── Repos partagé ───────────────────────────────────────────────────────────

/** Repos court, repos long (menu repos) et fin de séance (fin de session), lancés par le MJ. */
export type RestKind = 'court' | 'long' | 'seance'

export interface RestChange {
  before: number
  after: number
}

export interface RestDelta {
  hp?: RestChange
  pc?: RestChange
  mana?: RestChange
}

export interface RestState {
  hpCurrent: number
  hpMax: number
  pcCurrent: number
  manaCurrent: number
  manaMax: number
  states: EtatEntry[]
  abilityUses: Record<string, Record<string, number>>
  sessionTicks: { success: number; critFail: number }
}

export interface RestEvent {
  kind: RestKind
  deltas: {
    userId: number
    characterName: string
    delta: RestDelta
    after: RestState
  }[]
}

export function postRest(campaignId: number, kind: RestKind): Promise<RestEvent> {
  return request(`/${campaignId}/rest`, { method: 'POST', body: JSON.stringify({ kind }) })
}
