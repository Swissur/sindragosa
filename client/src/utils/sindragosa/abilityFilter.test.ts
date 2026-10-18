import { describe, it, expect } from 'vitest'
import { isFiltering, matchesAbilityFilter } from './abilityFilter'
import { ABILITIES } from '../../data/sindragosa/abilities'

// Attaque sournoise : action complète, « … ignore la valeur de bouclier de la cible. »
const sournoise = ABILITIES.find((a) => a.id === 1)!

describe('matchesAbilityFilter', () => {
  it('laisse tout passer sans filtre', () => {
    expect(matchesAbilityFilter(sournoise, { search: '', actionType: '' })).toBe(true)
  })

  it('cherche dans le nom sans casse ni accents', () => {
    expect(matchesAbilityFilter(sournoise, { search: 'ATTAQUE sour', actionType: '' })).toBe(true)
    expect(matchesAbilityFilter(sournoise, { search: 'boule de feu', actionType: '' })).toBe(false)
  })

  it('cherche aussi dans l’effet', () => {
    expect(matchesAbilityFilter(sournoise, { search: 'bouclier', actionType: '' })).toBe(true)
  })

  it('filtre par type d’action', () => {
    expect(matchesAbilityFilter(sournoise, { search: '', actionType: 'complete' })).toBe(true)
    expect(matchesAbilityFilter(sournoise, { search: '', actionType: 'passif' })).toBe(false)
  })
})

describe('isFiltering', () => {
  it('ignore une recherche faite d’espaces', () => {
    expect(isFiltering({ search: '  ', actionType: '' })).toBe(false)
    expect(isFiltering({ search: 'a', actionType: '' })).toBe(true)
    expect(isFiltering({ search: '', actionType: 'passif' })).toBe(true)
  })
})
