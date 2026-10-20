import { ref } from 'vue'
import type { Board } from '../api/codexBoard'

/**
 * Ce que le flux SSE de la campagne active pousse en direct à l'écran MJ et
 * aux joueurs : qui est connecté, si une session est en cours, et le dernier
 * message de l'échange MJ ↔ joueur (affiché au milieu de l'écran du destinataire).
 */

/** Joueurs connectés à la campagne active. `null` = rien reçu depuis l'ouverture du flux. */
export const onlineUserIds = ref<number[] | null>(null)

/** Session en cours dans la campagne active. `null` = rien reçu, se fier au GET. */
export const liveSessionActive = ref<boolean | null>(null)

export interface IncomingGmMessage {
  id: number
  body: string
  createdAt: string
  /** `false` : un joueur écrit au MJ. */
  fromGm: boolean
  fromUserId: number
  fromUsername: string
}

/** Message reçu (du MJ, ou d'un joueur pour le MJ) en attente de lecture. */
export const incomingGmMessage = ref<IncomingGmMessage | null>(null)

/** Dernier état du tableau des fiches poussé par le serveur (un joueur l'a modifié). */
export const liveCodexBoard = ref<Board | null>(null)

export function resetCampaignLive(): void {
  onlineUserIds.value = null
  liveSessionActive.value = null
  liveCodexBoard.value = null
}
