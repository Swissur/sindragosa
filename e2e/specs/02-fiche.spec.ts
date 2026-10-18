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
      await page.getByRole('tab', { name: 'Domaines', exact: true }).click()
      // Athlétisme rang 1, aucune spécialité : une place est libre.
      await page.getByTestId('domain-expand-athletisme').click()
      await page.getByTestId('specialty-other').click()
      await page.getByTestId('specialty-input').fill('Escalade e2e')
      const saved = page.waitForResponse(isCharacterPut)
      await page.getByTestId('specialty-add').click()
      await saved

      await page.reload()
      await page.getByRole('tab', { name: 'Domaines', exact: true }).click()
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

// Retirer une spécialité est définitif (elle perd ses rangs) : le MJ seul, après confirmation.
test('seul le MJ retire une spécialité, après confirmation', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('bracco') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  const bracco = await activeCharacter(pageJoueur)
  try {
    await pageJoueur.goto('/personnage')
    await pageJoueur.getByTestId('sheet-edit').click()
    await pageJoueur.getByRole('tab', { name: 'Domaines', exact: true }).click()
    await pageJoueur.getByTestId('domain-expand-melee-bourrine').click()
    await expect(pageJoueur.getByTestId('domain-melee-bourrine').getByText('Boucliers', { exact: true })).toBeVisible()
    await expect(pageJoueur.getByTestId('specialty-remove-s-boucliers')).toHaveCount(0)

    const campaigns = await (await pageMj.request.get('/api/campaigns')).json()
    const sandbox = campaigns.find((c: { name: string }) => c.name === 'Bac à sable')
    const detail = await (await pageMj.request.get(`/api/campaigns/${sandbox.id}`)).json()
    const member = detail.members.find((m: { username: string }) => m.username === 'bracco')

    await pageMj.goto(`/campagnes/${sandbox.id}/personnage/${member.userId}`)
    await pageMj.getByRole('tab', { name: 'Domaines', exact: true }).click()
    await pageMj.getByTestId('domain-expand-melee-bourrine').click()
    await pageMj.getByTestId('specialty-remove-s-boucliers').click()
    const patched = pageMj.waitForResponse(
      (r) => r.url().endsWith(`/members/${member.userId}/character`) && r.request().method() === 'PATCH' && r.ok(),
    )
    await pageMj.getByTestId('specialty-remove-confirm').click()
    await patched
    await expect(pageMj.getByTestId('specialty-remove-s-boucliers')).toHaveCount(0)

    const after = await activeCharacter(pageJoueur)
    expect(after.specialties.map((x: { id: string }) => x.id)).toEqual(['s-haches'])
  } finally {
    await pageJoueur.request.put(`/api/characters/${bracco.id}`, { data: { specialties: bracco.specialties } })
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

test('un domaine mis en favori depuis la fiche arrive dans Mes actions', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('kaeliss') })
  const page = await ctx.newPage()
  try {
    // Kaeliss a 4 domaines entamés : les favoris par défaut n'en prennent que 3,
    // Acrobatie & Furtivité (rang 1, aucune coche) reste dehors.
    await page.goto('/actions')
    await expect(page.getByTestId('tile-domain-tir-lancer')).toBeVisible()
    await expect(page.getByTestId('tile-domain-acrobatie-furtivite')).toHaveCount(0)

    await page.goto('/personnage')
    await page.getByRole('tab', { name: 'Domaines', exact: true }).click()
    await page.getByTestId('domain-pin-acrobatie-furtivite').click()

    await page.goto('/actions')
    await expect(page.getByTestId('tile-domain-acrobatie-furtivite')).toBeVisible()
  } finally {
    await ctx.close()
  }
})

