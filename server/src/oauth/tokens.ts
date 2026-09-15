/** Durées de vie, en secondes. Plan § 2.3. */
export const CODE_TTL_SECONDS = 10 * 60
export const ACCESS_TTL_SECONDS = 60 * 60
export const REFRESH_TTL_SECONDS = 90 * 24 * 60 * 60

/** Date d'expiration à partir d'un instant de référence. */
export function expiresAt(ttlSeconds: number, now: Date = new Date()): Date {
  return new Date(now.getTime() + ttlSeconds * 1000)
}

/** Secondes depuis l'epoch — le format attendu par `AuthInfo.expiresAt`. */
export function toEpochSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000)
}

/** Secondes restantes avant expiration, jamais négatif (`expires_in` de la réponse token). */
export function secondsUntil(date: Date, now: Date = new Date()): number {
  return Math.max(0, Math.floor((date.getTime() - now.getTime()) / 1000))
}

export function isExpired(date: Date, now: Date = new Date()): boolean {
  return date.getTime() <= now.getTime()
}
