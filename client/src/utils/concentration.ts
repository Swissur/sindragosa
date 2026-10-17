import type { Ability } from '../data/sindragosa/types'

/**
 * Concentration des sorts, héritée d'Arran (plans/31 § 6) : gardée, mais
 * À ADAPTER au système d6 (voir ROADMAP). Le joueur choisit un bonus :
 * - econome : sans PM dans Sindragosa, son effet reste à définir ;
 * - etendue : durée ou portée ×2 (choix du joueur à la table) ;
 * - puissante : chaque dé de l'effet monte d'une catégorie (d4 → d6 → … → d12).
 */
export type ConcentrationMode = 'aucune' | 'econome' | 'etendue' | 'puissante'

export const CONCENTRATION_MODES: ConcentrationMode[] = ['econome', 'etendue', 'puissante']

export const CONCENTRATION_LABELS: Record<ConcentrationMode, string> = {
  aucune: 'Sort normal',
  econome: 'Économe : à adapter (plus de PM)',
  etendue: 'Étendue : portée ou durée ×2',
  puissante: 'Puissante : dés +1 catégorie',
}

/** d4 → d6 → d8 → d10 → d12. Le d12 plafonne, le d20 n'est jamais touché. */
export function upgradeDie(sides: number): number {
  if (sides >= 12) return sides
  if (sides < 4) return sides
  return sides + 2
}

/** Monte tous les dés d4..d10 d'un texte : "+2d6 aux dégâts" → "+2d8 aux dégâts". */
export function upgradeDiceInText(text: string): string {
  return text.replace(/(\d*)d(4|6|8|10)\b/gi, (_m, count: string, sides: string) => {
    return `${count}d${upgradeDie(parseInt(sides, 10))}`
  })
}

/** Les voies de magie : arcanes, divin, ombre et fél. */
const MAGIC_CATEGORY = /arcaniques|divines|ombre/i

/** Les modes de concentration permis pour cette compétence. Vide = pas de sélecteur. */
export function allowedModes(ability: Pick<Ability, 'category' | 'actionType'>): ConcentrationMode[] {
  if (ability.actionType === 'passif') return []
  return MAGIC_CATEGORY.test(ability.category) ? [...CONCENTRATION_MODES] : []
}
