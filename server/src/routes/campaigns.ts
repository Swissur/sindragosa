import { and, asc, desc, eq, sql } from 'drizzle-orm'
import { Router } from 'express'
import { db } from '../db/index.js'
import { campaigns, campaignMembers, characters, users, encounterTemplates, encounterMonsters, combats, rollEvents } from '../db/schema.js'
import { requireAuth, type AuthRequest } from '../auth/middleware.js'
import { avatarKind, toAvatarLink } from '../avatarUrl.js'
import { broadcastCampaignEvent, broadcastCampaignRoll, getClientsForCampaign, isViewerRequest, onlineUserIds, type SseClient } from '../campaigns/sseStore.js'
import { parsePool } from '../campaigns/rollPool.js'
import { pickGmEditable } from '../characters/updatable.js'
import { isRestKind } from '../campaigns/rest.js'
import { restCampaign } from '../campaigns/restCampaign.js'
import { isCampaignSystem } from '../campaigns/systems.js'
import { dominantColor } from '../campaigns/diceStyle.js'
import { effectiveDiceStyle } from '../campaigns/diceStyleQuery.js'

const router = Router()
router.use(requireAuth)

// GET /api/campaigns — liste toutes les campagnes
router.get('/', async (_req, res) => {
  const rows = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      gmUserId: campaigns.gmUserId,
      gmUsername: users.username,
      createdAt: campaigns.createdAt,
    })
    .from(campaigns)
    .innerJoin(users, eq(users.id, campaigns.gmUserId))
    .orderBy(asc(campaigns.id))

  // Count members per campaign
  const memberCounts = await db
    .select({
      campaignId: campaignMembers.campaignId,
      count: sql<number>`count(*)::int`,
    })
    .from(campaignMembers)
    .groupBy(campaignMembers.campaignId)

  const countMap = new Map(memberCounts.map((r) => [r.campaignId, r.count]))

  // For each campaign, check if current user is a member
  const userId = (_req as unknown as AuthRequest).userId
  const myMemberships = await db
    .select({ campaignId: campaignMembers.campaignId })
    .from(campaignMembers)
    .where(eq(campaignMembers.userId, userId))
  const mySet = new Set(myMemberships.map((r) => r.campaignId))

  res.json(
    rows.map((r) => ({
      ...r,
      memberCount: countMap.get(r.id) ?? 0,
      isMember: mySet.has(r.id),
    })),
  )
})

// POST /api/campaigns — créer une campagne
router.post('/', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const { name, system = 'wow-forever' } = req.body as { name?: string; system?: unknown }
  if (!name?.trim()) {
    res.status(400).json({ error: 'Le nom est requis' })
    return
  }
  if (!isCampaignSystem(system)) {
    res.status(400).json({ error: 'Système inconnu' })
    return
  }

  const [row] = await db
    .insert(campaigns)
    .values({ name: name.trim(), gmUserId: userId, system })
    .returning()

  // Set as active campaign for the GM
  await db.update(users).set({ activeCampaignId: row.id }).where(eq(users.id, userId))

  console.log(`[campaign] created: "${row.name}" by user ${userId}`)
  res.status(201).json(row)
})

