import { describe, expect, it } from 'vitest'
import { armorInitiativeMalus } from './armorInitiative.js'

const armor = (nature?: string, equipped = true) => ({ type: 'armure', equipped, nature })

describe('armorInitiativeMalus', () => {
  it('la plus lourde des armures équipées', () => {
    expect(armorInitiativeMalus([armor('cuir'), armor('plaque'), armor('maille', false)], 0)).toBe(3)
    expect(armorInitiativeMalus([armor()], 0)).toBe(0)
    expect(armorInitiativeMalus(null, 0)).toBe(0)
  })

  it('annulé par le rang en Armures & boucliers', () => {
    expect(armorInitiativeMalus([armor('maille')], 1)).toBe(2)
    expect(armorInitiativeMalus([armor('maille')], 3)).toBe(0)
    expect(armorInitiativeMalus([armor('plaque')], 3)).toBe(3)
    expect(armorInitiativeMalus([armor('plaque')], 5)).toBe(0)
  })
})
