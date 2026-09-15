import { randomUUID } from 'node:crypto'
import { and, eq, isNull, or } from 'drizzle-orm'
import type { Response } from 'express'
import {
  CustomOAuthError,
  InvalidGrantError,
  InvalidRequestError,
  InvalidScopeError,
  InvalidTargetError,
  InvalidTokenError,
  ServerError,
  type AuthInfo,
  type AuthorizationParams,
  type OAuthServerProvider,
} from '@modelcontextprotocol/server-legacy/auth'
import type { OAuthClientInformationFull, OAuthTokens } from '@modelcontextprotocol/core/internal'
import { db } from '../db/index.js'
import { oauthCodes, oauthTokens } from '../db/schema.js'
import { verifyToken } from '../auth/jwt.js'
import { clientsStore, isAllowedRedirectUri } from './clients.js'
import { mcpResource, SUPPORTED_SCOPES } from './config.js'
import { hashSecret, randomSecret } from './pkce.js'
import {
  ACCESS_TTL_SECONDS,
  CODE_TTL_SECONDS,
  REFRESH_TTL_SECONDS,
  expiresAt,
  isExpired,
  secondsUntil,
  toEpochSeconds,
} from './tokens.js'

/** Un `resource` vaut le nôtre à un slash final près. */
function sameResource(requested: URL): boolean {
  return requested.href.replace(/\/+$/, '') === mcpResource()
}

/** Garde les scopes demandés s'ils sont tous connus, sinon refuse. Défaut : `read`. */
export function normalizeScopes(requested: string[] | undefined): string[] {
  if (!requested || requested.length === 0) return ['read']
  for (const scope of requested) {
    if (!(SUPPORTED_SCOPES as readonly string[]).includes(scope)) {
      throw new InvalidScopeError(`Scope inconnu : ${scope}`)
    }
  }
  return [...new Set(requested)]
}

/** Le joueur derrière le cookie de session, ou null s'il n'est pas connecté. */
function currentUserId(res: Response): number | null {
  const token = (res.req as { cookies?: { token?: string } } | undefined)?.cookies?.token
  if (!token) return null
  try {
    return verifyToken(token).sub
  } catch {
    return null
  }
}

/** Émet un couple access/refresh et le stocke (hashs seuls). */
async function issueTokens(params: {
  userId: number
  clientId: string
  clientName: string
  scopes: string[]
}): Promise<OAuthTokens> {
  const accessToken = randomSecret()
  const refreshToken = randomSecret()
  const accessExpiresAt = expiresAt(ACCESS_TTL_SECONDS)

  await db.insert(oauthTokens).values({
    userId: params.userId,
    clientId: params.clientId,
    clientName: params.clientName,
    accessHash: hashSecret(accessToken),
    refreshHash: hashSecret(refreshToken),
    scopes: params.scopes,
    resource: mcpResource(),
    accessExpiresAt,
    refreshExpiresAt: expiresAt(REFRESH_TTL_SECONDS),
  })

  return {
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: secondsUntil(accessExpiresAt),
    refresh_token: refreshToken,
    scope: params.scopes.join(' '),
  }
}

/**
 * Crée la demande d'autorisation et rend l'id à passer à la SPA.
 * Le code n'est émis qu'au consentement (voir `api.ts`).
 */
async function createAuthorizationRequest(
  client: OAuthClientInformationFull,
  params: AuthorizationParams,
): Promise<string> {
  if (!isAllowedRedirectUri(params.redirectUri)) {
    throw new CustomOAuthError('invalid_redirect_uri', 'redirect_uri non autorisée')
  }
  if (!params.codeChallenge) {
    throw new InvalidRequestError('code_challenge requis (PKCE S256)')
  }
  if (params.resource && !sameResource(params.resource)) {
    throw new InvalidTargetError(`resource inconnue : ${params.resource.href}`)
  }
  const requestId = randomUUID()
  await db.insert(oauthCodes).values({
    id: requestId,
    clientId: client.client_id,
    codeChallenge: params.codeChallenge,
    redirectUri: params.redirectUri,
    resource: params.resource ? params.resource.href : mcpResource(),
    scopes: normalizeScopes(params.scopes),
    state: params.state ?? null,
    expiresAt: expiresAt(CODE_TTL_SECONDS),
  })
  return requestId
}

