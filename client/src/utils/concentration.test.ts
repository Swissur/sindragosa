import { describe, it, expect } from 'vitest'
import { allowedModes, upgradeDie, upgradeDiceInText } from './concentration'

describe('upgradeDie', () => {
  it('monte d’une catégorie', () => {
    expect(upgradeDie(4)).toBe(6)
    expect(upgradeDie(6)).toBe(8)
    expect(upgradeDie(10)).toBe(12)
  })

  it('le d12 plafonne, le d20 ne bouge pas', () => {
    expect(upgradeDie(12)).toBe(12)
    expect(upgradeDie(20)).toBe(20)
  })
})

describe('upgradeDiceInText', () => {
  it('monte les dés dans une description', () => {
    expect(upgradeDiceInText('Ajoute +2d6 aux dégâts')).toBe('Ajoute +2d8 aux dégâts')
  })

  it('ne confond pas d10 et d100, ne touche pas au d20', () => {
    expect(upgradeDiceInText('1d100')).toBe('1d100')
    expect(upgradeDiceInText('1d20')).toBe('1d20')
  })
})

describe('allowedModes', () => {
  it('une compétence de magie active a les 3 modes', () => {
    expect(allowedModes({ category: 'Voies arcaniques, éléments & chronomancie', actionType: 'complete' }))
      .toEqual(['econome', 'etendue', 'puissante'])
    expect(allowedModes({ category: "Voies de l'ombre, fél & démonologie", actionType: 'rapide' })).toHaveLength(3)
  })

  it('ni les passifs, ni les voies non magiques', () => {
    expect(allowedModes({ category: 'Voies divines, lumière & sacré', actionType: 'passif' })).toEqual([])
    expect(allowedModes({ category: 'Voies martiales, guerre & sang', actionType: 'complete' })).toEqual([])
  })
})
