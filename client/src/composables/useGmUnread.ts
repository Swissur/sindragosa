import { ref } from 'vue'
import { fetchGmUnread } from '../api/campaigns'
import { user } from './useAuth'

/**
 * Messages de l'« Échange avec le MJ » qui m'attendent dans la campagne active :
 * pastille sur le Journal (barre du haut) et sur l'onglet.
 */
export const gmUnreadCount = ref(0)

export async function refreshGmUnread(): Promise<void> {
  const campaignId = user.value?.activeCampaignId
  if (!campaignId) { gmUnreadCount.value = 0; return }
  try {
    gmUnreadCount.value = (await fetchGmUnread(campaignId)).count
  } catch { /* la pastille garde sa dernière valeur */ }
}
