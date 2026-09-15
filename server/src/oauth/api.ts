import { and, desc, eq, isNull } from 'drizzle-orm'
import express, { Router } from 'express'
import { db } from '../db/index.js'
import { oauthClients, oauthCodes, oauthTokens } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'
import { publicUrl } from './config.js'
import { approveAuthorizationRequest } from './provider.js'
import { isExpired } from './tokens.js'

/**
 * Les routes que consomme la SPA : écran de consentement `/autoriser` et
 * gestion des connexions dans `/options`. Toutes sous le cookie de session.
 */
const router = Router()
router.use(express.json())
router.use(requireAuth)

/** La demande en attente : ce qu'on affiche sur l'écran de consentement. */
router.get('/request/:id', async (req, res) => {
  const [row] = await db
    .select({
      codeHash: oauthCodes.codeHash,
      usedAt: oauthCodes.usedAt,
      expiresAt: oauthCodes.expiresAt,
      scopes: oauthCodes.scopes,
      clientName: oauthClients.clientName,
      clientId: oauthClients.clientId,
    })
    .from(oauthCodes)
    .innerJoin(oauthClients, eq(oauthClients.clientId, oauthCodes.clientId))
    .where(eq(oauthCodes.id, req.params.id))

  if (!row || row.codeHash || row.usedAt || isExpired(row.expiresAt)) {
    res.status(404).json({ error: 'Demande inconnue ou expirée' })
    return
  }
  res.json({ clientName: row.clientName || row.clientId, scopes: row.scopes })
})

/** Le clic « Autoriser » / « Refuser ». Rend l'URL de retour vers le connecteur. */
router.post('/decision', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const { requestId, approved } = req.body as { requestId?: string; approved?: boolean }
  if (typeof requestId !== 'string' || typeof approved !== 'boolean') {
    res.status(400).json({ error: 'requestId et approved requis' })
    return
  }

  const [row] = await db.select().from(oauthCodes).where(eq(oauthCodes.id, requestId))
  if (!row || row.codeHash || row.usedAt || isExpired(row.expiresAt)) {
    res.status(404).json({ error: 'Demande inconnue ou expirée' })
    return
  }

  const target = new URL(row.redirectUri)
  if (row.state) target.searchParams.set('state', row.state)
  // RFC 9207 : le redirect final part d'ici, pas du handler /oauth/authorize.
  target.searchParams.set('iss', publicUrl())

  if (!approved) {
    await db.update(oauthCodes).set({ usedAt: new Date() }).where(eq(oauthCodes.id, requestId))
    target.searchParams.set('error', 'access_denied')
    res.json({ redirectTo: target.href })
    return
  }

  const code = await approveAuthorizationRequest(requestId, userId)
  target.searchParams.set('code', code)
  res.json({ redirectTo: target.href })
})

/** Les connecteurs actuellement branchés sur mon compte. */
router.get('/connections', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const rows = await db
    .select({
      id: oauthTokens.id,
      clientName: oauthTokens.clientName,
      createdAt: oauthTokens.createdAt,
      lastUsedAt: oauthTokens.lastUsedAt,
    })
    .from(oauthTokens)
    .where(and(eq(oauthTokens.userId, userId), isNull(oauthTokens.revokedAt)))
    .orderBy(desc(oauthTokens.createdAt))
  res.json(rows)
})

/** Couper un connecteur. */
router.delete('/connections/:id', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Id invalide' })
    return
  }
  const [row] = await db
    .update(oauthTokens)
    .set({ revokedAt: new Date() })
    .where(and(eq(oauthTokens.id, id), eq(oauthTokens.userId, userId), isNull(oauthTokens.revokedAt)))
    .returning({ id: oauthTokens.id })
  if (!row) {
    res.status(404).json({ error: 'Connexion inconnue' })
    return
  }
  res.json({ ok: true })
})

export default router
