/**
 * La mana (plans/40-mana.md) : jauge, repos et coût des sorts. Fonctions pures.
 */
import { MAGIC_ADVANCED_DOMAINS, MAGIC_DOMAINS, MAGIC_STATS } from '../../data/sindragosa/magic'
import type { Ability } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/** Somme des rangs dans les domaines magiques, de base et avancés. */
export function magicRanks(c: Pick<Character, 'domains' | 'advancedDomains'>): number {
  const sum = (ids: string[], map: Character['domains']) => ids.reduce((n, id) => n + (map[id]?.rank ?? 0), 0)
  return sum(MAGIC_DOMAINS, c.domains) + sum(MAGIC_ADVANCED_DOMAINS, c.advancedDomains)
}

/** Mana max = plus haute carac magique + rangs magiques ; 0 tant qu'aucun domaine magique n'est pratiqué. */
export function maxMana(c: Pick<Character, 'stats' | 'domains' | 'advancedDomains'>): number {
  const ranks = magicRanks(c)
  if (ranks === 0) return 0
  return Math.max(...MAGIC_STATS.map((s) => c.stats[s])) + ranks
}

/** Ce que rend un repos court : un tiers de la jauge, arrondi au-dessus. */
export function shortRestMana(max: number): number {
  return Math.ceil(max / 3)
}

/** Économe : −⌊coût / 3⌋, au moins 1 de réduction, jamais sous 1. */
export function economeCost(cost: number): number {
  return Math.max(1, cost - Math.max(1, Math.floor(cost / 3)))
}

/** Le coût d'un sort selon la concentration choisie ; null si ce n'est pas un sort. */
export function spellCost(ability: Pick<Ability, 'manaCost'>, econome: boolean): number | null {
  if (ability.manaCost == null) return null
  return econome ? economeCost(ability.manaCost) : ability.manaCost
}
