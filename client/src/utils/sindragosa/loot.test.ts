import { describe, it, expect } from 'vitest'
import { lootDetail, pickLoot, remainingLoot } from './loot'

const loot = [{ name: 'A', givenTo: 'Nym' }, { name: 'B' }, { name: 'C' }]

describe('tirage du butin', () => {
  it('ne tire que parmi les objets pas encore donnés', () => {
    expect(remainingLoot(loot)).toEqual([1, 2])
    expect(pickLoot(loot, () => 0)).toBe(1)
    expect(pickLoot(loot, () => 0.99)).toBe(2)
  })

  it('un aléa de 1 ne sort pas de la liste', () => {
    expect(pickLoot(loot, () => 1)).toBe(2)
  })

  it('suit les chances : un objet rare sort rarement', () => {
    const table = [{ chance: 72 }, { chance: 4 }]
    expect(pickLoot(table, () => 0.9)).toBe(0)
    expect(pickLoot(table, () => 0.96)).toBe(1)
  })

  it('un objet donné ne pèse plus dans le tirage', () => {
    expect(pickLoot([{ chance: 99, givenTo: 'Nym' }, { chance: 1 }], () => 0)).toBe(1)
  })

  it('plus rien à tirer : null', () => {
    expect(pickLoot([{ givenTo: 'Nym' }])).toBeNull()
    expect(pickLoot([])).toBeNull()
  })
})

describe('lootDetail', () => {
  it('une arme montre gabarit et dégâts, bonus compris', () => {
    expect(lootDetail({ name: 'Marteau', type: 'arme', size: 'deux-mains', damageBonus: 1 })).toBe('Arme · Deux mains · 6 dégâts')
  })

  it('une armure montre sa valeur, le reste son type', () => {
    expect(lootDetail({ name: 'Plastron', type: 'armure', armor: 2 })).toBe('Armure · 2')
    expect(lootDetail({ name: 'Anneau' })).toBe('Divers')
  })
})
