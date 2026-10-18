import { test, expect, type Page } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'

/** Équipement (plans/35-equipement.md). Les objets viennent du bac à sable (dev/seed.ts). */

const isCharacterPut = (r: { url(): string; request(): { method(): string }; ok(): boolean }) =>
  /\/api\/characters\/\d+$/.test(r.url()) && r.request().method() === 'PUT' && r.ok()

async function activeCharacter(page: Page) {
  const chars = await (await page.request.get('/api/characters')).json()
  return chars.find((c: { isActive: boolean }) => c.isActive)
}

test('retirer puis remettre une armure change l’AP', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('bracco') })
  const page = await ctx.newPage()
  try {
    // Cuirasse de plaques : AP 4, équipée.
    await page.goto('/personnage')
    await expect(page.getByTestId('armor-value')).toHaveText('4')

    await page.goto('/inventaire')
    let saved = page.waitForResponse(isCharacterPut)
    await page.getByTestId('item-equip-i-cuirasse').click()
    await saved
    expect((await activeCharacter(page)).armor).toBe(0)

    saved = page.waitForResponse(isCharacterPut)
    await page.getByTestId('item-equip-i-cuirasse').click()
    await saved
    await page.goto('/personnage')
    await expect(page.getByTestId('armor-value')).toHaveText('4')
  } finally {
    await ctx.close()
  }
})

test('une arme équipée donne une attaque dans les compétences et dans Mes actions', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('nym') })
  const page = await ctx.newPage()
  try {
    await page.goto('/personnage')
    await page.getByRole('tab', { name: 'Domaines avancés' }).click()
    await expect(page.getByTestId('strike-i-dagues')).toContainText('Dagues jumelles')

    await page.goto('/actions')
    await page.getByRole('tab', { name: 'Combat' }).click()
    // Arme légère : 2 dégâts.
    await expect(page.getByTestId('tile-weapon-i-dagues')).toContainText('2 dégâts')
  } finally {
    await ctx.close()
  }
})

test('un objet fabriqué arrive dans l’inventaire', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('orlane') })
  const page = await ctx.newPage()
  // Tous les dés font 6 : le jet de fabrication réussit à coup sûr.
  await page.addInitScript(() => { Math.random = () => 0.99 })
  const orlane = await activeCharacter(page)
  try {
    await page.request.put(`/api/characters/${orlane.id}`, { data: { crafts: { forge: 1 } } })
    await page.goto('/personnage')
    await page.getByRole('tab', { name: 'Domaines', exact: true }).click()
    await page.getByText('Forge & Métallurgie').click()
    await page.getByTitle('Fabriquer').first().click()

    const saved = page.waitForResponse(isCharacterPut)
    await page.getByTestId('roll-launch').click()
    await expect(page.getByTestId('roll-dice')).toBeVisible({ timeout: 20_000 })
    await saved

    const items = (await activeCharacter(page)).items as { name: string }[]
    expect(items.map((i) => i.name)).toContain('Pointe de lance renforcée')
  } finally {
    await page.request.put(`/api/characters/${orlane.id}`, { data: { crafts: {}, items: orlane.items } })
    await ctx.close()
  }
})
