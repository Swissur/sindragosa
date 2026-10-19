import { describe, it, expect } from 'vitest'
import {
  armorKind, averageDamage, convertAbilityText, convertArmor, convertDamage, convertMonster,
  convertStat, fixedRd, threatRank, type CoMonster,
} from './bestiary'

describe('caracs et rang de menace', () => {
  it('un mod 0 donne la base d’un joueur, jamais moins de 1', () => {
    expect(convertStat(0)).toBe(2)
    expect(convertStat(4)).toBe(4)
    expect(convertStat(3)).toBe(4)
    expect(convertStat(-11)).toBe(1)
  })

  it('R = NC ÷ 3 arrondi au-dessus, plafonné à 5', () => {
    expect(threatRank(0.5)).toBe(1)
    expect(threatRank(4)).toBe(2)
    expect(threatRank(8)).toBe(3)
    expect(threatRank(20)).toBe(5)
  })
})

describe('dégâts', () => {
  it('moyenne des dés et des bonus', () => {
    expect(averageDamage('2d6+6')).toBe(13)
    expect(averageDamage('1')).toBe(1)
    expect(averageDamage('2d6+2d6 de feu + enchevêtrement')).toBe(14)
  })

  it('la moitié de la moyenne, au moins 1', () => {
    expect(convertDamage('2d6+6')).toBe(7)
    expect(convertDamage('1')).toBe(1)
  })
})

describe('armure', () => {
  it('classe sur le nom', () => {
    expect(armorKind('Golem de pierre')).toBe('lourde')
    expect(armorKind('Dragon commun')).toBe('lourde')
    expect(armorKind('Combattant Brute NC6')).toBe('carapace')
    expect(armorKind('Ours brun')).toBe('cuir')
    expect(armorKind('Loup')).toBe('aucune')
    expect(armorKind('Mystique Arcaniste NC4')).toBe('aucune')
  })

  it('ne garde que la part fixe de la RD', () => {
    expect(fixedRd('6 + (5/magie)')).toBe(6)
    expect(fixedRd('5/magie')).toBe(0)
    expect(fixedRd(undefined)).toBe(0)
  })

  it('la base au rang 5, la moitié au rang 0, plus la RD fixe ÷ 2', () => {
    expect(convertArmor('lourde', 5)).toBe(6)
    expect(convertArmor('lourde', 0)).toBe(3)
    expect(convertArmor('carapace', 2)).toBe(3)
    expect(convertArmor('aucune', 5, '10')).toBe(5)
  })
})

