import { test, expect } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'

// Parcours campagne (plans/34) : l'écran MJ, ses raccourcis et la session.

async function ecranMj(page: import('@playwright/test').Page) {
  await page.goto('/campagnes')
  await page.getByTestId('campaign-select').selectOption({ label: 'Bac à sable (MJ)' })
  await expect(page).toHaveURL(/\/campagnes\/\d+$/)
}

test('le MJ écrit à un joueur : le message s’ouvre au milieu de son écran', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('orlane') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  try {
    // Le joueur a sa fiche ouverte : son flux de campagne tourne.
    await pageJoueur.goto('/personnage')
    const { user: me } = await (await pageJoueur.request.get('/api/auth/me')).json()

    await ecranMj(pageMj)
    // Il est connecté : pastille verte sur son portrait.
    await expect(pageMj.getByTestId(`member-online-${me.id}`)).toBeVisible()

    await pageMj.getByTestId(`member-${me.id}`).click()
    const texte = `Regarde derrière toi ${Date.now()}`
    await pageMj.getByTestId('shortcut-message').fill(texte)
    await pageMj.getByTestId('shortcut-send').click()

    await expect(pageJoueur.getByTestId('gm-message-body')).toHaveText(texte)
    await pageJoueur.getByTestId('gm-message-ok').click()

    // Il reste dans le journal « Échange avec le MJ ».
    await pageJoueur.goto('/journal?tab=mj')
    await expect(pageJoueur.getByTestId('gm-messages')).toContainText(texte)
  } finally {
    await mj.close()
    await joueur.close()
  }
})

test('début puis fin de session : un seul bouton à la fois', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const page = await mj.newPage()

  try {
    await ecranMj(page)
    await page.getByTestId('session-start').click()
    await expect(page.getByTestId('session-end')).toBeVisible()
    await expect(page.getByTestId('session-start')).toHaveCount(0)

    await page.getByTestId('session-end').click()
    await page.getByTestId('session-end-confirm').click()
    await expect(page.getByTestId('session-start')).toBeVisible()
    await expect(page.getByTestId('session-end')).toHaveCount(0)
  } finally {
    await mj.close()
  }
})
