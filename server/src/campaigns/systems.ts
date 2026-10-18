/** Systèmes de jeu proposés à la création d'une campagne. */
export const CAMPAIGN_SYSTEMS = ['wow-forever'] as const

export type CampaignSystem = (typeof CAMPAIGN_SYSTEMS)[number]

export function isCampaignSystem(value: unknown): value is CampaignSystem {
  return CAMPAIGN_SYSTEMS.includes(value as CampaignSystem)
}
