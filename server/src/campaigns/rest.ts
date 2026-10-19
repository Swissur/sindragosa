/**
 * Repos et fin de séance, lancés par le MJ pour tout le groupe (plans/31 § 6).
 *
 * Chaque repos vide les usages des compétences pour certaines périodes
 * (`abilityUses` est rangé par période, donc pas besoin du catalogue ici).
 * Le repos long remonte les PV au max (confirmé le 2026-10-18). La mana remonte
 * d'un tiers (arrondi au-dessus) au repos court, en entier au repos long
 * (plans/40-mana.md). La fin de séance
 * ne rend que la chance, les coches et les usages « séance » : le repos long
 * qui l'accompagne souvent est une option du MJ (`withLongRest`).
 */

import type { EtatEntry } from '../combats/etats.js'

export type RestKind = 'court' | 'long' | 'seance'

export function isRestKind(value: unknown): value is RestKind {
  return value === 'court' || value === 'long' || value === 'seance'
}

/** Points de chance rendus à chaque nouvelle séance. */
export const LUCK_PER_SESSION = 2

/** Périodes d'usage remises à zéro par chaque repos (le plus long inclut les plus courts). */
export const RESET_PERIODS: Record<RestKind, string[]> = {
  court: ['combat', 'repos-court'],
  long: ['combat', 'repos-court', 'repos-long', 'jour'],
  seance: ['seance'],
}

/** Ce qu'un repos peut toucher sur une fiche. */
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

export function applyRest(state: RestState, kind: RestKind): RestState {
  const abilityUses = { ...state.abilityUses }
  for (const period of RESET_PERIODS[kind]) delete abilityUses[period]

  if (kind === 'court') {
    const manaCurrent = Math.min(state.manaMax, state.manaCurrent + Math.ceil(state.manaMax / 3))
    return { ...state, abilityUses, manaCurrent }
  }
  if (kind === 'long') return { ...state, abilityUses, hpCurrent: state.hpMax, manaCurrent: state.manaMax, states: [] }
  return { ...state, abilityUses, pcCurrent: LUCK_PER_SESSION, sessionTicks: { success: 0, critFail: 0 } }
}

/** Fin de séance, précédée d'un repos long si le MJ l'a coché. */
export function endSession(state: RestState, withLongRest: boolean): RestState {
  return applyRest(withLongRest ? applyRest(state, 'long') : state, 'seance')
}

/** Ce qui a bougé, pour la modale du joueur. Une clé absente = rien n'a changé. */
export interface RestDelta {
  hp?: { before: number; after: number }
  pc?: { before: number; after: number }
  mana?: { before: number; after: number }
}

/** Ce qui part sur le flux SSE : de quoi jouer l'animation et rafraîchir la fiche. */
export interface RestBroadcast {
  kind: RestKind
  deltas: {
    userId: number
    characterName: string
    delta: RestDelta
    after: RestState
  }[]
}

export function restDelta(before: RestState, after: RestState): RestDelta {
  const delta: RestDelta = {}
  if (before.hpCurrent !== after.hpCurrent) delta.hp = { before: before.hpCurrent, after: after.hpCurrent }
  if (before.pcCurrent !== after.pcCurrent) delta.pc = { before: before.pcCurrent, after: after.pcCurrent }
  if (before.manaCurrent !== after.manaCurrent) delta.mana = { before: before.manaCurrent, after: after.manaCurrent }
  return delta
}
