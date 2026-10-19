/**
 * Transformations (plans/39) : prise depuis la carte de sa compétence, une forme donne
 * une arme naturelle qui remplace les armes équipées. Dégâts = 1 (naturelle) + bonus.
 * La Forme du Vide n'y est pas : c'est une forme de sorts, sans arme.
 */
import { RACE_ABILITY_ID } from './races'
import type { Ability } from './types'

export type FormId = 'ours' | 'felin' | 'avatar' | 'elementaire' | 'demon' | 'loup' | 'arbre' | 'worgen'

export interface Form {
  id: FormId
  label: string
  /** L'arme naturelle que donne la forme. */
  weapon: string
  damageBonus: number
  domainId: string
}

export const FORMS: Form[] = [
  { id: 'ours', label: "Forme d'ours", weapon: "Griffes d'ours", damageBonus: 2, domainId: 'melee-bourrine' },
  { id: 'felin', label: 'Forme de félin', weapon: 'Griffes de félin', damageBonus: 1, domainId: 'combat-precision' },
  { id: 'avatar', label: 'Avatar', weapon: 'Poings de pierre', damageBonus: 4, domainId: 'melee-bourrine' },
  { id: 'elementaire', label: 'Ascendance élémentaire', weapon: 'Frappe de vent', damageBonus: 2, domainId: 'communion-naturelle-chamanisme' },
  { id: 'demon', label: 'Métamorphose démoniaque', weapon: 'Décharge de Fél', damageBonus: 3, domainId: 'magie-ombre-fel' },
  { id: 'loup', label: 'Esprit du loup', weapon: 'Crocs de loup', damageBonus: 1, domainId: 'combat-precision' },
  { id: 'arbre', label: "Forme d'esprit végétal", weapon: 'Branches', damageBonus: 1, domainId: 'communion-naturelle-chamanisme' },
  { id: 'worgen', label: 'Forme sauvage', weapon: 'Griffes de worgen', damageBonus: 1, domainId: 'melee-bourrine' },
]

/** Id de la Forme de félin, compétence maison (absente du PDF). */
export const FELINE_FORM_ABILITY_ID = 1001

const ABILITY_FORMS: Record<number, FormId> = {
  42: 'ours',
  [FELINE_FORM_ABILITY_ID]: 'felin',
  140: 'avatar',
  170: 'elementaire',
  241: 'demon',
  77: 'loup',
  187: 'arbre',
}

export const formById = (id: string | null | undefined): Form | undefined => FORMS.find((f) => f.id === id)

export const isFormId = (id: unknown): id is FormId => FORMS.some((f) => f.id === id)

/** La forme que donne une compétence ; le pouvoir racial du Worgen en est une. */
export function formOfAbility(ability: Ability, raceId: string): Form | undefined {
  if (ability.id === RACE_ABILITY_ID) return raceId === 'worgen' ? formById('worgen') : undefined
  return formById(ABILITY_FORMS[ability.id])
}
