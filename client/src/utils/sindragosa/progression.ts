/**
 * Progression par coches : domaines (rangs 0-5), spécialités (Apprenti/Expert/Maître).
 * Règles : docs/regles/Sindragosa.pdf § 1.D.
 */

export const MAX_DOMAIN_RANK = 5
export const MAX_SPECIALTY_LEVEL = 3
/** Coches pour passer un niveau de spécialité. */
export const TICKS_PER_SPECIALTY_LEVEL = 2
/** Coches validables par séance, toutes compétences confondues. */
export const MAX_TICKS_PER_SESSION = 3
/** Dont au plus 2 pour une réussite marquante et 1 pour un échec critique. */
export const MAX_SUCCESS_TICKS_PER_SESSION = 2
export const MAX_CRIT_FAIL_TICKS_PER_SESSION = 1
/** En dev (`npm run dev`), pas de limite de séance pour tester la progression. Les tests unitaires et l'e2e la gardent. */
const SESSION_LIMIT_OFF = import.meta.env.DEV && import.meta.env.MODE !== 'test'

/** Coches nécessaires pour atteindre `rank` depuis rank - 1 : rang 1 = 2 coches … rang 5 = 6 coches. */
export function ticksForRank(rank: number): number {
  return rank + 1
}

export interface Track {
  /** Rang (domaine) ou niveau (spécialité). */
  rank: number
  /** Coches accumulées vers le rang suivant. */
  ticks: number
}

/** Ajoute une coche à un domaine ; passe au rang suivant quand la jauge est pleine. */
export function addDomainTick(track: Track): Track {
  if (track.rank >= MAX_DOMAIN_RANK) return track
  const ticks = track.ticks + 1
  return ticks >= ticksForRank(track.rank + 1) ? { rank: track.rank + 1, ticks: 0 } : { rank: track.rank, ticks }
}

/** Ajoute une coche à une spécialité : 2 coches par niveau. */
export function addSpecialtyTick(track: Track): Track {
  if (track.rank >= MAX_SPECIALTY_LEVEL) return track
  const ticks = track.ticks + 1
  return ticks >= TICKS_PER_SPECIALTY_LEVEL ? { rank: track.rank + 1, ticks: 0 } : { rank: track.rank, ticks }
}

/** On peut débloquer autant de spécialités dans un domaine que son rang actuel. */
export function canAddSpecialty(domainRank: number, specialtiesInDomain: number): boolean {
  return specialtiesInDomain < domainRank
}

/**
 * Motif d'une coche :
 * - `success` : réussite d'une action importante ou sous tension ;
 * - `crit-fail` : échec critique (c'est en se trompant qu'on apprend) ;
 * - `reward` : récompense du MJ (quête, donjon, entraînement), hors limite de séance.
 */
export type TickReason = 'success' | 'crit-fail' | 'reward'

export interface SessionTicks {
  success: number
  critFail: number
}

/** Une coche de ce motif peut-elle encore être validée pendant la séance ? */
export function canTick(reason: TickReason, session: SessionTicks): boolean {
  if (reason === 'reward' || SESSION_LIMIT_OFF) return true
  if (session.success + session.critFail >= MAX_TICKS_PER_SESSION) return false
  if (reason === 'success') return session.success < MAX_SUCCESS_TICKS_PER_SESSION
  return session.critFail < MAX_CRIT_FAIL_TICKS_PER_SESSION
}
