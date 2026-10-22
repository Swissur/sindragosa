import { and, desc, eq, like } from 'drizzle-orm'
import { Router, type Request, type Response } from 'express'
import { db } from '../db/index.js'
import { campaigns, campaignMembers, codexEntries, codexPlayerNotes, generatedImages, journalCompagnie, journalPages, notes } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'
import { saveWithRevision } from '../revisions/service.js'
import { publishBoard } from '../campaigns/codexBoard.js'
import { broadcastCampaignEvent } from '../campaigns/sseStore.js'

const CODEX_TYPES = ['personnage', 'lieu', 'autre'] as const
type CodexType = (typeof CODEX_TYPES)[number]

function isCodexType(value: unknown): value is CodexType {
  return typeof value === 'string' && (CODEX_TYPES as readonly string[]).includes(value)
}

/** '' (pas de couleur) ou « #rrggbb ». */
function isCodexColor(value: unknown): value is string {
  return typeof value === 'string' && (value === '' || /^#[0-9a-f]{6}$/i.test(value))
}

type CodexRow = typeof codexEntries.$inferSelect

/** Ce qu'un joueur reçoit d'une fiche : jamais les notes secrètes du MJ. */
function forViewer(entry: CodexRow, isGm: boolean) {
  return isGm ? entry : { ...entry, gmNotes: '' }
}

/** Une image que le MJ a lui-même importée peut illustrer sa fiche. */
async function isOwnImage(imageId: unknown, userId: number): Promise<boolean> {
  if (!Number.isInteger(imageId) || (imageId as number) <= 0) return false
  const [image] = await db.select({ userId: generatedImages.userId }).from(generatedImages)
    .where(eq(generatedImages.id, imageId as number))
  return image?.userId === userId
}

/** La fiche, si elle est dans la campagne et que je peux la voir (cachée = MJ seulement). */
async function visibleEntry(campaignId: number, entryId: number, isGm: boolean) {
  const [entry] = await db
    .select()
    .from(codexEntries)
    .where(and(eq(codexEntries.id, entryId), eq(codexEntries.campaignId, campaignId)))
  if (!entry || (entry.hidden && !isGm)) return null
  return entry
}

const router = Router()
router.use(requireAuth)

// Helper: verify member (GM or campaign member) — same pattern as combats.ts
export async function verifyMember(campaignId: number, userId: number) {
  const [campaign] = await db.select({ gmUserId: campaigns.gmUserId }).from(campaigns).where(eq(campaigns.id, campaignId))
  if (!campaign) return { status: 'not_found' as const, gmUserId: 0 }
  if (campaign.gmUserId === userId) return { status: 'ok' as const, gmUserId: campaign.gmUserId }
  const [membership] = await db
    .select({ id: campaignMembers.id })
    .from(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, userId)))
  if (!membership) return { status: 'forbidden' as const, gmUserId: campaign.gmUserId }
  return { status: 'ok' as const, gmUserId: campaign.gmUserId }
}

// GET /:id/codex — liste des fiches de la campagne
router.get('/:id/codex', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  if (!Number.isInteger(campaignId) || campaignId <= 0) { res.status(400).json({ error: 'Id invalide' }); return }

  const check = await verifyMember(campaignId, userId)
  if (check.status === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check.status === 'forbidden') { res.status(403).json({ error: 'Réservé aux membres de la campagne' }); return }

  const isGm = check.gmUserId === userId
  const rows = await db
    .select()
    .from(codexEntries)
    .where(isGm
      ? eq(codexEntries.campaignId, campaignId)
      : and(eq(codexEntries.campaignId, campaignId), eq(codexEntries.hidden, false)))
    .orderBy(codexEntries.name)
  res.json(rows.map((r) => forViewer(r, isGm)))
})

// POST /:id/codex — créer une fiche
router.post('/:id/codex', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  if (!Number.isInteger(campaignId) || campaignId <= 0) { res.status(400).json({ error: 'Id invalide' }); return }
  const { name, type, description, color, secret } = req.body as {
    name?: string; type?: string; description?: string; color?: string; secret?: boolean
  }

  const check = await verifyMember(campaignId, userId)
  if (check.status === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check.status === 'forbidden') { res.status(403).json({ error: 'Réservé aux membres de la campagne' }); return }
  // Fiche PNJ d'un scénario : au MJ, et cachée jusqu'à ce qu'il la révèle.
  if (secret && check.gmUserId !== userId) { res.status(403).json({ error: 'Réservé au MJ' }); return }

  if (!name?.trim()) { res.status(400).json({ error: 'Nom requis' }); return }
  if (!isCodexType(type)) { res.status(400).json({ error: 'Type invalide (personnage, lieu ou autre)' }); return }
  if (color !== undefined && !isCodexColor(color)) { res.status(400).json({ error: 'Couleur invalide' }); return }

  const [entry] = await db.insert(codexEntries).values({
    campaignId,
    type,
    name: name.trim(),
    description: description ?? '',
    color: color?.toLowerCase() ?? '',
    gmOwned: Boolean(secret),
    hidden: Boolean(secret),
    createdByUserId: userId,
  }).returning()
  res.json(entry)
})

