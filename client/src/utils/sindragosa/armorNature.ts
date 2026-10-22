/**
 * Nature des armures et leurs malus (décidé le 2026-10-22) : tissu, cuir, maille,
 * plaque. Le malus retire des d6 aux jets de la carac touchée et des points
 * d'initiative. Le rang en Armures & boucliers annule les malus de faible valeur.
 */
import type { Character, ItemRow } from '../../types/character'

export type ArmorNature = 'tissu' | 'cuir' | 'maille' | 'plaque'

/** De la plus légère à la plus lourde. */
export const ARMOR_NATURES: ArmorNature[] = ['tissu', 'cuir', 'maille', 'plaque']

export const ARMOR_NATURE_LABELS: Record<ArmorNature, string> = {
  tissu: 'Tissu',
  cuir: 'Cuir',
  maille: 'Maille',
  plaque: 'Plaque',
}

export interface ArmorPenalties {
  /** d6 en moins sur les jets d'Agilité, d'Endurance, de Force. */
  agi: number
  end: number
  str: number
  /** Points d'initiative en moins. */
  init: number
}

export const ARMOR_PENALTIES: Record<ArmorNature, ArmorPenalties> = {
  tissu: { agi: 0, end: 0, str: 0, init: 0 },
  cuir: { agi: 1, end: 0, str: 0, init: 1 },
  maille: { agi: 2, end: 1, str: 0, init: 2 },
  plaque: { agi: 3, end: 2, str: 1, init: 3 },
}

const NO_PENALTY: ArmorPenalties = ARMOR_PENALTIES.tissu

/** Plus forte valeur de malus que le rang annule : rang 1 → 1, rang 3 → 2, rang 5 → 3. */
export function cancelledUpTo(rank: number): number {
  if (rank >= 5) return 3
  if (rank >= 3) return 2
  if (rank >= 1) return 1
  return 0
}

/** La nature la plus lourde parmi les armures équipées ; sans nature = tissu. */
export function heaviestNature(items: ItemRow[]): ArmorNature {
  return items
    .filter((i) => i.type === 'armure' && i.equipped)
    .reduce<ArmorNature>((worst, i) => {
      const n = i.nature ?? 'tissu'
      return ARMOR_NATURES.indexOf(n) > ARMOR_NATURES.indexOf(worst) ? n : worst
    }, 'tissu')
}

/** Les malus que subit le personnage, une fois annulés ceux que couvre son rang. */
export function armorPenalties(c: Pick<Character, 'items' | 'domains'>): ArmorPenalties {
  const base = ARMOR_PENALTIES[heaviestNature(c.items)]
  if (base === NO_PENALTY) return NO_PENALTY
  const cap = cancelledUpTo(c.domains['armures-boucliers']?.rank ?? 0)
  const keep = (v: number) => (v <= cap ? 0 : v)
  return { agi: keep(base.agi), end: keep(base.end), str: keep(base.str), init: keep(base.init) }
}
