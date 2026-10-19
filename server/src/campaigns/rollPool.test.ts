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
})
