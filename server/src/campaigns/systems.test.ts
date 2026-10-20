import { describe, expect, it } from 'vitest'
import { isCampaignSystem, pickCharacterFor } from './systems.js'

describe('isCampaignSystem', () => {
  it('connaît WoW Forever et Knight', () => {
    expect(isCampaignSystem('wow-forever')).toBe(true)
    expect(isCampaignSystem('knight')).toBe(true)
    expect(isCampaignSystem('dnd')).toBe(false)
  })
})

describe('pickCharacterFor', () => {
  const wow = { id: 1, system: 'wow-forever', isActive: true }
  const knightA = { id: 2, system: 'knight', isActive: false }
  const knightB = { id: 3, system: 'knight', isActive: false }

  it("prend l'actif s'il est du bon système", () => {
    expect(pickCharacterFor([wow, knightA], 'wow-forever')).toBe(wow)
  })

  it("prend le premier du bon système quand l'actif est d'un autre", () => {
    expect(pickCharacterFor([wow, knightA, knightB], 'knight')).toBe(knightA)
  })

  it("préfère l'actif même s'il n'est pas le premier", () => {
    const active = { ...knightB, isActive: true }
    expect(pickCharacterFor([knightA, active], 'knight')).toBe(active)
  })

  it("renvoie null quand aucun ne convient", () => {
    expect(pickCharacterFor([wow], 'knight')).toBeNull()
  })
})
