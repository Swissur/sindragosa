import { describe, expect, it } from 'vitest'
import type { ItemRow } from '../../types/character'
import { RECIPES } from '../../data/sindragosa/crafts'
import { ARMOR_RECIPE_NATURES } from '../../data/sindragosa/armorNatures'
import { armorPenalties, cancelledUpTo, heaviestNature } from './armorNature'
import { itemFromRecipe } from './equipment'

const armor = (nature: ItemRow['nature'], equipped = true): ItemRow =>
  ({ id: nature ?? 'x', name: 'A', quantity: 1, type: 'armure', armor: 2, equipped, nature })
const who = (items: ItemRow[], rank = 0) => ({ items, domains: { 'armures-boucliers': { rank, ticks: 0 } } })

describe('malus d’armure', () => {
  it('rang 0 : tous les malus de la nature', () => {
    expect(armorPenalties(who([armor('plaque')]))).toEqual({ agi: 3, end: 2, str: 1, init: 3 })
    expect(armorPenalties(who([armor('maille')]))).toEqual({ agi: 2, end: 1, str: 0, init: 2 })
    expect(armorPenalties(who([armor('cuir')]))).toEqual({ agi: 1, end: 0, str: 0, init: 1 })
    expect(armorPenalties(who([armor('tissu')]))).toEqual({ agi: 0, end: 0, str: 0, init: 0 })
  })

  it('le rang annule les malus de faible valeur, en cumulant', () => {
    expect(armorPenalties(who([armor('plaque')], 1))).toEqual({ agi: 3, end: 2, str: 0, init: 3 })
    expect(armorPenalties(who([armor('plaque')], 3))).toEqual({ agi: 3, end: 0, str: 0, init: 3 })
    expect(armorPenalties(who([armor('plaque')], 5))).toEqual({ agi: 0, end: 0, str: 0, init: 0 })
    expect(armorPenalties(who([armor('cuir')], 1))).toEqual({ agi: 0, end: 0, str: 0, init: 0 })
  })

  it('paliers du rang', () => {
    expect([0, 1, 2, 3, 4, 5].map(cancelledUpTo)).toEqual([0, 1, 1, 2, 2, 3])
  })

  it('seule la plus lourde des armures équipées compte ; sans nature = tissu', () => {
    expect(heaviestNature([armor('cuir'), armor('maille'), armor('plaque', false)])).toBe('maille')
    expect(heaviestNature([armor(undefined)])).toBe('tissu')
    expect(heaviestNature([])).toBe('tissu')
  })

  it('chaque armure fabriquée a sa nature, et la table ne cite que des armures', () => {
    const armorIds = RECIPES.filter((r) => itemFromRecipe(r, 'x').type === 'armure').map((r) => r.id)
    expect(armorIds.filter((id) => !ARMOR_RECIPE_NATURES[id])).toEqual([])
    expect(Object.keys(ARMOR_RECIPE_NATURES).filter((id) => !armorIds.includes(id))).toEqual([])
  })

  it('l’armure fabriquée porte sa nature', () => {
    const plastron = RECIPES.find((r) => r.id === 'cuir-r4-01')!
    expect(itemFromRecipe(plastron, 'x').nature).toBe('maille')
  })
})
