import type { DiceStyle } from './diceStyle'
import type { PoolDieSource } from '../utils/rollOutcome'

/**
 * Les couleurs fixes des dés d'un jet de compétence : on lit d'un coup d'œil
 * ce que la caractéristique, le domaine, la spécialité, la chance et l'avantage
 * ont apporté. Le style choisi dans les options ne s'y applique pas : il reste
 * pour les lancers libres demandés par le MJ.
 */
export const POOL_DICE_STYLES: Record<PoolDieSource, DiceStyle> = {
  stat: { bg: { type: 'gradient', from: '#b4bac2', to: '#5d646d', angle: 160 }, ink: '#14171b', font: null },
  domaine: { bg: { type: 'gradient', from: '#5aa9ec', to: '#173f8a', angle: 160 }, ink: null, font: null },
  specialite: { bg: { type: 'gradient', from: '#f7a64a', to: '#b8481a', angle: 160 }, ink: '#2a1206', font: null },
  chance: { bg: { type: 'gradient', from: '#8fde6a', to: '#1f6b30', angle: 160 }, ink: '#0d2410', font: null },
  avantage: { bg: { type: 'gradient', from: '#f6dc8f', to: '#a5741f', angle: 160 }, ink: '#241a0d', font: null },
}
