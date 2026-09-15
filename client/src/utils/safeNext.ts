/**
 * Valide un paramètre `?next=` avant de rediriger dessus.
 * On n'accepte qu'un chemin interne à l'app : commence par `/`, mais pas par
 * `//` (qui serait une URL protocole-relative vers un autre domaine) ni par
 * `/\` (que certains navigateurs normalisent en `//`).
 */
export function safeNext(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  if (!raw.startsWith('/')) return null
  if (raw.startsWith('//') || raw.startsWith('/\\')) return null
  return raw
}

/**
 * Clé sessionStorage où l'on range la destination avant de partir chez Google
 * (leur retour ne conserve aucun de nos paramètres d'URL).
 */
export const PENDING_NEXT_KEY = 'arran-login-next'
