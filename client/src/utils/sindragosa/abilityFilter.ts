import type { Ability, ActionType } from '../../data/sindragosa/types'
import { normalizeName } from './prerequisites'

export interface AbilityFilter {
  /** Cherché dans le nom et l'effet, sans tenir compte de la casse ni des accents. */
  search: string
  /** '' = tous les types. */
  actionType: ActionType | ''
}

export function matchesAbilityFilter(a: Ability, f: AbilityFilter): boolean {
  if (f.actionType && a.actionType !== f.actionType) return false
  const q = normalizeName(f.search)
  return !q || normalizeName(a.name).includes(q) || normalizeName(a.effect).includes(q)
}

export const isFiltering = (f: AbilityFilter): boolean => !!f.actionType || !!normalizeName(f.search)
