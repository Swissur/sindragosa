import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { campaigns, campaignMembers, characters, codexEntries, users } from "../db/schema.js";
import type { PartyContext } from "../chat/campaignContext.js";

export type { PartyContext, PartyMember, CodexEntry } from "../chat/campaignContext.js";

// ── Party context for campaign-aware chat ────────────────────────────────────

export async function fetchPartyContext(userId: number): Promise<PartyContext | null> {
  const [user] = await db
    .select({ activeCampaignId: users.activeCampaignId })
    .from(users)
    .where(eq(users.id, userId));
  if (!user?.activeCampaignId) return null;

  const [campaign] = await db
    .select({ name: campaigns.name, gmUserId: campaigns.gmUserId })
    .from(campaigns)
    .where(eq(campaigns.id, user.activeCampaignId));
  if (!campaign) return null;

  const rows = await db
    .select({
      characterId: characters.id,
      name: characters.name,
      people: characters.people,
      profile: characters.profile,
      paths: characters.paths,
      portraitImageId: characters.portraitImageId,
    })
    .from(campaignMembers)
    .innerJoin(characters, eq(characters.id, campaignMembers.characterId))
    .where(eq(campaignMembers.campaignId, user.activeCampaignId));

  const codex = await db
    .select({ type: codexEntries.type, name: codexEntries.name, description: codexEntries.description })
    .from(codexEntries)
    .where(eq(codexEntries.campaignId, user.activeCampaignId))
    .orderBy(codexEntries.type, codexEntries.name);

  return {
    campaignId: user.activeCampaignId,
    campaignName: campaign.name,
    gmUserId: campaign.gmUserId,
    members: rows.map((r) => {
      const paths = (r.paths as Array<{ name: string; rank: number; kind?: string }>) ?? [];
      const cultural = paths.find((p) => p.kind === "culturelle");
      return {
        characterId: r.characterId,
        name: r.name,
        people: r.people,
        profile: r.profile,
        culturalPath: cultural ? `${cultural.name} (rang ${cultural.rank})` : null,
        portraitImageId: r.portraitImageId,
      };
    }),
    codex,
  };
}
