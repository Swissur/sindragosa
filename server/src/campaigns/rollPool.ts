/** Ce qu'un jet en réserve de d6 garde en plus des dés (voir migration 048). */
export interface RollPool {
  /** Face à partir de laquelle un dé est critique : 6, ou 5 avec une spécialité Maître. */
  critFrom: 5 | 6
  reached: 'echec' | 'facile' | 'moyenne' | 'difficile' | 'exploit'
  critFail: boolean
}

const REACHED = new Set(['echec', 'facile', 'moyenne', 'difficile', 'exploit'])

/** Valide le `pool` envoyé par le client ; tout ce qui ne colle pas devient NULL. */
export function parsePool(value: unknown): RollPool | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Record<string, unknown>
  if (v.critFrom !== 5 && v.critFrom !== 6) return null
  if (typeof v.reached !== 'string' || !REACHED.has(v.reached)) return null
  return { critFrom: v.critFrom, reached: v.reached as RollPool['reached'], critFail: v.critFail === true }
}
