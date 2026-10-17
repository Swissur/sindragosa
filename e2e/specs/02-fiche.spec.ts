import { test, expect, type Page } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'

const isCharacterPut = (r: { url(): string; request(): { method(): string }; ok(): boolean }) =>
  /\/api\/characters\/\d+$/.test(r.url()) && r.request().method() === 'PUT' && r.ok()

async function activeCharacter(page: Page) {
  const chars = await (await page.request.get('/api/characters')).json()
  return chars.find((c: { isActive: boolean }) => c.isActive)
}

test.describe('fiche de personnage', () => {
  test.use({ storageState: stateFor('bracco') })

  test('les PV modifiés survivent à un rechargement', async ({ page }) => {
    await page.goto('/personnage')

    const hp = page.getByTestId('hp-current')
    await expect(hp).toBeVisible()
    const before = Number(await hp.innerText())

    // La sauvegarde est debouncée : on attend le vrai PUT plutôt qu'un timer.
    const saved = page.waitForResponse(isCharacterPut)
    await page.getByTestId('hp-minus').click()
    await expect(hp).toHaveText(String(before - 1))
    await saved

    await page.reload()
    await expect(page.getByTestId('hp-current')).toHaveText(String(before - 1))

    // On remet la fiche comme on l'a trouvée : les specs partagent la base.
    const restored = page.waitForResponse(isCharacterPut)
    await page.getByTestId('hp-plus').click()
    await restored
  })

  // Les PV max sont recalculés au chargement (domaines, Endurance) : ils ne
  // doivent jamais rabattre les PV courants d'une fiche déjà juste.
  test('les PV courants ne sont pas rabattus au chargement de la fiche', async ({ page }) => {
    const bracco = await activeCharacter(page)
    await page.goto('/personnage')
    await expect(page.getByTestId('hp-current')).toHaveText(String(bracco.hpCurrent))
  })

  // Régression type août 2026 : un champ absent de la liste blanche du serveur
  // était jeté en silence à chaque sauvegarde.
  test('une spécialité ajoutée survit à un rechargement', async ({ page }) => {
    const bracco = await activeCharacter(page)
    try {
      await page.goto('/personnage')
      await page.getByRole('tab', { name: 'Savoirs' }).click()
      // Athlétisme rang 1, aucune spécialité : une place est libre.
      await page.getByTestId('domain-expand-athletisme').click()
      await page.getByTestId('specialty-input').fill('Escalade e2e')
      const saved = page.waitForResponse(isCharacterPut)
      await page.getByTestId('specialty-add').click()
      await saved

      await page.reload()
      await page.getByRole('tab', { name: 'Savoirs' }).click()
      await page.getByTestId('domain-expand-athletisme').click()
      await expect(page.getByTestId('domain-athletisme').getByText('Escalade e2e')).toBeVisible()
    } finally {
      await page.request.put(`/api/characters/${bracco.id}`, { data: { specialties: bracco.specialties } })
    }
  })
})

test('le MJ récompense un joueur : la coche arrive sur sa fiche', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('kaeliss') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  const kaeliss = await activeCharacter(pageJoueur)
  try {
    const campaigns = await (await pageMj.request.get('/api/campaigns')).json()
    const sandbox = campaigns.find((c: { name: string }) => c.name === 'Bac à sable')
    const detail = await (await pageMj.request.get(`/api/campaigns/${sandbox.id}`)).json()
    const member = detail.members.find((m: { username: string }) => m.username === 'kaeliss')

    await pageMj.goto(`/campagnes/${sandbox.id}/personnage/${member.userId}`)
    await pageMj.getByTestId('open-gm-tools').click()
    // Perception & Sens : rang 1, 1 coche sur 3 → la récompense en fait 2.
    await pageMj.getByTestId('gm-reward-target').selectOption('domain:perception-sens')
    await pageMj.getByTestId('gm-reward').click()
    const patched = pageMj.waitForResponse(
      (r) => r.url().endsWith(`/members/${member.userId}/character`) && r.request().method() === 'PATCH' && r.ok(),
    )
    await pageMj.getByTestId('gm-save').click()
    await patched

    const after = await activeCharacter(pageJoueur)
    expect(after.domains['perception-sens']).toEqual({ rank: 1, ticks: 2 })
    // Une récompense ne compte pas dans la limite de la séance.
    expect(after.sessionTicks).toEqual(kaeliss.sessionTicks)
  } finally {
    await pageJoueur.request.put(`/api/characters/${kaeliss.id}`, { data: { domains: kaeliss.domains } })
    await mj.close()
    await joueur.close()
  }
})

test('un joueur ne peut pas régler la fiche d’un autre', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('bracco') })
  const page = await ctx.newPage()
  try {
    const campaigns = await (await page.request.get('/api/campaigns')).json()
    const sandbox = campaigns.find((c: { name: string }) => c.name === 'Bac à sable')
    const detail = await (await page.request.get(`/api/campaigns/${sandbox.id}`)).json()
    const nym = detail.members.find((m: { username: string }) => m.username === 'nym')

    const res = await page.request.patch(`/api/campaigns/${sandbox.id}/members/${nym.userId}/character`, {
      data: { agi: 9 },
    })
    expect(res.status()).toBe(403)
  } finally {
    await ctx.close()
  }
})
