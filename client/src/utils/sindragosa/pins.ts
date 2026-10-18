/** Épingles de « Mes actions » : des domaines, des spécialités et des compétences, par personnage. */
import type { Character } from '../../types/character'
import { DOMAINS } from '../../data/sindragosa/domains'
import { RACE_ABILITY_ID } from '../../data/sindragosa/races'

export type Pin = `domain:${string}` | `specialty:${string}` | `ability:${number}`

/** Le pouvoir racial, favori par défaut. */
export const RACE_PIN: Pin = `ability:${RACE_ABILITY_ID}`

/**
 * Sans épingle choisie : le pouvoir racial, puis les 3 domaines les plus hauts
 * (à égalité, le plus avancé en coches).
 */
export function defaultPins(c: Character): Pin[] {
  const domains = DOMAINS
    .map((d, order) => ({ id: d.id, order, rank: c.domains[d.id]?.rank ?? 0, ticks: c.domains[d.id]?.ticks ?? 0 }))
    .filter((d) => d.rank > 0 || d.ticks > 0)
    .sort((a, b) => b.rank - a.rank || b.ticks - a.ticks || a.order - b.order)
    .slice(0, 3)
    .map((d) => `domain:${d.id}` as Pin)
  return c.race ? [RACE_PIN, ...domains] : domains
}

/** Épingles gardées avant le pouvoir racial : il y entre, comme favori par défaut. */
export function migrateLegacyPins(pins: Pin[]): Pin[] {
  return pins.includes(RACE_PIN) ? pins : [RACE_PIN, ...pins]
}

export function togglePin(pins: Pin[], pin: Pin): Pin[] {
  return pins.includes(pin) ? pins.filter((p) => p !== pin) : [...pins, pin]
}
