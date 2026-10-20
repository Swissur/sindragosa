import { and, asc, count, eq, isNull, or } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { Router, type Request, type Response } from 'express'
import { db } from '../db/index.js'
import { campaignMembers, campaigns, gmMessages, users } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'
import { sendToUser } from '../campaigns/sseStore.js'

/**
 * « Échange avec le MJ » : le MJ et chaque joueur s'écrivent en tête-à-tête.
 * Le message s'ouvre au milieu de l'écran du destinataire et reste dans son journal.
 */
const router = Router()
router.use(requireAuth)

const sender = alias(users, 'sender')
const recipient = alias(users, 'recipient')

async function campaignGm(campaignId: number): Promise<number | null> {
  const [row] = await db.select({ gmUserId: campaigns.gmUserId }).from(campaigns).where(eq(campaigns.id, campaignId))
  return row?.gmUserId ?? null
}

/** L'appelant est le MJ ou un membre de la campagne ; sinon répond 404/403 et rend `null`. */
async function access(req: Request, res: Response): Promise<{ campaignId: number; userId: number; gmUserId: number; isGm: boolean } | null> {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const gmUserId = await campaignGm(campaignId)
  if (gmUserId === null) { res.status(404).json({ error: 'Campagne introuvable' }); return null }
  const isGm = gmUserId === userId
  if (!isGm && !(await isMember(campaignId, userId))) { res.status(403).json({ error: 'Non membre' }); return null }
  return { campaignId, userId, gmUserId, isGm }
}

async function isMember(campaignId: number, userId: number): Promise<boolean> {
  const [row] = await db
    .select({ id: campaignMembers.id })
    .from(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, userId)))
  return !!row
}

// GET /api/campaigns/:id/messages — le MJ voit tous les échanges, le joueur le sien
router.get('/:id/messages', async (req, res) => {
  const a = await access(req, res)
  if (!a) return
  const { campaignId, userId, isGm } = a

  const messages = await db
    .select({
      id: gmMessages.id,
      fromUserId: gmMessages.fromUserId,
      fromUsername: sender.username,
      toUserId: gmMessages.toUserId,
      toUsername: recipient.username,
      body: gmMessages.body,
      readAt: gmMessages.readAt,
      createdAt: gmMessages.createdAt,
    })
    .from(gmMessages)
    .innerJoin(sender, eq(sender.id, gmMessages.fromUserId))
    .innerJoin(recipient, eq(recipient.id, gmMessages.toUserId))
    .where(isGm
      ? eq(gmMessages.campaignId, campaignId)
      : and(
        eq(gmMessages.campaignId, campaignId),
        or(eq(gmMessages.toUserId, userId), eq(gmMessages.fromUserId, userId)),
      ))
    .orderBy(asc(gmMessages.createdAt), asc(gmMessages.id))

  res.json({ isGm, messages })
})

// GET /api/campaigns/:id/messages/unread — combien de messages m'attendent (pastille du journal)
router.get('/:id/messages/unread', async (req, res) => {
  const a = await access(req, res)
  if (!a) return
  const [row] = await db
    .select({ n: count() })
    .from(gmMessages)
    .where(and(eq(gmMessages.campaignId, a.campaignId), eq(gmMessages.toUserId, a.userId), isNull(gmMessages.readAt)))
  res.json({ count: row?.n ?? 0 })
})

// POST /api/campaigns/:id/messages/read — j'ai ouvert un fil : ses messages pour moi sont lus.
// Le MJ précise le joueur (`withUserId`), le joueur n'a qu'un fil.
router.post('/:id/messages/read', async (req, res) => {
  const a = await access(req, res)
  if (!a) return
  const { withUserId } = req.body as { withUserId?: unknown }
  if (a.isGm && typeof withUserId !== 'number') { res.status(400).json({ error: 'Joueur manquant' }); return }

  await db
    .update(gmMessages)
    .set({ readAt: new Date() })
    .where(and(
      eq(gmMessages.campaignId, a.campaignId),
      eq(gmMessages.toUserId, a.userId),
      isNull(gmMessages.readAt),
      a.isGm ? eq(gmMessages.fromUserId, withUserId as number) : undefined,
    ))
  res.json({ ok: true })
})

// POST /api/campaigns/:id/messages — le MJ écrit à un joueur (`toUserId`), le joueur écrit au MJ
router.post('/:id/messages', async (req, res) => {
  const a = await access(req, res)
  if (!a) return
  const { campaignId, userId, gmUserId, isGm } = a

  const { toUserId: requested, body } = req.body as { toUserId?: unknown; body?: unknown }
  if (typeof body !== 'string' || !body.trim()) { res.status(400).json({ error: 'Message vide' }); return }

  let toUserId = gmUserId
  if (isGm) {
    if (typeof requested !== 'number' || !(await isMember(campaignId, requested))) {
      res.status(400).json({ error: 'Joueur introuvable dans la campagne' })
      return
    }
    toUserId = requested
  }

  const [row] = await db
    .insert(gmMessages)
    .values({ campaignId, toUserId, fromUserId: userId, body: body.trim().slice(0, 2000) })
    .returning()
  const [me] = await db.select({ username: users.username }).from(users).where(eq(users.id, userId))

  sendToUser(campaignId, toUserId, 'gm-message', {
    id: row.id,
    body: row.body,
    createdAt: row.createdAt,
    fromGm: isGm,
    fromUserId: userId,
    fromUsername: me?.username ?? '',
  })
  res.status(201).json(row)
})

export default router
