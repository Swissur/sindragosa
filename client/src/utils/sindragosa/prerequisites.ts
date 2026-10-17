/**
 * Prérequis des compétences : une compétence est débloquée dès que tous ses prérequis
 * sont réunis (plans/31 § 6).
 */
import { ABILITIES } from '../../data/sindragosa/abilities'
import type { Ability, Prerequisite } from '../../data/sindragosa/types'

/** Ce qu'il faut savoir d'un personnage pour évaluer des prérequis. */
export interface ProgressState {
  domainRanks: Record<string, number>
  advancedRanks: Record<string, number>
  specialties: { name: string; level: number }[]
  titles: string[]
}

/** Comparaison tolérante : casse, accents et espaces ignorés. */
export function normalizeName(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
}

/**
 * Noms acceptés par un prérequis de spécialité. Le PDF écrit les alternatives avec « / »
 * (« Dagues/Lutte », « Lutte / Mains nues ») : n'importe laquelle convient.
 */
function acceptedSpecialtyNames(name: string): string[] {
  return [name, ...name.split('/')].map(normalizeName).filter(Boolean)
}

export function meetsPrerequisite(state: ProgressState, p: Prerequisite): boolean {
  switch (p.kind) {
    case 'domain':
      return (state.domainRanks[p.id] ?? 0) >= p.rank
    case 'advanced':
      return (state.advancedRanks[p.id] ?? 0) >= p.rank
    case 'specialty': {
      const accepted = acceptedSpecialtyNames(p.name)
      return state.specialties.some((s) => s.level >= p.level && accepted.includes(normalizeName(s.name)))
    }
    case 'title':
      return state.titles.some((t) => normalizeName(t) === normalizeName(p.name))
  }
}

export function meetsPrerequisites(state: ProgressState, ability: Ability): boolean {
  return ability.prerequisites.every((p) => meetsPrerequisite(state, p))
}

export function unlockedAbilities(state: ProgressState, catalog: Ability[] = ABILITIES): Ability[] {
  return catalog.filter((a) => meetsPrerequisites(state, a))
}
