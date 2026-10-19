import { describe, it, expect } from 'vitest'
import { markGiven, sanitizeLoot, toInventoryItem } from './loot.js'

describe('sanitizeLoot', () => {
  it('garde les champs d’objet connus et jette le reste', () => {
    expect(sanitizeLoot([
      { name: ' Marteau ', type: 'arme', size: 'deux-mains', damageBonus: 1, domainId: 'melee-bourrine', hack: true },
      { name: 'Cape', type: 'inconnu', armor: 1, quantity: 1, chance: 55 },
      { name: '' },
      'pas un objet',
    ])).toEqual([
      { name: 'Marteau', type: 'arme', size: 'deux-mains', damageBonus: 1, domainId: 'melee-bourrine' },
      { name: 'Cape', armor: 1, chance: 55 },
    ])
  })

  it('un butin absent ou invalide est vide', () => {
    expect(sanitizeLoot(undefined)).toEqual([])
    expect(sanitizeLoot({ name: 'x' })).toEqual([])
  })
})

describe('toInventoryItem', () => {
  it('ajoute id et quantité, retire la trace du don', () => {
    expect(toInventoryItem({ name: 'Anneau', type: 'divers', chance: 38, givenTo: 'Nym' }, 'x1'))
      .toEqual({ name: 'Anneau', type: 'divers', id: 'x1', quantity: 1, equipped: false })
  })
})

describe('markGiven', () => {
  const loot = [{ name: 'A' }, { name: 'B', givenTo: 'Nym' }]

  it('attribue l’objet sans toucher aux autres', () => {
    expect(markGiven(loot, 0, 'Bracco')).toEqual([{ name: 'A', givenTo: 'Bracco' }, { name: 'B', givenTo: 'Nym' }])
    expect(loot[0]).toEqual({ name: 'A' })
  })

  it('refuse un objet déjà donné ou inexistant', () => {
    expect(markGiven(loot, 1, 'Bracco')).toBeNull()
    expect(markGiven(loot, 5, 'Bracco')).toBeNull()
    expect(markGiven(loot, 0.5, 'Bracco')).toBeNull()
  })
})