// GET /api/campaigns/:id — détail + membres
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  const [campaign] = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      gmUserId: campaigns.gmUserId,
      gmUsername: users.username,
      system: campaigns.system,
      sessionActive: campaigns.sessionActive,
      createdAt: campaigns.createdAt,
    })
    .from(campaigns)
    .innerJoin(users, eq(users.id, campaigns.gmUserId))
    .where(eq(campaigns.id, id))

  if (!campaign) {
    res.status(404).json({ error: 'Campagne introuvable' })
    return
  }

  const members = await db
    .select({
      userId: campaignMembers.userId,
      username: users.username,
      avatarUrl: avatarKind,
      characterId: campaignMembers.characterId,
      characterName: characters.name,
      portraitImageId: characters.portraitImageId,
      joinedAt: campaignMembers.joinedAt,
    })
    .from(campaignMembers)
    .innerJoin(users, eq(users.id, campaignMembers.userId))
    .leftJoin(characters, eq(characters.id, campaignMembers.characterId))
    .where(eq(campaignMembers.campaignId, id))
    .orderBy(asc(campaignMembers.joinedAt), asc(campaignMembers.id))

  const online = new Set(onlineUserIds(id))
  const membersWithPortrait = members.map((m) => ({
    userId: m.userId,
    username: m.username,
    avatarUrl: toAvatarLink(m.userId, m.avatarUrl),
    characterId: m.characterId,
    characterName: m.characterName,
    portraitUrl: m.portraitImageId ? `/api/images/${m.portraitImageId}` : null,
    joinedAt: m.joinedAt,
    online: online.has(m.userId),
  }))

  res.json({ ...campaign, members: membersWithPortrait })
})

// PATCH /api/campaigns/:id — renommer / changer de système (MJ only)
router.patch('/:id', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)

  const check = await verifyGm(id, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const { name, system } = req.body as { name?: unknown; system?: unknown }
  const patch: { name?: string; system?: string } = {}
  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) { res.status(400).json({ error: 'Le nom est requis' }); return }
    patch.name = name.trim()
  }
  if (system !== undefined) {
    if (!isCampaignSystem(system)) { res.status(400).json({ error: 'Système inconnu' }); return }
    patch.system = system
  }
  if (Object.keys(patch).length === 0) { res.status(400).json({ error: 'Rien à modifier' }); return }

  const [row] = await db.update(campaigns).set(patch).where(eq(campaigns.id, id)).returning()
  res.json(row)
})

// POST /api/campaigns/:id/activate — entrer dans une campagne (MJ ou membre)
router.post('/:id/activate', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)

  const check = await verifyMember(id, userId)
  if (check.status === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check.status === 'forbidden') { res.status(403).json({ error: 'Pas membre de cette campagne' }); return }

  await db.update(users).set({ activeCampaignId: id }).where(eq(users.id, userId))
  res.json({ ok: true })
})

// DELETE /api/campaigns/:id — supprimer (GM only)
router.delete('/:id', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)

  const [row] = await db
    .delete(campaigns)
    .where(and(eq(campaigns.id, id), eq(campaigns.gmUserId, userId)))
    .returning({ id: campaigns.id })

  if (!row) {
    res.status(403).json({ error: 'Seul le MJ peut supprimer la campagne' })
    return
  }

  console.log(`[campaign] deleted: id=${id} by user ${userId}`)
  res.json({ ok: true })
})

// POST /api/campaigns/:id/join — rejoindre avec son personnage actif
router.post('/:id/join', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)

  // Verify campaign exists
  const [campaign] = await db
    .select({ id: campaigns.id, gmUserId: campaigns.gmUserId })
    .from(campaigns)
    .where(eq(campaigns.id, id))
  if (!campaign) {
    res.status(404).json({ error: 'Campagne introuvable' })
    return
  }
  if (campaign.gmUserId === userId) {
    res.status(400).json({ error: 'Le MJ ne peut pas rejoindre sa propre campagne en tant que joueur' })
    return
  }

  // Find active character
  const [activeChar] = await db
    .select({ id: characters.id })
    .from(characters)
    .where(and(eq(characters.userId, userId), eq(characters.isActive, true)))
  if (!activeChar) {
    res.status(400).json({ error: 'Aucun personnage actif' })
    return
  }

  // Check not already a member
  const [existing] = await db
    .select({ id: campaignMembers.id })
    .from(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, id), eq(campaignMembers.userId, userId)))
  if (existing) {
    res.status(400).json({ error: 'Déjà membre de cette campagne' })
    return
  }

  const [member] = await db
    .insert(campaignMembers)
    .values({ campaignId: id, userId, characterId: activeChar.id })
    .returning()

  // Set as active campaign
  await db.update(users).set({ activeCampaignId: id }).where(eq(users.id, userId))

  console.log(`[campaign] user ${userId} joined campaign ${id}`)
  res.status(201).json(member)
})

