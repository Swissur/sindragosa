import { describe, it, expect } from 'vitest'
import { pickGmEditable, pickUpdatable } from './updatable.js'

describe('pickUpdatable', () => {
  it('garde la progression Sindragosa (domaines, spécialités, coches de séance)', () => {
    const body = pickUpdatable({
      domains: { 'melee-bourrine': { rank: 2, ticks: 1 } },
      specialties: [{ id: 's1', domainId: 'melee-bourrine', name: 'Haches', level: 1, ticks: 0 }],
      sessionTicks: { success: 1, critFail: 0 },
    })
    expect(Object.keys(body).sort()).toEqual(['domains', 'sessionTicks', 'specialties'])
  })

  it('garde les champs classiques de la fiche', () => {
    const body = pickUpdatable({ name: 'Kaeliss', race: 'elfe-sang', hpCurrent: 24, agi: 3 })
    expect(body).toEqual({ name: 'Kaeliss', race: 'elfe-sang', hpCurrent: 24, agi: 3 })
  })

  it('jette les anciens champs Arran', () => {
    expect(pickUpdatable({ level: 3, paths: [], dex: 12 })).toEqual({})
  })

  it('bloque le mass-assignment (userId, isActive, createdAt, clés inconnues)', () => {
    const body = pickUpdatable({ userId: 99, isActive: true, createdAt: 'x', foo: 1, name: 'ok' })
    expect(body).toEqual({ name: 'ok' })
  })

  it('ne fabrique pas de clé absente du corps', () => {
    expect(pickUpdatable({})).toEqual({})
  })
})

describe('titres', () => {
  it('un joueur ne peut pas s’accorder un titre', () => {
    expect(pickUpdatable({ titles: ['Archimage'], name: 'Orlane' })).toEqual({ name: 'Orlane' })
  })
})

describe('pickGmEditable', () => {
  it('garde caracs, rangs, titres et PV max', () => {
    expect(pickGmEditable({ end: 4, titles: ['Champion'], hpMax: 28 })).toEqual({ end: 4, titles: ['Champion'], hpMax: 28 })
  })

  it('ne touche ni aux PV courants, ni à la chance, ni à l’inventaire', () => {
    expect(pickGmEditable({ hpCurrent: 1, pcCurrent: 9, items: [], name: 'X' })).toEqual({})
  })
})
