import { describe, expect, it } from 'vitest'
import type { Character, ItemRow } from '../../types/character'
import { BARE_HANDS } from './equipment'
import { strikePin, strikes } from './strikes'

const hache: ItemRow = { id: 'hache', name: 'Hache', quantity: 1, type: 'arme', size: 'deux-mains', domainId: 'melee-bourrine', equipped: true }

function char(items: ItemRow[]): Character {
  return {
    id: '1', name: 'Test', histoire: '', race: '', portraitImageId: null,
    stats: { str: 3, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20, hpMax: 20, hpBonus: 0, armor: 0, armorBonus: 0,
    domains: { 'melee-bourrine': { rank: 1, ticks: 0 } }, specialties: [], advancedDomains: {}, titles: [],
    abilityUses: {}, sessionTicks: { success: 0, critFail: 0 },
    resources: [], crafts: {}, items,
    goldCoins: 0, silverCoins: 0, copperCoins: 0, pcCurrent: 2, states: [], form: null,
  } as Character
}

describe('strikes', () => {
  it('une attaque par arme équipée, avec domaine, réserve et dégâts', () => {
    expect(strikes(char([hache]))).toEqual([
      { weapon: hache, domainId: 'melee-bourrine', detail: 'Mêlée bourrine · 4d6 · 5 dégâts' },
    ])
  })

  it('les mains nues sans arme équipée', () => {
    expect(strikes(char([{ ...hache, equipped: false }])).map((s) => s.weapon)).toEqual([BARE_HANDS])
  })

  it('le favori d’une arme suit son id', () => {
    expect(strikePin(hache)).toBe('weapon:hache')
  })
})