// POST /api/campaigns/:id/leave — quitter la campagne
router.post('/:id/leave', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const id = Number(req.params.id)

  const [row] = await db
    .delete(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, id), eq(campaignMembers.userId, userId)))
    .returning({ id: campaignMembers.id })

  if (!row) {
    res.status(404).json({ error: 'Pas membre de cette campagne' })
    return
  }

  // Update active campaign: pick another membership or clear
  const [remaining] = await db
    .select({ campaignId: campaignMembers.campaignId })
    .from(campaignMembers)
    .where(eq(campaignMembers.userId, userId))
    .orderBy(campaignMembers.joinedAt)
    .limit(1)
  await db.update(users).set({ activeCampaignId: remaining?.campaignId ?? null }).where(eq(users.id, userId))

  console.log(`[campaign] user ${userId} left campaign ${id}`)
  res.json({ ok: true })
})

// GET /api/campaigns/:id/members/:userId/character — fiche d'un joueur (GM only)
router.get('/:id/members/:userId/character', async (req, res) => {
  const currentUserId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const targetUserId = Number(req.params.userId)

  // Verify current user is GM or member of this campaign
  const [campaign] = await db
    .select({ gmUserId: campaigns.gmUserId })
    .from(campaigns)
    .where(eq(campaigns.id, campaignId))
  if (!campaign) {
    res.status(404).json({ error: 'Campagne introuvable' })
    return
  }
  if (campaign.gmUserId !== currentUserId) {
    const [membership] = await db
      .select({ id: campaignMembers.id })
      .from(campaignMembers)
      .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, currentUserId)))
    if (!membership) {
      res.status(403).json({ error: 'Accès réservé aux membres de la campagne' })
      return
    }
  }

  // Get the member's character
  const [member] = await db
    .select({ characterId: campaignMembers.characterId })
    .from(campaignMembers)
    .where(
      and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, targetUserId)),
    )
  if (!member || !member.characterId) {
    res.status(404).json({ error: 'Membre ou personnage introuvable' })
    return
  }

  const [character] = await db
    .select()
    .from(characters)
    .where(eq(characters.id, member.characterId))
  if (!character) {
    res.status(404).json({ error: 'Personnage introuvable' })
    return
  }

  // Lien vers l'image : /api/images autorise déjà le portrait d'un camarade de campagne
  const portraitDataUrl = character.portraitImageId ? `/api/images/${character.portraitImageId}` : null

  res.json({ ...character, portraitDataUrl })
})

// PATCH /api/campaigns/:id/members/:userId/character — le MJ règle la fiche d'un joueur
// (caracs, rangs, récompenses, titres). Le joueur reçoit le patch par SSE pour
// que sa sauvegarde auto n'écrase pas la modif.
router.patch('/:id/members/:userId/character', async (req, res) => {
  const currentUserId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const targetUserId = Number(req.params.userId)

  const check = await verifyGm(campaignId, currentUserId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const patch = pickGmEditable((req.body ?? {}) as Record<string, unknown>)
  if (Object.keys(patch).length === 0) { res.status(400).json({ error: 'Rien à modifier' }); return }

  const [member] = await db
    .select({ characterId: campaignMembers.characterId })
    .from(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, targetUserId)))
  if (!member?.characterId) { res.status(404).json({ error: 'Membre ou personnage introuvable' }); return }

  const [updated] = await db
    .update(characters)
    .set({ ...(patch as Partial<typeof characters.$inferInsert>), updatedAt: new Date() })
    .where(eq(characters.id, member.characterId))
    .returning()

  broadcastCampaignEvent(campaignId, 'character', { userId: targetUserId, characterId: updated.id, patch })
  res.json(updated)
})

