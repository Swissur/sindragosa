import { sanitizeLoot, type LootEntry } from '../combats/loot.js'

/**
 * Blocs d'un scénario (plans/47-scenarios-mj.md). Le client envoie le scénario
 * entier à chaque sauvegarde ; le serveur ne garde que les champs connus et
 * recopie depuis la base ceux qu'il est seul à poser (`givenTo`, `sharedAt`).
 */

export type ScenarioItem = Omit<LootEntry, 'chance' | 'givenTo'>

export type ScenarioBlock =
  | { id: string; type: 'texte'; text: string }
  | { id: string; type: 'image'; imageId: number; caption: string; sharedAt?: string }
  | { id: string; type: 'objet'; item: ScenarioItem; givenTo: string[] }
  | { id: string; type: 'pnj'; entryId: number }

export const MAX_BLOCKS = 300
const MAX_TEXT = 20_000

function isBlockId(value: unknown): value is string {
  return typeof value === 'string' && /^[\w-]{1,40}$/.test(value)
}

function isPositiveInt(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0
}

function parseBlock(raw: Record<string, unknown>, previous: ScenarioBlock | undefined): ScenarioBlock | null {
  if (!raw || !isBlockId(raw.id)) return null
  const id = raw.id
  switch (raw.type) {
    case 'texte':
      return { id, type: 'texte', text: typeof raw.text === 'string' ? raw.text.slice(0, MAX_TEXT) : '' }
    case 'image': {
      if (!isPositiveInt(raw.imageId)) return null
      const block: ScenarioBlock = {
        id, type: 'image', imageId: raw.imageId,
        caption: typeof raw.caption === 'string' ? raw.caption.slice(0, 200) : '',
      }
      if (previous?.type === 'image' && previous.imageId === raw.imageId && previous.sharedAt) {
        block.sharedAt = previous.sharedAt
      }
      return block
    }
    case 'objet': {
      const [item] = sanitizeLoot([raw.item])
      if (!item) return null
      delete item.chance
      const givenTo = previous?.type === 'objet' ? previous.givenTo : []
      return { id, type: 'objet', item, givenTo }
    }
    case 'pnj':
      return isPositiveInt(raw.entryId) ? { id, type: 'pnj', entryId: raw.entryId } : null
    default:
      return null
  }
}

/** Les blocs valides venus du client, enrichis de ce que seul le serveur pose. */
export function sanitizeBlocks(raw: unknown, previous: ScenarioBlock[]): ScenarioBlock[] {
  if (!Array.isArray(raw)) return []
  const byId = new Map(previous.map((b) => [b.id, b]))
  const seen = new Set<string>()
  const blocks: ScenarioBlock[] = []
  for (const r of raw.slice(0, MAX_BLOCKS)) {
    const block = parseBlock(r as Record<string, unknown>, byId.get((r as { id?: string })?.id ?? ''))
    if (!block || seen.has(block.id)) continue
    seen.add(block.id)
    blocks.push(block)
  }
  return blocks
}

/** Le drapeau : '' (tout en haut), l'id d'un bloc existant, ou null. */
export function sanitizeBookmark(raw: unknown, blocks: ScenarioBlock[]): string | null {
  if (raw === '') return ''
  if (typeof raw !== 'string') return null
  return blocks.some((b) => b.id === raw) ? raw : null
}

/** Les blocs lus en base (jsonb déjà validé à l'écriture). */
export function storedBlocks(raw: unknown): ScenarioBlock[] {
  return Array.isArray(raw) ? (raw as ScenarioBlock[]) : []
}
