// Whitelist : seules ces colonnes sont modifiables par le client via POST/PUT.
// Bloque le mass-assignment (userId, isActive, createdAt…) et les clés inconnues.
// ⚠ Tout nouveau champ de fiche doit être ajouté ici, sinon il est jeté en
// silence (c'est ce qui est arrivé aux jets de croissance des PV en août 2026).
export const UPDATABLE_FIELDS = [
  'name', 'histoire', 'race', 'portraitImageId',
  'hpMax', 'hpCurrent', 'hpBonus', 'armor',
  'str', 'agi', 'end', 'int', 'wis', 'cha',
  'domains', 'specialties', 'advancedDomains', 'titles',
  'abilityUses', 'sessionTicks', 'resources', 'crafts', 'weapons',
  'items', 'goldCoins', 'silverCoins', 'copperCoins',
  'pcCurrent', 'states',
] as const

export type UpdatableField = (typeof UPDATABLE_FIELDS)[number]

export function pickUpdatable(raw: Record<string, unknown>): Partial<Record<UpdatableField, unknown>> {
  return Object.fromEntries(
    UPDATABLE_FIELDS.filter((k) => k in raw).map((k) => [k, raw[k]]),
  ) as Partial<Record<UpdatableField, unknown>>
}