// ── Helper: verify GM ownership ─────────────────────────────────────────────
async function verifyGm(campaignId: number, userId: number) {
  const [campaign] = await db
    .select({ gmUserId: campaigns.gmUserId })
    .from(campaigns)
    .where(eq(campaigns.id, campaignId))
  if (!campaign) return 'not_found' as const
  if (campaign.gmUserId !== userId) return 'forbidden' as const
  return 'ok' as const
}

// ── Encounter Templates ─────────────────────────────────────────────────────

// GET /api/campaigns/:id/encounters — liste les rencontres
router.get('/:id/encounters', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const rows = await db
    .select({
      id: encounterTemplates.id,
      name: encounterTemplates.name,
      description: encounterTemplates.description,
      createdAt: encounterTemplates.createdAt,
    })
    .from(encounterTemplates)
    .where(eq(encounterTemplates.campaignId, campaignId))
    .orderBy(asc(encounterTemplates.id))

  // Count monsters per encounter
  const counts = await db
    .select({
      encounterId: encounterMonsters.encounterId,
      count: sql<number>`count(*)::int`,
    })
    .from(encounterMonsters)
    .groupBy(encounterMonsters.encounterId)

  const countMap = new Map(counts.map((r) => [r.encounterId, r.count]))

  res.json(rows.map((r) => ({ ...r, monsterCount: countMap.get(r.id) ?? 0 })))
})

// POST /api/campaigns/:id/encounters — créer une rencontre
router.post('/:id/encounters', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const { name, description } = req.body as { name?: string; description?: string }
  if (!name?.trim()) { res.status(400).json({ error: 'Le nom est requis' }); return }

  const [row] = await db
    .insert(encounterTemplates)
    .values({ campaignId, name: name.trim(), description: description?.trim() || null })
    .returning()

  res.status(201).json(row)
})

// GET /api/campaigns/:id/encounters/:eid — détail d'une rencontre
router.get('/:id/encounters/:eid', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const eid = Number(req.params.eid)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const [encounter] = await db
    .select()
    .from(encounterTemplates)
    .where(and(eq(encounterTemplates.id, eid), eq(encounterTemplates.campaignId, campaignId)))
  if (!encounter) { res.status(404).json({ error: 'Rencontre introuvable' }); return }

  const monsters = await db
    .select()
    .from(encounterMonsters)
    .where(eq(encounterMonsters.encounterId, eid))
    .orderBy(asc(encounterMonsters.id))

  res.json({ ...encounter, monsters })
})

// PUT /api/campaigns/:id/encounters/:eid — modifier nom/description
router.put('/:id/encounters/:eid', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const eid = Number(req.params.eid)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const { name, description } = req.body as { name?: string; description?: string }

  const [row] = await db
    .update(encounterTemplates)
    .set({
      ...(name !== undefined ? { name: name.trim() } : {}),
      ...(description !== undefined ? { description: description.trim() || null } : {}),
    })
    .where(and(eq(encounterTemplates.id, eid), eq(encounterTemplates.campaignId, campaignId)))
    .returning()

  if (!row) { res.status(404).json({ error: 'Rencontre introuvable' }); return }
  res.json(row)
})

// DELETE /api/campaigns/:id/encounters/:eid — supprimer une rencontre
router.delete('/:id/encounters/:eid', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const eid = Number(req.params.eid)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const [row] = await db
    .delete(encounterTemplates)
    .where(and(eq(encounterTemplates.id, eid), eq(encounterTemplates.campaignId, campaignId)))
    .returning({ id: encounterTemplates.id })

  if (!row) { res.status(404).json({ error: 'Rencontre introuvable' }); return }
  res.json({ ok: true })
})

// ── Encounter Monsters ──────────────────────────────────────────────────────

