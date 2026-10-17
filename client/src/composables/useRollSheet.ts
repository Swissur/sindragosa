import { ref } from 'vue'
import type { RollContext } from './useRollHistory'
import type { WeaponRow } from '../types/character'

/**
 * La feuille de jet est unique pour toute l'app (montée dans `App.vue`) :
 * la fiche et « Mes actions » l'ouvrent avec un domaine déjà choisi.
 */
export interface RollRequest {
  domainId: string
  specialtyId?: string
  /** Titre du jet dans le journal ; par défaut le nom du domaine. */
  label?: string
  /** Attaque avec une arme : la feuille rappelle le calcul des dégâts. */
  weapon?: WeaponRow
  context: RollContext
}

export const rollRequest = ref<RollRequest | null>(null)

export function openRollSheet(request: RollRequest): void {
  rollRequest.value = request
}

export function closeRollSheet(): void {
  rollRequest.value = null
}
