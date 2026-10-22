async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(path, { credentials: 'include', ...options })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw Object.assign(new Error(`Codex API error ${res.status}`), { status: res.status, body })
  }
  return res.json()
}

export type CodexType = 'personnage' | 'lieu' | 'autre'

export interface CodexEntry {
  id: number
  campaignId: number
  type: CodexType
  name: string
  description: string
  /** '' = pas de couleur, sinon « #rrggbb ». */
  color: string
  /** Fiche PNJ d'un scénario : seul le MJ l'écrit, les joueurs y ajoutent leurs notes. */
  gmOwned: boolean
  /** Cachée aux joueurs (le MJ la voit seul, jusqu'à la révéler). */
  hidden: boolean
  /** Notes secrètes du MJ ; toujours '' pour un joueur. */
  gmNotes: string
  /** Portrait (`/api/images/:id`). */
  imageId: number | null
  createdByUserId: number
  version: number
  createdAt: string
  updatedAt: string
}

export async function fetchCodexEntries(campaignId: number): Promise<CodexEntry[]> {
  return apiFetch(`/api/campaigns/${campaignId}/codex`)
}

export async function createCodexEntry(
  campaignId: number,
  data: { name: string; type: CodexType; description?: string; color?: string; secret?: boolean },
): Promise<CodexEntry> {
  return apiFetch(`/api/campaigns/${campaignId}/codex`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function updateCodexEntry(
  campaignId: number,
  entryId: number,
  data: {
    name?: string
    type?: CodexType
    description?: string
    color?: string
    gmNotes?: string
    imageId?: number | null
    expectedVersion?: number
  },
): Promise<CodexEntry> {
  return apiFetch(`/api/campaigns/${campaignId}/codex/${entryId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

/** Le MJ montre (`hidden: false`) ou recache une de ses fiches. */
export async function revealCodexEntry(campaignId: number, entryId: number, hidden: boolean): Promise<CodexEntry> {
  return apiFetch(`/api/campaigns/${campaignId}/codex/${entryId}/reveal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hidden }),
  })
}

/** Mes notes privées sur une fiche (personne d'autre ne les lit). */
export async function fetchMyCodexNote(campaignId: number, entryId: number): Promise<{ content: string }> {
  return apiFetch(`/api/campaigns/${campaignId}/codex/${entryId}/my-note`)
}

export async function saveMyCodexNote(campaignId: number, entryId: number, content: string): Promise<void> {
  await apiFetch(`/api/campaigns/${campaignId}/codex/${entryId}/my-note`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
}

export async function deleteCodexEntry(campaignId: number, entryId: number): Promise<void> {
  await apiFetch(`/api/campaigns/${campaignId}/codex/${entryId}`, { method: 'DELETE' })
}

export interface MentionSource {
  id: number
  title: string
  content: string
  updatedAt: string
}

export async function fetchCodexMentions(
  campaignId: number,
  entryId: number,
): Promise<{ notes: MentionSource[]; pages: MentionSource[]; board: MentionSource | null }> {
  return apiFetch(`/api/campaigns/${campaignId}/codex/${entryId}/mentions`)
}
