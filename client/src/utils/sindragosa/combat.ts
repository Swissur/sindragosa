/**
 * Formules de combat et de santé de Sindragosa.
 * Règles : docs/regles/Sindragosa.pdf § 1.B (points de vie) et § 4 (combat).
 */
import { DOMAINS, type StatId } from '../../data/sindragosa/domains'

export const BASE_HP = 20
/** Valeur de chaque caractéristique à la création, avant le +1 racial (plans/31 § 6). */
export const BASE_STAT = 2
const HP_PER_FORCE_ENDURANCE_RANK = 2
const HP_PER_RESISTANCE_RANK = 5
const HP_PER_ENDURANCE_POINT = 8

export interface HpInput {
  /** Endurance actuelle. */
  end: number
  /** Endurance à la création (2, ou 3 si c'est la carac raciale). */
  endAtCreation: number
  /** Rang de chaque domaine, par identifiant. */
  domainRanks: Record<string, number>
}

/**
 * PV max = 20
 *   + 2 par rang dans un domaine de Force ou d'Endurance (5 pour Résistance physique)
 *   + 8 par point d'Endurance gagné depuis la création.
 */
export function maxHp({ end, endAtCreation, domainRanks }: HpInput): number {
  let hp = BASE_HP
  for (const d of DOMAINS) {
    if (d.stat !== 'str' && d.stat !== 'end') continue
    const rank = domainRanks[d.id] ?? 0
    hp += rank * (d.id === 'resistance-physique' ? HP_PER_RESISTANCE_RANK : HP_PER_FORCE_ENDURANCE_RANK)
  }
  return hp + Math.max(0, end - endAtCreation) * HP_PER_ENDURANCE_POINT
}

/** Initiative = Agilité + Sagesse + rang en Perception & Sens. Ordre de jeu décroissant. */
export function initiative(stats: Record<StatId, number>, domainRanks: Record<string, number>): number {
  return stats.agi + stats.wis + (domainRanks['perception-sens'] ?? 0)
}

export interface AttackOutcome {
  margin: number
  hit: boolean
  damage: number
}

/**
 * Opposition : marge = succès d'attaque − succès de défense.
 * Marge ≤ 0 : parée ou esquivée. Sinon dégâts = dégâts de l'arme + marge − armure (jamais négatifs).
 */
export function resolveAttack(attackSuccesses: number, defenseSuccesses: number, weaponDamage: number, armor: number): AttackOutcome {
  const margin = attackSuccesses - defenseSuccesses
  if (margin <= 0) return { margin, hit: false, damage: 0 }
  return { margin, hit: true, damage: Math.max(0, weaponDamage + margin - armor) }
}
