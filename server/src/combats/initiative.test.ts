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
