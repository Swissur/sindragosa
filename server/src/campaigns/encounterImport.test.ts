import { describe, it, expect, vi } from 'vitest'

vi.mock('../db/index.js', () => ({ db: {} }))
const { monsterValues, parseEncounterImport } = await import('./encounterImport.js')

describe('monsterValues', () => {
  it('garde les valeurs fournies et complète le reste', () => {
    expect(monsterValues({ name: 'Sneed', pv: 18, hidden: true })).toMatchObject({
      name: 'Sneed', pv: 18, hidden: true, threat: 0, defense: 2, attacks: [], description: null,
    })
  })
})

describe('parseEncounterImport', () => {
  const enc = { name: 'Gilnid', monsters: [] }

  it('accepte un donjon et ses rencontres', () => {
    expect(parseEncounterImport({ dungeon: ' Les Mortemines ', encounters: [enc] }))
      .toEqual({ dungeon: 'Les Mortemines', encounters: [enc] })
  })

  it('refuse un donjon sans nom, sans rencontre ou une rencontre sans nom', () => {
    expect(parseEncounterImport({ dungeon: '', encounters: [enc] })).toBeNull()
    expect(parseEncounterImport({ dungeon: 'X', encounters: [] })).toBeNull()
    expect(parseEncounterImport({ dungeon: 'X', encounters: [{ name: ' ', monsters: [] }] })).toBeNull()
    expect(parseEncounterImport(null)).toBeNull()
  })
})
