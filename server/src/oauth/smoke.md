# Smoke test OAuth (à jouer une fois `mountOAuth(app)` monté dans `index.ts`)

```bash
# 1. Métadonnées du serveur d'autorisation (RFC 8414)
curl -s http://localhost:3566/.well-known/oauth-authorization-server | jq
# attendu : issuer http://localhost:3566, authorization_endpoint .../oauth/authorize,
# code_challenge_methods_supported ["S256"], token_endpoint_auth_methods_supported ["none"]

# 2. Métadonnées de ressource protégée (RFC 9728) — les deux chemins répondent pareil
curl -s http://localhost:3566/.well-known/oauth-protected-resource | jq
curl -s http://localhost:3566/.well-known/oauth-protected-resource/mcp | jq
# attendu : resource "http://localhost:3566/mcp", authorization_servers ["http://localhost:3566"]

# 3. Enregistrement dynamique d'un client (RFC 7591)
curl -s -X POST http://localhost:3566/oauth/register -H 'content-type: application/json' \
  -d '{"client_name":"Claude","redirect_uris":["https://claude.ai/api/mcp/auth_callback"],"token_endpoint_auth_method":"none"}' | jq
# attendu : 201 + { client_id: "<uuid>", client_name: "Claude", redirect_uris: [...] }, sans client_secret

# 4. Même appel avec une redirect_uri hors liste blanche
curl -s -X POST http://localhost:3566/oauth/register -H 'content-type: application/json' \
  -d '{"client_name":"Evil","redirect_uris":["https://evil.com/callback"]}' | jq
# attendu : 400 + { "error": "invalid_redirect_uri" }

# 5. /mcp sans jeton
curl -si http://localhost:3566/mcp | head -5
# attendu : 401 + WWW-Authenticate: Bearer ... resource_metadata="http://localhost:3566/.well-known/oauth-protected-resource"
```
