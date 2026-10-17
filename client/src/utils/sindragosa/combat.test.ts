import { describe, it, expect } from 'vitest'
import { maxHp, initiative, resolveAttack } from './combat'

describe('maxHp', () => {
  it('20 PV pour un personnage vierge', () => {
    expect(maxHp({ end: 2, endAtCreation: 2, domainRanks: {} })).toBe(20)
  })

  it('+2 par rang dans un domaine de Force ou d\'Endurance', () => {
    expect(maxHp({ end: 2, endAtCreation: 2, domainRanks: { 'melee-bourrine': 2, 'survie-milieu-hostile': 1 } })).toBe(26)
  })

  it('+5 par rang en Résistance physique', () => {
    expect(maxHp({ end: 2, endAtCreation: 2, domainRanks: { 'resistance-physique': 2 } })).toBe(30)
  })

  it("ignore les domaines des autres caracs", () => {
    expect(maxHp({ end: 2, endAtCreation: 2, domainRanks: { 'tir-lancer': 3, 'magie-profane-arcanes': 2 } })).toBe(20)
  })

  it("+8 par point d'Endurance gagné depuis la création", () => {
    expect(maxHp({ end: 4, endAtCreation: 3, domainRanks: {} })).toBe(28)
  })
})

describe('initiative', () => {
  it('Agilité + Sagesse + Perception & Sens', () => {
    const stats = { str: 2, agi: 3, end: 2, int: 2, wis: 2, cha: 2 }
    expect(initiative(stats, { 'perception-sens': 2 })).toBe(7)
    expect(initiative(stats, {})).toBe(5)
  })
})

describe('resolveAttack', () => {
  it('marge nulle ou négative : attaque parée, pas de dégâts', () => {
    expect(resolveAttack(2, 2, 6, 0)).toEqual({ margin: 0, hit: false, damage: 0 })
    expect(resolveAttack(1, 3, 6, 0).hit).toBe(false)
  })

  it('dégâts = arme + marge − armure', () => {
    expect(resolveAttack(3, 1, 4, 1)).toEqual({ margin: 2, hit: true, damage: 5 })
  })

  it("l'armure ne rend jamais les dégâts négatifs", () => {
    expect(resolveAttack(2, 1, 1, 10).damage).toBe(0)
  })
})
