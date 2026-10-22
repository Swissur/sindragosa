import { and, asc, desc, eq, sql } from 'drizzle-orm'
import { Router, type Request, type Response } from 'express'
import { randomUUID } from 'node:crypto'
import { db } from '../db/index.js'
import { campaignMembers, characters, generatedImages, scenarios, sharedImages } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'
import { verifyMember } from './codex.js'
import { broadcastCampaignEvent } from '../campaigns/sseStore.js'
import { toInventoryItem } from '../combats/loot.js'
import { sanitizeBlocks, sanitizeBookmark, storedBlocks, type ScenarioBlock } from '../scenarios/blocks.js'

/** Scénarios du MJ (plans/47-scenarios-mj.md). Tout est réservé au MJ, sauf la galerie. */
const router = Router()
router.use(requireAuth)

function idParam(value: string | undefined): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

/** Id de campagne si je suis membre (ou MJ), sinon la réponse d'erreur est déjà partie. */
async function campaignAccess(req: Request, res: Response, gmOnly: boolean): Promise<number | null> {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = idParam(req.params.id)
  if (campaignId == null) { res.status(400).json({ error: 'Id invalide' }); return null }
  const check = await verifyMember(campaignId, userId)
  if (check.status === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return null }
  if (check.status === 'forbidden' || (gmOnly && check.gmUserId !== userId)) {
    res.status(403).json({ error: 'Réservé au MJ' }); return null
  }
  return campaignId
}

async function loadScenario(campaignId: number, scenarioId: number | null) {
  if (scenarioId == null) return null
  const [row] = await db.select().from(scenarios)
    .where(and(eq(scenarios.id, scenarioId), eq(scenarios.campaignId, campaignId)))
  return row ?? null
}

/** Récrit les blocs d'un scénario et le renvoie au client. */
async function saveBlocks(scenarioId: number, blocks: ScenarioBlock[]) {
  const [row] = await db.update(scenarios).set({ blocks, updatedAt: new Date() })
    .where(eq(scenarios.id, scenarioId)).returning()
  return row
}

// GET /:id/scenarios — les scénarios de la campagne, le plus récent d'abord
router.get('/:id/scenarios', async (req, res) => {
  const campaignId = await campaignAccess(req, res, true)
  if (campaignId == null) return
  const rows = await db
    .select({
      id: scenarios.id,
      title: scenarios.title,
      blockCount: sql<number>`jsonb_array_length(${scenarios.blocks})::int`,
      updatedAt: scenarios.updatedAt,
    })
    .from(scenarios)
    .where(eq(scenarios.campaignId, campaignId))
    .orderBy(desc(scenarios.updatedAt))
  res.json(rows)
})

// POST /:id/scenarios — nouveau scénario
router.post('/:id/scenarios', async (req, res) => {
  const campaignId = await campaignAccess(req, res, true)
  if (campaignId == null) return
  const title = String((req.body as { title?: unknown }).title ?? '').trim().slice(0, 120)
  if (!title) { res.status(400).json({ error: 'Titre requis' }); return }
  const [row] = await db.insert(scenarios).values({ campaignId, title }).returning()
  res.json(row)
})

// GET /:id/scenarios/:sid
router.get('/:id/scenarios/:sid', async (req, res) => {
  const campaignId = await campaignAccess(req, res, true)
  if (campaignId == null) return
  const scenario = await loadScenario(campaignId, idParam(req.params.sid))
  if (!scenario) { res.status(404).json({ error: 'Scénario introuvable' }); return }
  res.json(scenario)
})

// PUT /:id/scenarios/:sid — titre, blocs et drapeau (le scénario entier)
router.put('/:id/scenarios/:sid', async (req, res) => {
  const campaignId = await campaignAccess(req, res, true)
  if (campaignId == null) return
  const scenario = await loadScenario(campaignId, idParam(req.params.sid))
  if (!scenario) { res.status(404).json({ error: 'Scénario introuvable' }); return }

  const body = req.body as { title?: unknown; blocks?: unknown; bookmark?: unknown }
  const title = typeof body.title === 'string' && body.title.trim() ? body.title.trim().slice(0, 120) : scenario.title
  const blocks = body.blocks !== undefined ? sanitizeBlocks(body.blocks, storedBlocks(scenario.blocks)) : storedBlocks(scenario.blocks)
  const bookmark = body.bookmark !== undefined ? sanitizeBookmark(body.bookmark, blocks) : scenario.bookmark
  const [row] = await db.update(scenarios).set({ title, blocks, bookmark, updatedAt: new Date() })
    .where(eq(scenarios.id, scenario.id)).returning()
  res.json(row)
})

// DELETE /:id/scenarios/:sid
router.delete('/:id/scenarios/:sid', async (req, res) => {
  const campaignId = await campaignAccess(req, res, true)
  if (campaignId == null) return
  const scenario = await loadScenario(campaignId, idParam(req.params.sid))
  if (!scenario) { res.status(404).json({ error: 'Scénario introuvable' }); return }
  await db.delete(scenarios).where(eq(scenarios.id, scenario.id))
  res.json({ ok: true })
})

