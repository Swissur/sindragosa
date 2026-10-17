import { describe, it, expect } from 'vitest'
import { safeNext } from './safeNext'

describe('safeNext', () => {
  it('accepte un chemin relatif', () => {
    expect(safeNext('/options')).toBe('/options')
    expect(safeNext('/journal?page=abc')).toBe('/journal?page=abc')
  })

  it('refuse une URL absolue', () => {
    expect(safeNext('https://evil.example/x')).toBeNull()
    expect(safeNext('javascript:alert(1)')).toBeNull()
  })

  it('refuse une URL protocole-relative', () => {
    expect(safeNext('//evil.example')).toBeNull()
    expect(safeNext('/\\evil.example')).toBeNull()
  })

  it('refuse ce qui n est pas une chaine ou est vide', () => {
    expect(safeNext(undefined)).toBeNull()
    expect(safeNext(null)).toBeNull()
    expect(safeNext(['/options'])).toBeNull()
    expect(safeNext('')).toBeNull()
  })
})
