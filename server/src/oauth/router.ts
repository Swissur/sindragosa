import type express from 'express'
import {
  authorizationHandler,
  clientRegistrationHandler,
  metadataHandler,
  revocationHandler,
  tokenHandler,
} from '@modelcontextprotocol/server-legacy/auth'
import type { OAuthMetadata, OAuthProtectedResourceMetadata } from '@modelcontextprotocol/core/internal'
import apiRouter from './api.js'
import { clientsStore } from './clients.js'
import { mcpResource, publicUrl, SUPPORTED_SCOPES } from './config.js'
import { provider } from './provider.js'

/**
 * RFC 8414. On écrit les métadonnées à la main plutôt que d'utiliser
 * `mcpAuthRouter` : celui-ci impose les endpoints à la racine (`/authorize`…)
 * et annonce `client_secret_post`, alors qu'on veut `/oauth/*` et des clients
 * publics uniquement.
 */
function authorizationServerMetadata(): OAuthMetadata {
  const base = publicUrl()
  return {
    issuer: base,
    authorization_endpoint: `${base}/oauth/authorize`,
    token_endpoint: `${base}/oauth/token`,
    registration_endpoint: `${base}/oauth/register`,
    revocation_endpoint: `${base}/oauth/revoke`,
    response_types_supported: ['code'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    code_challenge_methods_supported: ['S256'],
    token_endpoint_auth_methods_supported: ['none'],
    revocation_endpoint_auth_methods_supported: ['none'],
    scopes_supported: [...SUPPORTED_SCOPES],
    authorization_response_iss_parameter_supported: true,
  }
}

/** RFC 9728. `resource` doit être exactement l'URL saisie dans le connecteur. */
function protectedResourceMetadata(): OAuthProtectedResourceMetadata {
  return {
    resource: mcpResource(),
    authorization_servers: [publicUrl()],
    scopes_supported: [...SUPPORTED_SCOPES],
    bearer_methods_supported: ['header'],
    resource_name: 'Isilwen — Arran DnD',
  }
}

/**
 * Monte le serveur d'autorisation OAuth 2.1.
 * À appeler après `cookieParser()` : `/oauth/authorize` lit le cookie de session.
 */
export function mountOAuth(app: express.Express): void {
  const asMetadata = authorizationServerMetadata()
  const prMetadata = protectedResourceMetadata()

  // Le chemin le plus spécifique d'abord : `/mcp` ne doit pas tomber sur le montage nu.
  app.use('/.well-known/oauth-protected-resource/mcp', metadataHandler(prMetadata))
  app.use('/.well-known/oauth-protected-resource', metadataHandler(prMetadata))
  app.use('/.well-known/oauth-authorization-server', metadataHandler(asMetadata))

  // Chaque handler pose lui-même son express.urlencoded() / express.json().
  app.use('/oauth/authorize', authorizationHandler({ provider, issuerUrl: new URL(publicUrl()) }))
  app.use('/oauth/token', tokenHandler({ provider }))
  app.use('/oauth/register', clientRegistrationHandler({ clientsStore }))
  app.use('/oauth/revoke', revocationHandler({ provider }))

  app.use('/api/oauth', apiRouter)
}
