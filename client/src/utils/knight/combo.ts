/**
 * Jet de combo Knight (plans/43-systeme-knight.md § 4.2).
 *
 * On lance autant de d6 que la somme de deux caractéristiques différentes (la
 * base et le combo). Un dé pair est une réussite ; les overdrives des deux
 * caractéristiques ajoutent des réussites automatiques. Tous les dés pairs :
 * exploit, on relance la réserve une fois et on ajoute ses réussites. Aucun dé
 * pair : échec critique. Le jet réussit quand le total dépasse la difficulté.
 */

import type { KnightPool, PoolDieSource } from '../rollOutcome'

export type Rng = () => number

export const isComboSuccess = (face: number): boolean => face % 2 === 0

export interface ComboResult {
  /** La réserve lancée. */
  dice: number[]
  /** La relance d'exploit, vide sans exploit. */
  exploitDice: number[]
  /** Réussites aux dés, relance comprise. */
  successes: number
  /** Réussites automatiques des overdrives. */
  overdrive: number
  total: number
  exploit: boolean
  critFail: boolean
}

const countSuccesses = (dice: number[]) => dice.filter(isComboSuccess).length

/** Lit des dés déjà lancés (tests, jet rejoué). */
export function readCombo(dice: number[], overdrive: number, exploitDice: number[] = []): ComboResult {
  const base = countSuccesses(dice)
  const exploit = dice.length > 0 && base === dice.length
  const successes = base + (exploit ? countSuccesses(exploitDice) : 0)
  return {
    dice,
    exploitDice: exploit ? exploitDice : [],
    successes,
    overdrive,
    total: successes + overdrive,
    exploit,
    critFail: dice.length > 0 && base === 0,
  }
}

const rollD6 = (rng: Rng) => Math.floor(rng() * 6) + 1
const rollMany = (n: number, rng: Rng) => Array.from({ length: Math.max(0, n) }, () => rollD6(rng))

export function rollCombo(count: number, overdrive: number, rng: Rng = Math.random): ComboResult {
  const dice = rollMany(count, rng)
  const exploit = dice.length > 0 && dice.every(isComboSuccess)
  return readCombo(dice, overdrive, exploit ? rollMany(count, rng) : [])
}

/** Le jet réussit-il ? `null` sans difficulté annoncée. */
export function comboSucceeds(total: number, difficulty: number | null): boolean | null {
  return difficulty === null ? null : total > difficulty
}

/**
 * Ce qu'on envoie au log : les dés de base, puis ceux du combo, puis la relance.
 * `baseCount` dés viennent de la carac de base, le reste du combo.
 */
export function comboPool(r: ComboResult, baseCount: number, difficulty: number | null): KnightPool {
  const sources: PoolDieSource[] = [
    ...r.dice.map((_, i): PoolDieSource => (i < baseCount ? 'base' : 'combo')),
    ...r.exploitDice.map((): PoolDieSource => 'exploit'),
  ]
  return { system: 'knight', exploit: r.exploit, critFail: r.critFail, difficulty, sources }
}

/** Le palier affiché à côté des dés dans le log. */
export function comboTier(pool: KnightPool, total: number): string | null {
  if (pool.critFail) return 'Échec critique'
  if (pool.exploit) return 'Exploit'
  const ok = comboSucceeds(total, pool.difficulty)
  if (ok === null) return null
  return ok ? 'Réussite' : 'Échec'
}
