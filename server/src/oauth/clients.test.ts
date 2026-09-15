import { describe, expect, it } from 'vitest'
import { isAllowedRedirectUri } from './clients.js'

describe('isAllowedRedirectUri', () => {
  it('accepte les quatre formes prévues', () => {
    expect(isAllowedRedirectUri('https://claude.ai/api/mcp/auth_callback')).toBe(true)
    expect(isAllowedRedirectUri('https://chatgpt.com/connector_platform_oauth_redirect')).toBe(true)
    expect(isAllowedRedirectUri('http://localhost:43110/callback')).toBe(true)
    expect(isAllowedRedirectUri('http://127.0.0.1:8912/callback')).toBe(true)
  })

  it('accepte n importe quel port en loopback, et l absence de port', () => {
    expect(isAllowedRedirectUri('http://localhost:1/callback')).toBe(true)
    expect(isAllowedRedirectUri('http://localhost:65535/callback')).toBe(true)
    expect(isAllowedRedirectUri('http://localhost/callback')).toBe(true)
    expect(isAllowedRedirectUri('http://127.0.0.1/callback')).toBe(true)
  })

  it('refuse tout le reste', () => {
    expect(isAllowedRedirectUri('https://evil.com/callback')).toBe(false)
    expect(isAllowedRedirectUri('http://evil.com/callback')).toBe(false)
    // Un sous-domaine qui commence par le bon nom ne suffit pas.
    expect(isAllowedRedirectUri('https://claude.ai.evil.com/api/mcp/auth_callback')).toBe(false)
    // Bon hôte, mauvais chemin.
    expect(isAllowedRedirectUri('https://claude.ai/autre')).toBe(false)
    expect(isAllowedRedirectUri('http://localhost:3000/autre')).toBe(false)
    // Loopback mais pas en clair, ou avec des paramètres.
    expect(isAllowedRedirectUri('https://localhost:3000/callback')).toBe(false)
    expect(isAllowedRedirectUri('http://localhost:3000/callback?next=x')).toBe(false)
    expect(isAllowedRedirectUri('pas-une-url')).toBe(false)
    expect(isAllowedRedirectUri('')).toBe(false)
  })
})
