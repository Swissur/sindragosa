import { test, expect, type Page } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'
import { ouvrirLancement } from '../fixtures/campaign'

/**
 * Nym la Vive est la seule joueuse du bac à sable qui démarre sans aucun état
 * (Bracco est renversé et désarmé, Orlane affaiblie). On lui pose Ralenti, que
 * personne n'a au départ : l'assertion ne peut pas être ambiguë.
 */
const NYM = 'Nym la Vive'
const ETAT = 'ralenti'

/** La ligne d'initiative d'un personnage, repérée par son nom de fiche (donnée du seed). */
function ligne(page: Page, nom: string) {
  return page.locator(`[data-participant-name="${nom}"]`)
}

test("le MJ pose un état sur un PJ, le joueur le voit sur sa fiche", async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('nym') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  try {
    // ── Le MJ lance un combat depuis la rencontre du bac à sable ──
    await ouvrirLancement(pageMj)
    await pageMj.getByRole('button', { name: 'Lancer !' }).click()
    await expect(pageMj).toHaveURL(/\/combat\/\d+$/)

    // ── Il déplie la ligne de Nym et ouvre la feuille des états ──
    const ligneNym = ligne(pageMj, NYM)
    await expect(ligneNym).toHaveCount(1)
    await expect(ligneNym.getByTestId(`etat-badge-${ETAT}`)).toHaveCount(0)

    const participantId = await ligneNym.getAttribute('data-participant-id')
    await ligneNym.click()
    await pageMj.getByTestId(`open-etats-${participantId}`).click()

    // ── Il tape Ralenti : l'état apparaît sur la ligne ──
    const toggle = pageMj.getByTestId(`etat-toggle-${ETAT}`)
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    const ecriture = pageMj.waitForResponse(
      (r) => r.url().includes('/states') && r.request().method() === 'PATCH' && r.ok(),
    )
    await toggle.click()
    await ecriture
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await pageMj.keyboard.press('Escape')
    await expect(ligneNym.getByTestId(`etat-badge-${ETAT}`)).toBeVisible()

    // ── La joueuse voit le même état sur sa fiche ──
    await pageJoueur.goto('/personnage')
    await expect(pageJoueur.getByTestId(`etat-toggle-${ETAT}`)).toHaveAttribute('aria-pressed', 'true')

    // ── On repart propre : l'état retiré, le combat terminé ──
    await pageMj.getByTestId(`open-etats-${participantId}`).click()
    const effacement = pageMj.waitForResponse(
      (r) => r.url().includes('/states') && r.request().method() === 'PATCH' && r.ok(),
    )
    await pageMj.getByTestId(`etat-toggle-${ETAT}`).click()
    await effacement
    await pageMj.keyboard.press('Escape')
    await expect(ligneNym.getByTestId(`etat-badge-${ETAT}`)).toHaveCount(0)

    await pageMj.getByRole('button', { name: 'Terminer' }).click()
    await pageMj.getByRole('dialog').getByRole('button', { name: 'Terminer' }).click()
    await expect(pageMj.getByTestId('active-participant')).toHaveCount(0)
  } finally {
    await mj.close()
    await joueur.close()
  }
})

test("un état d'un tour s'efface à la fin du tour de son porteur", async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const pageMj = await mj.newPage()

  try {
    await ouvrirLancement(pageMj)
    await pageMj.getByRole('button', { name: 'Lancer !' }).click()
    await expect(pageMj).toHaveURL(/\/combat\/\d+$/)

    // ── Le MJ pose Peur, 1 tour (la durée par défaut), sur celui qui joue ──
    const actif = pageMj.getByTestId('active-participant')
    const participantId = await actif.getAttribute('data-participant-id')
    const porteur = pageMj.locator(`[data-participant-id="${participantId}"]`)
    await actif.click()
    await pageMj.getByTestId(`open-etats-${participantId}`).click()
    await expect(pageMj.getByTestId('etat-duration-value')).toHaveText('1 tour')

    const ecriture = pageMj.waitForResponse(
      (r) => r.url().includes('/states') && r.request().method() === 'PATCH' && r.ok(),
    )
    await pageMj.getByTestId('etat-toggle-peur').click()
    await ecriture
    await pageMj.keyboard.press('Escape')
    await expect(porteur.getByTestId('etat-badge-peur')).toContainText('1')

    // ── Son tour s'achève : l'état tombe à 0 et disparaît ──
    const suivant = pageMj.waitForResponse(
      (r) => r.url().includes('/next-turn') && r.ok(),
    )
    await pageMj.getByRole('button', { name: 'Suivant' }).click()
    await suivant
    await expect(porteur.getByTestId('etat-badge-peur')).toHaveCount(0)

    await pageMj.getByRole('button', { name: 'Terminer' }).click()
    await pageMj.getByRole('dialog').getByRole('button', { name: 'Terminer' }).click()
    await expect(pageMj.getByTestId('active-participant')).toHaveCount(0)
  } finally {
    await mj.close()
  }
})