// POST /api/campaigns/:id/encounters/:eid/monsters — ajouter un monstre
router.post('/:id/encounters/:eid/monsters', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const eid = Number(req.params.eid)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  // Verify encounter belongs to campaign
  const [enc] = await db
    .select({ id: encounterTemplates.id })
    .from(encounterTemplates)
    .where(and(eq(encounterTemplates.id, eid), eq(encounterTemplates.campaignId, campaignId)))
  if (!enc) { res.status(404).json({ error: 'Rencontre introuvable' }); return }

  const body = req.body as Record<string, unknown>

  const [row] = await db
    .insert(encounterMonsters)
    .values({
      encounterId: eid,
      name: String(body.name ?? 'Monstre'),
      threat: Number(body.threat ?? 0),
      size: String(body.size ?? 'moyenne'),
      armor: Number(body.armor ?? 0),
      defense: Number(body.defense ?? 2),
      pv: Number(body.pv ?? 1),
      init: Number(body.init ?? 0),
      statFor: Number(body.statFor ?? 2),
      statAgi: Number(body.statAgi ?? 2),
      statEnd: Number(body.statEnd ?? 2),
      statInt: Number(body.statInt ?? 2),
      statSag: Number(body.statSag ?? 2),
      statCha: Number(body.statCha ?? 2),
      attacks: body.attacks ?? [],
      abilities: body.abilities ?? [],
      description: body.description ? String(body.description) : null,
      hidden: body.hidden === true,
    })
    .returning()

  res.status(201).json(row)
})

// POST /api/campaigns/:id/encounters/:eid/monsters/:mid/duplicate — dupliquer
router.post('/:id/encounters/:eid/monsters/:mid/duplicate', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const eid = Number(req.params.eid)
  const mid = Number(req.params.mid)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  // Verify encounter belongs to campaign
  const [enc] = await db
    .select({ id: encounterTemplates.id })
    .from(encounterTemplates)
    .where(and(eq(encounterTemplates.id, eid), eq(encounterTemplates.campaignId, campaignId)))
  if (!enc) { res.status(404).json({ error: 'Rencontre introuvable' }); return }

  // Get the monster to duplicate
  const [source] = await db.select().from(encounterMonsters).where(eq(encounterMonsters.id, mid))
  if (!source || source.encounterId !== eid) {
    res.status(404).json({ error: 'Monstre introuvable' }); return
  }

  // Get all monsters in this encounter to determine numbering
  const allMonsters = await db
    .select({ id: encounterMonsters.id, name: encounterMonsters.name })
    .from(encounterMonsters)
    .where(eq(encounterMonsters.encounterId, eid))

  // Strip trailing " <number>" suffix (space required before digits) to get base name
  const baseNameMatch = source.name.match(/^(.+)\s+(\d+)$/)
  const baseName = baseNameMatch ? baseNameMatch[1] : source.name

  // Find existing numbered copies
  const regex = new RegExp(`^${baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s+(\\d+))?$`)
  const existingNumbers = allMonsters
    .filter((m) => regex.test(m.name))
    .map((m) => {
      const match = m.name.match(regex)
      return match?.[1] ? Number(match[1]) : 0
    })

  const nextNumber = Math.max(...existingNumbers, 0) + 1

  // If source has no number yet and this is the first duplicate, rename it to 1
  const sourceHasNumber = baseNameMatch !== null
  if (!sourceHasNumber && nextNumber === 1) {
    await db
      .update(encounterMonsters)
      .set({ name: `${baseName} 1` })
      .where(eq(encounterMonsters.id, mid))
  }

  const duplicateNumber = sourceHasNumber ? nextNumber : nextNumber + 1

  // Create the copy
  const { id: _id, ...sourceData } = source
  const [newRow] = await db
    .insert(encounterMonsters)
    .values({
      ...sourceData,
      name: `${baseName} ${duplicateNumber}`,
    })
    .returning()

  // Return all monsters so client can update the full list (source may have been renamed)
  const updatedMonsters = await db
    .select()
    .from(encounterMonsters)
    .where(eq(encounterMonsters.encounterId, eid))
    .orderBy(asc(encounterMonsters.id))

  res.status(201).json(updatedMonsters)
})

