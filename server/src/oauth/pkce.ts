import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'

/** sha256 en base64url, la transformation S256 de PKCE (RFC 7636 § 4.2). */
export function s256(verifier: string): string {
  return createHash('sha256').update(verifier).digest('base64url')
}

/**
 * Vérifie un `code_verifier` contre le `code_challenge` stocké.
 * S256 uniquement : `plain` n'est pas accepté.
 */
export function verifyPkceS256(verifier: string, challenge: string): boolean {
  if (!verifier || !challenge) return false
  const expected = Buffer.from(s256(verifier))
  const given = Buffer.from(challenge)
  if (expected.length !== given.length) return false
  return timingSafeEqual(expected, given)
}

/** Empreinte stockée en base pour un code ou un jeton. On ne garde jamais la valeur brute. */
export function hashSecret(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/** Un secret opaque, 32 octets aléatoires en base64url. */
export function randomSecret(): string {
  return randomBytes(32).toString('base64url')
}
