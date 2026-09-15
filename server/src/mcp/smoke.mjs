#!/usr/bin/env node
/**
 * Smoke test de bout en bout : OAuth (DCR → consentement → jeton) puis MCP
 * (initialize → tools/list → tools/call get_me).
 *
 * Il court-circuite le navigateur sur deux points seulement :
 *   - le cookie de session est fabriqué ici avec JWT_SECRET (pas de login) ;
 *   - le clic « Autoriser » est un POST direct sur /api/oauth/decision.
 * Tout le reste est le vrai chemin qu'empruntent claude.ai et ChatGPT.
 *
 * Usage (le serveur doit tourner) :
 *   cd server && PORT=3599 npx tsx src/index.ts &
 *   node src/mcp/smoke.mjs [base] [userId]
 *
 * Note : les métadonnées OAuth annoncent PUBLIC_URL (localhost:3566 par
 * défaut), pas le port réel. C'est normal, on tape `base` directement.
 */
import { createHash, randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import jwt from 'jsonwebtoken'

const BASE = process.argv[2] ?? 'http://localhost:3599'
const USER_ID = Number(process.argv[3] ?? 1)
const REDIRECT_URI = 'http://localhost:9999/callback'

// `resource` doit valoir exactement l'audience attendue par le serveur, donc
// PUBLIC_URL + /mcp — pas l'URL réelle si on tourne sur un autre port.
const serverDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const env = Object.fromEntries(
  readFileSync(join(serverDir, '.env'), 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]
    }),
)
const PUBLIC_URL = (env.PUBLIC_URL || 'http://localhost:3566').replace(/\/+$/, '')
const RESOURCE = `${PUBLIC_URL}/mcp`

const b64url = (buf) => buf.toString('base64url')
const step = (n, label) => console.log(`\n── ${n}. ${label} ──`)

// 1. Enregistrement dynamique du client (ce que fait Claude Code au premier ajout)
step(1, 'DCR')
const client = await (
  await fetch(`${BASE}/oauth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_name: 'Smoke test',
      redirect_uris: [REDIRECT_URI],
      token_endpoint_auth_method: 'none',
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
    }),
  })
).json()
console.log('client_id :', client.client_id)

// 2. Cookie de session (à la place du login dans le navigateur)
step(2, 'cookie de session')
const cookie = `token=${jwt.sign({ sub: USER_ID, username: 'smoke' }, env.JWT_SECRET, { expiresIn: '1h' })}`
console.log(`utilisateur ${USER_ID}`)

// 3. /oauth/authorize avec PKCE S256 → redirection vers l'écran de consentement
step(3, 'authorize (PKCE S256)')
const verifier = b64url(randomBytes(32))
const challenge = b64url(createHash('sha256').update(verifier).digest())
const authorizeUrl = new URL(`${BASE}/oauth/authorize`)
for (const [k, v] of Object.entries({
  response_type: 'code',
  client_id: client.client_id,
  redirect_uri: REDIRECT_URI,
  code_challenge: challenge,
  code_challenge_method: 'S256',
  state: 'xyz',
  scope: 'read',
  resource: RESOURCE,
})) authorizeUrl.searchParams.set(k, v)

const authorizeRes = await fetch(authorizeUrl, { redirect: 'manual', headers: { cookie } })
const location = authorizeRes.headers.get('location')
console.log(authorizeRes.status, location)
const requestId = new URL(location, BASE).searchParams.get('request')
if (!requestId) throw new Error(`Pas de request= dans ${location}`)

// 4. Le clic « Autoriser » dans la SPA
step(4, 'consentement')
const decision = await (
  await fetch(`${BASE}/api/oauth/decision`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie },
    body: JSON.stringify({ requestId, approved: true }),
  })
).json()
const code = new URL(decision.redirectTo).searchParams.get('code')
console.log('redirectTo :', decision.redirectTo.replace(code, '<code>'))

// 5. Échange du code contre un jeton
step(5, 'token')
const tokens = await (
  await fetch(`${BASE}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      code_verifier: verifier,
      client_id: client.client_id,
      redirect_uri: REDIRECT_URI,
      resource: RESOURCE,
    }),
  })
).json()
console.log('token_type:', tokens.token_type, '| expires_in:', tokens.expires_in, '| scope:', tokens.scope)

// 6. MCP par-dessus le jeton
step(6, 'MCP')
let id = 0
async function rpc(method, params) {
  const res = await fetch(`${BASE}/mcp`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${tokens.access_token}`,
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++id, method, params }),
  })
  const body = await res.text()
  // Le transport peut répondre en SSE : on ne garde que la charge JSON.
  const json = body.startsWith('event:') || body.startsWith('data:')
    ? JSON.parse(body.split('\n').find((l) => l.startsWith('data: ')).slice(6))
    : JSON.parse(body)
  if (json.error) throw new Error(`${method}: ${JSON.stringify(json.error)}`)
  return json.result
}

const init = await rpc('initialize', {
  protocolVersion: '2025-06-18',
  capabilities: {},
  clientInfo: { name: 'smoke', version: '1.0.0' },
})
console.log('serveur :', init.serverInfo.name, init.serverInfo.version)
console.log('instructions :', init.instructions.split('\n')[0].slice(0, 80), '…')

const { tools } = await rpc('tools/list', {})
console.log(`outils (${tools.length}) :`, tools.map((t) => t.name).join(', '))
console.log('readOnlyHint partout :', tools.every((t) => t.annotations?.readOnlyHint === true))

const me = await rpc('tools/call', { name: 'get_me', arguments: {} })
console.log('get_me →')
console.log(me.content[0].text)
