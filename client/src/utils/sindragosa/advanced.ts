/**
 * Domaines avancés (décidé le 2026-10-18) :
 * - ils s'ouvrent quand leurs prérequis (domaines de base ou autres domaines
 *   avancés) sont réunis, ou quand le personnage débloque la compétence du même nom ;
 * - leur jet utilise la plus haute des caractéristiques liées à leurs prérequis.
 */
import { ADVANCED_DOMAINS, advancedDomainById, domainById, type AdvancedDomain, type StatId } from '../../data/sindragosa/domains'
import type { Ability } from '../../data/sindragosa/types'
import type { Stats } from '../../types/character'
import { meetsPrerequisite, normalizeName, type ProgressState } from './prerequisites'

/** Caractéristiques liées à un domaine avancé, en remontant ses prérequis avancés. */
export function advancedStats(id: string, seen: Set<string> = new Set()): StatId[] {
  const domain = advancedDomainById(id)
  if (!domain || seen.has(id)) return []
  seen.add(id)
  const stats = domain.prerequisites.flatMap((p) =>
    p.kind === 'domain' ? [domainById(p.id)!.stat] : advancedStats(p.id, seen),
  )
  return [...new Set(stats)]
}

/** La caractéristique la plus haute parmi celles liées au domaine avancé. */
export function bestAdvancedStat(stats: Stats, id: string): StatId | null {
  const linked = advancedStats(id)
  if (!linked.length) return null
  return linked.reduce((best, s) => (stats[s] > stats[best] ? s : best))
}

/** La compétence qui porte le même nom qu'un domaine avancé, s'il y en a une. */
export function homonymAbility(domain: AdvancedDomain, abilities: Ability[]): Ability | undefined {
  const name = normalizeName(domain.label)
  return abilities.find((a) => normalizeName(a.name) === name)
}

/**
 * Domaines avancés ouverts : prérequis réunis, compétence homonyme débloquée,
 * ou déjà entamés (rang ou coches donnés par le MJ).
 */
export function unlockedAdvancedDomains(state: ProgressState, unlockedAbilities: Ability[]): AdvancedDomain[] {
  return ADVANCED_DOMAINS.filter((d) =>
    (state.advancedRanks[d.id] ?? 0) > 0
    || d.prerequisites.every((p) => meetsPrerequisite(state, p))
    || !!homonymAbility(d, unlockedAbilities),
  )
}
