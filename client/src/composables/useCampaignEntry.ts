import { activateCampaign } from '../api/campaigns'
import { fetchCharacters } from '../api/characters'
import { campaignHome, playableCount, type EntryCampaign } from '../utils/entryRoute'
import { user } from './useAuth'

/**
 * Entre dans une campagne : elle devient la campagne active (le flux SSE suit)
 * et on renvoie l'écran où atterrir.
 */
export async function enterCampaign(campaign: EntryCampaign): Promise<string> {
  const me = user.value
  if (!me) return '/login'
  if (me.activeCampaignId !== campaign.id) {
    await activateCampaign(campaign.id)
    user.value = { ...me, activeCampaignId: campaign.id }
  }
  const characterCount = campaign.gmUserId === me.id ? 0 : playableCount(campaign, await fetchCharacters())
  return campaignHome(campaign, me.id, characterCount)
}
