import { describe, it, expect } from 'vitest'
import { TITLES } from './titles'

describe('titres', () => {
  it('les 22 titres exigés par les compétences, triés, sans doublon', () => {
    expect(TITLES).toHaveLength(22)
    expect(new Set(TITLES).size).toBe(22)
    expect(TITLES).toContain('Archimage')
    expect([...TITLES].sort((a, b) => a.localeCompare(b, 'fr'))).toEqual(TITLES)
  })
})
