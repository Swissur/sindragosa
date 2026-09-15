import { describe, expect, it } from 'vitest'
import {
  ACCESS_TTL_SECONDS,
  CODE_TTL_SECONDS,
  REFRESH_TTL_SECONDS,
  expiresAt,
  isExpired,
  secondsUntil,
  toEpochSeconds,
} from './tokens.js'

const now = new Date('2026-09-15T12:00:00.000Z')

describe('durées de vie', () => {
  it('code 10 min, access 1 h, refresh 90 jours', () => {
    expect(CODE_TTL_SECONDS).toBe(600)
    expect(ACCESS_TTL_SECONDS).toBe(3600)
    expect(REFRESH_TTL_SECONDS).toBe(7_776_000)
  })

  it('calcule l expiration à partir de l instant donné', () => {
    expect(expiresAt(CODE_TTL_SECONDS, now).toISOString()).toBe('2026-09-15T12:10:00.000Z')
    expect(expiresAt(ACCESS_TTL_SECONDS, now).toISOString()).toBe('2026-09-15T13:00:00.000Z')
    expect(expiresAt(REFRESH_TTL_SECONDS, now).toISOString()).toBe('2026-12-14T12:00:00.000Z')
  })
})

describe('isExpired', () => {
  it('expire à la seconde pile et après', () => {
    expect(isExpired(now, now)).toBe(true)
    expect(isExpired(new Date(now.getTime() - 1), now)).toBe(true)
    expect(isExpired(new Date(now.getTime() + 1), now)).toBe(false)
  })
})

describe('secondsUntil', () => {
  it('rend les secondes restantes, jamais négatives', () => {
    expect(secondsUntil(expiresAt(ACCESS_TTL_SECONDS, now), now)).toBe(3600)
    expect(secondsUntil(new Date(now.getTime() - 60_000), now)).toBe(0)
  })
})

describe('toEpochSeconds', () => {
  it('rend des secondes depuis l epoch (format AuthInfo.expiresAt)', () => {
    expect(toEpochSeconds(now)).toBe(Math.floor(now.getTime() / 1000))
  })
})
