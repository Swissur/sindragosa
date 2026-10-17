import { describe, it, expect } from 'vitest'
import { craftDomainId, recipesFor } from './crafting'
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
