import { describe, it, expect } from 'vitest'
import { buildMonster } from './bestiary'
import { dungeonEncounters, groupByDungeon } from './dungeons'
import type { Dungeon } from '../../data/sindragosa/types'

const garde = buildMonster({
  name: 'Garde',
  size: 'moyenne',
  threat: 1,
  stats: { str: 3, agi: 2, end: 3, int: 2, wis: 2, cha: 2 },
  hp: 8,
  armorKind: 'aucune',
  attacks: [{ name: 'Épée', damage: 3 }],
  abilities: [],
})
const chef = { ...garde, name: 'Chef', hp: 30 }

const dungeon = (monsters: Dungeon['encounters'][number]['monsters']): Dungeon => ({
  name: 'Test',
  kind: 'donjon',
  description: '',
  monsters: [garde, chef],
  encounters: [{ name: 'Salle', description: 'Une salle', monsters }],
})

describe('dungeonEncounters', () => {
  it('un monstre seul garde son nom, au format des rencontres', () => {
    const [enc] = dungeonEncounters(dungeon([{ name: 'Chef' }]))
    expect(enc).toMatchObject({ name: 'Salle', description: 'Une salle' })
    expect(enc.monsters).toEqual([expect.objectContaining({ name: 'Chef', pv: 30, init: chef.initiative, hidden: false })])
  })

  it('numérote les exemplaires, même répartis sur plusieurs lignes', () => {
    const [enc] = dungeonEncounters(dungeon([
      { name: 'Chef' },
      { name: 'Garde', count: 2 },
      { name: 'Garde', count: 2, hidden: true },
    ]))
    expect(enc.monsters.map((m) => [m.name, m.hidden])).toEqual([
      ['Chef', false],
      ['Garde 1', false],
      ['Garde 2', false],
      ['Garde 3', true],
      ['Garde 4', true],
    ])
  })

  it('refuse un monstre absent du bestiaire du donjon', () => {
    expect(() => dungeonEncounters(dungeon([{ name: 'Dragon' }]))).toThrow(/Dragon/)
  })
})

describe('groupByDungeon', () => {
  it('les rencontres libres d’abord, puis chaque donjon dans son ordre d’apparition', () => {
    const groups = groupByDungeon([
      { id: 1, dungeon: 'Les Mortemines' },
      { id: 2, dungeon: null },
      { id: 3, dungeon: 'Le Donjon de Hurlevent' },
      { id: 4, dungeon: 'Les Mortemines' },
    ])
    expect(groups.map((g) => [g.dungeon, g.items.map((i) => i.id)])).toEqual([
      [null, [2]],
      ['Les Mortemines', [1, 4]],
      ['Le Donjon de Hurlevent', [3]],
    ])
  })

  it('pas de groupe vide, même sans rencontre libre', () => {
    expect(groupByDungeon([{ dungeon: 'X' }]).map((g) => g.dungeon)).toEqual(['X'])
    expect(groupByDungeon([])).toEqual([])
  })
})