test('le joueur ne voit que ses compétences débloquées, le MJ voit tout le catalogue', async ({ browser }) => {
  const joueur = await browser.newContext({ storageState: stateFor('orlane') })
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const pageJoueur = await joueur.newPage()
  const pageMj = await mj.newPage()
  try {
    await pageJoueur.goto('/personnage')
    await pageJoueur.getByRole('tab', { name: 'Compétences' }).click()
    // Sections repliées par défaut : Déflagration d'Arcane est sous Intelligence
    await pageJoueur.getByTestId('abilities-int').click()
    // Déflagration d'Arcane (#46) est débloquée, Attaque sournoise (#1) ne l'est pas.
    await expect(pageJoueur.getByTestId('ability-46')).toBeVisible()
    await expect(pageJoueur.getByTestId('ability-1')).toHaveCount(0)
    await expect(pageJoueur.getByTestId('abilities-locked')).toHaveCount(0)

    const campaigns = await (await pageMj.request.get('/api/campaigns')).json()
    const sandbox = campaigns.find((c: { name: string }) => c.name === 'Bac à sable')
    const detail = await (await pageMj.request.get(`/api/campaigns/${sandbox.id}`)).json()
    const orlane = detail.members.find((m: { username: string }) => m.username === 'orlane')
    await pageMj.goto(`/campagnes/${sandbox.id}/personnage/${orlane.userId}`)
    await pageMj.getByRole('tab', { name: 'Compétences' }).click()
    await pageMj.getByTestId('abilities-locked').click()
    await expect(pageMj.getByTestId('ability-1')).toBeVisible()
  } finally {
    await joueur.close()
    await mj.close()
  }
})

test('le joueur retrouve une compétence débloquée par recherche et par type', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('orlane') })
  const page = await ctx.newPage()
  try {
    await page.goto('/personnage')
    await page.getByRole('tab', { name: 'Compétences' }).click()
    // Sections repliées : rien de visible tant qu'on ne cherche pas.
    await expect(page.getByTestId('ability-46')).toHaveCount(0)

    // La recherche ignore casse et accents, et ouvre la section qui contient le résultat.
    await page.getByTestId('abilities-search').fill('deflagration')
    await expect(page.getByTestId('ability-46').first()).toBeVisible()

    // Déflagration d'Arcane n'est pas un passif.
    await page.getByTestId('abilities-type').selectOption('passif')
    await expect(page.getByTestId('ability-46')).toHaveCount(0)
  } finally {
    await ctx.close()
  }
})

// Domaines avancés (2026-10-18) : ouverts par leurs prérequis, lancés avec la
// plus haute des caractéristiques liées.
test('un domaine avancé s’ouvre par ses prérequis et se lance', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('orlane') })
  const page = await ctx.newPage()
  try {
    await page.goto('/personnage')
    await page.getByRole('tab', { name: 'Domaines', exact: true }).click()
    // Chronomancie : Magie profane & Arcanes 3 + Histoire & Géographie 1 → Orlane y est.
    await expect(page.getByTestId('advanced-chronomancie')).toBeVisible()
    // Démonologie demande Magie de l'Ombre & Fél 2 : fermé, donc invisible.
    await expect(page.getByTestId('advanced-demonologie-fel')).toHaveCount(0)

    await page.getByTestId('advanced-roll-chronomancie').click()
    await expect(page.getByTestId('roll-formula')).toContainText('INT 3')
    await expect(page.getByTestId('roll-formula')).toContainText('= 3d6')
  } finally {
    await ctx.close()
  }
})

test('seul le MJ accorde un titre', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('nym') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  const nym = await activeCharacter(pageJoueur)
  const campaigns = await (await pageMj.request.get('/api/campaigns')).json()
  const sandbox = campaigns.find((c: { name: string }) => c.name === 'Bac à sable')
  const detail = await (await pageMj.request.get(`/api/campaigns/${sandbox.id}`)).json()
  const member = detail.members.find((m: { username: string }) => m.username === 'nym')
  const memberCharacter = `/api/campaigns/${sandbox.id}/members/${member.userId}/character`

  try {
    // Le joueur tente de s'accorder un titre par l'API : le serveur l'ignore.
    await pageJoueur.request.put(`/api/characters/${nym.id}`, { data: { titles: ['Héros d’Azeroth'] } })
    expect((await activeCharacter(pageJoueur)).titles).toEqual([])

    // Le MJ le choisit dans la liste de ses outils.
    await pageMj.goto(`/campagnes/${sandbox.id}/personnage/${member.userId}`)
    await pageMj.getByTestId('open-gm-tools').click()
    await pageMj.getByTestId('gm-title-select').selectOption('Saigneur de la Nuit')
    await pageMj.getByTestId('gm-title-add').click()
    const patched = pageMj.waitForResponse(
      (r) => r.url().endsWith(memberCharacter) && r.request().method() === 'PATCH' && r.ok(),
    )
    await pageMj.getByTestId('gm-save').click()
    await patched

    expect((await activeCharacter(pageJoueur)).titles).toEqual(['Saigneur de la Nuit'])
  } finally {
    await pageMj.request.patch(memberCharacter, { data: { titles: [] } })
    await mj.close()
    await joueur.close()
  }
})
