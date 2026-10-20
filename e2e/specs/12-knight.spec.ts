import { test, expect } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'

// Deuxième système (plans/43) : une campagne Knight, un joueur qui la rejoint
// reçoit une fiche de chevalier, et son jet de combo arrive dans le log du MJ.
test('un joueur rejoint une campagne Knight et lance un combo vu par le MJ', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('kaeliss') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()
  const nom = `Camelot ${Date.now()}`
  let campaignId: number | null = null
  let sandboxId: number | null = null

  try {
    // Le bac à sable, pour y remettre tout le monde à la fin.
    const all = (await (await pageMj.request.get('/api/campaigns')).json()) as { id: number; name: string }[]
    sandboxId = all.find((c) => c.name === 'Bac à sable')?.id ?? null

    // Le MJ crée la campagne en choisissant Knight.
    await pageMj.goto('/campagnes')
    await pageMj.getByTestId('campaign-create').click()
    await pageMj.getByTestId('campaign-system').selectOption('knight')
    await pageMj.getByTestId('campaign-name').fill(nom)
    await pageMj.getByRole('button', { name: 'Créer' }).click()
    await expect(pageMj).toHaveURL(/\/campagnes\/\d+$/)
    campaignId = Number(pageMj.url().split('/').pop())

    // Le joueur la voit, marquée Knight, et la rejoint.
    await pageJoueur.goto('/campagnes')
    await expect(pageJoueur.getByText(nom).locator('..')).toContainText('Knight')
    await pageJoueur.getByTestId(`campaign-join-${campaignId}`).click()

    // Il a reçu une fiche de chevalier, sans passer par le choix du personnage.
    await expect(pageJoueur).toHaveURL(/\/personnage$/)
    await expect(pageJoueur.getByTestId('hero-name')).toHaveText('Nouveau chevalier')
    await expect(pageJoueur.getByTestId('hp-current')).toHaveText('16')

    // Le MJ ouvre le log, le joueur lance Combat + Hargne.
    await pageMj.getByTitle('Historique des jets').click()
    await expect(pageMj.getByTestId('roll-log')).toBeVisible()

    await pageJoueur.getByRole('tab', { name: 'Aspects' }).click()
    await pageJoueur.getByTestId('carac-combat').click()
    await expect(pageJoueur.getByTestId('knight-roll-sheet')).toBeVisible()
    await expect(pageJoueur.getByTestId('knight-roll-count')).toHaveText('2d6')
    await pageJoueur.getByTestId('knight-roll-go').click()
    await expect(pageJoueur.getByTestId('knight-roll-total')).toBeVisible({ timeout: 15_000 })

    await expect(pageMj.getByTestId('roll-log').getByText('Combat + Hargne').first()).toBeVisible({ timeout: 15_000 })
  } finally {
    // On ne laisse rien traîner pour les autres specs.
    if (sandboxId) {
      await pageJoueur.request.post(`/api/campaigns/${sandboxId}/activate`, { data: {} })
      await pageMj.request.post(`/api/campaigns/${sandboxId}/activate`, { data: {} })
    }
    if (campaignId) await pageMj.request.delete(`/api/campaigns/${campaignId}`)
    await mj.close()
    await joueur.close()
  }
})

test('une fiche WoW Forever ne joue pas une campagne Knight', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const page = await mj.newPage()
  let campaignId: number | null = null

  try {
    const created = await page.request.post('/api/campaigns', { data: { name: `Knight ${Date.now()}`, system: 'knight' } })
    campaignId = ((await created.json()) as { id: number }).id
    const all = (await (await page.request.get('/api/campaigns')).json()) as { id: number; name: string }[]
    const sandbox = all.find((c) => c.name === 'Bac à sable')!

    // Le bac à sable a des fiches WoW Forever : il ne peut pas passer en Knight.
    const res = await page.request.patch(`/api/campaigns/${sandbox.id}`, { data: { system: 'knight' } })
    expect(res.status()).toBe(400)
    await page.request.post(`/api/campaigns/${sandbox.id}/activate`, { data: {} })
  } finally {
    if (campaignId) await page.request.delete(`/api/campaigns/${campaignId}`)
    await mj.close()
  }
})
