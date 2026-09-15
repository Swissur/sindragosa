async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(path, { credentials: 'include', ...options })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw Object.assign(new Error(`OAuth API error ${res.status}`), { status: res.status, body })
  }
  return res.json()
}

/** Ce que le connecteur demande, affiché sur l'écran de consentement. */
export interface OAuthRequest {
  clientName: string
  scopes: string[]
}

/** Une connexion active (Claude, ChatGPT…) listée dans les options. */
export interface OAuthConnection {
  id: number
  clientName: string
  createdAt: string
  lastUsedAt: string | null
}

export async function fetchOAuthRequest(id: string): Promise<OAuthRequest> {
  return apiFetch(`/api/oauth/request/${encodeURIComponent(id)}`)
}

/** Renvoie l'URL de retour vers le connecteur : on y navigue, on quitte l'app. */
export async function decideOAuth(requestId: string, approved: boolean): Promise<string> {
  const data = await apiFetch('/api/oauth/decision', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestId, approved }),
  })
  return data.redirectTo as string
}

export async function fetchOAuthConnections(): Promise<OAuthConnection[]> {
  return apiFetch('/api/oauth/connections')
}

export async function revokeOAuthConnection(id: number): Promise<void> {
  await apiFetch(`/api/oauth/connections/${id}`, { method: 'DELETE' })
}
