import type { Ability } from '../data/sindragosa/types'
import { isAttack } from './sindragosa/abilityAttack'

/**
 * Concentration des sorts (plans/40-mana.md). Le joueur choisit un bonus :
 * - econome : coût en mana −⅓, arrondi en dessous, au moins 1 de moins, jamais sous 1 ;
 * - etendue : durée ou portée ×2 (choix du joueur à la table) ;
 * - puissante : +1d6 au jet de domaine — absente des sorts qui réussissent d'office.
 */
export type ConcentrationMode = 'aucune' | 'econome' | 'etendue' | 'puissante'

export const CONCENTRATION_LABELS: Record<ConcentrationMode, string> = {
  aucune: 'Sort normal',
  econome: 'Économe : coût en mana −⅓ (au moins 1)',
  etendue: 'Étendue : portée ou durée ×2',
  puissante: 'Puissante : +1d6 au jet',
}

/** Les modes de concentration permis pour cette compétence. Vide = pas de sélecteur. */
export function allowedModes(ability: Ability): ConcentrationMode[] {
  if (ability.actionType === 'passif' || ability.manaCost == null) return []
  return isAttack(ability) ? ['econome', 'etendue', 'puissante'] : ['econome', 'etendue']
}
