/**
 * Spécialités homonymes (décidé le 2026-10-18, même logique que les domaines
 * avancés) : débloquer une compétence qui porte le nom d'une spécialité exigée
 * ailleurs donne cette spécialité au niveau Apprenti.
 *
 * Elle est rattachée au domaine qui la cite en exemple, sinon au premier domaine
 * de base exigé par la compétence. Elle est accordée en plus de la limite
 * « autant de spécialités que le rang du domaine » : c'est une récompense.
 */
import { ABILITIES } from '../../data/sindragosa/abilities'
import { DOMAINS } from '../../data/sindragosa/domains'
import type { Ability } from '../../data/sindragosa/types'
import type { SpecialtyRow } from '../../types/character'
import { normalizeName, specialtyMatches } from './prerequisites'

/** Noms de spécialités exigés par au moins une compétence. */
const REQUIRED_SPECIALTIES = new Set(
  ABILITIES.flatMap((a) => a.prerequisites.flatMap((p) => (p.kind === 'specialty' ? [normalizeName(p.name)] : []))),
)

function homeDomain(name: string, ability: Ability): string | null {
  const example = DOMAINS.find((d) => d.specialties.some((s) => specialtyMatches(s, name)))
  if (example) return example.id
  const first = ability.prerequisites.find((p) => p.kind === 'domain')
  return first && first.kind === 'domain' ? first.id : null
}

/** Spécialités à ajouter à la fiche parce qu'une compétence homonyme vient d'être débloquée. */
export function specialtyGrants(
  specialties: SpecialtyRow[],
  unlocked: Ability[],
  newId: () => string = () => crypto.randomUUID(),
): SpecialtyRow[] {
  const owned = specialties.map((s) => s.name)
  const grants: SpecialtyRow[] = []
  for (const a of unlocked) {
    if (!REQUIRED_SPECIALTIES.has(normalizeName(a.name)) || owned.some((o) => specialtyMatches(o, a.name))) continue
    const domainId = homeDomain(a.name, a)
    if (!domainId) continue
    grants.push({ id: newId(), domainId, name: a.name, level: 1, ticks: 0 })
    owned.push(a.name)
  }
  return grants
}
