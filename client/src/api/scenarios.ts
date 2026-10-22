import type { ItemRow } from '../types/character'

/** Scénarios du MJ (plans/47-scenarios-mj.md). */

const BASE = '/api/campaigns'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

/** Un objet de scénario : un objet d'inventaire, sans id ni état « équipé ». */
export type ScenarioItem = Omit<ItemRow, 'id' | 'equipped' | 'quantity'> & { quantity?: number }

export type ScenarioBlock =
  | { id: string; type: 'texte'; text: string }
  | { id: string; type: 'image'; imageId: number; caption: string; sharedAt?: string }
  | { id: string; type: 'objet'; item: ScenarioItem; givenTo: string[] }
  | { id: string; type: 'pnj'; entryId: number }

export type ScenarioBlockType = ScenarioBlock['type']

export interface ScenarioSummary {
  id: number
  title: string
  blockCount: number
  updatedAt: string
}

export interface Scenario {
  id: number
  campaignId: number
  title: string
  blocks: ScenarioBlock[]
  /** Id du bloc après lequel le drapeau est posé, '' = tout en haut, null = pas de drapeau. */
  bookmark: string | null
  updatedAt: string
}

export interface SharedImage {
  id: number
  imageId: number
  caption: string
  sharedAt: string
}

export function fetchScenarios(campaignId: number): Promise<ScenarioSummary[]> {
  return request(`/${campaignId}/scenarios`)
}

export function createScenario(campaignId: number, title: string): Promise<Scenario> {
  return request(`/${campaignId}/scenarios`, { method: 'POST', body: JSON.stringify({ title }) })
}

export function fetchScenario(campaignId: number, scenarioId: number): Promise<Scenario> {
  return request(`/${campaignId}/scenarios/${scenarioId}`)
}

export function saveScenario(
  campaignId: number,
  scenarioId: number,
  data: Pick<Scenario, 'title' | 'blocks' | 'bookmark'>,
): Promise<Scenario> {
  return request(`/${campaignId}/scenarios/${scenarioId}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteScenario(campaignId: number, scenarioId: number): Promise<void> {
  return request(`/${campaignId}/scenarios/${scenarioId}`, { method: 'DELETE' })
}

export function uploadScenarioImage(campaignId: number, data: string, mimeType: string): Promise<{ imageId: number }> {
  return request(`/${campaignId}/scenario-images`, { method: 'POST', body: JSON.stringify({ data, mimeType }) })
}

export function shareImageBlock(campaignId: number, scenarioId: number, blockId: string): Promise<Scenario> {
  return request(`/${campaignId}/scenarios/${scenarioId}/blocks/${blockId}/share`, { method: 'POST', body: '{}' })
}

export function giveItemBlock(campaignId: number, scenarioId: number, blockId: string, userId: number): Promise<Scenario> {
  return request(`/${campaignId}/scenarios/${scenarioId}/blocks/${blockId}/give`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  })
}

export function fetchSharedImages(campaignId: number): Promise<SharedImage[]> {
  return request(`/${campaignId}/shared-images`)
}
