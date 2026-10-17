/** Épingles de « Mes actions » : des domaines et des compétences, par personnage. */
import type { Character } from '../../types/character'
import { DOMAINS } from '../../data/sindragosa/domains'

export type Pin = `domain:${string}` | `ability:${number}`

/** Sans épingle choisie : les 3 domaines les plus hauts (à égalité, le plus avancé en coches). */
export function defaultPins(c: Character): Pin[] {
  return DOMAINS
    .map((d, order) => ({ id: d.id, order, rank: c.domains[d.id]?.rank ?? 0, ticks: c.domains[d.id]?.ticks ?? 0 }))
    .filter((d) => d.rank > 0 || d.ticks > 0)
    .sort((a, b) => b.rank - a.rank || b.ticks - a.ticks || a.order - b.order)
    .slice(0, 3)
    .map((d) => `domain:${d.id}` as Pin)
}

export function togglePin(pins: Pin[], pin: Pin): Pin[] {
  return pins.includes(pin) ? pins.filter((p) => p !== pin) : [...pins, pin]
}