describe('texte des capacités', () => {
  it('traduit les bonus, les dégâts, les difficultés et les plages de d20', () => {
    const { text, review } = convertAbilityText(
      "Sur un résultat de 15 à 20 sur un jet de d20 en attaque, l'aigle agrippe sa proie. Il obtient un bonus de +5 en attaque et +1d6 aux DM. Test de DEX difficulté 15.",
    )
    expect(text).toContain('Sur un critique en attaque')
    expect(text).toContain('+2d6 en attaque')
    expect(text).toContain('+2 aux dégâts')
    expect(text).toContain('Test de AGI palier moyenne')
    expect(review).toBe(false)
  })

  it('traduit le « deux d20, garder le meilleur » et les plages de réussite', () => {
    expect(convertAbilityText('Lancez deux d20 et gardez le meilleur résultat.').text).toBe('avec avantage (+1d6).')
    const { text, review } = convertAbilityText('lorsqu’il réussit une attaque avec un résultat de 15 à 20 sur un jet de d20, il mord.')
    expect(text).toContain('avec un critique, il mord')
    expect(review).toBe(false)
  })

  it('traduit les abrégés des PNJ génériques', () => {
    expect(convertAbilityText('Attaque à 2d20. Sur 15-20 touche auto.').text).toBe('Attaque avec avantage (+1d6). Sur un critique touche auto.')
    expect(convertAbilityText('+5 DEF en supériorité numérique.').text).toBe('+2d6 en défense en supériorité numérique.')
    expect(convertAbilityText('le comparer à la DEF de chaque cible').review).toBe(false)
  })

  it('calcule les formules en NC pour ce monstre, à l’échelle d6', () => {
    expect(convertAbilityText('+5 DEF si PV < [NC×5].', 6).text).toBe('+2d6 en défense si PV < 15.')
    expect(convertAbilityText('Sinon [2d6+NC] DM.', 5).text).toBe('Sinon 6 dégâts.')
    expect(convertAbilityText('Impossible si NC mort > NC nécromancien.').text).toBe('Impossible si rang de menace mort > rang de menace nécromancien.')
  })

  it('une difficulté en Mod. de FOR devient un palier', () => {
    expect(convertAbilityText('un test de AGI ou de FOR de difficulté [10 + Mod. de FOR] de l’élémentaire').text)
      .toBe('un test de AGI ou de FOR palier difficile de l’élémentaire')
  })

  it('ramène les valeurs en dur à l’échelle d6 (dégâts, PV, réductions ÷ 2)', () => {
    expect(convertAbilityText('subit 2d6 DM. Sinon 5 DM, puis 1 point de DM par tour.').text)
      .toBe('subit 4 dégâts. Sinon 3 dégâts, puis 1 dégât par tour.')
    expect(convertAbilityText('récupère 5 PV par tour. Même à 0 PV.').text).toBe('récupère 3 PV par tour. Même à 0 PV.')
    expect(convertAbilityText('RD 5 contre la magie. Réduits de 10 points.').text).toBe("+3 d'armure contre la magie. Réduits de 5 points.")
    expect(convertAbilityText('Il régénère 1 PV pour 3 points de DM.').text).toBe('Il régénère 1 PV pour 3 points de dégâts.')
    // Une formule en NC est déjà à l'échelle : elle n'est pas divisée deux fois
    expect(convertAbilityText('Sinon [2d6+NC] DM.', 5).text).toBe('Sinon 6 dégâts.')
  })

  it('traduit les abréviations des profils de PNJ', () => {
    expect(convertAbilityText('Premier tour : SAG 19 ou surpris. +5 discrétion/init.').text)
      .toBe('Premier tour : SAG palier difficile ou surpris. +2d6 en discrétion, +2 en initiative.')
    expect(convertAbilityText('+5 attaque, +3d6 DM. AM touche zone. CON [12+BU] ou 5 DM.').text)
      .toBe("+2d6 à l'attaque, +5 aux dégâts. Attaque magique touche zone. END palier difficile ou 3 dégâts.")
    expect(convertAbilityText('affaiblie (utiliser 1d12) avec un malus de -5.').text).toBe('affaiblie avec un malus de -2d6.')
  })

  it('signale ce qui reste en vocabulaire d20', () => {
    expect(convertAbilityText('Gagne +2 en DEF et lance 1d20.').review).toBe(true)
  })
})

describe('convertMonster', () => {
  const loup: CoMonster = {
    name: 'Loup', nc: 1, size: 'moyenne',
    stats: { for: 1, dex: 2, con: 1, int: -3, sag: 2, cha: -2 },
    def: 14, pv: 9, init: 12,
    attacks: [{ name: 'Morsure', bonus: 2, damage: '1d6+1' }],
    abilities: [],
  }

  it('applique les formules du plan 33', () => {
    const m = convertMonster(loup)
    expect(m.threat).toBe(1)
    expect(m.stats).toEqual({ str: 3, agi: 3, end: 3, int: 1, wis: 3, cha: 1 })
    expect(m.hp).toBe(5)
    expect(m.defense).toBe(4)
    expect(m.initiative).toBe(7)
    expect(m.armor).toBe(0)
    expect(m.attacks).toEqual([{ name: 'Morsure', pool: 4, damage: 2 }])
  })

  it('la RD conditionnelle devient une capacité Résistance', () => {
    const m = convertMonster({ ...loup, rd: '6 + (5/magie)' })
    expect(m.abilities[0]).toEqual({ name: 'Résistance', description: "+3 d'armure, sauf contre : magie." })
    expect(m.armor).toBe(3)
  })
})
