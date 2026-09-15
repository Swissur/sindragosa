/**
 * URL publique du serveur, telle que le joueur la saisit dans son connecteur.
 * Elle sert d'`issuer` OAuth et de base pour l'`aud` des jetons : la moindre
 * différence d'orthographe (slash final, http vs https) casse le flow.
 */
export function publicUrl(): string {
  return (process.env.PUBLIC_URL || 'http://localhost:3566').replace(/\/+$/, '')
}

/** L'identifiant de ressource MCP (RFC 8707) : l'audience de tout jeton émis. */
export function mcpResource(): string {
  return `${publicUrl()}/mcp`
}

/** URL des métadonnées de ressource protégée, annoncée dans le 401 `WWW-Authenticate`. */
export function protectedResourceMetadataUrl(): string {
  return `${publicUrl()}/.well-known/oauth-protected-resource`
}

/** Phase 1 : lecture seule. L'écriture ajoutera un scope `write` (plan § 2.5). */
export const SUPPORTED_SCOPES = ['read'] as const
