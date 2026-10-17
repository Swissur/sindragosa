/**
 * Usages limités des compétences (« 1 fois par repos court »…), rangés par
 * période dans `abilityUses` pour que chaque repos vide les siennes.
 * Une compétence limitée s'utilise une fois par période.
 */
import type { Character } from '../../types/character'
import type { Ability } from '../../data/sindragosa/types'

export const USES_PER_LABELS: Record<NonNullable<Ability['usesPer']>, string> = {
  combat: '1 / combat',
  'repos-court': '1 / repos court',
  'repos-long': '1 / repos long',
  jour: '1 / jour',
  seance: '1 / séance',
  scenario: '1 / scénario',
  campagne: '1 / campagne',
}

export function isUsed(c: Character, ability: Pick<Ability, 'id' | 'usesPer'>): boolean {
  if (!ability.usesPer) return false
  return (c.abilityUses[ability.usesPer]?.[ability.id] ?? 0) > 0
}

/** Marque la compétence utilisée, ou la rend si elle l'était déjà (correction). */
export function toggleUse(c: Character, ability: Pick<Ability, 'id' | 'usesPer'>): Character['abilityUses'] {
  const period = ability.usesPer
  if (!period) return c.abilityUses
  const bucket = { ...(c.abilityUses[period] ?? {}) }
  if (bucket[ability.id]) delete bucket[ability.id]
  else bucket[ability.id] = 1
  return { ...c.abilityUses, [period]: bucket }
}
