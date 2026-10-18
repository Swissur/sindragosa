import { test, expect } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'

test.use({ storageState: stateFor('bracco') })

const ROUTES = ['/personnage', '/inventaire', '/journal', '/campagnes']

// Un écran qui plante à l'ouverture, ça se voit dans la console avant de se voir à l'écran.
for (const route of ROUTES) {
  test(`${route} s'ouvre sans erreur`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text())
    })

    await page.goto(route)
    await expect(page).toHaveURL(new RegExp(`${route}$`))
    await expect(page.locator('main')).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('l’ancienne page Mes actions renvoie sur la fiche', async ({ page }) => {
  await page.goto('/actions')
  await expect(page).toHaveURL(/\/personnage$/)
})
