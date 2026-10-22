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

export interface IncomingSharedImage {
  imageId: number
  caption: string
  sharedAt: string
}

/** Image que le MJ vient de montrer : elle s'ouvre en grand chez tout le monde. */
export const incomingSharedImage = ref<IncomingSharedImage | null>(null)

/** S'incrémente quand le MJ révèle ou recache une fiche : l'onglet Fiches se recharge. */
export const codexRevealTick = ref(0)

export function resetCampaignLive(): void {
  onlineUserIds.value = null
  liveSessionActive.value = null
  liveCodexBoard.value = null
}
