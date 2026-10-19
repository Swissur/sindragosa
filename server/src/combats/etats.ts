/**
 * Les ids des états préjudiciables (plans/42-etats.md) — la seule chose dont le
 * serveur a besoin, plus la durée en tours qu'il fait baisser.
 *
 * Les libellés, les icônes et le texte de règle vivent dans
 * `client/src/data/etats.ts` : ici on ne fait que valider ce qu'on nous envoie.
 * Les deux listes doivent rester dans le même ordre.
 */
export const ETAT_IDS = [
  'etourdi', 'paralyse', 'sommeil', 'surpris', 'peur', 'charme', 'silence', 'enracine',
  'ralenti', 'renverse', 'aveugle', 'affaibli', 'desoriente', 'desarme',
  'saignement', 'poison', 'maladie',
] as const

export type EtatId = (typeof ETAT_IDS)[number]

/** Un état posé sur une créature. `turns` absent = sans durée. */
export interface EtatEntry {
  id: EtatId
  turns?: number
}

/** Au-delà, ce n'est plus une durée de combat. */
export const MAX_TURNS = 99

export function isEtatId(value: unknown): value is EtatId {
  return typeof value === 'string' && (ETAT_IDS as readonly string[]).includes(value)
}

function isEtatEntry(value: unknown): value is EtatEntry {
  if (typeof value !== 'object' || value === null) return false
  const { id, turns } = value as { id?: unknown; turns?: unknown }
  if (!isEtatId(id)) return false
  return turns === undefined || (Number.isInteger(turns) && (turns as number) >= 1 && (turns as number) <= MAX_TURNS)
}

/** Valide une liste envoyée par un client ; `null` si un élément est invalide. Dédoublonne par id. */
export function parseEtats(raw: unknown): EtatEntry[] | null {
  if (!Array.isArray(raw) || !raw.every(isEtatEntry)) return null
  const byId = new Map<EtatId, EtatEntry>()
  for (const e of raw) byId.set(e.id, e.turns === undefined ? { id: e.id } : { id: e.id, turns: e.turns })
  return [...byId.values()]
}

/** Fin du tour d'une créature : chaque durée baisse d'un tour, l'état s'efface à 0. */
export function tickEtats(entries: readonly EtatEntry[]): EtatEntry[] {
  return entries.flatMap((e) => {
    if (e.turns === undefined) return [e]
    return e.turns > 1 ? [{ id: e.id, turns: e.turns - 1 }] : []
  })
}
