import { ref } from 'vue'
import type { RollContext } from './useRollHistory'
import type { ItemRow } from '../types/character'
import type { Recipe } from '../data/sindragosa/types'

/**
 * La feuille de jet est unique pour toute l'app (montée dans `App.vue`) :
 * la fiche et « Mes actions » l'ouvrent avec un domaine déjà choisi.
 */
export interface RollRequest {
  domainId: string
  specialtyId?: string
  /** Titre du jet dans le journal ; par défaut le nom du domaine. */
  label?: string
  /** Attaque avec une arme équipée : la feuille rappelle le calcul des dégâts. */
  weapon?: ItemRow
  /** Fabrication : un jet réussi met l'objet du patron dans l'inventaire. */
  recipe?: Recipe
  context: RollContext
}

export const rollRequest = ref<RollRequest | null>(null)

export function openRollSheet(request: RollRequest): void {
  rollRequest.value = request
}

export function closeRollSheet(): void {
  rollRequest.value = null
}
