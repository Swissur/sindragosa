import { DIFFICULTY_LABELS, type PoolResult } from './pool'
import type { RollSetup } from './rollSetup'

/** La formule du jet telle que l'affiche la feuille : « AGI 2 + rang 3 = 5d6 ». */
export function formulaText(setup: RollSetup): string {
  const terms = setup.parts
    .map((p, i) => `${i > 0 ? (p.value < 0 ? ' − ' : ' + ') : ''}${p.label} ${Math.abs(p.value)}`)
    .join('')
  return `${terms} = ${setup.count}d6`
}

/**
 * Jet secret : le joueur ne voit pas le résultat, le MJ le reçoit dans
 * l'« Échange avec le MJ », avec d'où vient le jet et ce qu'il donne.
 */
export function secretRollMessage(characterName: string, label: string, setup: RollSetup, result: PoolResult): string {
  const lines = [
    `🎲 Jet secret de ${characterName} : ${label}`,
    formulaText(setup),
    `Dés : ${result.dice.join(' · ')}${result.rerolledFrom !== null ? ` (un ${result.rerolledFrom} relancé, spécialité)` : ''}`,
    `→ ${result.successes} succès · ${DIFFICULTY_LABELS[result.reached]}`,
  ]
  if (result.isCriticalSuccess) lines.push('Réussite critique')
  if (result.isCriticalFailure) lines.push('Échec critique')
  return lines.join('\n')
}
