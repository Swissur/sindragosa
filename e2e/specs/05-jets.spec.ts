import { test, expect, type Page } from '../fixtures/test'
import { stateFor } from '../fixtures/auth'

// Le jet d'un joueur doit remonter en direct dans le log de la campagne côté MJ.
test('un jet de dé arrive dans le log du MJ', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('bracco') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  try {
    await pageMj.goto('/personnage')
    await pageMj.getByTitle('Historique des jets').click()
    await expect(pageMj.getByTestId('roll-log')).toBeVisible()

    await pageJoueur.goto('/personnage')
    await pageJoueur.getByTitle('Lancer des dés').click()
    await pageJoueur.getByTestId('die-d20').click()

    // Le flux SSE pousse le jet : aucun rechargement côté MJ.
    await expect(
      pageMj.getByTestId('roll-log').getByText('Bracco Pouce-Cassé').first()
    ).toBeVisible({ timeout: 15_000 })
  } finally {
    await mj.close()
    await joueur.close()
  }
})

// Le dé d'un autre joueur roule aussi chez moi : son nom s'affiche sous le
// petit dé en haut de l'écran. Le toggle de la barre du bas coupe l'affichage.
test('le dé d’un autre joueur roule chez le MJ, sauf si le MJ le coupe', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('bracco') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  try {
    await pageMj.goto('/personnage')
    await pageJoueur.goto('/personnage')
    await pageJoueur.getByTitle('Lancer des dés').click()

    await pageJoueur.getByTestId('die-d20').click()
    await expect(pageMj.getByTestId('remote-die-label')).toContainText('Bracco Pouce-Cassé', {
      timeout: 15_000,
    })

    // Toggle OFF : le jet suivant n'affiche plus de dé distant, mais arrive
    // toujours dans le log.
    await pageMj.goto('/options')
    await pageMj.getByTestId('option-remote-dice').click()
    await pageMj.goto('/personnage')
    await expect(pageMj.getByTestId('remote-die-label')).toHaveCount(0, { timeout: 5_000 })
    await pageMj.getByTitle('Historique des jets').click()
    const before = await pageMj.getByTestId('roll-log-entry').count()

    await pageJoueur.getByTestId('die-d20').click()
    await expect(pageMj.getByTestId('roll-log-entry')).toHaveCount(before + 1, { timeout: 15_000 })
    await expect(pageMj.getByTestId('remote-die-label')).toHaveCount(0)
  } finally {
    await mj.close()
    await joueur.close()
  }
})

// Mana et concentration (plans/40) : Orlane (INT 3, Profane 3) a 3 mana sur 7 et
// a débloqué Déflagration d'Arcane (1 mana). « Puissante » ajoute 1d6 au jet.
test('un mage lance un sort puissant : +1d6 au jet, la mana paie', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('orlane') })
  const page = await ctx.newPage()

  try {
    await page.goto('/personnage')
    await expect(page.getByTestId('mana-current')).toHaveText('3')
    await page.getByRole('tab', { name: 'Compétences' }).click()
    // Sections repliées par défaut : Déflagration d'Arcane est sous Intelligence
    await page.getByTestId('abilities-int').click()
    const carte = page.getByTestId('ability-46')
    await expect(carte.getByTestId('ability-mana-46')).toHaveText('1')
    await carte.getByTestId('ability-toggle').click()
    await carte.getByTestId('concentration-puissante').click()
    await carte.getByTestId('ability-attack-46').click()

    await expect(page.getByTestId('roll-formula')).toContainText('puissante 1')
    await expect(page.getByTestId('roll-mana')).toContainText('Coûte 1 mana')
    const { dice } = await lancer(page)
    expect(dice).toHaveLength(7) // INT 3 + rang 3 + puissante 1

    await page.keyboard.press('Escape')
    await page.getByRole('tab', { name: 'Héros' }).click()
    await expect(page.getByTestId('mana-current')).toHaveText('2')
  } finally {
    await ctx.close()
  }
})

/*
 * Réserve de d6 : carac + rang (+1d6 Expert ou Maître, ±1d6 avantage,
 * +1d6 par point de chance). Un jet est aléatoire : on ne teste que des
 * invariants (combien de dés, combien de succès), jamais une valeur précise.
 */

