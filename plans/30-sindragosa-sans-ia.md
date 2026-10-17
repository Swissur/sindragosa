# 30 — Sindragosa : nouvelle identité, sans IA

Ce fork devient **Sindragosa**. On retire toute l'IA : l'app redevient un outil de table pur.

## Décisions

- **Identité** : « Terres d'Arran » / « Arran DnD » → « Sindragosa » partout où c'est le nom de l'app
  (titre, PWA, meta, login, nav, package names, docs). Le **monde du jeu** garde son nom :
  lore, règles, bestiaire, `knowledge/` et commentaires de règles disent toujours « Terres d'Arran ».
- **Infra intacte** : app Fly `arran-dnd`, domaine, base `arrandnd`, clés localStorage, conteneurs Docker.
- **IA retirée en entier** :
  - chat `/chat` (`POST /api/chat`, galerie `GET /api/images`, génération d'images Gemini) ;
  - synthèse vocale (`/api/tts`) ;
  - bouton MJ « Génère le loot » (seul autre appel LLM) ;
  - connecteur Isilwen : MCP (`/mcp`), serveur OAuth (`/autoriser`, tables `oauth_*`), plugin `GET /plugin`
    + dossiers `plugin/`, `.claude-plugin/`, `.agents/`.
- **Gardé** : la table `generated_images` et `GET /api/images/:id` — ils servent les portraits uploadés.
  `knowledge/` reste comme référence de règles (skill `/add-knowledge`), mais le serveur ne le lit plus.

## Étapes

1. Serveur : supprimer `ai/`, `chat/`, `isilwen/`, `knowledge/`, `mcp/`, `oauth/`, `plugin/`, `routes/tts.ts` ;
   vider `index.ts` du chat ; retirer la route loot ; migration qui droppe les tables `oauth_*` ;
   retirer les SDK `@anthropic-ai/sdk`, `@google/genai`, `@modelcontextprotocol/*`.
   → verify : `tsc` passe, `npm test -w server` vert.
2. Client : supprimer `ChatView` et ses dépendances exclusives, `AuthorizeView`, `IsilwenConnectionsCard`,
   le lien nav, le bouton loot. → verify : `vue-tsc` passe, `npm test -w client` vert.
3. Dockerfile, e2e fixtures, `.env.example`, workflow Fly. → verify : `npm run build`.
4. Rebranding Sindragosa. → verify : `git grep "Terres d'Arran"` ne remonte que du lore/des règles.
5. Docs : CLAUDE.md, README, AGENTS.md, skill `lance-serveur`.
