/**
 * Réserve de d6 de Sindragosa : nombre de dés, lancer, lecture du résultat.
 * Règles : docs/regles/Sindragosa.pdf § 1.A et 1.C, décisions dans plans/31 § 6.
 */

/** Niveau de spécialité utilisée pour le jet : 0 = aucune, 1 Apprenti, 2 Expert, 3 Maître. */
export type SpecialtyLevel = 0 | 1 | 2 | 3

export interface PoolInput {
  stat: number
  domainRank: number
  specialtyLevel?: SpecialtyLevel
  /** Nombre d'avantages (+1d6 chacun). */
  advantages?: number
  /** Nombre de désavantages (−1d6 chacun). */
  disadvantages?: number
  /** Points de chance dépensés (+1d6 chacun). */
  luck?: number
}

/**
 * Nombre de d6 lancés. Les niveaux de spécialité sont cumulatifs :
 * à partir d'Expert, la spécialité ajoute 1d6.
 */
export function poolSize(input: PoolInput): number {
  const specialtyDie = (input.specialtyLevel ?? 0) >= 2 ? 1 : 0
  const n = input.stat + input.domainRank + specialtyDie
    + (input.advantages ?? 0) - (input.disadvantages ?? 0) + (input.luck ?? 0)
  return Math.max(0, n)
}

export type Difficulty = 'echec' | 'facile' | 'moyenne' | 'difficile' | 'exploit'

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  echec: 'Échec',
  facile: 'Facile',
  moyenne: 'Moyenne',
  difficile: 'Difficile',
  exploit: 'Exploit',
}

/** Seuil atteint par un nombre de succès : 1 facile, 2 moyenne, 3 difficile, 4+ exploit. */
export function difficultyReached(successes: number): Difficulty {
  if (successes >= 4) return 'exploit'
  if (successes === 3) return 'difficile'
  if (successes === 2) return 'moyenne'
  if (successes === 1) return 'facile'
  return 'echec'
}

export interface PoolResult {
  /** Dés après relance éventuelle. */
  dice: number[]
  /** Index du dé relancé (Apprenti : un 1 relancé), sinon null. */
  rerolledIndex: number | null
  /** Valeur du dé avant relance, si relance. */
  rerolledFrom: number | null
  successes: number
  /** Dés critiques : les 6, et aussi les 5 avec une spécialité Maître. */
  criticals: number
  isCriticalSuccess: boolean
  /** Aucun succès et au moins un 1. */
  isCriticalFailure: boolean
  reached: Difficulty
}

export type Rng = () => number

const rollD6 = (rng: Rng) => Math.floor(rng() * 6) + 1

/** Lit des dés déjà lancés (utile pour les tests et pour rejouer un jet distant). */
export function readPool(dice: number[], specialtyLevel: SpecialtyLevel = 0): Omit<PoolResult, 'rerolledIndex' | 'rerolledFrom'> {
  const critFrom = specialtyLevel >= 3 ? 5 : 6
  const successes = dice.filter((d) => d >= 5).length
  const criticals = dice.filter((d) => d >= critFrom).length
  return {
    dice,
    successes,
    criticals,
    isCriticalSuccess: criticals > 0,
    isCriticalFailure: successes === 0 && dice.includes(1),
    reached: difficultyReached(successes),
  }
}

/**
 * Lance `count` d6. Avec une spécialité (Apprenti ou mieux), un résultat de 1 est relancé.
 */
export function rollPool(count: number, specialtyLevel: SpecialtyLevel = 0, rng: Rng = Math.random): PoolResult {
  const dice = Array.from({ length: Math.max(0, count) }, () => rollD6(rng))
  let rerolledIndex: number | null = null
  let rerolledFrom: number | null = null
  if (specialtyLevel >= 1) {
    const i = dice.indexOf(1)
    if (i !== -1) {
      rerolledIndex = i
      rerolledFrom = 1
      dice[i] = rollD6(rng)
    }
  }
  return { ...readPool(dice, specialtyLevel), rerolledIndex, rerolledFrom }
}
