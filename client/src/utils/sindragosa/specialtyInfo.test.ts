import { describe, expect, it } from 'vitest'
import { abilitiesRequiringSpecialty } from './specialtyInfo'

describe('abilitiesRequiringSpecialty', () => {
  it('liste les compétences qui exigent la spécialité, avec le niveau', () => {
    expect(abilitiesRequiringSpecialty('Lutte / Mains nues')).toContainEqual({ abilityId: 110, name: 'Frappe de la gorge', level: 2 })
  })

  it('reconnaît une variante du nom', () => {
    expect(abilitiesRequiringSpecialty('Lutte').map((u) => u.abilityId)).toContain(110)
  })

  it('trie par niveau exigé', () => {
    const levels = abilitiesRequiringSpecialty('Lutte / Mains nues').map((u) => u.level)
    expect(levels).toEqual([...levels].sort((a, b) => a - b))
  })

  it('ne trouve rien pour une spécialité libre', () => {
    expect(abilitiesRequiringSpecialty('Cuisine des Pandarens')).toEqual([])
  })
})
