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
    await pageJoueur.keyboard.press('Escape')

    // Il reste dans le journal « Échange avec le MJ ».
    await pageJoueur.goto('/journal?tab=mj')
    await expect(pageJoueur.getByTestId('gm-messages')).toContainText(texte)
  } finally {
    await mj.close()
    await joueur.close()
  }
})

test('le joueur écrit au MJ depuis son journal, le MJ lui répond', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('orlane') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  try {
    // Le MJ est sur son écran : son flux de campagne tourne.
    await ecranMj(pageMj)

    await pageJoueur.goto('/journal?tab=mj')
    const texte = `Je fouille le coffre ${Date.now()}`
    await pageJoueur.getByTestId('gm-exchange-draft').fill(texte)
    await pageJoueur.getByTestId('gm-exchange-send').click()
    await expect(pageJoueur.getByTestId('gm-messages')).toContainText(texte)

    await expect(pageMj.getByTestId('gm-message-body')).toHaveText(texte)
    await pageMj.keyboard.press('Escape')

    // Non lu : pastille sur le Journal et sur la ligne d'Orlane, jusqu'à l'ouverture du fil.
    await expect(pageMj.getByTestId('nav-journal-unread')).toBeVisible()
    const { user: orlane } = await (await pageJoueur.request.get('/api/auth/me')).json()
    await pageMj.goto('/journal?tab=mj')
    await expect(pageMj.getByTestId(`gm-exchange-unread-${orlane.id}`)).toBeVisible()
    await pageMj.getByTestId(`gm-exchange-player-${orlane.id}`).click()
    await expect(pageMj.getByTestId('gm-messages')).toContainText(texte)
    // Lu : la ligne d'Orlane perd sa pastille (d'autres joueurs ont pu écrire, d'où pas la barre du haut).
    await pageMj.getByTestId('gm-exchange-back').click()
    await expect(pageMj.getByTestId(`gm-exchange-unread-${orlane.id}`)).toHaveCount(0)
    await pageMj.getByTestId(`gm-exchange-player-${orlane.id}`).click()

    // Le MJ répond depuis le fil d'Orlane, dans son journal.
    const reponse = `Il est piégé ${Date.now()}`
    await pageMj.getByTestId('gm-exchange-draft').fill(reponse)
    await pageMj.getByTestId('gm-exchange-draft').press('Control+Enter')

    await expect(pageJoueur.getByTestId('gm-message-body')).toHaveText(reponse)
    await pageJoueur.keyboard.press('Escape')
    await expect(pageJoueur.getByTestId('gm-messages')).toContainText(reponse)
    // Elle avait son fil ouvert : la réponse est lue tout de suite.
    await expect(pageJoueur.getByTestId('nav-journal-unread')).toHaveCount(0)
  } finally {
    await mj.close()
    await joueur.close()
  }
})

test('le MJ réinitialise le mot de passe d’un joueur', async ({ browser, request }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const pageMj = await mj.newPage()
  const nouveau = `oubli-${Date.now()}`

  try {
    await ecranMj(pageMj)
    const campaignId = pageMj.url().split('/').pop()
    const { members } = await (await pageMj.request.get(`/api/campaigns/${campaignId}`)).json()
    const joueur = members.find((m: { username: string }) => m.username === 'touche-a-tout')

    await pageMj.getByTestId(`member-${joueur.userId}`).click()
    await pageMj.getByTestId('shortcut-settings').click()
    await pageMj.getByTestId('shortcut-password').fill(nouveau)
    await pageMj.getByTestId('shortcut-password-save').click()
    await expect(pageMj.getByTestId('shortcut-password')).toHaveCount(0)

    const login = await request.post('/api/auth/login', { data: { username: 'touche-a-tout', password: nouveau } })
    expect(login.ok()).toBe(true)
  } finally {
    // Pas de remise à « dev » ici : seedDev() la refait à chaque run.
    await mj.close()
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
