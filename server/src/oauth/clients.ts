import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { CustomOAuthError, type OAuthRegisteredClientsStore } from '@modelcontextprotocol/server-legacy/auth'
import type { OAuthClientInformationFull } from '@modelcontextprotocol/core/internal'
import { db } from '../db/index.js'
import { oauthClients } from '../db/schema.js'
import { SUPPORTED_SCOPES } from './config.js'

/** Les seules URLs de callback non-loopback acceptées. */
const EXACT_REDIRECT_URIS = new Set([
  'https://claude.ai/api/mcp/auth_callback',
  'https://chatgpt.com/connector_platform_oauth_redirect',
])

const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1'])

/**
 * Liste blanche des redirect URIs (plan § 2.3). L'enregistrement de clients est
 * ouvert (DCR) : c'est elle qui empêche un inconnu de détourner le code d'un joueur.
 * Loopback = n'importe quel port (RFC 8252 § 7.3 : Claude Code prend un port libre).
 */
export function isAllowedRedirectUri(uri: string): boolean {
  if (EXACT_REDIRECT_URIS.has(uri)) return true
  let url: URL
  try {
    url = new URL(uri)
  } catch {
    return false
  }
  if (url.protocol !== 'http:') return false
  if (!LOOPBACK_HOSTS.has(url.hostname)) return false
  if (url.pathname !== '/callback') return false
  if (url.search || url.hash || url.username || url.password) return false
  return true
}

function toClientInfo(row: typeof oauthClients.$inferSelect): OAuthClientInformationFull {
  return {
    client_id: row.clientId,
    client_name: row.clientName,
    redirect_uris: row.redirectUris,
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    token_endpoint_auth_method: 'none',
    scope: SUPPORTED_SCOPES.join(' '),
  }
}

export const clientsStore: OAuthRegisteredClientsStore = {
  async getClient(clientId: string): Promise<OAuthClientInformationFull | undefined> {
    const [row] = await db.select().from(oauthClients).where(eq(oauthClients.clientId, clientId))
    return row ? toClientInfo(row) : undefined
  },

  async registerClient(client): Promise<OAuthClientInformationFull> {
    const redirectUris = client.redirect_uris ?? []
    if (redirectUris.length === 0) {
      throw new CustomOAuthError('invalid_redirect_uri', 'Au moins une redirect_uri est requise')
    }
    for (const uri of redirectUris) {
      if (!isAllowedRedirectUri(uri)) {
        throw new CustomOAuthError('invalid_redirect_uri', `redirect_uri non autorisée : ${uri}`)
      }
    }
    // Client public uniquement : on n'émet ni ne stocke de client_secret.
    // `clientRegistrationHandler` génère déjà le client_id, absent du type d'entrée.
    const clientId = (client as { client_id?: string }).client_id ?? randomUUID()
    const [row] = await db
      .insert(oauthClients)
      .values({
        clientId,
        clientName: client.client_name ?? '',
        redirectUris,
      })
      .returning()
    return toClientInfo(row)
  },
}
