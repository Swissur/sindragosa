/** Ce qu'un jet en réserve de d6 garde en plus des dés (voir migration 048). */
export interface RollPool {
  /** Face à partir de laquelle un dé est critique : 6, ou 5 avec une spécialité Maître. */
  critFrom: 5 | 6
  reached: 'echec' | 'facile' | 'moyenne' | 'difficile' | 'exploit'
  critFail: boolean
  /** Origine de chaque dé (dés gardés puis écartés) : décide de sa couleur. */
  sources?: PoolDieSource[]
}

export type PoolDieSource = 'stat' | 'domaine' | 'specialite' | 'puissance' | 'chance' | 'avantage'

const SOURCES = new Set(['stat', 'domaine', 'specialite', 'puissance', 'chance', 'avantage'])
/** Une réserve ne dépasse jamais quelques dizaines de dés ; au-delà, c'est du bruit. */
const MAX_SOURCES = 40

const REACHED = new Set(['echec', 'facile', 'moyenne', 'difficile', 'exploit'])

/** Valide le `pool` envoyé par le client ; tout ce qui ne colle pas devient NULL. */
export function parsePool(value: unknown): RollPool | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Record<string, unknown>
  if (v.critFrom !== 5 && v.critFrom !== 6) return null
  if (typeof v.reached !== 'string' || !REACHED.has(v.reached)) return null
  const pool: RollPool = { critFrom: v.critFrom, reached: v.reached as RollPool['reached'], critFail: v.critFail === true }
  // Des origines mal formées ne gâchent pas le jet : le dé roule juste aux couleurs du joueur.
  if (Array.isArray(v.sources) && v.sources.length <= MAX_SOURCES
    && v.sources.every((x) => typeof x === 'string' && SOURCES.has(x))) {
    pool.sources = v.sources as PoolDieSource[]
  }
  return pool
}
