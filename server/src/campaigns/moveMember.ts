import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { campaignMembers, campaigns, characters, users } from '../db/schema.js'

// Déplacer un personnage d'une campagne à une autre. Le joueur emmène le sien
// vers n'importe quelle campagne qu'il ne mène pas ; le MJ envoie celui d'un
// joueur de sa campagne vers une autre campagne qu'il mène aussi. Une fiche ne
// joue que les campagnes de son système (plans/43).

export type MoveRefusal = 'same' | 'forbidden' | 'target-forbidden' | 'system-mismatch'

export interface MoveCheck {
  actorId: number
  memberUserId: number
  fromGmId: number
  toGmId: number
  sameCampaign: boolean
}

/** null si le déplacement est permis, sinon la raison du refus. */
export function moveRefusal(c: MoveCheck): MoveRefusal | null {
  if (c.sameCampaign) return 'same'
  const self = c.actorId === c.memberUserId
  if (!self && c.actorId !== c.fromGmId) return 'forbidden'
  // Le MJ d'une campagne n'y joue pas : on n'y envoie pas son perso
  if (c.toGmId === c.memberUserId) return 'target-forbidden'
  if (!self && c.toGmId !== c.actorId) return 'target-forbidden'
  return null
}

export type MoveResult = { ok: true } | { ok: false; error: MoveRefusal | 'not-found' }

export async function moveMember(actorId: number, fromId: number, memberUserId: number, toId: number): Promise<MoveResult> {
  const [from] = await db.select({ gmUserId: campaigns.gmUserId }).from(campaigns).where(eq(campaigns.id, fromId))
  const [to] = await db.select({ gmUserId: campaigns.gmUserId, system: campaigns.system }).from(campaigns).where(eq(campaigns.id, toId))
  if (!from || !to) return { ok: false, error: 'not-found' }

  const refusal = moveRefusal({ actorId, memberUserId, fromGmId: from.gmUserId, toGmId: to.gmUserId, sameCampaign: fromId === toId })
  if (refusal) return { ok: false, error: refusal }

  const [member] = await db
    .select({ characterId: campaignMembers.characterId })
    .from(campaignMembers)
    .where(and(eq(campaignMembers.campaignId, fromId), eq(campaignMembers.userId, memberUserId)))
  if (!member?.characterId) return { ok: false, error: 'not-found' }
  const characterId = member.characterId
  const [character] = await db.select({ system: characters.system }).from(characters).where(eq(characters.id, characterId))
  if (character?.system !== to.system) return { ok: false, error: 'system-mismatch' }

  await db.transaction(async (tx) => {
    await tx
      .delete(campaignMembers)
      .where(and(eq(campaignMembers.campaignId, fromId), eq(campaignMembers.userId, memberUserId)))
    // Déjà membre de la cible avec un autre perso : celui-ci prend sa place
    await tx
      .insert(campaignMembers)
      .values({ campaignId: toId, userId: memberUserId, characterId })
      .onConflictDoUpdate({ target: [campaignMembers.campaignId, campaignMembers.userId], set: { characterId } })
    await tx
      .update(users)
      .set({ activeCampaignId: toId })
      .where(and(eq(users.id, memberUserId), eq(users.activeCampaignId, fromId)))
  })
  return { ok: true }
}
