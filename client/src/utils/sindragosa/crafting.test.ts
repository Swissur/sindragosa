import { describe, it, expect } from 'vitest'
import { componentKey, componentNeeds, consumeComponents, craftDomainId, hasComponents, recipesFor } from './crafting'
import type { ItemRow } from '../../types/character'
import { CRAFTS } from '../../data/sindragosa/crafts'

describe('craftDomainId', () => {
  it('chaque métier a un domaine', () => {
    for (const c of CRAFTS) expect(craftDomainId(c), c.id).not.toBeNull()
  })

  it('lit le premier domaine cité', () => {
    expect(craftDomainId({ basis: 'Artisanat lourd + Pyromancie' })).toBe('artisanat-lourd')
    expect(craftDomainId({ basis: 'Ingénierie + Soins' })).toBe('explosifs-ingenierie')
  })
})

describe('recipesFor', () => {
  const catalog = [
    { id: 'a', craft: 'forge', rank: 1, name: 'A', batch: null, components: [], effect: '' },
    { id: 'b', craft: 'forge', rank: 3, name: 'B', batch: null, components: [], effect: '' },
    { id: 'c', craft: 'hybride', rank: null, name: 'C', batch: null, components: [], effect: '' },
  ]

  it("s'arrête au rang connu", () => {
    expect(recipesFor('forge', 2, catalog).map((r) => r.id)).toEqual(['a'])
  })

  it('un métier hybride donne toutes ses recettes', () => {
    expect(recipesFor('hybride', 1, catalog).map((r) => r.id)).toEqual(['c'])
  })
})

describe('composants', () => {
  const recipe = {
    id: 'r', craft: 'forge', rank: 1, name: 'Épée', batch: null, effect: '',
    components: [{ qty: 3, name: 'Lingots de Fer brut' }, { qty: 1, name: 'Bois dur' }],
  }
  const items: ItemRow[] = [
    { id: 'a', name: 'Lingot de fer brut', quantity: 2, type: 'composant' },
    { id: 'b', name: 'Lingots de Fer brut', quantity: 2, type: 'composant' },
    { id: 'c', name: 'Bois dur', quantity: 1, type: 'composant' },
    { id: 'd', name: 'Potion', quantity: 1, type: 'consommable' },
  ]

  it('singulier, pluriel, casse et accents ne comptent pas', () => {
    expect(componentKey('Lingots de Fer brut')).toBe(componentKey('lingot de fer brut'))
    expect(componentKey('Cuirs épais')).toBe(componentKey('Cuir epais'))
  })

  it('compte ce que l’inventaire contient', () => {
    expect(componentNeeds(items, recipe)).toEqual([
      { name: 'Lingots de Fer brut', qty: 3, have: 4 },
      { name: 'Bois dur', qty: 1, have: 1 },
    ])
    expect(hasComponents(items, recipe)).toBe(true)
    expect(hasComponents(items.slice(1), recipe)).toBe(false)
  })

  it('consomme les quantités et retire les objets épuisés', () => {
    const after = consumeComponents(items, recipe)
    expect(after.map((i) => [i.id, i.quantity])).toEqual([['b', 1], ['d', 1]])
    expect(items[0].quantity).toBe(2)
  })
})
