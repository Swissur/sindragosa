import { expect, type Page } from '@playwright/test'

/**
 * Le MJ entre dans le bac à sable, ouvre le volet combat et arrive au choix
 * des joueurs : de la rencontre seedée, ou d'un combat vide.
 * Il ne reste qu'à (dé)sélectionner des joueurs puis « Lancer ! ».
 */
export async function ouvrirLancement(page: Page, { rencontre = true } = {}) {
  await page.goto('/campagnes')
  await page.getByTestId('campaign-select').selectOption({ label: 'Bac à sable (MJ)' })
  await expect(page).toHaveURL(/\/campagnes\/\d+$/)
  await page.getByTestId('gm-combat').click()
  if (rencontre) await page.getByTestId('encounter-play').first().click()
  else await page.getByTestId('combat-empty').click()
}
