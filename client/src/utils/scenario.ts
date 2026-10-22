import type { Scenario, ScenarioBlock } from '../api/scenarios'

/** Manipulations pures d'un scénario (plans/47) : l'ordre des blocs et le drapeau. */

export function newBlockId(): string {
  return crypto.randomUUID()
}

/** Déplace le bloc `id` d'un cran (`-1` vers le haut, `1` vers le bas). */
export function moveBlock(blocks: ScenarioBlock[], id: string, delta: -1 | 1): ScenarioBlock[] {
  const from = blocks.findIndex((b) => b.id === id)
  const to = from + delta
  if (from < 0 || to < 0 || to >= blocks.length) return blocks
  const next = [...blocks]
  ;[next[from], next[to]] = [next[to], next[from]]
  return next
}

/**
 * Retire un bloc. Si le drapeau était posé après lui, il recule d'un bloc
 * (ou remonte tout en haut) : on ne perd pas sa place en nettoyant.
 */
export function removeBlock(
  blocks: ScenarioBlock[],
  bookmark: string | null,
  id: string,
): { blocks: ScenarioBlock[]; bookmark: string | null } {
  const index = blocks.findIndex((b) => b.id === id)
  if (index < 0) return { blocks, bookmark }
  const next = blocks.filter((b) => b.id !== id)
  if (bookmark !== id) return { blocks: next, bookmark }
  return { blocks: next, bookmark: index > 0 ? blocks[index - 1].id : '' }
}

/**
 * Reprend du scénario renvoyé par le serveur ce qu'il est seul à poser
 * (« donné à », « montrée ») sans écraser ce que le MJ tape en même temps.
 */
export function mergeServerFields(local: ScenarioBlock[], server: Scenario): ScenarioBlock[] {
  const byId = new Map(server.blocks.map((b) => [b.id, b]))
  return local.map((block) => {
    const remote = byId.get(block.id)
    if (block.type === 'objet' && remote?.type === 'objet') return { ...block, givenTo: remote.givenTo }
    if (block.type === 'image' && remote?.type === 'image') return { ...block, sharedAt: remote.sharedAt }
    return block
  })
}
