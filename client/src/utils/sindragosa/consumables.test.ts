import { describe, expect, it } from 'vitest'
import { RECIPES } from '../../data/sindragosa/crafts'
import { CLASSIC_CONSUMABLES, CRAFTED_CONSUMABLE_RECIPE_IDS } from '../../data/sindragosa/consumables'
import { componentKey } from './crafting'
import { CONSUMABLE_NAMES, consumableNames, findConsumableName } from './consumables'

describe('catalogue des consommables', () => {
  it('chaque patron cité existe', () => {
    const ids = new Set(RECIPES.map((r) => r.id))
    expect(CRAFTED_CONSUMABLE_RECIPE_IDS.filter((id) => !ids.has(id))).toEqual([])
  })

  it('aucun doublon, ni dans les listes ni entre elles', () => {
    expect(new Set(CRAFTED_CONSUMABLE_RECIPE_IDS).size).toBe(CRAFTED_CONSUMABLE_RECIPE_IDS.length)
    const crafted = new Set(RECIPES.filter((r) => CRAFTED_CONSUMABLE_RECIPE_IDS.includes(r.id)).map((r) => componentKey(r.name)))
    const classic = CLASSIC_CONSUMABLES.map(componentKey)
    expect(classic.length).toBe(new Set(classic).size)
    expect(classic.filter((k) => crafted.has(k))).toEqual([])
  })

  it('fusionne sans doublon, à la casse et au pluriel près', () => {
    expect(consumableNames(['Potion de soins mineure'], ['potions de soins mineures', 'Pain de seigle'])).toEqual(['Pain de seigle', 'Potion de soins mineure'])
  })

  it('retrouve un nom du catalogue', () => {
    const name = CONSUMABLE_NAMES[0]
    expect(findConsumableName(name.toUpperCase())).toBe(name)
    expect(findConsumableName('Objet introuvable xyz')).toBeNull()
  })
})
