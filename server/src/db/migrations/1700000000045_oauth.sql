-- OAuth 2.1 : l'app devient serveur d'autorisation pour les connecteurs MCP.
-- Voir plans/28-isilwen-mcp-plugin.md § 2.3. Seuls des hashs sha256 sont stockés.

CREATE TABLE IF NOT EXISTS oauth_client (
  client_id     text PRIMARY KEY,
  client_name   text        NOT NULL DEFAULT '',
  -- Liste blanche appliquée à l'enregistrement (claude.ai, chatgpt.com, loopback).
  redirect_uris jsonb       NOT NULL DEFAULT '[]'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Une demande d'autorisation, puis le code émis après consentement.
-- `id` est le request_id passé à la SPA ; `code_hash` reste NULL avant le « Autoriser ».
CREATE TABLE IF NOT EXISTS oauth_code (
  id             text PRIMARY KEY,
  code_hash      text UNIQUE,
  client_id      text        NOT NULL REFERENCES oauth_client(client_id) ON DELETE CASCADE,
  user_id        integer REFERENCES "user"(id) ON DELETE CASCADE,
  code_challenge text        NOT NULL,
  redirect_uri   text        NOT NULL,
  -- RFC 8707 : l'audience demandée.
  resource       text,
  scopes         jsonb       NOT NULL DEFAULT '[]'::jsonb,
  state          text,
  expires_at     timestamptz NOT NULL,
  -- Usage unique : posé à l'échange du code (ou au refus).
  used_at        timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS oauth_code_expires ON oauth_code (expires_at);

-- Un couple access/refresh. Rotation : le refresh utilisé est révoqué.
CREATE TABLE IF NOT EXISTS oauth_token (
  id                 serial PRIMARY KEY,
  user_id            integer     NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  client_id          text        NOT NULL REFERENCES oauth_client(client_id) ON DELETE CASCADE,
  -- Dénormalisé : reste affichable même si le client disparaît.
  client_name        text        NOT NULL DEFAULT '',
  access_hash        text        NOT NULL,
  refresh_hash       text        NOT NULL,
  scopes             jsonb       NOT NULL DEFAULT '[]'::jsonb,
  -- Audience du jeton (`aud`), toujours <PUBLIC_URL>/mcp.
  resource           text        NOT NULL DEFAULT '',
  access_expires_at  timestamptz NOT NULL,
  refresh_expires_at timestamptz NOT NULL,
  last_used_at       timestamptz,
  revoked_at         timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS oauth_token_access_hash  ON oauth_token (access_hash);
CREATE UNIQUE INDEX IF NOT EXISTS oauth_token_refresh_hash ON oauth_token (refresh_hash);
CREATE INDEX IF NOT EXISTS oauth_token_user ON oauth_token (user_id) WHERE revoked_at IS NULL;
