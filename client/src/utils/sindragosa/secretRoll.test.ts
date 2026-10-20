import { describe, it, expect } from 'vitest'
import { readPool, type PoolResult } from './pool'
import type { RollSetup } from './rollSetup'
import { formulaText, secretRollMessage } from './secretRoll'

const setup: RollSetup = {
  kind: 'domain',
  count: 5,
  specialtyLevel: 0,
  parts: [{ label: 'AGI', value: 2 }, { label: 'rang', value: 3 }, { label: 'désavantage', value: -1 }, { label: 'chance', value: 1 }],
  sources: [],
}

function result(dice: number[], rerolledFrom: number | null = null): PoolResult {
  return { ...readPool(dice), rerolledIndex: rerolledFrom === null ? null : 0, rerolledFrom }
}

describe('formulaText', () => {
  it('écrit la formule comme la feuille de jet, signes compris', () => {
    expect(formulaText(setup)).toBe('AGI 2 + rang 3 − désavantage 1 + chance 1 = 5d6')
  })
})

describe('secretRollMessage', () => {
  it('dit qui lance quoi, la formule, les dés et le seuil atteint', () => {
    const text = secretRollMessage('Valère', 'Acrobatie & Furtivité', setup, result([5, 5, 3, 2, 4]))
    expect(text.split('\n')).toEqual([
      '🎲 Jet secret de Valère : Acrobatie & Furtivité',
      'AGI 2 + rang 3 − désavantage 1 + chance 1 = 5d6',
      'Dés : 5 · 5 · 3 · 2 · 4',
      '→ 2 succès · Moyenne',
    ])
  })

  it('signale la relance de spécialité et les critiques', () => {
    expect(secretRollMessage('V', 'X', setup, result([6, 2], 1))).toContain('(un 1 relancé, spécialité)')
    expect(secretRollMessage('V', 'X', setup, result([6, 2]))).toContain('Réussite critique')
    expect(secretRollMessage('V', 'X', setup, result([1, 2]))).toContain('Échec critique')
  })
})
