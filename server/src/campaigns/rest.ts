/**
 * Repos et fin de séance, lancés par le MJ pour tout le groupe (plans/31 § 6).
 *
 * Chaque repos vide les usages des compétences pour certaines périodes
 * (`abilityUses` est rangé par période, donc pas besoin du catalogue ici).
 * Hypothèse à confirmer : le repos long et la fin de séance remontent les PV au max.
 */

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
  seance: ['combat', 'repos-court', 'repos-long', 'jour', 'seance'],
}

/** Ce qu'un repos peut toucher sur une fiche. */
export interface RestState {
  hpCurrent: number
  hpMax: number
  pcCurrent: number
  states: string[]
  abilityUses: Record<string, Record<string, number>>
  sessionTicks: { success: number; critFail: number }
}

export function applyRest(state: RestState, kind: RestKind): RestState {
  const abilityUses = { ...state.abilityUses }
  for (const period of RESET_PERIODS[kind]) delete abilityUses[period]

  if (kind === 'court') return { ...state, abilityUses }

  const rested = { ...state, abilityUses, hpCurrent: state.hpMax, states: [] }
  if (kind === 'long') return rested
  return { ...rested, pcCurrent: LUCK_PER_SESSION, sessionTicks: { success: 0, critFail: 0 } }
}

/** Ce qui a bougé, pour la modale du joueur. Une clé absente = rien n'a changé. */
export interface RestDelta {
  hp?: { before: number; after: number }
  pc?: { before: number; after: number }
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
  return delta
}
