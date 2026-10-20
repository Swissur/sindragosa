import { describe, it, expect } from 'vitest'
import { autoEntryCampaign, campaignHome, myCampaigns, playableCount } from './entryRoute'

const ME = 7
const led = { id: 1, gmUserId: ME, isMember: false }
const played = { id: 2, gmUserId: 99, isMember: true }
const foreign = { id: 3, gmUserId: 99, isMember: false }

describe('myCampaigns', () => {
  it('garde celles que je mène et celles où je joue', () => {
    expect(myCampaigns([led, played, foreign], ME)).toEqual([led, played])
  })
})

describe('autoEntryCampaign', () => {
  it('entre tout seul quand il n’y a qu’une campagne à moi', () => {
    expect(autoEntryCampaign([played, foreign], ME)).toBe(played)
  })

  it('demande de choisir avec 0 ou plusieurs campagnes', () => {
    expect(autoEntryCampaign([foreign], ME)).toBeNull()
    expect(autoEntryCampaign([led, played], ME)).toBeNull()
  })
})

describe('campaignHome', () => {
  it('le MJ arrive sur son écran', () => {
    expect(campaignHome(led, ME, 3)).toBe('/campagnes/1')
  })

  it('le joueur arrive sur sa fiche avec 0 ou 1 perso', () => {
    expect(campaignHome(played, ME, 0)).toBe('/personnage')
    expect(campaignHome(played, ME, 1)).toBe('/personnage')
  })

  it('le joueur choisit son perso quand il en a plusieurs', () => {
    expect(campaignHome(played, ME, 2)).toBe('/personnages')
  })
})

describe('playableCount', () => {
  const chars = [{ system: 'wow-forever' }, { system: 'knight' }, { system: 'wow-forever' }]

  it('ne compte que les fiches du système de la campagne', () => {
    expect(playableCount({ ...played, system: 'knight' }, chars)).toBe(1)
    expect(playableCount({ ...played, system: 'wow-forever' }, chars)).toBe(2)
  })

  it('compte tout quand le système est inconnu', () => {
    expect(playableCount(played, chars)).toBe(3)
  })
})
