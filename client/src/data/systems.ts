/** Systèmes de jeu (plans/43) : une campagne en a un, une fiche aussi. */
export const GAME_SYSTEMS = [
  { value: 'wow-forever', label: 'WoW Forever' },
  { value: 'knight', label: 'Knight' },
] as const

export type GameSystemId = (typeof GAME_SYSTEMS)[number]['value']

export function isGameSystem(value: unknown): value is GameSystemId {
  return GAME_SYSTEMS.some((s) => s.value === value)
}

export const systemLabel = (id: GameSystemId) => GAME_SYSTEMS.find((s) => s.value === id)!.label

/** Nom d'une fiche toute neuve. */
export const NEW_CHARACTER_NAME: Record<GameSystemId, string> = {
  'wow-forever': 'Nouveau héros',
  knight: 'Nouveau chevalier',
}
