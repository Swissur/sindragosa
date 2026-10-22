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
  const creer = async (name: string, color = '') =>
    (await (await page.request.post(`/api/campaigns/${campaignId}/codex`, { data: { name, type: 'personnage', color } })).json()).id as number
  const arthas = await creer(`Arthas ${Date.now()}`, '#d64545')
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

    // La couleur de la fiche teinte sa carte.
    await expect(page.getByTestId(`board-node-${arthas}`)).toHaveClass(/colored/)
    await expect(page.getByTestId(`board-node-${uther}`)).not.toHaveClass(/colored/)

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

test("un lieu s'agrandit et contient un personnage", async ({ browser }) => {
  const bracco = await browser.newContext({ storageState: stateFor('bracco') })
  const page = await bracco.newPage()
  const me = await (await page.request.get('/api/auth/me')).json()
  const campaignId = me.user.activeCampaignId as number
  const base = `/api/campaigns/${campaignId}`
  const creer = async (name: string, type: string) =>
    (await (await page.request.post(`${base}/codex`, { data: { name, type } })).json()).id as number
  const taverne = await creer(`Taverne ${Date.now()}`, 'lieu')
  const thrall = await creer(`Thrall ${Date.now()}`, 'personnage')

  try {
    // Le lieu à l'origine, le personnage posé dedans.
    await page.request.post(`${base}/codex-board/nodes`, { data: { entryId: taverne, x: 0, y: 0 } })
    await page.request.post(`${base}/codex-board/nodes`, { data: { entryId: thrall, x: 40, y: 40 } })
    await ouvrirTableau(page)

    // Toucher le personnage le sélectionne, lui, pas le lieu derrière.
    await page.getByTestId(`board-node-${thrall}`).click()
    await expect(page.getByTestId('board-resize-handle')).toHaveCount(0)
    await expect(page.getByTestId('board-link-handle')).toBeVisible()

    // Le lieu, lui, s'agrandit par son coin.
    const lieu = page.getByTestId(`board-node-${taverne}`)
    const avant = (await lieu.boundingBox())!
    await lieu.click({ position: { x: 20, y: 10 } })
    const coin = await centre(page, 'board-resize-handle')
    await page.mouse.move(coin.x, coin.y)
    await page.mouse.down()
    await page.mouse.move(coin.x + 80, coin.y + 60, { steps: 6 })
    const reponse = page.waitForResponse((r) => r.url().includes('/codex-board/nodes/') && r.request().method() === 'PATCH')
    await page.mouse.up()
    await reponse

    const apres = (await lieu.boundingBox())!
    expect(apres.width).toBeGreaterThan(avant.width + 40)

    const board = await (await page.request.get(`${base}/codex-board`)).json()
    const node = board.nodes.find((n: { entryId: number }) => n.entryId === taverne)
    expect(node.w).toBeGreaterThan(320)
  } finally {
    await page.request.delete(`${base}/codex/${taverne}`)
    await page.request.delete(`${base}/codex/${thrall}`)
    await bracco.close()
  }
})
