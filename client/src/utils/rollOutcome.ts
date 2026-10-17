/**
 * Réussite / échec critique — la règle, écrite une seule fois.
 *
 * Elle sert à trois endroits qui doivent dire la même chose : le dé 3D, le log
 * de campagne et l'historique local. Tant qu'elle vivait en double, rien
 * n'empêchait le dé de pétiller sur un jet que le log affichait en gris.
 */

export type RollOutcome = 'critical' | 'fumble' | null

/** Ce qu'un jet en réserve de d6 garde en plus de ses dés (succès = `total`). */
export interface RollPool {
  /** Face à partir de laquelle un dé est critique : 6, ou 5 avec une spécialité Maître. */
  critFrom: 5 | 6
  reached: 'echec' | 'facile' | 'moyenne' | 'difficile' | 'exploit'
  critFail: boolean
}

/**
 * Le minimum pour noter un jet. Satisfait aussi bien par les jets locaux
 * (`RollEntry`) que par ceux de la campagne (`RollEvent`), dont les types
 * diffèrent sur le reste.
 */
export interface GradableRoll {
  kind: string
  /** Face du dé principal. Vaut 0 pour un lancer multiple du bac à sable. */
  die: number
  sides: number
  damage?: { critical: boolean; fumble: boolean } | null
  pool?: RollPool | null
}

/**
 * Ce dé peut-il faire un critique ?
 *
 * - **d20 : toujours**, bac à sable compris. C'est le dé du jeu ; un 20 veut
 *   dire quelque chose même lancé pour le plaisir.
 * - **d12 : seulement en jet d'attaque**, quand il remplace le d20 parce que le
 *   personnage est affaibli. Un d12 de dégâts ou lancé librement ne compte pas.
 * - **tout le reste : jamais.** Un max sur un d6 arrive une fois sur six, ce
 *   n'est pas un exploit.
 */
export function isGradedDie(sides: number, kind: string): boolean {
  return sides === 20 || (sides === 12 && kind !== 'libre')
}

export function rollOutcome(roll: GradableRoll): RollOutcome {
  // Un drapeau explicite l'emporte : une arme peut déclarer son critique
  if (roll.damage?.critical) return 'critical'
  if (roll.damage?.fumble) return 'fumble'

  // Réserve de d6 : la table vibre sur un exploit (4 succès ou plus) ou un échec critique
  if (roll.pool) {
    if (roll.pool.critFail) return 'fumble'
    return roll.pool.reached === 'exploit' ? 'critical' : null
  }

  if (!isGradedDie(roll.sides, roll.kind)) return null
  if (roll.die === roll.sides) return 'critical'
  if (roll.die === 1) return 'fumble'
  return null
}
