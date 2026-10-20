import bcrypt from 'bcryptjs'
import { and, eq } from 'drizzle-orm'
import { Router } from 'express'
import { db } from '../db/index.js'
import { campaignMembers, campaigns, users } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'

/**
 * Le joueur a oublié son mot de passe : le MJ de sa campagne lui en pose un
 * nouveau, qu'il lui transmet à la table.
 */
const router = Router()
router.use(requireAuth)

// POST /api/campaigns/:id/members/:userId/password — MJ only
router.post('/:id/members/:userId/password', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const targetUserId = Number(req.params.userId)

  const [campaign] = await db.select({ gmUserId: campaigns.gmUserId }).from(campaigns).where(eq(campaigns.id, campaignId))
  if (!campaign) { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (campaign.gmUserId !== userId) { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const [member] = await db
    .select({ id: campaignMembers.id })
    .from(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, targetUserId)))
  if (!member) { res.status(404).json({ error: 'Joueur introuvable dans la campagne' }); return }

  const { password } = req.body as { password?: unknown }
  if (typeof password !== 'string' || password.length < 6) {
    res.status(400).json({ error: 'Le mot de passe doit faire au moins 6 caractères' })
    return
  }

  await db.update(users).set({ passwordHash: await bcrypt.hash(password, 10) }).where(eq(users.id, targetUserId))
  res.json({ ok: true })
})

export default router
