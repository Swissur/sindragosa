import { and, desc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { combatParticipants, combats, rollEvents } from "../db/schema.js";
import { buildCombatSection, type CombatRoll } from "../chat/combatContext.js";
import { serializeCombat } from "../combats/serialize.js";
import { enrichParticipantHp, enrichParticipantStates } from "../combats/sseStore.js";

// Combat actif de la campagne, vu avec les memes droits que l'ecran de combat
// (serializeCombat masque les monstres pour un joueur). Null si aucun combat.
const COMBAT_ROLLS_LIMIT = 20;
export async function fetchCombatContext(campaignId: number, userId: number, isGm: boolean): Promise<string | null> {
  const [combat] = await db
    .select()
    .from(combats)
    .where(and(eq(combats.campaignId, campaignId), eq(combats.status, "active")))
    .orderBy(desc(combats.createdAt))
    .limit(1);
  if (!combat) return null;

  let participants = await db.select().from(combatParticipants).where(eq(combatParticipants.combatId, combat.id));
  participants = await enrichParticipantHp(campaignId, participants);
  participants = await enrichParticipantStates(campaignId, participants);
  const serialized = serializeCombat(combat, participants, isGm);

  const rollFilter = isGm
    ? eq(rollEvents.combatId, combat.id)
    : and(eq(rollEvents.combatId, combat.id), eq(rollEvents.visibility, "public"));
  const rows = await db
    .select({ actorName: rollEvents.actorName, label: rollEvents.label, total: rollEvents.total, damage: rollEvents.damage })
    .from(rollEvents)
    .where(rollFilter)
    .orderBy(desc(rollEvents.createdAt), desc(rollEvents.id))
    .limit(COMBAT_ROLLS_LIMIT);
  // Les plus recents d'abord en base, ordre chronologique dans le prompt.
  const rolls: CombatRoll[] = rows.reverse().map((r) => ({
    actorName: r.actorName,
    label: r.label,
    total: r.total,
    damage: (r.damage as CombatRoll["damage"]) ?? null,
  }));

  return buildCombatSection(serialized, rolls, userId);
}