/** Lance le jet préparé et rend les dés affichés et le nombre de succès. */
async function lancer(page: Page): Promise<{ dice: number[]; successes: number }> {
  await page.getByTestId('roll-launch').click()
  // L'animation 3D précède la révélation : on attend le résultat, pas un délai.
  const zone = page.getByTestId('roll-dice')
  await expect(zone).toBeVisible({ timeout: 20_000 })
  const dice = (await zone.locator('span').allTextContents()).map(Number)
  const successes = Number(await page.getByTestId('roll-successes').innerText())
  return { dice, successes }
}

test('un jet de domaine lance carac + rang, la spécialité et l’avantage ajoutent un dé', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('nym') })
  const page = await ctx.newPage()

  try {
    await page.goto('/personnage')
    await page.getByRole('tab', { name: 'Domaines', exact: true }).click()
    await page.getByTestId('domains-agi').click()
    await page.getByTestId('domain-roll-combat-precision').click()

    // AGI 3 + rang 3
    await expect(page.getByTestId('roll-formula')).toContainText('= 6d6')
    // Dagues (Maître) : +1d6 ; avantage : +1d6
    await page.getByTestId('roll-specialty').selectOption('s-dagues')
    await page.getByTestId('roll-mode-avantage').click()
    await expect(page.getByTestId('roll-formula')).toContainText('= 8d6')

    const jet = await lancer(page)
    expect(jet.dice).toHaveLength(8)
    for (const d of jet.dice) {
      expect(d).toBeGreaterThanOrEqual(1)
      expect(d).toBeLessThanOrEqual(6)
    }
    expect(jet.successes).toBe(jet.dice.filter((d) => d >= 5).length)
  } finally {
    await ctx.close()
  }
})

test('un point de chance ajoute un dé et se dépense', async ({ browser }) => {
  const ctx = await browser.newContext({ storageState: stateFor('kaeliss') })
  const page = await ctx.newPage()

  try {
    await page.goto('/personnage')
    const chance = page.getByTestId('luck-value')
    const avant = Number(await chance.innerText())
    expect(avant).toBeGreaterThan(0)

    await page.getByRole('tab', { name: 'Domaines', exact: true }).click()
    await page.getByTestId('domains-agi').click()
    await page.getByTestId('domain-roll-tir-lancer').click()
    await expect(page.getByTestId('roll-formula')).toContainText('= 6d6')
    await page.getByTestId('roll-luck-plus').click()
    await expect(page.getByTestId('roll-formula')).toContainText('= 7d6')

    const saved = page.waitForResponse(
      (r) => /\/api\/characters\/\d+$/.test(r.url()) && r.request().method() === 'PUT' && r.ok(),
    )
    const jet = await lancer(page)
    expect(jet.dice).toHaveLength(7)
    await saved

    await page.keyboard.press('Escape')
    await page.getByRole('tab', { name: 'Héros' }).click()
    await expect(page.getByTestId('luck-value')).toHaveText(String(avant - 1))

    // On rend le point : les specs partagent la base.
    const restored = page.waitForResponse(
      (r) => /\/api\/characters\/\d+$/.test(r.url()) && r.request().method() === 'PUT' && r.ok(),
    )
    await page.getByTestId('luck-plus').click()
    await restored
  } finally {
    await ctx.close()
  }
})

test('le log de campagne du MJ montre la réserve et le palier', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('nym') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  try {
    await pageMj.goto('/personnage')
    await pageMj.getByTitle('Historique des jets').click()
    await expect(pageMj.getByTestId('roll-log')).toBeVisible()
    const avant = await pageMj.getByTestId('roll-log-entry').count()

    await pageJoueur.goto('/personnage')
    // Sans épingle choisie, les domaines les plus hauts sont en favoris.
    await pageJoueur.getByRole('tab', { name: 'Favoris', exact: true }).click()
    await pageJoueur.getByTestId('tile-domain-combat-precision').click()
    const jet = await lancer(pageJoueur)

    await expect(pageMj.getByTestId('roll-log-entry')).toHaveCount(avant + 1, { timeout: 20_000 })
    const entree = pageMj.getByTestId('roll-log-entry').filter({ hasText: `6d6 = ${jet.dice.join(' ')}` })
    await expect(entree).toHaveCount(1)
    await expect(entree).toContainText(String(jet.successes))
  } finally {
    await mj.close()
    await joueur.close()
  }
})

