import { describe, it, expect } from 'vitest'
import { abilityStats, byStat } from './statGroups'
import { ABILITIES } from '../../data/sindragosa/abilities'
import type { Ability } from '../../data/sindragosa/types'

const ability = (prerequisites: Ability['prerequisites']): Ability => ({
  ...ABILITIES[0], prerequisites,
})

describe('abilityStats', () => {
  it('prend la carac de chaque domaine exigé, sans doublon', () => {
    // Attaque sournoise : Acrobatie & Furtivité + Combat de précision, deux domaines d'Agilité
    expect(abilityStats(ABILITIES.find((a) => a.id === 1)!)).toEqual(['agi'])
  })

  it('remonte les caracs d’un domaine avancé exigé', () => {
    // Chronomancie : Magie profane & Arcanes (INT) + Histoire & Géographie
    const stats = abilityStats(ability([{ kind: 'advanced', id: 'chronomancie', rank: 1 }]))
    expect(stats).toContain('int')
  })

  it('ignore spécialités et titres', () => {
    expect(abilityStats(ability([
      { kind: 'domain', id: 'melee-bourrine', rank: 1 },
      { kind: 'specialty', name: 'Haches', level: 1 },
      { kind: 'title', name: 'Champion' },
    ]))).toEqual(['str'])
  })

  it('range chaque compétence du catalogue sous au moins une carac', () => {
    expect(ABILITIES.filter((a) => abilityStats(a).length === 0)).toEqual([])
  })
})

describe('byStat', () => {
  it('range un élément sous chacune de ses caracs, et garde les 6 groupes', () => {
    const groups = byStat(['a', 'b'], (x) => (x === 'a' ? ['str', 'int'] : ['int']))
    expect(groups.str).toEqual(['a'])
    expect(groups.int).toEqual(['a', 'b'])
    expect(groups.cha).toEqual([])
    expect(Object.keys(groups)).toEqual(['str', 'agi', 'end', 'int', 'wis', 'cha'])
  })
})
