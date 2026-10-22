import { describe, expect, it } from 'vitest'
import { ADVANCED_DOMAINS, DOMAINS } from './domains'
import { DOMAIN_INFO, SPECIALTY_INFO } from './domainInfo'

// Une infobulle sur téléphone : court, et jamais vide.
const MAX_LENGTH = 140

describe('textes d’aide des domaines et spécialités', () => {
  it('chaque domaine, de base ou avancé, a son texte', () => {
    const missing = [...DOMAINS, ...ADVANCED_DOMAINS].map((d) => d.id).filter((id) => !DOMAIN_INFO[id]?.trim())
    expect(missing).toEqual([])
  })

  it('chaque spécialité suggérée a son texte', () => {
    const missing = DOMAINS.flatMap((d) => d.specialties).filter((n) => !SPECIALTY_INFO[n]?.trim())
    expect(missing).toEqual([])
  })

  it('les textes tiennent dans une infobulle', () => {
    const tooLong = [...Object.entries(DOMAIN_INFO), ...Object.entries(SPECIALTY_INFO)]
      .filter(([, text]) => text.length > MAX_LENGTH)
      .map(([key]) => key)
    expect(tooLong).toEqual([])
  })
})
