import { and, asc, eq } from 'drizzle-orm'
import { Router } from 'express'
import { db } from '../db/index.js'
import { campaignMembers, characters, generatedImages, users } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'

function username(req: unknown): string {
  return (req as AuthRequest).username ?? 'unknown'
}
import { broadcastUserCombats } from '../combats/sseStore.js'
import { pickUpdatable } from '../characters/updatable.js'
type CharacterInsert = typeof characters.$inferInsert

const router = Router()
router.use(requireAuth)

// GET /api/characters — liste les personnages de l'utilisateur
router.get('/', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const rows = await db.select().from(characters).where(eq(characters.userId, userId)).orderBy(asc(characters.id))
  res.json(rows)
})

// GET /api/characters/:id
router.get('/:id', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)
  const [row] = await db
    .select()
    .from(characters)
    .where(and(eq(characters.id, id), eq(characters.userId, userId)))
  if (!row) {
    res.status(404).json({ error: 'Personnage introuvable' })
    return
  }
  res.json(row)
})

// POST /api/characters — crée un personnage.
// Les valeurs par défaut de Sindragosa (caracs à 2, 20 PV, 2 points de chance…)
// viennent de la base ; le client peut en préciser certaines (nom, race, caracs).
router.post('/', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const body = pickUpdatable((req.body ?? {}) as Record<string, unknown>) as Partial<CharacterInsert>

  const existing = await db.select({ id: characters.id }).from(characters).where(eq(characters.userId, userId)).limit(1)
  const isFirst = existing.length === 0

  const [row] = await db.insert(characters).values({
    ...body,
    hpCurrent: typeof body.hpCurrent === 'number' ? body.hpCurrent : (body.hpMax ?? 20),
    userId,
    isActive: isFirst,
  }).returning()

  console.log(`[character] created: user=${username(req)} name="${row.name}"`)
  res.status(201).json(row)
})

// PUT /api/characters/:id — met à jour la fiche statique
router.put('/:id', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)
  const rawBody = (req.body ?? {}) as Record<string, unknown>
  const body = pickUpdatable(rawBody) as Partial<CharacterInsert>

  const [row] = await db
    .update(characters)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(and(eq(characters.id, id), eq(characters.userId, userId)))
    .returning()

  if (!row) {
    res.status(404).json({ error: 'Personnage introuvable' })
    return
  }
  console.log(`[character] updated: user=${username(req)} name="${row.name}"`)
  void broadcastUserCombats(userId).catch(() => {})
  res.json(row)
})

// PATCH /api/characters/:id — met à jour les PV courants (pj)
router.patch('/:id', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)
  const { hpCurrent } = req.body as { hpCurrent?: unknown }
  if (typeof hpCurrent !== 'number' || !Number.isFinite(hpCurrent)) {
    res.status(400).json({ error: 'hpCurrent doit être un nombre' })
    return
  }

  const [existing] = await db
    .select({ hpMax: characters.hpMax })
    .from(characters)
    .where(and(eq(characters.id, id), eq(characters.userId, userId)))

  if (!existing) {
    res.status(404).json({ error: 'Personnage introuvable' })
    return
  }

  const clamped = Math.max(0, Math.min(Math.round(hpCurrent), existing.hpMax))
  const [row] = await db
    .update(characters)
    .set({ hpCurrent: clamped, updatedAt: new Date() })
    .where(and(eq(characters.id, id), eq(characters.userId, userId)))
    .returning()

  if (!row) {
    res.status(404).json({ error: 'Personnage introuvable' })
    return
  }
  void broadcastUserCombats(userId).catch(() => {})
  res.json(row)
})

// DELETE /api/characters/:id
router.delete('/:id', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)

  const [row] = await db
    .delete(characters)
    .where(and(eq(characters.id, id), eq(characters.userId, userId)))
    .returning({ id: characters.id })

  if (!row) {
    res.status(404).json({ error: 'Personnage introuvable' })
    return
  }
  res.json({ ok: true })
})

// POST /api/characters/:id/activate
router.post('/:id/activate', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)

  await db.transaction(async (tx) => {
    await tx
      .update(characters)
      .set({ isActive: false })
      .where(eq(characters.userId, userId))

    const [row] = await tx
      .update(characters)
      .set({ isActive: true })
      .where(and(eq(characters.id, id), eq(characters.userId, userId)))
      .returning({ id: characters.id })

    if (!row) throw new Error('not_found')

    // Le perso choisi devient celui que le joueur joue dans sa campagne active.
    const [me] = await tx
      .select({ activeCampaignId: users.activeCampaignId })
      .from(users)
      .where(eq(users.id, userId))
    if (me?.activeCampaignId) {
      await tx
        .update(campaignMembers)
        .set({ characterId: id })
        .where(and(eq(campaignMembers.campaignId, me.activeCampaignId), eq(campaignMembers.userId, userId)))
    }
  }).catch((err) => {
    if (err.message === 'not_found') {
      res.status(404).json({ error: 'Personnage introuvable' })
      return
    }
    throw err
  })

  if (!res.headersSent) res.json({ ok: true })
})

// Upload character portrait image
router.post('/:id/portrait', requireAuth, async (req, res) => {
  const userId = (req as AuthRequest).userId
  const charId = Number(req.params.id)
  const { data, mimeType } = req.body as { data?: string; mimeType?: string }

  if (!data || !mimeType?.startsWith('image/')) {
    res.status(400).json({ error: 'data (base64) et mimeType requis' })
    return
  }

  // Verify character belongs to user
  const [char] = await db.select({ id: characters.id }).from(characters)
    .where(and(eq(characters.id, charId), eq(characters.userId, userId)))
  if (!char) {
    res.status(404).json({ error: 'Personnage introuvable' })
    return
  }

  // Insert image in DB
  const [inserted] = await db.insert(generatedImages).values({
    userId,
    data,
    mimeType,
    prompt: 'portrait',
  }).returning({ id: generatedImages.id })

  // Link to character
  await db.update(characters)
    .set({ portraitImageId: inserted.id, updatedAt: new Date() })
    .where(eq(characters.id, charId))

  console.log(`[portrait] Uploaded portrait ${inserted.id} for character ${charId}`)
  res.json({ portraitImageId: inserted.id })
})

// Delete character portrait
router.delete('/:id/portrait', requireAuth, async (req, res) => {
  const userId = (req as AuthRequest).userId
  const charId = Number(req.params.id)

  const [char] = await db.select({ portraitImageId: characters.portraitImageId }).from(characters)
    .where(and(eq(characters.id, charId), eq(characters.userId, userId)))
  if (!char) {
    res.status(404).json({ error: 'Personnage introuvable' })
    return
  }

  await db.update(characters)
    .set({ portraitImageId: null, updatedAt: new Date() })
    .where(eq(characters.id, charId))

  res.json({ ok: true })
})

export default router
