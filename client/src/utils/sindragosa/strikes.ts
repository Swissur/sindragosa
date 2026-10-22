/**
 * Les attaques « Frapper » telles que la fiche les montre : une par arme de
 * `strikeWeapons`, avec son domaine et une ligne réserve + dégâts. Partagé par
 * la liste des compétences et les Favoris.
 */
import type { Character, ItemRow } from '../../types/character'
import { domainById } from '../../data/sindragosa/domains'
import { strikeWeapons, weaponDamage, weaponDomainId } from './equipment'
import { rollSetup } from './rollSetup'
import type { Pin } from './pins'

export interface Strike {
  weapon: ItemRow
  domainId: string
  /** « Mêlée bourrine · 4d6 · 3 dégâts » */
  detail: string
}

export const strikePin = (w: ItemRow): Pin => `weapon:${w.id}`

export function strikes(c: Character): Strike[] {
  return strikeWeapons(c).map((weapon) => {
    const domainId = weaponDomainId(weapon)
    const setup = rollSetup(c, { domainId, specialtyId: '', mode: 'normal', luck: 0 })
    return { weapon, domainId, detail: `${domainById(domainId)?.label} · ${setup?.count ?? 0}d6 · ${weaponDamage(weapon)} dégâts` }
  })
}
