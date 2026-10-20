import type { CodexType } from './codex'

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(path, { credentials: 'include', ...options })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw Object.assign(new Error(`Codex board API error ${res.status}`), { status: res.status, body })
  }
  return res.json()
}

export type LinkDirection = 'one' | 'both'

export interface BoardNode {
  id: number
  entryId: number
  name: string
  type: CodexType
  /** Centre de la carte, en coordonnées du tableau. */
  x: number
  y: number
}

export interface BoardLink {
  id: number
  fromNodeId: number
  toNodeId: number
  direction: LinkDirection
  dashed: boolean
  label: string
}

export interface Board {
  /** Horodatage serveur : un état plus ancien que celui affiché est ignoré. */
  rev: number
  nodes: BoardNode[]
  links: BoardLink[]
}

export interface LinkStyle {
  direction: LinkDirection
  dashed: boolean
  label: string
}

const base = (campaignId: number) => `/api/campaigns/${campaignId}/codex-board`

function send(url: string, method: string, body?: unknown): Promise<Board> {
  return apiFetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
}

export function fetchBoard(campaignId: number): Promise<Board> {
  return apiFetch(base(campaignId))
}

export function placeNode(campaignId: number, entryId: number, x: number, y: number): Promise<Board> {
  return send(`${base(campaignId)}/nodes`, 'POST', { entryId, x, y })
}

export function moveNode(campaignId: number, nodeId: number, x: number, y: number): Promise<Board> {
  return send(`${base(campaignId)}/nodes/${nodeId}`, 'PATCH', { x, y })
}

export function removeNode(campaignId: number, nodeId: number): Promise<Board> {
  return send(`${base(campaignId)}/nodes/${nodeId}`, 'DELETE')
}

export function createLink(
  campaignId: number,
  data: { fromNodeId: number; toNodeId: number } & LinkStyle,
): Promise<Board> {
  return send(`${base(campaignId)}/links`, 'POST', data)
}

export function updateLink(
  campaignId: number,
  linkId: number,
  data: Partial<LinkStyle> & { reverse?: boolean },
): Promise<Board> {
  return send(`${base(campaignId)}/links/${linkId}`, 'PATCH', data)
}

export function deleteLink(campaignId: number, linkId: number): Promise<Board> {
  return send(`${base(campaignId)}/links/${linkId}`, 'DELETE')
}
