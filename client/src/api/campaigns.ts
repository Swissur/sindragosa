import type { ServerCharacter } from './characters'
import type { EtatId } from '../data/etats'
import type { RollPool } from '../utils/rollOutcome'
import type { MonsterAbility, MonsterAttack } from '../utils/sindragosa/bestiary'

const BASE = '/api/campaigns'

export interface CampaignSummary {
  id: number
  name: string
  gmUserId: number
  gmUsername: string
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

/** Systèmes de jeu proposés à la création (un seul pour l'instant). */
export const CAMPAIGN_SYSTEMS = [{ value: 'wow-forever', label: 'WoW Forever' }] as const
export type CampaignSystem = (typeof CAMPAIGN_SYSTEMS)[number]['value']

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

/** Début / fin de session. La fin applique la fin de séance à tout le groupe. */
export function setCampaignSession(id: number, active: boolean): Promise<{ sessionActive: boolean }> {
  return request(`/${id}/session`, { method: 'POST', body: JSON.stringify({ active }) })
}

// ── Échange avec le MJ ──────────────────────────────────────────────────────

export interface GmMessage {
  id: number
  toUserId: number
  toUsername: string
  body: string
  createdAt: string
}

/** Le MJ reçoit tout ce qu'il a envoyé, le joueur ses propres messages. */
export function fetchGmMessages(campaignId: number): Promise<GmMessage[]> {
  return request(`/${campaignId}/messages`)
}

export function sendGmMessage(campaignId: number, toUserId: number, body: string): Promise<void> {
  return request(`/${campaignId}/messages`, { method: 'POST', body: JSON.stringify({ toUserId, body }) })
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

/** Ce que le MJ règle sur la fiche d'un joueur : caracs, rangs, récompenses, titres. */
export type GmCharacterPatch = Partial<Pick<ServerCharacter,
  'str' | 'agi' | 'end' | 'int' | 'wis' | 'cha'
  | 'domains' | 'specialties' | 'advancedDomains' | 'titles' | 'hpMax'>>

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
  patch: GmCharacterPatch
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
  monsterCount: number
  createdAt: string
}

export interface EncounterDetail {
  id: number
  campaignId: number
  name: string
  description: string | null
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

export function updateEncounter(campaignId: number, eid: number, data: { name?: string; description?: string }): Promise<void> {
  return request(`/${campaignId}/encounters/${eid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteEncounter(campaignId: number, eid: number): Promise<void> {
  return request(`/${campaignId}/encounters/${eid}`, { method: 'DELETE' })
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
}

export interface RestState {
  hpCurrent: number
  hpMax: number
  pcCurrent: number
  states: EtatId[]
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