// PUT /api/campaigns/:id/encounters/:eid/monsters/:mid — modifier un monstre
router.put('/:id/encounters/:eid/monsters/:mid', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const eid = Number(req.params.eid)
  const mid = Number(req.params.mid)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  // Verify monster → encounter → campaign ownership
  const [target] = await db
    .select({ id: encounterMonsters.id })
    .from(encounterMonsters)
    .innerJoin(encounterTemplates, eq(encounterMonsters.encounterId, encounterTemplates.id))
    .where(and(
      eq(encounterMonsters.id, mid),
      eq(encounterMonsters.encounterId, eid),
      eq(encounterTemplates.campaignId, campaignId),
    ))
  if (!target) { res.status(404).json({ error: 'Monstre introuvable' }); return }

  const body = req.body as Record<string, unknown>

  const [row] = await db
    .update(encounterMonsters)
    .set({
      ...(body.name !== undefined ? { name: String(body.name) } : {}),
      ...(body.threat !== undefined ? { threat: Number(body.threat) } : {}),
      ...(body.size !== undefined ? { size: String(body.size) } : {}),
      ...(body.armor !== undefined ? { armor: Number(body.armor) } : {}),
      ...(body.defense !== undefined ? { defense: Number(body.defense) } : {}),
      ...(body.pv !== undefined ? { pv: Number(body.pv) } : {}),
      ...(body.init !== undefined ? { init: Number(body.init) } : {}),
      ...(body.statFor !== undefined ? { statFor: Number(body.statFor) } : {}),
      ...(body.statAgi !== undefined ? { statAgi: Number(body.statAgi) } : {}),
      ...(body.statEnd !== undefined ? { statEnd: Number(body.statEnd) } : {}),
      ...(body.statInt !== undefined ? { statInt: Number(body.statInt) } : {}),
      ...(body.statSag !== undefined ? { statSag: Number(body.statSag) } : {}),
      ...(body.statCha !== undefined ? { statCha: Number(body.statCha) } : {}),
      ...(body.attacks !== undefined ? { attacks: body.attacks } : {}),
      ...(body.abilities !== undefined ? { abilities: body.abilities } : {}),
      ...(body.description !== undefined ? { description: body.description ? String(body.description) : null } : {}),
      ...(body.hidden !== undefined ? { hidden: body.hidden === true } : {}),
    })
    .where(eq(encounterMonsters.id, mid))
    .returning()

  if (!row) { res.status(404).json({ error: 'Monstre introuvable' }); return }
  res.json(row)
})

// DELETE /api/campaigns/:id/encounters/:eid/monsters/:mid — supprimer un monstre
router.delete('/:id/encounters/:eid/monsters/:mid', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)
  const eid = Number(req.params.eid)
  const mid = Number(req.params.mid)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  // Verify monster → encounter → campaign ownership
  const [target] = await db
    .select({ id: encounterMonsters.id })
    .from(encounterMonsters)
    .innerJoin(encounterTemplates, eq(encounterMonsters.encounterId, encounterTemplates.id))
    .where(and(
      eq(encounterMonsters.id, mid),
      eq(encounterMonsters.encounterId, eid),
      eq(encounterTemplates.campaignId, campaignId),
    ))
  if (!target) { res.status(404).json({ error: 'Monstre introuvable' }); return }

  const [row] = await db
    .delete(encounterMonsters)
    .where(eq(encounterMonsters.id, mid))
    .returning({ id: encounterMonsters.id })

  if (!row) { res.status(404).json({ error: 'Monstre introuvable' }); return }
  res.json({ ok: true })
})

// ── Log de jets (portée campagne) ───────────────────────────────────────────

