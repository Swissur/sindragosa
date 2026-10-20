import { showToast } from './useToast'
import { applyTick, type TickTarget } from '../utils/sindragosa/sheet'
import type { Character } from '../types/character'

/** Mode MJ : une coche en récompense (hors limite de séance), posée sur la fiche affichée. */
export function rewardTick(character: Character, target: TickTarget): void {
  const out = applyTick(character, target, 'reward')
  if (!out.ok) { showToast('Déjà au maximum.'); return }
  Object.assign(character, out.character)
  showToast(out.rankedUp ? `🎁 Coche ajoutée : nouveau rang ${out.newRank} !` : '🎁 Coche ajoutée.')
}
