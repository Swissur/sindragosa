import { describe, expect, it } from 'vitest'
import { fitWithin } from './imageFile'

describe('fitWithin', () => {
  it('réduit le plus grand côté en gardant les proportions', () => {
    expect(fitWithin(4000, 3000)).toEqual({ width: 1600, height: 1200 })
    expect(fitWithin(3000, 4000)).toEqual({ width: 1200, height: 1600 })
  })

  it("n'agrandit jamais une petite image", () => {
    expect(fitWithin(800, 600)).toEqual({ width: 800, height: 600 })
  })
})
