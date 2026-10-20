import { describe, it, expect } from 'vitest'
import { parsePool } from './rollPool.js'

describe('parsePool', () => {
  it('garde un pool valide', () => {
    expect(parsePool({ critFrom: 5, reached: 'exploit', critFail: false, extra: 1 }))
      .toEqual({ critFrom: 5, reached: 'exploit', critFail: false })
  })

  it("garde l'origine des dés, et l'oublie si elle est mal formée", () => {
    expect(parsePool({ critFrom: 6, reached: 'facile', sources: ['stat', 'domaine', 'chance'] })?.sources)
      .toEqual(['stat', 'domaine', 'chance'])
    expect(parsePool({ critFrom: 6, reached: 'facile', sources: ['stat', 'feu'] })).toEqual({ critFrom: 6, reached: 'facile', critFail: false })
    expect(parsePool({ critFrom: 6, reached: 'facile', sources: 'stat' })?.sources).toBeUndefined()
  })

  it('rejette ce qui ne colle pas', () => {
    expect(parsePool(null)).toBeNull()
    expect(parsePool({ critFrom: 4, reached: 'facile' })).toBeNull()
    expect(parsePool({ critFrom: 6, reached: 'énorme' })).toBeNull()
  })

  it('garde un jet de combo Knight', () => {
    expect(parsePool({ system: 'knight', exploit: true, critFail: false, difficulty: 3, sources: ['base', 'combo', 'exploit'] }))
      .toEqual({ system: 'knight', exploit: true, critFail: false, difficulty: 3, sources: ['base', 'combo', 'exploit'] })
    expect(parsePool({ system: 'knight', exploit: false, critFail: true }))
      .toEqual({ system: 'knight', exploit: false, critFail: true, difficulty: null })
  })

  it("rejette un jet Knight mal formé ou un système inconnu", () => {
    expect(parsePool({ system: 'knight', difficulty: -1 })).toBeNull()
    expect(parsePool({ system: 'knight', difficulty: 'ardu' })).toBeNull()
    expect(parsePool({ system: 'dnd', critFrom: 6, reached: 'facile' })).toBeNull()
  })
})
