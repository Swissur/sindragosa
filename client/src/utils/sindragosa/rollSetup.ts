/**
 * Préparer un jet depuis la fiche : réserve, formule lisible, coches possibles.
 * Fonctions pures, utilisées par la feuille de jet (`RollSheet`).
 */
import type { Character } from '../../types/character'
import { STATS, domainById } from '../../data/sindragosa/domains'
import { poolSize, type PoolResult, type SpecialtyLevel } from './pool'
import { canTick, type TickReason } from './progression'
import type { RollPool } from '../rollOutcome'

export type RollMode = 'desavantage' | 'normal' | 'avantage'

export interface RollChoice {
  domainId: string
  /** Id d'une spécialité de la fiche, '' = aucune. */
  specialtyId: string
  mode: RollMode
  /** Points de chance dépensés (+1d6 chacun). */
  luck: number
}

export interface RollSetup {
  count: number
  specialtyLevel: SpecialtyLevel
  /** « AGI 3 + rang 2 + Expert 1 + chance 1 = 7d6 » en morceaux, pour l'affichage. */
  parts: { label: string; value: number }[]
}

export const SPECIALTY_LEVEL_LABELS = ['', 'Apprenti', 'Expert', 'Maître'] as const

export function rollSetup(c: Character, choice: RollChoice): RollSetup | null {
  const domain = domainById(choice.domainId)
  if (!domain) return null
  const stat = c.stats[domain.stat]
  const rank = c.domains[domain.id]?.rank ?? 0
  const specialty = c.specialties.find((s) => s.id === choice.specialtyId && s.domainId === domain.id)
  const specialtyLevel = (specialty?.level ?? 0) as SpecialtyLevel
  const advantages = choice.mode === 'avantage' ? 1 : 0
  const disadvantages = choice.mode === 'desavantage' ? 1 : 0
  const luck = Math.max(0, Math.min(choice.luck, c.pcCurrent))

  const parts = [
    { label: STATS.find((st) => st.id === domain.stat)!.abbr, value: stat },
    { label: 'rang', value: rank },
  ]
  if (specialtyLevel >= 2) parts.push({ label: SPECIALTY_LEVEL_LABELS[specialtyLevel], value: 1 })
  if (advantages) parts.push({ label: 'avantage', value: 1 })
  if (disadvantages) parts.push({ label: 'désavantage', value: -1 })
  if (luck) parts.push({ label: 'chance', value: luck })

  return {
    count: poolSize({ stat, domainRank: rank, specialtyLevel, advantages, disadvantages, luck }),
    specialtyLevel,
    parts,
  }
}

/** Ce que le journal garde d'une réserve, en plus des dés. */
export function poolSummary(result: PoolResult, specialtyLevel: SpecialtyLevel): RollPool {
  return {
    critFrom: specialtyLevel >= 3 ? 5 : 6,
    reached: result.reached,
    critFail: result.isCriticalFailure,
  }
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
