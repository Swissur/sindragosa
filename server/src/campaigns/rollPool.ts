/**
 * Ce qu'un jet en réserve de d6 garde en plus des dés (voir migration 048).
 * Un pool par système (plans/43) ; sans `system`, c'est WoW Forever.
 */
export type RollPool = SindragosaPool | KnightPool

export interface SindragosaPool {
  /** Face à partir de laquelle un dé est critique : 6, ou 5 avec une spécialité Maître. */
  critFrom: 5 | 6
  reached: 'echec' | 'facile' | 'moyenne' | 'difficile' | 'exploit'
  critFail: boolean
  /** Origine de chaque dé (dés gardés puis écartés) : décide de sa couleur. */
  sources?: PoolDieSource[]
}

/** Jet de combo Knight : dés pairs, overdrives dans `bonus`, exploit quand tous les dés réussissent. */
export interface KnightPool {
  system: 'knight'
  exploit: boolean
  critFail: boolean
  difficulty: number | null
  sources?: PoolDieSource[]
}

export type PoolDieSource =
  | 'stat' | 'domaine' | 'specialite' | 'puissance' | 'chance' | 'avantage'
  | 'base' | 'combo' | 'exploit'

const SOURCES = new Set(['stat', 'domaine', 'specialite', 'puissance', 'chance', 'avantage', 'base', 'combo', 'exploit'])
/** Une réserve ne dépasse jamais quelques dizaines de dés ; au-delà, c'est du bruit. */
const MAX_SOURCES = 40

const REACHED = new Set(['echec', 'facile', 'moyenne', 'difficile', 'exploit'])

/** Des origines mal formées ne gâchent pas le jet : le dé roule juste aux couleurs du joueur. */
function parseSources(value: unknown): PoolDieSource[] | undefined {
  if (Array.isArray(value) && value.length <= MAX_SOURCES
    && value.every((x) => typeof x === 'string' && SOURCES.has(x))) {
    return value as PoolDieSource[]
  }
  return undefined
}

function parseKnightPool(v: Record<string, unknown>): KnightPool | null {
  const difficulty = v.difficulty === null || v.difficulty === undefined
    ? null
    : (typeof v.difficulty === 'number' && Number.isInteger(v.difficulty) && v.difficulty >= 0 ? v.difficulty : undefined)
  if (difficulty === undefined) return null
  const pool: KnightPool = { system: 'knight', exploit: v.exploit === true, critFail: v.critFail === true, difficulty }
  const sources = parseSources(v.sources)
  if (sources) pool.sources = sources
  return pool
}

/** Valide le `pool` envoyé par le client ; tout ce qui ne colle pas devient NULL. */
export function parsePool(value: unknown): RollPool | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Record<string, unknown>
  if (v.system === 'knight') return parseKnightPool(v)
  if (v.system !== undefined && v.system !== 'wow-forever') return null
  if (v.critFrom !== 5 && v.critFrom !== 6) return null
  if (typeof v.reached !== 'string' || !REACHED.has(v.reached)) return null
  const pool: SindragosaPool = { critFrom: v.critFrom, reached: v.reached as SindragosaPool['reached'], critFail: v.critFail === true }
  const sources = parseSources(v.sources)
  if (sources) pool.sources = sources
  return pool
}
