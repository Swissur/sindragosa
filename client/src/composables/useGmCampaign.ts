import { ref, watch } from 'vue'
import { fetchCampaigns } from '../api/campaigns'
import { user } from './useAuth'

/** Id de la campagne active si j'en suis le MJ, sinon `null`. */
const gmCampaignId = ref<number | null>(null)
/** `true` une fois qu'on sait si je suis MJ : avant, `gmCampaignId` vaut `null` par défaut. */
const gmCampaignResolved = ref(false)

watch(
  () => [user.value?.id, user.value?.activeCampaignId] as const,
  async ([userId, campaignId]) => {
    gmCampaignResolved.value = false
    if (!userId || !campaignId) {
      gmCampaignId.value = null
      gmCampaignResolved.value = true
      return
    }
    try {
      const active = (await fetchCampaigns()).find((c) => c.id === campaignId)
      gmCampaignId.value = active?.gmUserId === userId ? campaignId : null
    } catch {
      gmCampaignId.value = null
    }
    gmCampaignResolved.value = true
  },
  { immediate: true },
)

export function useGmCampaign() {
  return { gmCampaignId, gmCampaignResolved }
}