// POST /:id/scenario-images — le MJ importe une image (base64, déjà réduite par le client)
router.post('/:id/scenario-images', async (req, res) => {
  const campaignId = await campaignAccess(req, res, true)
  if (campaignId == null) return
  const { data, mimeType } = req.body as { data?: unknown; mimeType?: unknown }
  if (typeof data !== 'string' || !data || typeof mimeType !== 'string' || !mimeType.startsWith('image/')) {
    res.status(400).json({ error: 'data (base64) et mimeType requis' }); return
  }
  const [image] = await db.insert(generatedImages).values({
    userId: (req as unknown as AuthRequest).userId, data, mimeType, prompt: 'scenario',
  }).returning({ id: generatedImages.id })
  res.json({ imageId: image.id })
})

// POST /:id/scenarios/:sid/blocks/:bid/share — montrer l'image du bloc aux joueurs
router.post('/:id/scenarios/:sid/blocks/:bid/share', async (req, res) => {
  const campaignId = await campaignAccess(req, res, true)
  if (campaignId == null) return
  const scenario = await loadScenario(campaignId, idParam(req.params.sid))
  if (!scenario) { res.status(404).json({ error: 'Scénario introuvable' }); return }
  const blocks = storedBlocks(scenario.blocks)
  const block = blocks.find((b) => b.id === req.params.bid)
  if (block?.type !== 'image') { res.status(404).json({ error: 'Image introuvable' }); return }

  // Repartager remonte l'image en tête de galerie et la rouvre chez tout le monde.
  const sharedAt = new Date()
  await db.insert(sharedImages)
    .values({ campaignId, imageId: block.imageId, caption: block.caption, sharedAt })
    .onConflictDoUpdate({
      target: [sharedImages.campaignId, sharedImages.imageId],
      set: { caption: block.caption, sharedAt },
    })
  const row = await saveBlocks(scenario.id, blocks.map((b) => (b.id === block.id ? { ...block, sharedAt: sharedAt.toISOString() } : b)))
  broadcastCampaignEvent(campaignId, 'image-shared', {
    imageId: block.imageId, caption: block.caption, sharedAt: sharedAt.toISOString(),
  })
  res.json(row)
})

// POST /:id/scenarios/:sid/blocks/:bid/give — une copie de l'objet dans l'inventaire d'un joueur.
// Même mécanique que le butin de combat : concaténation SQL, puis la fiche du joueur par SSE.
router.post('/:id/scenarios/:sid/blocks/:bid/give', async (req, res) => {
  const campaignId = await campaignAccess(req, res, true)
  if (campaignId == null) return
  const scenario = await loadScenario(campaignId, idParam(req.params.sid))
  if (!scenario) { res.status(404).json({ error: 'Scénario introuvable' }); return }
  const blocks = storedBlocks(scenario.blocks)
  const block = blocks.find((b) => b.id === req.params.bid)
  if (block?.type !== 'objet') { res.status(404).json({ error: 'Objet introuvable' }); return }

  const heroUserId = Number((req.body as { userId?: unknown })?.userId)
  const [member] = await db
    .select({ characterId: campaignMembers.characterId, name: characters.name })
    .from(campaignMembers)
    .innerJoin(characters, eq(characters.id, campaignMembers.characterId))
    .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, heroUserId)))
  if (!member?.characterId) { res.status(404).json({ error: 'Personnage introuvable' }); return }

  const item = toInventoryItem(block.item, randomUUID())
  const given = { ...block, givenTo: [...block.givenTo, member.name] }
  const { items, row } = await db.transaction(async (tx) => {
    const [updated] = await tx.update(characters)
      .set({ items: sql`${characters.items} || ${JSON.stringify([item])}::jsonb`, updatedAt: new Date() })
      .where(eq(characters.id, member.characterId!))
      .returning({ items: characters.items })
    const [saved] = await tx.update(scenarios)
      .set({ blocks: blocks.map((b) => (b.id === block.id ? given : b)), updatedAt: new Date() })
      .where(eq(scenarios.id, scenario.id))
      .returning()
    return { items: updated.items, row: saved }
  })

  broadcastCampaignEvent(campaignId, 'character', {
    userId: heroUserId, characterId: member.characterId, patch: { items }, loot: item.name,
  })
  res.json(row)
})

// GET /:id/shared-images — la galerie des images montrées par le MJ
router.get('/:id/shared-images', async (req, res) => {
  const campaignId = await campaignAccess(req, res, false)
  if (campaignId == null) return
  const rows = await db
    .select({ id: sharedImages.id, imageId: sharedImages.imageId, caption: sharedImages.caption, sharedAt: sharedImages.sharedAt })
    .from(sharedImages)
    .where(eq(sharedImages.campaignId, campaignId))
    .orderBy(desc(sharedImages.sharedAt), asc(sharedImages.id))
  res.json(rows)
})

export default router
