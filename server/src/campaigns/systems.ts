/** Systèmes de jeu : une campagne en a un, un personnage aussi (plans/43). */
export const CAMPAIGN_SYSTEMS = ['wow-forever', 'knight'] as const

export type CampaignSystem = (typeof CAMPAIGN_SYSTEMS)[number]

export function isCampaignSystem(value: unknown): value is CampaignSystem {
  return CAMPAIGN_SYSTEMS.includes(value as CampaignSystem)
}

/** Le minimum d'un personnage pour choisir celui qui joue une campagne. */
export interface SystemCharacter {
  id: number
  system: string
  isActive: boolean
}

/**
 * Le personnage qui jouera une campagne de ce système : l'actif s'il en est,
 * sinon le premier du bon système. `null` = il faut lui en créer un.
 */
export function pickCharacterFor<T extends SystemCharacter>(list: T[], system: string): T | null {
  const same = list.filter((c) => c.system === system)
  return same.find((c) => c.isActive) ?? same[0] ?? null
}
