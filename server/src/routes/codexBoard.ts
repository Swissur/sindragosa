import { and, eq, or } from 'drizzle-orm'
import { Router, type Request, type Response } from 'express'
import { db } from '../db/index.js'
import { codexBoardLinks, codexBoardNodes, codexEntries } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'
import { verifyMember } from './codex.js'
import { isCoord, loadBoard, parseLinkStyle, publishBoard } from '../campaigns/codexBoard.js'

const router = Router()
router.use(requireAuth)

/** Id de campagne valide et membre, sinon la réponse d'erreur est déjà partie. */
async function memberCampaign(req: Request, res: Response): Promise<number | null> {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  if (!Number.isInteger(campaignId) || campaignId <= 0) { res.status(400).json({ error: 'Id invalide' }); return null }
  const check = await verifyMember(campaignId, userId)
  if (check.status === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return null }
  if (check.status === 'forbidden') { res.status(403).json({ error: 'Réservé aux membres de la campagne' }); return null }
  return campaignId
}

function idParam(value: string | undefined): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

async function nodeOf(campaignId: number, nodeId: number) {
  const [node] = await db
    .select({ id: codexBoardNodes.id })
    .from(codexBoardNodes)
    .where(and(eq(codexBoardNodes.id, nodeId), eq(codexBoardNodes.campaignId, campaignId)))
  return node ?? null
}

// GET /:id/codex-board — le tableau de la campagne
router.get('/:id/codex-board', async (req, res) => {
  const campaignId = await memberCampaign(req, res)
  if (campaignId == null) return
  res.json(await loadBoard(campaignId))
})

// POST /:id/codex-board/nodes — poser une fiche sur le tableau
router.post('/:id/codex-board/nodes', async (req, res) => {
  const campaignId = await memberCampaign(req, res)
  if (campaignId == null) return
  const { entryId, x, y } = req.body as { entryId?: unknown; x?: unknown; y?: unknown }
  if (!Number.isInteger(entryId) || !isCoord(x) || !isCoord(y)) { res.status(400).json({ error: 'Fiche ou position invalide' }); return }

  const [entry] = await db
    .select({ id: codexEntries.id })
    .from(codexEntries)
    .where(and(eq(codexEntries.id, entryId as number), eq(codexEntries.campaignId, campaignId)))
  if (!entry) { res.status(404).json({ error: 'Fiche introuvable' }); return }

  // Déjà posée (deux joueurs en même temps) : on la laisse où elle est.
  await db.insert(codexBoardNodes).values({ campaignId, codexEntryId: entry.id, x, y }).onConflictDoNothing()
  res.json(await publishBoard(campaignId))
})

// PATCH /:id/codex-board/nodes/:nodeId — déplacer une fiche
router.patch('/:id/codex-board/nodes/:nodeId', async (req, res) => {
  const campaignId = await memberCampaign(req, res)
  if (campaignId == null) return
  const nodeId = idParam(req.params.nodeId)
  const { x, y } = req.body as { x?: unknown; y?: unknown }
  if (nodeId == null || !isCoord(x) || !isCoord(y)) { res.status(400).json({ error: 'Position invalide' }); return }
  if (!(await nodeOf(campaignId, nodeId))) { res.status(404).json({ error: 'Fiche absente du tableau' }); return }

  await db.update(codexBoardNodes).set({ x, y }).where(eq(codexBoardNodes.id, nodeId))
  res.json(await publishBoard(campaignId))
})

// DELETE /:id/codex-board/nodes/:nodeId — retirer une fiche du tableau (ses flèches partent avec)
router.delete('/:id/codex-board/nodes/:nodeId', async (req, res) => {
  const campaignId = await memberCampaign(req, res)
  if (campaignId == null) return
  const nodeId = idParam(req.params.nodeId)
  if (nodeId == null) { res.status(400).json({ error: 'Id invalide' }); return }

  await db.delete(codexBoardNodes).where(and(eq(codexBoardNodes.id, nodeId), eq(codexBoardNodes.campaignId, campaignId)))
  res.json(await publishBoard(campaignId))
})

// POST /:id/codex-board/links — relier deux fiches
router.post('/:id/codex-board/links', async (req, res) => {
  const campaignId = await memberCampaign(req, res)
  if (campaignId == null) return
  const body = req.body as Record<string, unknown>
  const fromNodeId = idParam(String(body.fromNodeId))
  const toNodeId = idParam(String(body.toNodeId))
  const style = parseLinkStyle(body)
  if (fromNodeId == null || toNodeId == null || fromNodeId === toNodeId || !style) {
    res.status(400).json({ error: 'Flèche invalide' }); return
  }
  if (!(await nodeOf(campaignId, fromNodeId)) || !(await nodeOf(campaignId, toNodeId))) {
    res.status(404).json({ error: 'Fiche absente du tableau' }); return
  }

  // Une seule flèche par paire, dans un sens comme dans l'autre.
  const [existing] = await db
    .select({ id: codexBoardLinks.id })
    .from(codexBoardLinks)
    .where(or(
      and(eq(codexBoardLinks.fromNodeId, fromNodeId), eq(codexBoardLinks.toNodeId, toNodeId)),
      and(eq(codexBoardLinks.fromNodeId, toNodeId), eq(codexBoardLinks.toNodeId, fromNodeId)),
    ))
  if (existing) { res.status(409).json({ error: 'Ces deux fiches sont déjà reliées', linkId: existing.id }); return }

  await db.insert(codexBoardLinks).values({ campaignId, fromNodeId, toNodeId, ...style })
  res.json(await publishBoard(campaignId))
})

// PATCH /:id/codex-board/links/:linkId — sens, trait, libellé, ou inverser
router.patch('/:id/codex-board/links/:linkId', async (req, res) => {
  const campaignId = await memberCampaign(req, res)
  if (campaignId == null) return
  const linkId = idParam(req.params.linkId)
  const body = req.body as Record<string, unknown>
  const style = parseLinkStyle(body)
  if (linkId == null || !style) { res.status(400).json({ error: 'Flèche invalide' }); return }

  const [link] = await db
    .select()
    .from(codexBoardLinks)
    .where(and(eq(codexBoardLinks.id, linkId), eq(codexBoardLinks.campaignId, campaignId)))
  if (!link) { res.status(404).json({ error: 'Flèche introuvable' }); return }

  const ends = body.reverse === true ? { fromNodeId: link.toNodeId, toNodeId: link.fromNodeId } : {}
  const changes = { ...style, ...ends }
  if (Object.keys(changes).length > 0) {
    await db.update(codexBoardLinks).set(changes).where(eq(codexBoardLinks.id, linkId))
  }
  res.json(await publishBoard(campaignId))
})

// DELETE /:id/codex-board/links/:linkId
router.delete('/:id/codex-board/links/:linkId', async (req, res) => {
  const campaignId = await memberCampaign(req, res)
  if (campaignId == null) return
  const linkId = idParam(req.params.linkId)
  if (linkId == null) { res.status(400).json({ error: 'Id invalide' }); return }

  await db.delete(codexBoardLinks).where(and(eq(codexBoardLinks.id, linkId), eq(codexBoardLinks.campaignId, campaignId)))
  res.json(await publishBoard(campaignId))
})

export default router
