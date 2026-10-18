/**
 * Aiguillage après le login (plans/34-ux-parcours-campagne.md) :
 * une seule campagne → on y entre directement, sinon on choisit.
 * Dans la campagne, le MJ arrive sur son écran, le joueur sur sa fiche
 * (ou sur le choix du personnage s'il en a plusieurs).
 */

export interface EntryCampaign {
  id: number
  gmUserId: number
  isMember: boolean
}

/** Les campagnes que je mène ou où je joue. */
export function myCampaigns<T extends EntryCampaign>(all: T[], userId: number): T[] {
  return all.filter((c) => c.gmUserId === userId || c.isMember)
}

/** Où mène l'entrée dans une campagne. */
export function campaignHome(campaign: EntryCampaign, userId: number, characterCount: number): string {
  if (campaign.gmUserId === userId) return `/campagnes/${campaign.id}`
  // 0 perso : la fiche en crée un ; 1 perso : c'est lui.
  return characterCount > 1 ? '/personnages' : '/personnage'
}

/** La campagne où entrer sans rien demander, ou `null` s'il faut choisir. */
export function autoEntryCampaign<T extends EntryCampaign>(all: T[], userId: number): T | null {
  const mine = myCampaigns(all, userId)
  return mine.length === 1 ? mine[0] : null
}
