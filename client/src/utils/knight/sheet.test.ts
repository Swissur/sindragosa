import { describe, expect, it } from 'vitest'
import { comboSetup, createKnightSheet, knightDerived, normalizeKnightSheet, setAspect } from './sheet'

describe('normalizeKnightSheet', () => {
  it('une fiche vierge donne la fiche de départ', () => {
    const s = normalizeKnightSheet({})
    expect(s).toEqual(createKnightSheet())
    expect(s.aspects.chair).toBe(2)
    expect(s.carac.force).toBe(1)
    expect(s.espoir).toEqual({ current: 50, max: 50 })
  })

  it('ramène les valeurs dans leurs bornes', () => {
    const s = normalizeKnightSheet({
      aspects: { chair: 12, bete: 0 },
      carac: { force: 7, combat: 4 },
      overdrive: { force: 9 },
      espoir: { current: 80, max: 50 },
    })
    expect(s.aspects.chair).toBe(9)
    expect(s.aspects.bete).toBe(1)
    expect(s.carac.force).toBe(7)
    // une carac ne dépasse pas son aspect
    expect(s.carac.combat).toBe(1)
    expect(s.overdrive.force).toBe(5)
    expect(s.espoir.current).toBe(50)
  })

  it('refuse une carac de référence hors de son aspect', () => {
    const s = normalizeKnightSheet({ derived: { defense: 'tir', reaction: 'savoir' } })
    expect(s.derived.defense).toBe('hargne')
    expect(s.derived.reaction).toBe('savoir')
  })

  it("survit à n'importe quoi", () => {
    expect(normalizeKnightSheet(null)).toEqual(createKnightSheet())
    expect(normalizeKnightSheet({ aspects: 'x', armure: { pa: 3 } }).armure.pa).toEqual({ current: 0, max: 0 })
  })
})

describe('knightDerived', () => {
  it('défense, réaction, initiative avec overdrive ; santé et contacts sans', () => {
    const s = createKnightSheet()
    s.aspects.chair = 4
    s.carac.force = 3
    s.overdrive.force = 2
    s.carac.hargne = 2
    s.overdrive.hargne = 1
    s.carac.aura = 2
    const d = knightDerived(s)
    expect(d.defense).toBe(3)
    expect(d.santeMax).toBe(28)
    expect(d.contactsMax).toBe(2)
    expect(d.initiative).toBe(1)
  })
})

describe('setAspect', () => {
  it('baisser un aspect plafonne ses caracs', () => {
    const s = createKnightSheet()
    s.aspects.chair = 5
    s.carac.force = 5
    setAspect(s, 'chair', 3)
    expect(s.aspects.chair).toBe(3)
    expect(s.carac.force).toBe(3)
    expect(s.carac.endurance).toBe(1)
  })

  it('reste entre 1 et 9', () => {
    const s = createKnightSheet()
    setAspect(s, 'dame', 0)
    expect(s.aspects.dame).toBe(1)
    setAspect(s, 'dame', 10)
    expect(s.aspects.dame).toBe(9)
  })
})

describe('comboSetup', () => {
  it('additionne les deux caracs et leurs overdrives', () => {
    const s = createKnightSheet()
    s.carac.combat = 2
    s.overdrive.combat = 1
    s.carac.force = 1
    s.overdrive.force = 1
    expect(comboSetup(s, 'combat', 'force')).toEqual({ count: 3, baseCount: 2, overdrive: 2 })
  })

  it('refuse la même carac en base et en combo', () => {
    expect(comboSetup(createKnightSheet(), 'tir', 'tir')).toBeNull()
  })
})
