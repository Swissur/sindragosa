/**
 * Rangement de la fiche par caractéristique : une compétence ou un domaine
 * avancé se range sous chaque carac de ses prérequis (une, deux, parfois plus).
 */
import { domainById, STATS, type StatId } from '../../data/sindragosa/domains'
import type { Ability } from '../../data/sindragosa/types'
import { advancedStats } from './advanced'

/** Caractéristiques d'une compétence : celles des domaines (de base ou avancés) qu'elle exige. */
export function abilityStats(a: Ability): StatId[] {
  const stats = a.prerequisites.flatMap((p) => {
    if (p.kind === 'domain') return [domainById(p.id)!.stat]
    if (p.kind === 'advanced') return advancedStats(p.id)
    return []
  })
  return [...new Set(stats)]
}

/** Range des éléments sous chacune de leurs caracs, dans l'ordre des 6 caracs. */
export function byStat<T>(items: T[], statsOf: (item: T) => StatId[]): Record<StatId, T[]> {
  const groups = Object.fromEntries(STATS.map((s) => [s.id, [] as T[]])) as Record<StatId, T[]>
  for (const item of items) for (const s of statsOf(item)) groups[s].push(item)
  return groups
}
