import { describe, it, expect } from 'vitest'
import type { Character } from '../../types/character'
import { gmPatch } from './gmPatch'
import { computeMaxHp } from './sheet'

function char(over: Partial<Character> = {}): Character {
  return {
    id: '1', name: 'Test', histoire: '', race: '', portraitImageId: null,
    stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20, hpMax: 20, hpBonus: 0, armor: 0,
    domains: {}, specialties: [], advancedDomains: {}, titles: [],
    abilityUses: {}, sessionTicks: { success: 0, critFail: 0 },
    resources: [], crafts: {}, recipeGrants: {}, weapons: [], items: [],
    goldCoins: 0, silverCoins: 0, copperCoins: 0, pcCurrent: 2, states: [],
    ...over,
  }
}

describe('gmPatch', () => {
  it('envoie caracs, progression, titres et patrons, rien d’autre', () => {
    const p = gmPatch(char({ titles: ['Héros'], domains: { athletisme: { rank: 1, ticks: 0 } } }))
    expect(Object.keys(p).sort()).toEqual(
      ['advancedDomains', 'agi', 'cha', 'crafts', 'domains', 'end', 'hpBonus', 'hpMax', 'int', 'manaMax', 'recipeGrants', 'specialties', 'str', 'titles', 'wis'],
    )
    expect(p.titles).toEqual(['Héros'])
    expect(p.str).toBe(2)
  })

  it('recalcule les PV max quand l’Endurance monte', () => {
    const before = gmPatch(char()).hpMax!
    const c = char({ stats: { str: 2, agi: 2, end: 4, int: 2, wis: 2, cha: 2 } })
    expect(gmPatch(c).hpMax).toBe(computeMaxHp(c))
    expect(gmPatch(c).hpMax).toBeGreaterThan(before)
  })
})
