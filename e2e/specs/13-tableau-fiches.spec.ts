import { test, expect } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'
import type { Page } from '@playwright/test'

// Tableau des fiches (plans/44) : un joueur pose deux fiches et les relie,
// l'autre voit la flèche arriver en direct ; le style et le libellé tiennent
// au rechargement.

async function ouvrirTableau(page: Page) {
  await page.goto('/journal?tab=fiches')
  await page.getByTestId('codex-mode-board').click()
  await expect(page.getByTestId('codex-board-canvas')).toBeVisible()
}

async function centre(page: Page, testid: string) {
  const box = await page.getByTestId(testid).boundingBox()
  if (!box) throw new Error(`${testid} invisible`)
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

test('deux fiches reliées par une flèche, partagée en direct', async ({ browser }) => {
  const bracco = await browser.newContext({ storageState: stateFor('bracco') })
  const nym = await browser.newContext({ storageState: stateFor('nym') })
  const page = await bracco.newPage()
  const pageNym = await nym.newPage()

  const me = await (await page.request.get('/api/auth/me')).json()
  const campaignId = me.user.activeCampaignId as number
  const creer = async (name: string) =>
    (await (await page.request.post(`/api/campaigns/${campaignId}/codex`, { data: { name, type: 'personnage' } })).json()).id as number
  const arthas = await creer(`Arthas ${Date.now()}`)
  const uther = await creer(`Uther ${Date.now()}`)

  try {
    await ouvrirTableau(page)
    await ouvrirTableau(pageNym)

    // Bracco pose les deux fiches.
    for (const id of [arthas, uther]) {
      await page.getByTestId('board-add').click()
      await page.getByTestId(`board-place-${id}`).click()
      await expect(page.getByTestId(`board-node-${id}`)).toBeVisible()
    }

    // Il touche Arthas, puis tire la poignée jusqu'à Uther.
    await page.getByTestId(`board-node-${arthas}`).click()
    const depart = await centre(page, 'board-link-handle')
    const arrivee = await centre(page, `board-node-${uther}`)
    await page.mouse.move(depart.x, depart.y)
    await page.mouse.down()
    await page.mouse.move(arrivee.x, arrivee.y, { steps: 8 })
    await page.mouse.up()

    const lien = page.locator('[data-testid^="board-link-"][data-link-id]')
    await expect(lien).toHaveCount(1)
    // Nym la voit arriver sans recharger.
    await expect(pageNym.locator('[data-testid^="board-link-"][data-link-id]')).toHaveCount(1)

    // Pointillé et libellé.
    await lien.click()
    await page.getByTestId('board-stroke-dashed').click()
    await expect(lien.locator('.link-line')).toHaveClass(/dashed/)
    await page.getByTestId('board-label').click()
    await page.getByTestId('board-label-input').fill('trahit')
    await page.getByTestId('board-label-save').click()
    await expect(lien).toContainText('trahit')

    await page.reload()
    await page.getByTestId('codex-mode-board').click()
    const relu = page.locator('[data-testid^="board-link-"][data-link-id]')
    await expect(relu).toContainText('trahit')
    await expect(relu.locator('.link-line')).toHaveClass(/dashed/)
  } finally {
    await page.request.delete(`/api/campaigns/${campaignId}/codex/${arthas}`)
    await page.request.delete(`/api/campaigns/${campaignId}/codex/${uther}`)
    await bracco.close()
    await nym.close()
  }
})
