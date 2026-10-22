import { describe, expect, it } from 'vitest'
import { moveRefusal } from './moveMember.js'

const JOUEUR = 1
const MJ = 2
const AUTRE_MJ = 3

const check = (over: Partial<Parameters<typeof moveRefusal>[0]> = {}) =>
  moveRefusal({ actorId: JOUEUR, memberUserId: JOUEUR, fromGmId: MJ, toGmId: AUTRE_MJ, sameCampaign: false, ...over })

describe('moveRefusal', () => {
  it('le joueur emmène son perso vers une campagne menée par un autre', () => {
    expect(check()).toBeNull()
  })

  it('refuse la même campagne', () => {
    expect(check({ sameCampaign: true })).toBe('same')
  })

  it('le joueur ne rejoint pas une campagne qu’il mène', () => {
    expect(check({ toGmId: JOUEUR })).toBe('target-forbidden')
  })

  it('un autre joueur ne déplace pas le perso de quelqu’un', () => {
    expect(check({ actorId: 99 })).toBe('forbidden')
  })

  it('le MJ déplace un joueur vers une autre de ses campagnes', () => {
    expect(check({ actorId: MJ, toGmId: MJ })).toBeNull()
  })

  it('le MJ n’envoie pas un joueur dans la campagne d’un autre MJ', () => {
    expect(check({ actorId: MJ, toGmId: AUTRE_MJ })).toBe('target-forbidden')
  })
})
