import { test, expect } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'

// Plans/41 : le MJ importe les Mortemines, bat Rhahk'Zor, fait tomber un objet
// du butin et le donne à Bracco, qui le retrouve dans son inventaire.
test('le butin d’un boss tombe et part dans l’inventaire d’un héros', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('bracco') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  try {
    // ── Import du donjon depuis le volet Combat ──
    await pageMj.goto('/campagnes')
    await pageMj.getByTestId('campaign-select').selectOption({ label: 'Bac à sable (MJ)' })
    await expect(pageMj).toHaveURL(/\/campagnes\/\d+$/)
    await pageMj.getByTestId('gm-combat').click()
    await pageMj.getByTestId('section-dungeons').click()
    await pageMj.getByTestId('dungeons-open').click()
    const importe = pageMj.waitForResponse((r) => r.url().endsWith('/encounters/import') && r.ok())
    await pageMj.getByTestId('dungeon-import').first().click()
    await importe

    // ── Les combats sont rangés sous le donjon : on lance Rhahk'Zor ──
    await pageMj.getByTestId('dungeon-group-Les Mortemines').click()
    await pageMj.getByTestId(/^encounter-\d+$/).filter({ hasText: "Rhahk'Zor" })
      .getByTestId('encounter-play').click()
    await pageMj.getByRole('button', { name: 'Lancer !' }).click()
    await expect(pageMj).toHaveURL(/\/combat\/\d+$/)

    // ── Fin du combat : le butin s'ouvre ──
    await pageMj.getByRole('button', { name: 'Terminer' }).click()
    await pageMj.getByRole('dialog').getByRole('button', { name: 'Terminer' }).click()
    await pageMj.getByTestId('loot-roll').click()

    const objet = pageMj.getByTestId('loot-picked')
    await expect(objet).toBeVisible()
    const nom = (await objet.textContent())!.trim()

    const donne = pageMj.waitForResponse((r) => r.url().includes('/loot/') && r.ok())
    await pageMj.locator('[data-testid^="loot-give-"]', { hasText: 'Bracco' }).click()
    await donne
    await expect(pageMj.getByTestId(/^loot-item-\d+$/).filter({ hasText: nom })).toContainText('Bracco')

    // ── Bracco le retrouve dans son inventaire ──
    await pageJoueur.goto('/inventaire')
    // Catégories repliées par défaut, et celle de l'objet tiré n'est pas connue d'avance.
    await expect(pageJoueur.locator('[data-testid^="items-"]').first()).toBeVisible()
    for (const head of await pageJoueur.locator('[data-testid^="items-"]').all()) await head.click()
    await expect(pageJoueur.getByText(nom, { exact: true })).toBeVisible()
  } finally {
    await mj.close()
    await joueur.close()
  }
})
