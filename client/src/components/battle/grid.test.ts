import { describe, it, expect } from 'vitest'
import { snapToCell } from './grid'

describe('snapToCell', () => {
  it('pose au centre de la case touchée', () => {
    expect(snapToCell(0.1, 6)).toBe(0.5)
    expect(snapToCell(0.9, 6)).toBe(0.5)
    expect(snapToCell(-0.1, 6)).toBe(-0.5)
    expect(snapToCell(2.7, 6)).toBe(2.5)
  })

  it('garde le pion dans la grille', () => {
    expect(snapToCell(6, 6)).toBe(5.5)
    expect(snapToCell(42, 6)).toBe(5.5)
    expect(snapToCell(-6, 6)).toBe(-5.5)
    expect(snapToCell(-42, 6)).toBe(-5.5)
  })

  it('suit une grille de taille impaire', () => {
    // 7 cases : de -3,5 à 3,5, la case du milieu est centrée sur 0.
    expect(snapToCell(0.2, 3.5)).toBe(0)
    expect(snapToCell(3.4, 3.5)).toBe(3)
  })
})
