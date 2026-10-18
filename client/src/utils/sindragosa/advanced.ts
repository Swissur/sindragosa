/**
 * Domaines avancés (décidé le 2026-10-18) :
 * - ils s'ouvrent quand leurs prérequis (domaines de base ou autres domaines
 *   avancés) sont réunis ; ceux qui ont une compétence du même nom (Ivresse du
 *   Combat, Danse des Lames) s'ouvrent seulement par elle, et les artisanats
 *   avancés (métiers hybrides) par l'une de leurs deux compétences ;
 * - leur jet utilise la plus haute des caractéristiques liées à leurs prérequis.
 */
import { ABILITIES } from '../../data/sindragosa/abilities'
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

/** Les compétences qui ouvrent un domaine avancé : celles qu'il désigne (artisanats avancés), sinon sa compétence homonyme. */
export function openingAbilities(domain: AdvancedDomain, abilities: Ability[]): Ability[] {
  if (domain.openedBy) return abilities.filter((a) => domain.openedBy!.includes(a.id))
  const homonym = homonymAbility(domain, abilities)
  return homonym ? [homonym] : []
}

/**
 * Domaines avancés ouverts : déjà entamés (rang donné par le MJ), sinon
 * - s'il a des compétences qui l'ouvrent, seulement quand l'une est débloquée ;
 * - sinon, quand ses prérequis sont réunis.
 */
export function unlockedAdvancedDomains(state: ProgressState, unlockedAbilities: Ability[]): AdvancedDomain[] {
  return ADVANCED_DOMAINS.filter((d) => {
    if ((state.advancedRanks[d.id] ?? 0) > 0) return true
    if (openingAbilities(d, ABILITIES).length) return openingAbilities(d, unlockedAbilities).length > 0
    return d.prerequisites.every((p) => meetsPrerequisite(state, p))
  })
}
