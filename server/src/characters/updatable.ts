// Whitelist : seules ces colonnes sont modifiables par le client via POST/PUT.
// Bloque le mass-assignment (userId, isActive, createdAt…) et les clés inconnues.
// ⚠ Tout nouveau champ de fiche doit être ajouté ici, sinon il est jeté en
// silence (c'est ce qui est arrivé aux jets de croissance des PV en août 2026).
// Les titres et les patrons accordés n'y sont pas : seul le MJ les règle (`GM_EDITABLE_FIELDS`).
export const UPDATABLE_FIELDS = [
  'name', 'histoire', 'race', 'portraitImageId',
  'hpMax', 'hpCurrent', 'hpBonus', 'armor', 'armorBonus',
  'str', 'agi', 'end', 'int', 'wis', 'cha',
  'domains', 'specialties', 'advancedDomains',
  'abilityUses', 'sessionTicks', 'resources', 'crafts',
  'items', 'goldCoins', 'silverCoins', 'copperCoins',
  'pcCurrent', 'states', 'form', 'manaCurrent', 'manaMax',
  'sheet',
] as const

export type UpdatableField = (typeof UPDATABLE_FIELDS)[number]

export function pickUpdatable(raw: Record<string, unknown>): Partial<Record<UpdatableField, unknown>> {
  return Object.fromEntries(
    UPDATABLE_FIELDS.filter((k) => k in raw).map((k) => [k, raw[k]]),
  ) as Partial<Record<UpdatableField, unknown>>
}

// Ce que le MJ règle sur la fiche d'un joueur (plans/32 « Outils du MJ ») :
// caracs, rangs forcés, récompenses (coches), titres, patrons. `hpMax` suit l'Endurance,
// `manaMax` les rangs magiques.
export const GM_EDITABLE_FIELDS = [
  'str', 'agi', 'end', 'int', 'wis', 'cha',
  'domains', 'specialties', 'advancedDomains', 'titles', 'recipeGrants', 'hpMax', 'manaMax',
] as const

export type GmEditableField = (typeof GM_EDITABLE_FIELDS)[number]

export function pickGmEditable(raw: Record<string, unknown>): Partial<Record<GmEditableField, unknown>> {
  return Object.fromEntries(
    GM_EDITABLE_FIELDS.filter((k) => k in raw).map((k) => [k, raw[k]]),
  ) as Partial<Record<GmEditableField, unknown>>
}
