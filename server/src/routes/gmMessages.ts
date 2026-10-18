import { and, asc, eq } from 'drizzle-orm'
import { Router } from 'express'
import { db } from '../db/index.js'
import { campaignMembers, campaigns, gmMessages, users } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'
import { sendToUser } from '../campaigns/sseStore.js'

/**
 * « Échange avec le MJ » : le MJ écrit à un joueur, le message s'ouvre au milieu
 * de son écran et reste dans son journal.
 */
const router = Router()
router.use(requireAuth)

async function campaignGm(campaignId: number): Promise<number | null> {
  const [row] = await db.select({ gmUserId: campaigns.gmUserId }).from(campaigns).where(eq(campaigns.id, campaignId))
  return row?.gmUserId ?? null
}

async function isMember(campaignId: number, userId: number): Promise<boolean> {
  const [row] = await db
    .select({ id: campaignMembers.id })
    .from(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, userId)))
  return !!row
}

// GET /api/campaigns/:id/messages — le MJ voit tout ce qu'il a envoyé, le joueur ses messages
router.get('/:id/messages', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const gmUserId = await campaignGm(campaignId)
  if (gmUserId === null) { res.status(404).json({ error: 'Campagne introuvable' }); return }
  const isGm = gmUserId === userId
  if (!isGm && !(await isMember(campaignId, userId))) { res.status(403).json({ error: 'Non membre' }); return }

  const rows = await db
    .select({
      id: gmMessages.id,
      toUserId: gmMessages.toUserId,
      toUsername: users.username,
      body: gmMessages.body,
      createdAt: gmMessages.createdAt,
    })
    .from(gmMessages)
    .innerJoin(users, eq(users.id, gmMessages.toUserId))
    .where(isGm
      ? eq(gmMessages.campaignId, campaignId)
      : and(eq(gmMessages.campaignId, campaignId), eq(gmMessages.toUserId, userId)))
    .orderBy(asc(gmMessages.createdAt), asc(gmMessages.id))

  res.json(rows)
})

// POST /api/campaigns/:id/messages — le MJ écrit à un joueur (MJ only)
router.post('/:id/messages', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const gmUserId = await campaignGm(campaignId)
  if (gmUserId === null) { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (gmUserId !== userId) { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const { toUserId, body } = req.body as { toUserId?: unknown; body?: unknown }
  if (typeof body !== 'string' || !body.trim()) { res.status(400).json({ error: 'Message vide' }); return }
  if (typeof toUserId !== 'number' || !(await isMember(campaignId, toUserId))) {
    res.status(400).json({ error: 'Joueur introuvable dans la campagne' })
    return
  }

  const [row] = await db
    .insert(gmMessages)
    .values({ campaignId, toUserId, fromUserId: userId, body: body.trim().slice(0, 2000) })
    .returning()

  sendToUser(campaignId, toUserId, 'gm-message', { id: row.id, body: row.body, createdAt: row.createdAt })
  res.status(201).json(row)
})

export default router
