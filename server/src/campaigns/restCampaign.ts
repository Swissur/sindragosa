import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { campaignMembers, characters } from '../db/schema.js'
import { broadcastCampaignEvent } from './sseStore.js'
import { applyRest, endSession, restDelta, type RestBroadcast, type RestKind } from './rest.js'

/**
 * Fait reposer tout le groupe : écrit chaque fiche de membre et diffuse
 * l'évènement `rest` (feu de camp + modale côté joueurs). Sert au menu repos
 * et à la fin de session (`withLongRest` : la fin de séance inclut un repos long).
 */
export async function restCampaign(
  campaignId: number,
  kind: RestKind,
  withLongRest = false,
): Promise<RestBroadcast> {
  // Les fiches des membres — le MJ n'a pas forcément de personnage.
  const rows = await db
    .select({
      userId: campaignMembers.userId,
      id: characters.id,
      name: characters.name,
      hpCurrent: characters.hpCurrent,
      hpMax: characters.hpMax,
      pcCurrent: characters.pcCurrent,
      states: characters.states,
      abilityUses: characters.abilityUses,
      sessionTicks: characters.sessionTicks,
    })
    .from(campaignMembers)
    .innerJoin(characters, eq(characters.id, campaignMembers.characterId))
    .where(eq(campaignMembers.campaignId, campaignId))

  const deltas: RestBroadcast['deltas'] = []
  for (const row of rows) {
    const before = {
      hpCurrent: row.hpCurrent, hpMax: row.hpMax, pcCurrent: row.pcCurrent,
      states: row.states, abilityUses: row.abilityUses, sessionTicks: row.sessionTicks,
    }
    const after = kind === 'seance' ? endSession(before, withLongRest) : applyRest(before, kind)
    const delta = restDelta(before, after)
    deltas.push({ userId: row.userId, characterName: row.name, delta, after })
    await db
      .update(characters)
      .set({
        hpCurrent: after.hpCurrent,
        pcCurrent: after.pcCurrent,
        states: after.states,
        abilityUses: after.abilityUses,
        sessionTicks: after.sessionTicks,
      })
      .where(eq(characters.id, row.id))
  }

  const event: RestBroadcast = { kind, deltas }
  broadcastCampaignEvent(campaignId, 'rest', event)
  console.log(`[campaign ${campaignId}] repos ${kind} sur ${rows.length} personnage(s)`)
  return event
}