// PUT /:id/codex/:entryId — modifier (tout membre)
router.put('/:id/codex/:entryId', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  if (!Number.isInteger(campaignId) || campaignId <= 0) { res.status(400).json({ error: 'Id invalide' }); return }
  const entryId = Number(req.params.entryId)
  if (!Number.isInteger(entryId) || entryId <= 0) { res.status(400).json({ error: 'Id invalide' }); return }
  const { name, type, description, color, gmNotes, imageId } = req.body as {
    name?: string; type?: string; description?: string; color?: string; gmNotes?: string; imageId?: number | null
  }

  const check = await verifyMember(campaignId, userId)
  if (check.status === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check.status === 'forbidden') { res.status(403).json({ error: 'Réservé aux membres de la campagne' }); return }
  const isGm = check.gmUserId === userId

  if (name !== undefined && !name.trim()) { res.status(400).json({ error: 'Nom requis' }); return }
  if (type !== undefined && !isCodexType(type)) {
    res.status(400).json({ error: 'Type invalide (personnage, lieu ou autre)' }); return
  }
  if (color !== undefined && !isCodexColor(color)) { res.status(400).json({ error: 'Couleur invalide' }); return }

  const current = await visibleEntry(campaignId, entryId, isGm)
  if (!current) { res.status(404).json({ error: 'Fiche introuvable' }); return }
  // Une fiche du MJ se lit, elle ne se réécrit pas : les joueurs ont leurs notes à eux.
  if (current.gmOwned && !isGm) { res.status(403).json({ error: 'Cette fiche appartient au MJ' }); return }
  if ((gmNotes !== undefined || imageId !== undefined) && !isGm) { res.status(403).json({ error: 'Réservé au MJ' }); return }
  if (imageId != null && !(await isOwnImage(imageId, userId))) { res.status(400).json({ error: 'Image invalide' }); return }

  // Notes secrètes et portrait : hors historique (les joueurs lisent l'historique).
  if (typeof gmNotes === 'string' || imageId !== undefined) {
    await db.update(codexEntries).set({
      ...(typeof gmNotes === 'string' ? { gmNotes: gmNotes.slice(0, 20_000) } : {}),
      ...(imageId !== undefined ? { imageId } : {}),
    }).where(eq(codexEntries.id, entryId))
  }

  // Mise à jour partielle → on complète avec l'existant pour l'historique.
  const result = await saveWithRevision({
    type: 'codex_entry',
    id: entryId,
    snapshot: {
      name: name !== undefined ? name.trim() : current.name,
      type: type ?? current.type,
      description: description ?? current.description,
      color: color !== undefined ? color.toLowerCase() : current.color,
    },
    userId,
    expectedVersion: (req.body as { expectedVersion?: number }).expectedVersion ?? null,
  })
  if (result.status === 'conflict') {
    res.status(409).json({
      error: 'La fiche a été modifiée entre-temps.',
      currentVersion: result.currentVersion,
      ...result.snapshot,
    })
    return
  }
  if (result.status !== 'ok') { res.status(404).json({ error: 'Fiche introuvable' }); return }

  const [entry] = await db.select().from(codexEntries).where(eq(codexEntries.id, entryId))
  res.json(forViewer(entry, isGm))
  // Le tableau des fiches affiche le nom : les autres le voient changer.
  void publishBoard(campaignId).catch(() => {})
})

// GET /:id/codex/:entryId/mentions — mes notes privées + pages partagées qui mentionnent la fiche
router.get('/:id/codex/:entryId/mentions', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  if (!Number.isInteger(campaignId) || campaignId <= 0) { res.status(400).json({ error: 'Id invalide' }); return }
  const entryId = Number(req.params.entryId)
  if (!Number.isInteger(entryId) || entryId <= 0) { res.status(400).json({ error: 'Id invalide' }); return }

  const check = await verifyMember(campaignId, userId)
  if (check.status === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check.status === 'forbidden') { res.status(403).json({ error: 'Réservé aux membres de la campagne' }); return }

  if (!(await visibleEntry(campaignId, entryId, check.gmUserId === userId))) {
    res.status(404).json({ error: 'Fiche introuvable' }); return
  }

  // Le token stocké est "@[Nom](codex:ID)" — les parenthèses évitent de matcher codex:12 dans codex:123.
  const pattern = `%(codex:${entryId})%`
  const [myNotes, pages, boardRows] = await Promise.all([
    db
      .select({ id: notes.id, title: notes.title, content: notes.content, updatedAt: notes.updatedAt })
      .from(notes)
      .where(and(eq(notes.ownerUserId, userId), like(notes.content, pattern)))
      .orderBy(desc(notes.updatedAt)),
    db
      .select({ id: journalPages.id, title: journalPages.title, content: journalPages.content, updatedAt: journalPages.updatedAt })
      .from(journalPages)
      .where(and(eq(journalPages.type, 'text'), like(journalPages.content, pattern)))
      .orderBy(desc(journalPages.updatedAt)),
    db
      .select({ content: journalCompagnie.content, updatedAt: journalCompagnie.updatedAt })
      .from(journalCompagnie)
      .where(and(eq(journalCompagnie.id, 1), like(journalCompagnie.content, pattern))),
  ])
  const board = boardRows[0]
    ? { id: 1, title: 'Journal de bord', content: boardRows[0].content, updatedAt: boardRows[0].updatedAt }
    : null
  res.json({ notes: myNotes, pages, board })
})

