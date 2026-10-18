import { ref } from 'vue'

/**
 * Ce que le flux SSE de la campagne active pousse en direct à l'écran MJ et
 * aux joueurs : qui est connecté, si une session est en cours, et le dernier
 * message du MJ (affiché au milieu de l'écran du joueur).
 */

/** Joueurs connectés à la campagne active. `null` = rien reçu depuis l'ouverture du flux. */
export const onlineUserIds = ref<number[] | null>(null)

/** Session en cours dans la campagne active. `null` = rien reçu, se fier au GET. */
export const liveSessionActive = ref<boolean | null>(null)

export interface IncomingGmMessage {
  id: number
  body: string
  createdAt: string
}

/** Message du MJ en attente de lecture. */
export const incomingGmMessage = ref<IncomingGmMessage | null>(null)

export function resetCampaignLive(): void {
  onlineUserIds.value = null
  liveSessionActive.value = null
}
