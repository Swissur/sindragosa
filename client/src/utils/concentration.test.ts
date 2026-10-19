import { describe, expect, it } from 'vitest'
import { allowedModes } from './concentration'
import { ABILITIES } from '../data/sindragosa/abilities'

const ability = (id: number) => ABILITIES.find((a) => a.id === id)!

describe('allowedModes', () => {
  it('un sort avec un jet de domaine a les 3 modes', () => {
    expect(allowedModes(ability(46))).toEqual(['econome', 'etendue', 'puissante']) // Déflagration d'Arcane
  })

  it('un sort sans jet (réussite d\'office) n\'a pas Puissante', () => {
    expect(allowedModes(ability(45))).toEqual(['econome', 'etendue']) // Sang vampirique
  })

  it('ni les passifs ni les compétences sans mana', () => {
    expect(allowedModes(ability(208))).toEqual([]) // Sceau de piété, passif
    expect(allowedModes(ability(1))).toEqual([]) // Attaque sournoise
  })
})
