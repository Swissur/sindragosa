import { describe, expect, it } from 'vitest'
import { isCoord, isSize, LABEL_MAX, parseLinkStyle } from './codexBoard.js'

describe('parseLinkStyle', () => {
  it('garde seulement les champs envoyés', () => {
    expect(parseLinkStyle({})).toEqual({})
    expect(parseLinkStyle({ dashed: true })).toEqual({ dashed: true })
    expect(parseLinkStyle({ direction: 'both', label: 'frère de' })).toEqual({ direction: 'both', label: 'frère de' })
  })

  it('refuse un sens ou un trait inconnu', () => {
    expect(parseLinkStyle({ direction: 'left' })).toBeNull()
    expect(parseLinkStyle({ dashed: 'oui' })).toBeNull()
    expect(parseLinkStyle({ label: 12 })).toBeNull()
  })

  it('nettoie et coupe le libellé', () => {
    expect(parseLinkStyle({ label: '  trahit  ' })).toEqual({ label: 'trahit' })
    expect(parseLinkStyle({ label: 'x'.repeat(100) })?.label).toHaveLength(LABEL_MAX)
  })
})

describe('isCoord', () => {
  it('accepte un nombre fini, négatif compris', () => {
    expect(isCoord(0)).toBe(true)
    expect(isCoord(-240.5)).toBe(true)
  })

  it('refuse le reste', () => {
    expect(isCoord('12')).toBe(false)
    expect(isCoord(Number.NaN)).toBe(false)
    expect(isCoord(Infinity)).toBe(false)
    expect(isCoord(1e9)).toBe(false)
  })
})

describe('isSize', () => {
  it('accepte une taille de carte raisonnable', () => {
    expect(isSize(150)).toBe(true)
    expect(isSize(640.5)).toBe(true)
  })

  it('refuse le minuscule, le démesuré et le reste', () => {
    expect(isSize(10)).toBe(false)
    expect(isSize(99999)).toBe(false)
    expect(isSize('300')).toBe(false)
    expect(isSize(Number.NaN)).toBe(false)
  })
})
