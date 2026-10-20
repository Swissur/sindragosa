import { describe, it, expect } from 'vitest'
import { computeInitiative } from './initiative.js'

describe('computeInitiative', () => {
  it('Agilité + Sagesse + rang en Perception & Sens', () => {
    expect(computeInitiative({ agi: 3, wis: 2, domains: { 'perception-sens': { rank: 2 } } })).toBe(7)
  })

  it('sans rang en Perception & Sens', () => {
    expect(computeInitiative({ agi: 2, wis: 2, domains: {} })).toBe(4)
  })
})

describe('computeInitiative — Knight', () => {
  const base = { agi: 9, wis: 9, domains: {}, system: 'knight' }

  it('carac de Masque choisie + overdrive', () => {
    const sheet = { derived: { initiative: 'perception' }, carac: { perception: 3 }, overdrive: { perception: 2 } }
    expect(computeInitiative({ ...base, sheet })).toBe(5)
  })

  it('une fiche vierge vaut 1', () => {
    expect(computeInitiative({ ...base, sheet: {} })).toBe(1)
  })
})
