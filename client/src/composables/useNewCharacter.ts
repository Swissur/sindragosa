import { fetchCampaign } from '../api/campaigns'
import { createCharacter, type ServerCharacter } from '../api/characters'
import { NEW_CHARACTER_NAME, type GameSystemId } from '../data/systems'
import { user } from './useAuth'

/** Le système de la campagne active : une fiche créée là doit pouvoir y jouer. */
async function activeSystem(): Promise<GameSystemId> {
  const campaignId = user.value?.activeCampaignId
  if (!campaignId) return 'wow-forever'
  try {
    return (await fetchCampaign(campaignId)).system
  } catch {
    return 'wow-forever'
  }
}

/** Crée une fiche vierge du système de la campagne active (plans/43). */
export async function createCharacterHere(): Promise<ServerCharacter> {
  const system = await activeSystem()
  return createCharacter({ system, name: NEW_CHARACTER_NAME[system] })
}