// Le MJ lance derrière son écran : ses dés ne sortent jamais chez les joueurs,
// ni dans le log, ni en dé distant — même quand il ne joue pas un monstre.
test('les dés du MJ restent invisibles pour les joueurs', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('bracco') })
  const pageMj = await mj.newPage()
  const pageJoueur = await joueur.newPage()

  try {
    await pageJoueur.goto('/personnage')
    await pageJoueur.getByTitle('Historique des jets').click()
    await expect(pageJoueur.getByTestId('roll-log')).toBeVisible()
    const avant = await pageJoueur.getByTestId('roll-log-entry').count()

    await pageMj.goto('/personnage')
    await pageMj.getByTitle('Lancer des dés').click()
    await pageMj.getByTestId('die-d20').click()

    // Le joueur lance à son tour : quand SON jet arrive, celui du MJ serait
    // déjà passé s'il devait passer. Pas de waitForTimeout.
    await pageJoueur.getByTitle('Lancer des dés').click()
    await pageJoueur.getByTestId('die-d20').click()
    await expect(pageJoueur.getByTestId('roll-log-entry')).toHaveCount(avant + 1, {
      timeout: 15_000,
    })
    await expect(pageJoueur.getByTestId('roll-log').getByText('MJ')).toHaveCount(0)
    await expect(pageJoueur.getByTestId('remote-die-label')).toHaveCount(0)

    // Côté MJ, son jet est bien là, marqué « MJ uniquement ».
    await pageMj.getByTitle('Historique des jets').click()
    await expect(pageMj.getByTestId('roll-log').getByText('MJ').first()).toBeVisible()
  } finally {
    await mj.close()
    await joueur.close()
  }
})

test('un jet secret : le lanceur voit son résultat, le MJ le reçoit, le log de campagne non', async ({ browser }) => {
  const mj = await browser.newContext({ storageState: stateFor('mj-dev') })
  const joueur = await browser.newContext({ storageState: stateFor('nym') })
  const pageMj = await mj.newPage()
  const page = await joueur.newPage()

  try {
    await pageMj.goto('/personnage')
    await pageMj.getByTitle('Historique des jets').click()
    await expect(pageMj.getByTestId('roll-log')).toBeVisible()
    // L'historique est chargé (les tests précédents y ont laissé des jets).
    await expect(pageMj.getByTestId('roll-log-entry').first()).toBeVisible()
    const entriesBefore = await pageMj.getByTestId('roll-log-entry').count()

    await page.goto('/personnage')
    await page.getByRole('tab', { name: 'Domaines', exact: true }).click()
    await page.getByTestId('domains-agi').click()
    await page.getByTestId('domain-roll-combat-precision').click()
    await page.getByTestId('roll-secret').click()

    // Le lanceur voit ses dés et son résultat, avec la mention du secret.
    await expect(page.getByTestId('roll-dice')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('roll-secret-note')).toBeVisible()
    const successes = await page.getByTestId('roll-successes').innerText()

    // Le MJ reçoit d'où vient le jet et ce qu'il donne.
    const body = pageMj.getByTestId('gm-message-body')
    await expect(body).toContainText('Jet secret de')
    await expect(body).toContainText('= 6d6')
    await expect(body).toContainText(`→ ${successes} succès`)
    // Rien dans le log partagé : le message est arrivé, le jet n'y est pas.
    await expect(pageMj.getByTestId('roll-log-entry')).toHaveCount(entriesBefore)

    // Le lanceur le retrouve dans son échange avec le MJ.
    await page.keyboard.press('Escape')
    await page.goto('/journal?tab=mj')
    await expect(page.getByTestId('gm-messages')).toContainText('Jet secret de')
  } finally {
    await mj.close()
    await joueur.close()
  }
})
