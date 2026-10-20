import type { GmCharacterPatch } from '../../api/campaigns'
import type { Character } from '../../types/character'
import { computeMaxHp } from './sheet'
import { maxMana } from './mana'

/** Ce que le MJ règle sur la fiche d'un joueur, prêt à envoyer. PV et mana max suivent caracs et rangs. */
export function gmPatch(c: Character): GmCharacterPatch {
  return {
    ...c.stats,
    domains: c.domains,
    specialties: c.specialties,
    advancedDomains: c.advancedDomains,
    titles: c.titles,
    recipeGrants: c.recipeGrants,
    hpMax: computeMaxHp(c),
    manaMax: maxMana(c),
  }
}
