import { ref, watch } from 'vue'
import { fetchCampaigns } from '../api/campaigns'
import { user } from './useAuth'

/** Id de la campagne active si j'en suis le MJ, sinon `null`. */
const gmCampaignId = ref<number | null>(null)

watch(
  () => [user.value?.id, user.value?.activeCampaignId] as const,
  async ([userId, campaignId]) => {
    if (!userId || !campaignId) {
      gmCampaignId.value = null
      return
    }
    try {
      const active = (await fetchCampaigns()).find((c) => c.id === campaignId)
      gmCampaignId.value = active?.gmUserId === userId ? campaignId : null
    } catch {
      gmCampaignId.value = null
    }
  },
  { immediate: true },
)

export function useGmCampaign() {
  return { gmCampaignId }
}