export const provider: OAuthServerProvider = {
  get clientsStore() {
    return clientsStore
  },

  /**
   * Stocke la demande puis envoie le navigateur sur l'écran de consentement de la SPA.
   * Sans session valide, on passe d'abord par le login qui y revient via `?next=`.
   */
  async authorize(client, params, res): Promise<void> {
    const requestId = await createAuthorizationRequest(client, params)
    const consentPath = `/autoriser?request=${encodeURIComponent(requestId)}`
    // En dev la SPA est sur Vite, pas sur l'API : même règle que le retour Google.
    const spa = process.env.CLIENT_URL ?? ''
    const userId = currentUserId(res)
    if (userId === null) {
      res.redirect(302, `${spa}/login?next=${encodeURIComponent(consentPath)}`)
      return
    }
    res.redirect(302, `${spa}${consentPath}`)
  },

  async challengeForAuthorizationCode(client, authorizationCode): Promise<string> {
    const [row] = await db
      .select()
      .from(oauthCodes)
      .where(eq(oauthCodes.codeHash, hashSecret(authorizationCode)))
    if (!row || row.clientId !== client.client_id) throw new InvalidGrantError('Code inconnu')
    if (row.usedAt) throw new InvalidGrantError('Code déjà utilisé')
    if (isExpired(row.expiresAt)) throw new InvalidGrantError('Code expiré')
    return row.codeChallenge
  },

  /** PKCE déjà vérifié par le `tokenHandler` via `challengeForAuthorizationCode`. */
  async exchangeAuthorizationCode(client, authorizationCode, _codeVerifier, redirectUri, resource): Promise<OAuthTokens> {
    // Consommation atomique : deux échanges concurrents, un seul gagne.
    const [row] = await db
      .update(oauthCodes)
      .set({ usedAt: new Date() })
      .where(and(eq(oauthCodes.codeHash, hashSecret(authorizationCode)), isNull(oauthCodes.usedAt)))
      .returning()
    if (!row) throw new InvalidGrantError('Code inconnu ou déjà utilisé')
    if (row.clientId !== client.client_id) throw new InvalidGrantError('Code émis pour un autre client')
    if (isExpired(row.expiresAt)) throw new InvalidGrantError('Code expiré')
    if (row.userId === null) throw new InvalidGrantError('Demande jamais autorisée')
    if (redirectUri !== undefined && redirectUri !== row.redirectUri) {
      throw new InvalidGrantError('redirect_uri différente de celle de la demande')
    }
    if (resource && !sameResource(resource)) {
      throw new InvalidTargetError(`resource inconnue : ${resource.href}`)
    }
    return issueTokens({
      userId: row.userId,
      clientId: row.clientId,
      clientName: client.client_name ?? '',
      scopes: row.scopes,
    })
  },

  /** Rotation : le refresh présenté est révoqué, un nouveau couple est émis. */
  async exchangeRefreshToken(client, refreshToken, scopes, resource): Promise<OAuthTokens> {
    const [row] = await db
      .select()
      .from(oauthTokens)
      .where(eq(oauthTokens.refreshHash, hashSecret(refreshToken)))
    if (!row || row.clientId !== client.client_id) throw new InvalidGrantError('Refresh token inconnu')
    if (row.revokedAt) throw new InvalidGrantError('Refresh token révoqué')
    if (isExpired(row.refreshExpiresAt)) throw new InvalidGrantError('Refresh token expiré')
    if (resource && !sameResource(resource)) {
      throw new InvalidTargetError(`resource inconnue : ${resource.href}`)
    }

    let nextScopes = row.scopes
    if (scopes && scopes.length > 0) {
      for (const scope of scopes) {
        if (!row.scopes.includes(scope)) throw new InvalidScopeError(`Scope non accordé : ${scope}`)
      }
      nextScopes = scopes
    }

    const [revoked] = await db
      .update(oauthTokens)
      .set({ revokedAt: new Date() })
      .where(and(eq(oauthTokens.id, row.id), isNull(oauthTokens.revokedAt)))
      .returning()
    if (!revoked) throw new InvalidGrantError('Refresh token déjà utilisé')

    return issueTokens({
      userId: row.userId,
      clientId: row.clientId,
      clientName: row.clientName,
      scopes: nextScopes,
    })
  },

  async verifyAccessToken(token): Promise<AuthInfo> {
    const [row] = await db
      .select()
      .from(oauthTokens)
      .where(eq(oauthTokens.accessHash, hashSecret(token)))
    if (!row) throw new InvalidTokenError('Jeton inconnu')
    if (row.revokedAt) throw new InvalidTokenError('Jeton révoqué')
    if (isExpired(row.accessExpiresAt)) throw new InvalidTokenError('Jeton expiré')
    if (row.resource !== mcpResource()) throw new InvalidTokenError('Jeton émis pour une autre ressource')
    return {
      token,
      clientId: row.clientId,
      scopes: row.scopes,
      expiresAt: toEpochSeconds(row.accessExpiresAt),
      resource: new URL(row.resource),
      extra: { userId: row.userId, tokenId: row.id },
    }
  },

  async revokeToken(client, request): Promise<void> {
    const hash = hashSecret(request.token)
    await db
      .update(oauthTokens)
      .set({ revokedAt: new Date() })
      .where(
        and(
          eq(oauthTokens.clientId, client.client_id),
          isNull(oauthTokens.revokedAt),
          or(eq(oauthTokens.accessHash, hash), eq(oauthTokens.refreshHash, hash)),
        ),
      )
  },
}

/**
 * Le joueur a cliqué « Autoriser » : on rattache la demande à son compte et on
 * émet le code. Retourne le code en clair, à passer une seule fois au client.
 */
export async function approveAuthorizationRequest(requestId: string, userId: number): Promise<string> {
  const code = randomSecret()
  const [row] = await db
    .update(oauthCodes)
    .set({ userId, codeHash: hashSecret(code) })
    .where(and(eq(oauthCodes.id, requestId), isNull(oauthCodes.codeHash), isNull(oauthCodes.usedAt)))
    .returning()
  if (!row) throw new ServerError('Demande d\'autorisation introuvable ou déjà traitée')
  return code
}

/** Dernier usage d'un jeton, pour la liste des connexions dans `/options`. */
export async function markTokenUsed(tokenId: number): Promise<void> {
  await db.update(oauthTokens).set({ lastUsedAt: new Date() }).where(eq(oauthTokens.id, tokenId))
}
