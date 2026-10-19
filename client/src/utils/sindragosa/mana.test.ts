import { describe, expect, it } from 'vitest'
import { economeCost, magicRanks, maxMana, shortRestMana, spellCost } from './mana'
import { createDefaultCharacter } from '../../composables/useCharacter'
import type { Character } from '../../types/character'

function hero(over: Partial<Character> = {}): Character {
  return { ...createDefaultCharacter(), ...over }
}

describe('maxMana', () => {
  it('vaut 0 sans domaine magique, même avec de hautes caracs', () => {
    expect(maxMana(hero({ stats: { str: 2, agi: 2, end: 2, int: 5, wis: 2, cha: 2 } }))).toBe(0)
  })

  it('plus haute carac magique + rangs magiques', () => {
    const c = hero({
      stats: { str: 2, agi: 2, end: 2, int: 3, wis: 2, cha: 2 },
      domains: { 'magie-profane-arcanes': { rank: 1, ticks: 0 } },
    })
    expect(maxMana(c)).toBe(4)
  })

  it('prend la plus haute de INT, SAG, CHA, quelle que soit l\'école', () => {
    const c = hero({
      stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 4 },
      domains: { 'magie-divine-sacree': { rank: 1, ticks: 0 } },
    })
    expect(maxMana(c)).toBe(5)
  })

  it('compte les domaines avancés de magie, pas les autres domaines', () => {
    const c = hero({
      stats: { str: 2, agi: 2, end: 2, int: 4, wis: 2, cha: 2 },
      domains: { 'magie-profane-arcanes': { rank: 4, ticks: 0 }, 'histoire-geographie': { rank: 3, ticks: 0 } },
      advancedDomains: { pyromancie: { rank: 3, ticks: 0 }, 'forge-magie': { rank: 2, ticks: 0 } },
    })
    expect(magicRanks(c)).toBe(7)
    expect(maxMana(c)).toBe(11)
  })
})

describe('shortRestMana', () => {
  it('un tiers, arrondi au-dessus', () => {
    expect(shortRestMana(4)).toBe(2)
    expect(shortRestMana(9)).toBe(3)
    expect(shortRestMana(10)).toBe(4)
    expect(shortRestMana(0)).toBe(0)
  })
})

describe('economeCost', () => {
  it('réduit d\'au moins 1, sans descendre sous 1', () => {
    expect(economeCost(1)).toBe(1)
    expect(economeCost(2)).toBe(1)
    expect(economeCost(3)).toBe(2)
    expect(economeCost(5)).toBe(4)
  })

  it('un tiers, arrondi en dessous, sur les gros coûts', () => {
    expect(economeCost(6)).toBe(4)
    expect(economeCost(10)).toBe(7)
  })
})

describe('spellCost', () => {
  it('null hors des sorts, réduit en économe', () => {
    expect(spellCost({}, false)).toBeNull()
    expect(spellCost({ manaCost: 3 }, false)).toBe(3)
    expect(spellCost({ manaCost: 3 }, true)).toBe(2)
  })
})
