/**
 * Initiative d'un PJ en combat, selon le système de sa fiche (plans/43).
 *
 * - WoW Forever : Agilité + Sagesse + rang en Perception & Sens
 *   (docs/regles/Sindragosa.pdf § 4.A), même formule que client/src/utils/sindragosa/combat.ts.
 * - Knight : carac de Masque choisie + son overdrive, lus dans `sheet`
 *   (même lecture que client/src/utils/knight/sheet.ts).
 */
export interface InitiativeCharacter {
  agi: number
  wis: number
  domains: Record<string, { rank: number }>
  system?: string
  sheet?: unknown
}

export function computeInitiative(char: InitiativeCharacter): number {
  if (char.system === 'knight') return knightInitiative(char.sheet)
  return char.agi + char.wis + (char.domains['perception-sens']?.rank ?? 0)
}

const record = (v: unknown): Record<string, unknown> =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {}
const num = (v: unknown, fallback: number) => (typeof v === 'number' && Number.isFinite(v) ? v : fallback)

/** Une fiche Knight vierge vaut 1 (Discrétion à 1, sans overdrive). */
function knightInitiative(raw: unknown): number {
  const sheet = record(raw)
  const pick = record(sheet.derived).initiative
  const carac = typeof pick === 'string' ? pick : 'discretion'
  return num(record(sheet.carac)[carac], 1) + num(record(sheet.overdrive)[carac], 0)
}
