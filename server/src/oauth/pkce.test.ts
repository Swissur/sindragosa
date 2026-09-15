import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { hashSecret, randomSecret, s256, verifyPkceS256 } from './pkce.js'

describe('PKCE S256', () => {
  it('calcule le challenge de l exemple de la RFC 7636', () => {
    // Annexe B de la RFC 7636.
    const verifier = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
    expect(s256(verifier)).toBe('E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM')
  })

  it('accepte le bon verifier', () => {
    const verifier = randomSecret()
    expect(verifyPkceS256(verifier, s256(verifier))).toBe(true)
  })

  it('refuse un mauvais verifier, un challenge vide ou un challenge plain', () => {
    const verifier = randomSecret()
    expect(verifyPkceS256(randomSecret(), s256(verifier))).toBe(false)
    expect(verifyPkceS256(verifier, '')).toBe(false)
    expect(verifyPkceS256('', s256(verifier))).toBe(false)
    // « plain » (challenge = verifier) ne doit jamais passer.
    expect(verifyPkceS256(verifier, verifier)).toBe(false)
  })
})

describe('hashSecret', () => {
  it('rend le sha256 hexadécimal, stable', () => {
    const secret = 'un-code-en-clair'
    expect(hashSecret(secret)).toBe(createHash('sha256').update(secret).digest('hex'))
    expect(hashSecret(secret)).toBe(hashSecret(secret))
    expect(hashSecret(secret)).not.toBe(secret)
  })

  it('donne des empreintes différentes pour des secrets différents', () => {
    expect(hashSecret(randomSecret())).not.toBe(hashSecret(randomSecret()))
  })
})
