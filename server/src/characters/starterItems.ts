import { randomUUID } from 'node:crypto'

// L'inventaire d'un personnage neuf de WoW Forever : ses poings, une arme
// naturelle équipée d'office (Athlétisme, comme les mains nues côté client —
// `BARE_HANDS`). Les autres systèmes partent les mains vides.
export function starterItems(system: string) {
  if (system !== 'wow-forever') return []
  return [
    { id: randomUUID(), name: 'Poings', quantity: 1, type: 'arme', size: 'naturelle', domainId: 'athletisme', equipped: true },
  ]
}
