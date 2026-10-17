/**
 * Opérations sur une fiche Sindragosa : fonctions pures, sans état ni réseau.
 * Les composants passent par `useCharacter`, qui les applique à la fiche courante.
 */
import type { Character, DomainProgress, SpecialtyRow } from '../../types/character'
import { raceById } from '../../data/sindragosa/races'
import type { StatId } from '../../data/sindragosa/domains'
import { BASE_STAT, maxHp } from './combat'
import { addDomainTick, addSpecialtyTick, canAddSpecialty, canTick, type TickReason } from './progression'
import type { ProgressState } from './prerequisites'

const rankOf = (map: Record<string, DomainProgress>) =>
  Object.fromEntries(Object.entries(map).map(([id, p]) => [id, p.rank]))

export function domainRanks(c: Character): Record<string, number> {
  return rankOf(c.domains)
}

export function progressState(c: Character): ProgressState {
  return {
    domainRanks: rankOf(c.domains),
    advancedRanks: rankOf(c.advancedDomains),
    specialties: c.specialties.map((s) => ({ name: s.name, level: s.level })),
    titles: c.titles,
  }
}

/** Valeur d'une carac à la création : 2, +1 si c'est la carac de la race. */
export function statAtCreation(race: string, stat: StatId): number {
  return BASE_STAT + (raceById(race)?.stat === stat ? 1 : 0)
}

export function computeMaxHp(c: Character): number {
  return maxHp({ end: c.stats.end, endAtCreation: statAtCreation(c.race, 'end'), domainRanks: domainRanks(c) }) + c.hpBonus
}

/** Change la race : retire le +1 de l'ancienne, ajoute celui de la nouvelle. */
export function withRace(c: Character, race: string): Character {
  const stats = { ...c.stats }
  const before = raceById(c.race)?.stat
  const after = raceById(race)?.stat
  if (before) stats[before] -= 1
  if (after) stats[after] += 1
  return { ...c, race, stats }
}

export type TickTarget =
  | { kind: 'domain'; id: string }
  | { kind: 'advanced'; id: string }
  | { kind: 'specialty'; id: string }

export type TickOutcome =
  | { ok: true; character: Character; rankedUp: boolean; newRank: number }
  | { ok: false; reason: 'limite-seance' | 'rang-max' | 'inconnu' }

/**
 * Ajoute une coche. Une réussite ou un échec critique compte dans la limite de
 * séance ; une récompense du MJ (`reward`) n'y compte pas.
 */
export function applyTick(c: Character, target: TickTarget, reason: TickReason): TickOutcome {
  if (!canTick(reason, c.sessionTicks)) return { ok: false, reason: 'limite-seance' }

  let next: Character
  let before: number
  let after: number
  if (target.kind === 'specialty') {
    const s = c.specialties.find((x) => x.id === target.id)
    if (!s) return { ok: false, reason: 'inconnu' }
    const t = addSpecialtyTick({ rank: s.level, ticks: s.ticks })
    if (t.rank === s.level && t.ticks === s.ticks) return { ok: false, reason: 'rang-max' }
    before = s.level
    after = t.rank
    next = { ...c, specialties: c.specialties.map((x) => (x.id === s.id ? { ...x, level: t.rank, ticks: t.ticks } : x)) }
  } else {
    const key = target.kind === 'domain' ? 'domains' : 'advancedDomains'
    const current = c[key][target.id] ?? { rank: 0, ticks: 0 }
    const t = addDomainTick(current)
    if (t.rank === current.rank && t.ticks === current.ticks) return { ok: false, reason: 'rang-max' }
    before = current.rank
    after = t.rank
    next = { ...c, [key]: { ...c[key], [target.id]: t } }
  }

  if (reason !== 'reward') {
    const field = reason === 'success' ? 'success' : 'critFail'
    next = { ...next, sessionTicks: { ...c.sessionTicks, [field]: c.sessionTicks[field] + 1 } }
  }
  return { ok: true, character: next, rankedUp: after > before, newRank: after }
}

/** Ajoute une spécialité Apprenti (0 coche), si le rang du domaine le permet. */
export function addSpecialty(c: Character, domainId: string, name: string, id: string): Character | null {
  const count = c.specialties.filter((s) => s.domainId === domainId).length
  if (!canAddSpecialty(c.domains[domainId]?.rank ?? 0, count) || !name.trim()) return null
  const row: SpecialtyRow = { id, domainId, name: name.trim(), level: 1, ticks: 0 }
  return { ...c, specialties: [...c.specialties, row] }
}
