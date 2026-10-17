/**
 * Initiative Sindragosa = Agilité + Sagesse + rang en Perception & Sens (docs/regles/Sindragosa.pdf § 4.A).
 * Même formule que le client (client/src/utils/sindragosa/combat.ts).
 */
export function computeInitiative(char: { agi: number; wis: number; domains: Record<string, { rank: number }> }): number {
  return char.agi + char.wis + (char.domains['perception-sens']?.rank ?? 0)
}
