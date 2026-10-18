import { describe, it, expect } from 'vitest'
import { ABILITIES } from '../../data/sindragosa/abilities'
import { specialtyGrants } from './specialtyGrants'

const ability = (id: number) => ABILITIES.find((a) => a.id === id)!
const ids = () => 'new'

describe('spécialités homonymes', () => {
  it('débloquer Analyse des failles (#60) donne la spécialité, rattachée à Tactique & Analyse', () => {
    expect(specialtyGrants([], [ability(60)], ids)).toEqual([
      { id: 'new', domainId: 'tactique-analyse', name: 'Analyse des failles', level: 1, ticks: 0 },
    ])
  })

  it('Second souffle se rattache au domaine qui la cite en exemple', () => {
    expect(specialtyGrants([], [ability(26)], ids)[0].domainId).toBe('volonte-recuperation')
  })

  it('rien si la spécialité est déjà sur la fiche, ni pour une compétence sans homonyme', () => {
    const owned = [{ id: 's', domainId: 'tactique-analyse', name: 'Analyse des failles', level: 2, ticks: 0 }]
    expect(specialtyGrants(owned, [ability(60)], ids)).toEqual([])
    expect(specialtyGrants([], [ability(1)], ids)).toEqual([])
  })
})