// Helper: membre (MJ ou joueur) — renvoie aussi le gmUserId pour le filtrage.
async function verifyMember(campaignId: number, userId: number) {
  const [campaign] = await db
    .select({ gmUserId: campaigns.gmUserId })
    .from(campaigns)
    .where(eq(campaigns.id, campaignId))
  if (!campaign) return { status: 'not_found' as const, gmUserId: 0 }
  if (campaign.gmUserId === userId) return { status: 'ok' as const, gmUserId: campaign.gmUserId }
  const [membership] = await db
    .select({ id: campaignMembers.id })
    .from(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, userId)))
  if (!membership) return { status: 'forbidden' as const, gmUserId: campaign.gmUserId }
  return { status: 'ok' as const, gmUserId: campaign.gmUserId }
}

// POST /api/campaigns/:id/rolls — logger un jet (en combat ou non)
router.post('/:id/rolls', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const check = await verifyMember(campaignId, userId)
  if (check.status !== 'ok') { res.status(403).json({ error: 'Non autorisé' }); return }

  const body = req.body as {
    kind?: string; label?: string; context?: string
    die?: number; sides?: number; bonus?: number; total?: number
    rolls?: number[]; dropped?: number[]; damage?: { total: number; critical: boolean; fumble: boolean }
    pool?: unknown
    asMonster?: string
  }
  if (typeof body.die !== 'number' || typeof body.sides !== 'number' || typeof body.total !== 'number') {
    res.status(400).json({ error: 'Jet invalide' }); return
  }

  const isGm = userId === check.gmUserId

  // actorName imposé par le serveur (anti-usurpation) : nom du personnage du
  // membre, ou nom du monstre pour le MJ.
  // Tout jet lancé par le MJ est caché — monstre ou pas. Un dé du MJ derrière
  // son écran ne doit jamais s'afficher chez les joueurs.
  let actorName: string
  let actorKind: 'player' | 'monster' = 'player'
  let visibility: 'public' | 'gm' = isGm ? 'gm' : 'public'
  if (body.asMonster) {
    if (!isGm) { res.status(403).json({ error: 'Réservé au MJ' }); return }
    actorName = String(body.asMonster)
    actorKind = 'monster'
    visibility = 'gm'
  } else {
    const [member] = await db
      .select({ characterName: characters.name })
      .from(campaignMembers)
      .leftJoin(characters, eq(characters.id, campaignMembers.characterId))
      .where(and(eq(campaignMembers.campaignId, campaignId), eq(campaignMembers.userId, userId)))
    actorName = member?.characterName ?? (isGm ? 'MJ' : '')
    if (!actorName) { res.status(403).json({ error: 'Aucun personnage dans cette campagne' }); return }
  }

  // Le combat n'est qu'un tag : le serveur le résout lui-même, le client
  // n'a rien à savoir du combat en cours.
  const [activeCombat] = await db
    .select({ id: combats.id })
    .from(combats)
    .where(and(eq(combats.campaignId, campaignId), eq(combats.status, 'active')))
    .orderBy(desc(combats.createdAt))
    .limit(1)

  const [event] = await db.insert(rollEvents).values({
    campaignId,
    combatId: activeCombat?.id ?? null,
    userId,
    actorName,
    actorKind,
    visibility,
    kind: String(body.kind ?? 'libre').slice(0, 20),
    label: String(body.label ?? 'Jet'),
    context: String(body.context ?? 'libre').slice(0, 30),
    die: Math.round(body.die),
    sides: Math.round(body.sides),
    bonus: Math.round(body.bonus ?? 0),
    total: Math.round(body.total),
    rolls: Array.isArray(body.rolls) ? body.rolls : null,
    dropped: Array.isArray(body.dropped) ? body.dropped : null,
    damage: body.damage ?? null,
    pool: parsePool(body.pool),
  }).returning()

  // Le style du dé voyage avec le jet : les autres membres l'affichent en 3D
  // aux couleurs du lanceur. Il n'est pas stocké, seulement diffusé.
  const diceStyle = await effectiveDiceStyle(userId, campaignId)
  const payload = { ...event, diceStyle, diceColor: dominantColor(diceStyle) }
  broadcastCampaignRoll(campaignId, check.gmUserId, payload)
  res.status(201).json(payload)
})

