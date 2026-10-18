import { describe, it, expect } from 'vitest'
import { abilityDetail, advancedDetail } from './unlockDetails'
import { ADVANCED_DOMAINS } from '../../data/sindragosa/domains'
import type { Ability } from '../../data/sindragosa/types'

const base: Ability = {
  id: 1, name: 'Vengeance', nameEn: null, category: 'Combat', prerequisites: [], prerequisitesRaw: '',
  actionType: 'reaction', actionLabel: 'Réaction', condition: '—',
  cooldownTurns: null, usesPer: null, effect: 'Rend le coup.',
}

describe('abilityDetail', () => {
  it('donne le nom, le type d’action et l’effet', () => {
    expect(abilityDetail(base)).toEqual({ label: 'Vengeance', meta: 'Réaction', text: 'Rend le coup.' })
  })

  it('ajoute recharge, limite d’usage et condition', () => {
    const d = abilityDetail({ ...base, cooldownTurns: 2, usesPer: 'combat', condition: 'Après une esquive.' })
    expect(d.meta).toBe('Réaction · recharge 2 tours · 1 / combat')
    expect(d.text).toBe('Après une esquive.\n\nRend le coup.')
  })
})

describe('advancedDetail', () => {
  it('donne les caracs et les prérequis', () => {
    const chrono = ADVANCED_DOMAINS.find((d) => d.id === 'chronomancie')!
    const d = advancedDetail(chrono)
    expect(d.label).toBe('Chronomancie')
    expect(d.meta).toMatch(/INT/)
    expect(d.text).toMatch(/^Ouvert par : .+ 3, .+ 1$/)
  })
})
