import { describe, it, expect } from 'vitest'
import type { Character } from '../../types/character'
import { isUsed, toggleUse } from './abilityUses'
import { defaultPins, togglePin } from './pins'

function char(over: Partial<Character> = {}): Character {
  return {
    id: '1', name: 'Test', histoire: '', race: '', portraitImageId: null,
    stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20, hpMax: 20, hpBonus: 0, armor: 0,
    domains: {}, specialties: [], advancedDomains: {}, titles: [],
    abilityUses: {}, sessionTicks: { success: 0, critFail: 0 },
    resources: [], crafts: {}, weapons: [], items: [],
    goldCoins: 0, silverCoins: 0, copperCoins: 0, pcCurrent: 2, states: [],
    ...over,
  }
}

describe('usages des compétences', () => {
  const ability = { id: 7, usesPer: 'repos-court' as const }

  it('marque puis rend un usage, rangé par période', () => {
    const used = char({ abilityUses: toggleUse(char(), ability) })
    expect(used.abilityUses).toEqual({ 'repos-court': { 7: 1 } })
    expect(isUsed(used, ability)).toBe(true)
    expect(isUsed(char({ abilityUses: toggleUse(used, ability) }), ability)).toBe(false)
  })

  it('une compétence sans limite ne bouge pas', () => {
    const c = char()
    expect(toggleUse(c, { id: 1, usesPer: null })).toBe(c.abilityUses)
    expect(isUsed(c, { id: 1, usesPer: null })).toBe(false)
  })
})

describe('épingles', () => {
  it('par défaut, les 3 domaines les plus hauts', () => {
    const c = char({
      domains: {
        athletisme: { rank: 1, ticks: 0 },
        'melee-bourrine': { rank: 3, ticks: 0 },
        'perception-sens': { rank: 1, ticks: 1 },
        'combat-precision': { rank: 2, ticks: 0 },
      },
    })
    expect(defaultPins(c)).toEqual(['domain:melee-bourrine', 'domain:combat-precision', 'domain:perception-sens'])
  })

  it('aucun domaine entamé : aucune épingle', () => {
    expect(defaultPins(char())).toEqual([])
  })

  it('épingle et désépingle', () => {
    expect(togglePin(['domain:a'], 'ability:3')).toEqual(['domain:a', 'ability:3'])
    expect(togglePin(['domain:a', 'ability:3'], 'domain:a')).toEqual(['ability:3'])
  })
})
