/**
 * Prérequis des compétences : une compétence est débloquée dès que tous ses prérequis
 * sont réunis (plans/31 § 6).
 */
import { ABILITIES } from '../../data/sindragosa/abilities'
import type { Ability, Prerequisite } from '../../data/sindragosa/types'
import { SPECIALTY_ALIASES, advancedDomainById, domainById } from '../../data/sindragosa/domains'

/** Ce qu'il faut savoir d'un personnage pour évaluer des prérequis. */
export interface ProgressState {
  domainRanks: Record<string, number>
  advancedRanks: Record<string, number>
  specialties: { name: string; level: number }[]
  titles: string[]
}

/** Comparaison tolérante : casse, accents et espaces ignorés. */
export function normalizeName(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
}

/**
 * Variantes d'un nom de spécialité. Le PDF écrit les alternatives avec « / » ou
 * entre parenthèses (« Dagues/Lutte », « Tranchant (Haches/Épées) ») : chacune compte,
 * plus les équivalences de `SPECIALTY_ALIASES` (« Bouclier » = « Boucliers »).
 */
export function specialtyNameVariants(name: string): Set<string> {
  const parts = [name, ...name.replace(/[()]/g, '/').split('/')].map(normalizeName).filter(Boolean)
  const variants = new Set(parts)
  for (const group of ALIAS_GROUPS) {
    if (parts.some((p) => group.has(p))) group.forEach((n) => variants.add(n))
  }
  return variants
}

const ALIAS_GROUPS = SPECIALTY_ALIASES.map((g) => new Set(g.map(normalizeName)))

/** Nom affiché d'une spécialité : celui du catalogue (1er de son groupe d'alias), pour que MJ et joueur lisent le même. */
export function catalogSpecialtyName(name: string): string {
  const n = normalizeName(name)
  return SPECIALTY_ALIASES.find((g) => g.some((alias) => normalizeName(alias) === n))?.[0] ?? name
}

/** Une spécialité porte-t-elle le nom exigé (en tenant compte des variantes des deux côtés) ? */
export function specialtyMatches(owned: string, required: string): boolean {
  const accepted = specialtyNameVariants(required)
  return [...specialtyNameVariants(owned)].some((n) => accepted.has(n))
}

export function meetsPrerequisite(state: ProgressState, p: Prerequisite): boolean {
  switch (p.kind) {
    case 'domain':
      return (state.domainRanks[p.id] ?? 0) >= p.rank
    case 'advanced':
      return (state.advancedRanks[p.id] ?? 0) >= p.rank
    case 'specialty':
      return state.specialties.some((s) => s.level >= p.level && specialtyMatches(s.name, p.name))
    case 'title':
      return state.titles.some((t) => normalizeName(t) === normalizeName(p.name))
  }
}

export function meetsPrerequisites(state: ProgressState, ability: Ability): boolean {
  const meetsAll = (list: Prerequisite[]) => list.every((p) => meetsPrerequisite(state, p))
  return meetsAll(ability.prerequisites) || (!!ability.alternatePrerequisites && meetsAll(ability.alternatePrerequisites))
}

export function unlockedAbilities(state: ProgressState, catalog: Ability[] = ABILITIES): Ability[] {
  return catalog.filter((a) => meetsPrerequisites(state, a))
}

const LEVELS = ['', 'Apprenti', 'Expert', 'Maître']

/** Libellé d'un prérequis pour la carte de compétence : « Combat de précision 2 », « Dagues (Expert) ». */
export function prerequisiteLabel(p: Prerequisite): string {
  switch (p.kind) {
    case 'domain':
      return `${domainById(p.id)?.label ?? p.id} ${p.rank}`
    case 'advanced':
      return `${advancedDomainById(p.id)?.label ?? p.id} ${p.rank}`
    case 'specialty':
      return `${catalogSpecialtyName(p.name)} (${LEVELS[p.level] ?? p.level})`
    case 'title':
      return `Titre : ${p.name}`
  }
}