// DELETE /:id/codex/:entryId — auteur ou MJ uniquement
router.delete('/:id/codex/:entryId', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  if (!Number.isInteger(campaignId) || campaignId <= 0) { res.status(400).json({ error: 'Id invalide' }); return }
  const entryId = Number(req.params.entryId)
  if (!Number.isInteger(entryId) || entryId <= 0) { res.status(400).json({ error: 'Id invalide' }); return }

  const check = await verifyMember(campaignId, userId)
  if (check.status === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check.status === 'forbidden') { res.status(403).json({ error: 'Réservé aux membres de la campagne' }); return }

  const [entry] = await db
    .select({ createdByUserId: codexEntries.createdByUserId })
    .from(codexEntries)
    .where(and(eq(codexEntries.id, entryId), eq(codexEntries.campaignId, campaignId)))
  if (!entry) { res.status(404).json({ error: 'Fiche introuvable' }); return }
  if (entry.createdByUserId !== userId && check.gmUserId !== userId) {
    res.status(403).json({ error: "Seul l'auteur ou le MJ peut supprimer cette fiche" })
    return
  }

  await db.delete(codexEntries).where(eq(codexEntries.id, entryId))
  res.json({ ok: true })
  // La fiche quitte aussi le tableau (cascade) : les autres la voient partir.
  void publishBoard(campaignId).catch(() => {})
})

/** Id de campagne et de fiche, et si je suis le MJ ; sinon la réponse d'erreur est déjà partie. */
async function entryAccess(req: Request, res: Response) {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const entryId = Number(req.params.entryId)
  if (!Number.isInteger(campaignId) || !Number.isInteger(entryId)) { res.status(400).json({ error: 'Id invalide' }); return null }
  const check = await verifyMember(campaignId, userId)
  if (check.status !== 'ok') { res.status(403).json({ error: 'Réservé aux membres de la campagne' }); return null }
  return { userId, campaignId, entryId, isGm: check.gmUserId === userId }
}

// POST /:id/codex/:entryId/reveal — le MJ montre (ou recache) une de ses fiches
router.post('/:id/codex/:entryId/reveal', async (req, res) => {
  const access = await entryAccess(req, res)
  if (!access) return
  if (!access.isGm) { res.status(403).json({ error: 'Réservé au MJ' }); return }
  const hidden = (req.body as { hidden?: unknown }).hidden
  if (typeof hidden !== 'boolean') { res.status(400).json({ error: 'hidden requis' }); return }

  const [entry] = await db.update(codexEntries).set({ hidden })
    .where(and(eq(codexEntries.id, access.entryId), eq(codexEntries.campaignId, access.campaignId)))
    .returning()
  if (!entry) { res.status(404).json({ error: 'Fiche introuvable' }); return }
  res.json(entry)
  broadcastCampaignEvent(access.campaignId, 'codex-reveal', { entryId: entry.id, name: entry.name, revealed: !hidden })
  void publishBoard(access.campaignId).catch(() => {})
})

// GET /:id/codex/:entryId/my-note — mes notes privées sur une fiche
router.get('/:id/codex/:entryId/my-note', async (req, res) => {
  const access = await entryAccess(req, res)
  if (!access) return
  if (!(await visibleEntry(access.campaignId, access.entryId, access.isGm))) { res.status(404).json({ error: 'Fiche introuvable' }); return }

  const [note] = await db
    .select({ content: codexPlayerNotes.content, updatedAt: codexPlayerNotes.updatedAt })
    .from(codexPlayerNotes)
    .where(and(eq(codexPlayerNotes.codexEntryId, access.entryId), eq(codexPlayerNotes.userId, access.userId)))
  res.json(note ?? { content: '', updatedAt: null })
})

// PUT /:id/codex/:entryId/my-note
router.put('/:id/codex/:entryId/my-note', async (req, res) => {
  const access = await entryAccess(req, res)
  if (!access) return
  const raw = (req.body as { content?: unknown }).content
  if (typeof raw !== 'string') { res.status(400).json({ error: 'content requis' }); return }
  if (!(await visibleEntry(access.campaignId, access.entryId, access.isGm))) { res.status(404).json({ error: 'Fiche introuvable' }); return }

  const content = raw.slice(0, 20_000)
  const updatedAt = new Date()
  await db.insert(codexPlayerNotes)
    .values({ codexEntryId: access.entryId, userId: access.userId, content, updatedAt })
    .onConflictDoUpdate({
      target: [codexPlayerNotes.codexEntryId, codexPlayerNotes.userId],
      set: { content, updatedAt },
    })
  res.json({ content, updatedAt })
})

export default router
