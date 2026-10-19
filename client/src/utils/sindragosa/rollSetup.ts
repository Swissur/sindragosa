/**
 * Préparer un jet depuis la fiche : réserve, formule lisible, coches possibles.
 * Fonctions pures, utilisées par la feuille de jet (`RollSheet`).
 */
import type { Character } from '../../types/character'
import { STATS, advancedDomainById, domainById, type StatId } from '../../data/sindragosa/domains'
import { bestAdvancedStat } from './advanced'
import { poolSize, type PoolResult, type SpecialtyLevel } from './pool'
import { canTick, type TickReason } from './progression'
import type { PoolDieSource, RollPool } from '../rollOutcome'

export type RollMode = 'desavantage' | 'normal' | 'avantage'

export interface RollChoice {
  domainId: string
  /** Id d'une spécialité de la fiche, '' = aucune. */
  specialtyId: string
  mode: RollMode
  /** Points de chance dépensés (+1d6 chacun). */
  luck: number
  /** Sort en concentration Puissante : +1d6. */
  power?: number
}

export interface RollSetup {
  /** Domaine de base ou domaine avancé : décide où va la coche. */
  kind: 'domain' | 'advanced'
  count: number
  specialtyLevel: SpecialtyLevel
  /** « AGI 3 + rang 2 + Expert 1 + chance 1 = 7d6 » en morceaux, pour l'affichage. */
  parts: { label: string; value: number }[]
  /** L'origine de chacun des `count` dés, pour les colorer. */
  sources: PoolDieSource[]
}

export const SPECIALTY_LEVEL_LABELS = ['', 'Apprenti', 'Expert', 'Maître'] as const

/**
 * Un domaine de base se lance avec sa caractéristique ; un domaine avancé avec la
 * plus haute de celles liées à ses prérequis, et sans spécialité.
 */
function rollTarget(c: Character, id: string): { kind: 'domain' | 'advanced'; statId: StatId; rank: number } | null {
  const domain = domainById(id)
  if (domain) return { kind: 'domain', statId: domain.stat, rank: c.domains[id]?.rank ?? 0 }
  const statId = advancedDomainById(id) && bestAdvancedStat(c.stats, id)
  return statId ? { kind: 'advanced', statId, rank: c.advancedDomains[id]?.rank ?? 0 } : null
}

export function rollSetup(c: Character, choice: RollChoice): RollSetup | null {
  const target = rollTarget(c, choice.domainId)
  if (!target) return null
  const stat = c.stats[target.statId]
  const rank = target.rank
  const specialty = target.kind === 'domain'
    ? c.specialties.find((s) => s.id === choice.specialtyId && s.domainId === choice.domainId)
    : undefined
  const specialtyLevel = (specialty?.level ?? 0) as SpecialtyLevel
  const advantages = choice.mode === 'avantage' ? 1 : 0
  const disadvantages = choice.mode === 'desavantage' ? 1 : 0
  const luck = Math.max(0, Math.min(choice.luck, c.pcCurrent))
  const power = choice.power ?? 0

  const parts = [
    { label: STATS.find((st) => st.id === target.statId)!.abbr, value: stat },
    { label: 'rang', value: rank },
  ]
  if (specialtyLevel >= 2) parts.push({ label: SPECIALTY_LEVEL_LABELS[specialtyLevel], value: 1 })
  if (power) parts.push({ label: 'puissante', value: power })
  if (advantages) parts.push({ label: 'avantage', value: 1 })
  if (disadvantages) parts.push({ label: 'désavantage', value: -1 })
  if (luck) parts.push({ label: 'chance', value: luck })

  const count = poolSize({ stat, domainRank: rank, specialtyLevel, advantages, disadvantages, luck, power })
  return { kind: target.kind, count, specialtyLevel, parts, sources: poolSources(stat, rank, specialtyLevel, power, advantages, luck, count) }
}

/**
 * La couleur de chaque dé suit son origine. Le désavantage retire un dé de
 * caractéristique (puis de domaine, s'il n'en reste plus) : c'est la base de la
 * réserve qui est entamée, pas un bonus.
 */
function poolSources(stat: number, rank: number, specialtyLevel: SpecialtyLevel, power: number, advantages: number, luck: number, count: number): PoolDieSource[] {
  const sources: PoolDieSource[] = [
    ...Array<PoolDieSource>(Math.max(0, stat)).fill('stat'),
    ...Array<PoolDieSource>(Math.max(0, rank)).fill('domaine'),
    ...(specialtyLevel >= 2 ? ['specialite' as const] : []),
    ...Array<PoolDieSource>(power).fill('puissance'),
    ...Array<PoolDieSource>(advantages).fill('avantage'),
    ...Array<PoolDieSource>(luck).fill('chance'),
  ]
  return sources.slice(sources.length - count)
}

/** Ce que le journal garde d'une réserve, en plus des dés. */
export function poolSummary(result: PoolResult, specialtyLevel: SpecialtyLevel, sources?: PoolDieSource[]): RollPool {
  const summary: RollPool = {
    critFrom: specialtyLevel >= 3 ? 5 : 6,
    reached: result.reached,
    critFail: result.isCriticalFailure,
  }
  // Le dé relancé garde l'origine de celui qu'il remplace ; l'écarté aussi.
  if (sources) summary.sources = result.rerolledIndex !== null ? [...sources, sources[result.rerolledIndex]] : sources
  return summary
}

/**
 * Coche que ce jet peut rapporter : une réussite (au moins un succès) ou un
 * échec critique, si la limite de la séance le permet. Le joueur choisit
 * ensuite de la prendre ou non : rien n'est coché d'office.
 */
export function tickReasonFor(result: PoolResult, session: Character['sessionTicks']): TickReason | null {
  const reason: TickReason | null = result.isCriticalFailure ? 'crit-fail' : result.successes > 0 ? 'success' : null
  return reason && canTick(reason, session) ? reason : null
}
