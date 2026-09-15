import type { RequestHandler } from 'express'
import { requireBearerAuth } from '@modelcontextprotocol/server-legacy/auth'
import { protectedResourceMetadataUrl } from './config.js'
import { markTokenUsed, provider } from './provider.js'

/** On n'écrit `last_used_at` qu'une fois par minute et par jeton. */
const TOUCH_INTERVAL_MS = 60_000
const lastTouch = new Map<number, number>()

let bearer: RequestHandler | null = null

function bearerMiddleware(): RequestHandler {
  // Construit au premier appel : `PUBLIC_URL` n'est lue qu'après le chargement du .env.
  bearer ??= requireBearerAuth({
    verifier: provider,
    resourceMetadataUrl: protectedResourceMetadataUrl(),
  })
  return bearer
}

function touch(tokenId: unknown): void {
  if (typeof tokenId !== 'number') return
  const now = Date.now()
  const previous = lastTouch.get(tokenId)
  if (previous !== undefined && now - previous < TOUCH_INTERVAL_MS) return
  lastTouch.set(tokenId, now)
  markTokenUsed(tokenId).catch((err) => console.error('[oauth] last_used_at:', err))
}

/**
 * Protège `/mcp` : jeton Bearer valide obligatoire, dont l'`aud` doit être
 * `<PUBLIC_URL>/mcp`. Sans jeton, 401 + `WWW-Authenticate` avec l'URL des
 * métadonnées — c'est ce 401 qui déclenche le flow OAuth côté connecteur.
 * Avec un jeton valide, pose `req.auth` (`extra.userId` = le joueur).
 */
export const requireMcpAuth: RequestHandler = (req, res, next) => {
  bearerMiddleware()(req, res, (err?: unknown) => {
    if (err) {
      next(err as Error)
      return
    }
    touch(req.auth?.extra?.tokenId)
    next()
  })
}