// GET /api/campaigns/:id/rolls — historique (les non-MJ ne voient pas les jets PNJ)
router.get('/:id/rolls', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const check = await verifyMember(campaignId, userId)
  if (check.status !== 'ok') { res.status(403).json({ error: 'Non autorisé' }); return }

  const isGm = userId === check.gmUserId && !isViewerRequest(req)
  const where = isGm
    ? eq(rollEvents.campaignId, campaignId)
    : and(eq(rollEvents.campaignId, campaignId), eq(rollEvents.visibility, 'public'))

  // Les 200 plus récents, renvoyés en ordre chronologique.
  const rows = await db.select().from(rollEvents)
    .where(where)
    .orderBy(desc(rollEvents.createdAt), desc(rollEvents.id))
    .limit(200)

  res.json(rows.reverse())
})

// ── Repos partagé ───────────────────────────────────────────────────────────

// POST /api/campaigns/:id/rest — le MJ fait dormir tout le groupe (MJ only)
router.post('/:id/rest', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const check = await verifyMember(campaignId, userId)
  if (check.status !== 'ok') { res.status(403).json({ error: 'Non autorisé' }); return }
  if (userId !== check.gmUserId) { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const { kind } = req.body as { kind?: unknown }
  if (!isRestKind(kind)) { res.status(400).json({ error: 'Type de repos inconnu' }); return }

  res.json(await restCampaign(campaignId, kind))
})

// POST /api/campaigns/:id/session — début / fin de session (MJ only).
// La fin de session fait la « fin de séance » : chance + coches remises,
// plus un repos long si le MJ l'a coché (`longRest`).
router.post('/:id/session', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const check = await verifyGm(campaignId, userId)
  if (check === 'not_found') { res.status(404).json({ error: 'Campagne introuvable' }); return }
  if (check === 'forbidden') { res.status(403).json({ error: 'Réservé au MJ' }); return }

  const { active, longRest } = req.body as { active?: unknown; longRest?: unknown }
  if (typeof active !== 'boolean') { res.status(400).json({ error: 'active attendu' }); return }

  const [before] = await db
    .select({ sessionActive: campaigns.sessionActive })
    .from(campaigns)
    .where(eq(campaigns.id, campaignId))
  if (before.sessionActive === active) { res.json({ sessionActive: active }); return }

  await db.update(campaigns).set({ sessionActive: active }).where(eq(campaigns.id, campaignId))
  if (!active) await restCampaign(campaignId, 'seance', longRest === true)
  broadcastCampaignEvent(campaignId, 'session', { sessionActive: active })
  res.json({ sessionActive: active })
})

/** Pastille verte de l'écran MJ : qui a un flux ouvert sur la campagne. */
function broadcastPresence(campaignId: number) {
  broadcastCampaignEvent(campaignId, 'presence', { online: onlineUserIds(campaignId) })
}

// GET /api/campaigns/:id/events — flux SSE des jets de la campagne
router.get('/:id/events', async (req, res) => {
  const userId = (req as unknown as AuthRequest).userId
  const campaignId = Number(req.params.id)

  const check = await verifyMember(campaignId, userId)
  if (check.status !== 'ok') { res.status(403).json({ error: 'Non autorisé' }); return }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })

  const client: SseClient = { res, userId, viewer: isViewerRequest(req) }
  const clients = getClientsForCampaign(campaignId)
  clients.add(client)
  broadcastPresence(campaignId)

  // Heartbeat : le proxy Fly coupe une connexion inactive (~60s).
  const heartbeat = setInterval(() => { res.write(': ping\n\n') }, 25000)

  req.on('close', () => {
    clearInterval(heartbeat)
    clients.delete(client)
    broadcastPresence(campaignId)
  })
})

export default router
