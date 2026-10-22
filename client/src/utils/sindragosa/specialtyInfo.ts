/**
 * Ce qu'une spécialité ouvre : les compétences qui l'exigent, avec le niveau
 * demandé. Sert aux infobulles et à la confirmation du choix d'une spécialité.
 */
import { ABILITIES } from '../../data/sindragosa/abilities'
import { specialtyMatches } from './prerequisites'

export interface SpecialtyUse {
  abilityId: number
  name: string
  /** Niveau de spécialité exigé : 1 Apprenti, 2 Expert, 3 Maître. */
  level: number
}

/** Les compétences qui exigent cette spécialité, triées par niveau puis par nom. */
export function abilitiesRequiringSpecialty(name: string): SpecialtyUse[] {
  const uses: SpecialtyUse[] = []
  for (const a of ABILITIES) {
    const p = [...a.prerequisites, ...(a.alternatePrerequisites ?? [])]
      .find((x) => x.kind === 'specialty' && specialtyMatches(name, x.name))
    if (p?.kind === 'specialty') uses.push({ abilityId: a.id, name: a.name, level: p.level })
  }
  return uses.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, 'fr'))
}
