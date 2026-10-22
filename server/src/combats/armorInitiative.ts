/**
 * Initiative perdue à cause de l'armure portée (décidé le 2026-10-22). Même règle
 * que client/src/utils/sindragosa/armorNature.ts : la plus lourde des armures
 * équipées fixe le malus, le rang en Armures & boucliers annule les petits.
 */
const INIT_MALUS: Record<string, number> = { tissu: 0, cuir: 1, maille: 2, plaque: 3 }

/** Plus forte valeur de malus que le rang annule : rang 1 → 1, rang 3 → 2, rang 5 → 3. */
function cancelledUpTo(rank: number): number {
  if (rank >= 5) return 3
  if (rank >= 3) return 2
  if (rank >= 1) return 1
  return 0
}

export function armorInitiativeMalus(items: unknown, armorRank: number): number {
  const list = Array.isArray(items) ? (items as { type?: unknown; equipped?: unknown; nature?: unknown }[]) : []
  const malus = Math.max(0, ...list
    .filter((i) => i?.type === 'armure' && i.equipped)
    .map((i) => INIT_MALUS[typeof i.nature === 'string' ? i.nature : 'tissu'] ?? 0))
  return malus <= cancelledUpTo(armorRank) ? 0 : malus
}
