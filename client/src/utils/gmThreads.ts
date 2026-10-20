import type { GmMessage } from '../api/campaigns'

/** Le tête-à-tête entre le MJ et un joueur, du plus ancien au plus récent. */
export function threadWith(messages: GmMessage[], playerId: number): GmMessage[] {
  return messages.filter((m) => m.toUserId === playerId || m.fromUserId === playerId)
}

/** Un message de ce joueur attend que le MJ (`gmId`) le lise. */
export function hasUnreadFrom(messages: GmMessage[], playerId: number, gmId: number): boolean {
  return messages.some((m) => m.fromUserId === playerId && m.toUserId === gmId && m.readAt === null)
}

/** Dernier message échangé avec un joueur, pour l'aperçu de la liste du MJ. */
export function lastMessageWith(messages: GmMessage[], playerId: number): GmMessage | null {
  return threadWith(messages, playerId).at(-1) ?? null
}
