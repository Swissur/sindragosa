# 28 — Isilwen partout : serveur MCP + plugin de skills

**Statut** : phase 1 implémentée le 15/09/2026 (MCP lecture seule + OAuth + écrans SPA + guide), à déployer sur Fly avec `PUBLIC_URL` puis à tester depuis claude.ai et ChatGPT. Phases 2 à 4 à venir. Décisions : OAuth dès la phase 1, règles copiées dans les skills, plugin dans ce repo, pas d'images en v1.
**Objectif** : chaque joueur parle à Isilwen depuis son propre Claude ou ChatGPT, avec les mêmes connaissances et les mêmes droits que dans l'app. D'abord en lecture seule, puis avec des modifications.

---

## 1. Analyse

### 1.1 Ce qu'Isilwen sait faire aujourd'hui (`server/src/index.ts`)

Le chat de l'app est un seul endpoint `POST /api/chat`. À chaque message, le serveur assemble un prompt système en 5 couches, dans cet ordre :

| Couche | Source | Taille | Variable ? |
|---|---|---|---|
| Préambule (persona, règles de comportement) | `SYSTEM_PREAMBLE` | ~2 500 tokens | non |
| Toutes les règles + lore + index des monstres | `knowledge/topics/*.md` sauf bestiaire | ~60 000 tokens | non |
| Fiche du personnage actif | **envoyée par le client** dans le body | ~1 000 | oui |
| Campagne : compagnons, codex, journal, titres des pages, notes privées | DB, `chat/campaignContext.ts` | ≤ 60 000 chars | oui |
| Combat en cours (masqué pour un joueur) | DB, `chat/combatContext.ts` | variable | oui |

Puis 5 outils : `get_page`, `get_character` (compagnon), `edit_character` (stats, avec confirmation), `generate_image` (Gemini), et `get_monstre` réservé au MJ (double verrou : non listé pour un joueur, et refus côté serveur).

Deux points comptent pour le MCP :

- **Le personnage actif vient du client**, pas de la base. Un connecteur externe n'envoie rien : le serveur devra le charger lui-même (`characters.isActive = true` pour l'utilisateur). Le code existe déjà dans `get_character` (mapping `str` → `abilities.strength`).
- **`runTool` est soudé au SSE** : il reçoit `res` et écrit des événements `tool_use` / `character_updated` / `image`. Il faut séparer « chercher la donnée et la mettre en texte » de « prévenir l'écran ».

### 1.2 Ce que les connecteurs acceptent (vérifié sur les docs de septembre 2026)

**Claude.ai** (Free, Pro, Max : 1 connecteur custom ; Team/Entreprise via l'admin)
- Menu : Personnaliser > Connecteurs > Ajouter un connecteur custom, URL HTTPS.
- Transport : Streamable HTTP. Seuls les **tools** sont visibles ; les *resources* et *prompts* MCP ne le sont pas.
- Auth acceptée : OAuth (DCR ou CIMD, PKCE S256 obligatoire), **aucune auth**, ou en-têtes statiques (beta, réservé aux admins d'orga → inutilisable pour nos joueurs).
- Chaque appel d'outil demande une approbation ; l'utilisateur peut cocher « Toujours autoriser » par outil.
- Redirect OAuth : `https://claude.ai/api/mcp/auth_callback`. Timeouts : 10 s pour discovery/registration/token.

**ChatGPT** (Plus, Pro, Business ; **pas Free**)
- Mode développeur à activer (Settings > Apps & Connectors > Advanced), puis « Create » avec l'URL.
- Auth acceptée : OAuth (CIMD préféré, DCR en secours) ou **aucune auth**. Pas de validation par OpenAI en mode dev.
- Un outil sans `readOnlyHint: true` est traité comme une écriture → confirmation à chaque fois.
- Une vieille page d'aide disait que Plus n'avait que la lecture ; la doc dev actuelle ne fait plus la distinction. **À vérifier sur un compte Plus.**

**Plugin Claude Code**
- Format : `.claude-plugin/plugin.json` + `skills/<nom>/SKILL.md` + `.mcp.json` (transports stdio/http/sse, interpolation `${ENV}`).
- Distribution : `.claude-plugin/marketplace.json` dans un repo git, puis `claude plugin marketplace add owner/repo` et `/plugin install`.
- **Un plugin ne marche que dans Claude Code.** Pas dans claude.ai, pas dans Claude Desktop, pas dans ChatGPT.

**Skills dans claude.ai**
- Upload manuel d'un ZIP `skill-name/SKILL.md` (+ `references/`, `scripts/`), réservé Pro/Max/Team/Entreprise. Chaque joueur uploade lui-même.
- ChatGPT n'a **aucun équivalent** des skills. Le plus proche : un « Projet » avec des instructions collées.

### 1.3 Conséquences pour le design

1. **Le MCP est le dénominateur commun.** C'est la seule chose qui marche partout (claude.ai, ChatGPT, Claude Code, Claude Desktop). Tout ce qui est indispensable à Isilwen (persona, règles, fiche, campagne) doit être accessible par le MCP. Les skills sont un confort pour les utilisateurs Claude, pas un prérequis.
2. **La persona passe par les `instructions` du serveur MCP.** Le handshake MCP `initialize` renvoie un champ `instructions` que le client injecte dans le prompt du modèle. C'est le seul canal côté serveur qui touche ChatGPT et Claude sans rien demander au joueur. On y met un préambule condensé d'Isilwen (~40 lignes : persona, rigueur des règles, bestiaire interdit, « appelle `get_me` avant de répondre »).
3. **Les règles ne tiennent pas dans les instructions** (60 000 tokens). Elles passent par des outils (`list_rules` / `get_rules(topic)`) et, pour les utilisateurs Claude, en plus par les skills avec les fichiers de règles en `references/`.
4. **L'auth est obligatoire** : chaque joueur voit *sa* fiche, *ses* notes, et un joueur ne doit jamais voir les stats des monstres. « Aucune auth » avec une URL partagée est exclu. Deux voies réalistes :
   - **A. Jeton personnel dans l'URL** : `https://arran-dnd.fly.dev/mcp/<jeton>`, connecteur déclaré « sans authentification ». Le joueur génère le jeton dans l'app (bouton dans ses réglages), le colle, c'est fini. Révocable. ~1 jour de travail. Faiblesse : l'URL est un secret (visible dans les réglages du connecteur, présente dans les logs du proxy Fly).
   - **B. OAuth auto-hébergé** : le serveur Express devient aussi serveur d'autorisation (metadata RFC 8414/9728, `/authorize` sur la page de login existante + écran de consentement, `/token` avec PKCE et rotation de refresh, `/register` pour DCR). Le SDK TS v2 a **retiré** les helpers de serveur d'autorisation ; ils survivent, gelés, dans `@modelcontextprotocol/server-legacy/auth` (`mcpAuthRouter` + `OAuthServerProvider` à implémenter avec stockage en base). ~3 jours. Expérience joueur standard (« Se connecter avec Arran »), rien à copier, révocation propre.
   - **Décision : B dès la phase 1.** Pas de jeton dans une URL, pas de connecteur à ré-ajouter plus tard, et le plugin Claude Code n'a besoin d'aucun secret dans `.mcp.json` (Claude Code fait l'OAuth lui-même). Le détail est en § 2.3.
5. **Fly.io s'endort** (`min_machines_running = 0`). Le premier appel réveille la machine en 2 à 5 s. Claude.ai coupe la discovery à 10 s : ça passe, mais c'est juste. Si ça rate à l'ajout du connecteur, passer `min_machines_running = 1` (quelques euros par mois).
6. **Le coût IA change de poche.** Le modèle tourne sur l'abonnement du joueur. L'app ne paie plus que la base. Sauf `generate_image` (Gemini, clé de Thomas) : à garder hors du MCP en v1.

---

## 2. Architecture cible

```
server/src/
├── isilwen/                  # NOUVEAU : tout ce qu'Isilwen sait, sans Express ni SSE
│   ├── persona.ts            # SYSTEM_PREAMBLE (chat) + MCP_INSTRUCTIONS (condensé)
│   ├── character.ts          # loadActiveCharacter(userId), buildCharacterSection (déplacé)
│   ├── party.ts              # fetchPartyContext, getCompanion (déplacés)
│   ├── journal.ts            # fetchJournalContext, readPage (déplacés)
│   ├── combat.ts             # fetchCombatContext (déplacé)
│   └── rules.ts              # listTopics, readTopic, loadMonster (réutilise knowledge/)
├── mcp/                      # NOUVEAU
│   ├── server.ts             # createIsilwenServer(user) → McpServer avec les tools
│   ├── tools.ts              # définitions des tools (schéma zod + annotations + handler)
│   ├── auth.ts               # résolution du jeton → userId (phase 1) / OAuth (phase 3)
│   └── router.ts             # app.all('/mcp/:token', ...) stateless
└── index.ts                  # /api/chat garde runTool + SSE, mais appelle isilwen/*
```

- **Stateless** : une instance `McpServer` par requête, construite pour l'utilisateur authentifié. Ça rend triviale la liste d'outils par rôle (`get_monster` n'existe pas pour un joueur), exactement comme `buildAnthropicTools(isGm)` aujourd'hui.
- **SDK** : `@modelcontextprotocol/server` + `@modelcontextprotocol/express` + `@modelcontextprotocol/node` (v2, ligne stable de la spec 2026-07-28). Le paquet `server-legacy/auth` ne rentre qu'en phase 3 si l'option B est retenue.
- **Un seul texte par donnée.** La fiche en texte, la section campagne, la section combat : le même rendu sert le chat de l'app et le MCP. Pas de deuxième formatage.

### 2.1 Outils MCP — phase 1 (lecture seule, `readOnlyHint: true` partout)

| Outil | Retour | Équivalent aujourd'hui |
|---|---|---|
| `get_me` | Qui parle : nom du perso actif, peuple, profil, niveau, campagne active, rôle (joueur / MJ). À appeler en premier. | `characterSection` (en-tête) + `isGm` |
| `get_my_character` | Fiche complète du perso actif (stats, PV/PM, voies, compétences, armes, inventaire, histoire) | `buildCharacterSection(character, true)` |
| `get_companion(name)` | Fiche d'un compagnon sans inventaire ni argent | `get_character` |
| `get_campaign` | Nom, compagnons (résumé), codex complet | section Campagne + Codex |
| `get_journal` | Journal de bord entier + dernier éditeur | section Journal |
| `list_pages` / `get_page(id)` | Titres puis contenu d'une page partagée (tronqué à 8 000 chars) | section Pages + `get_page` |
| `get_my_notes` | Notes texte privées du joueur | section Notes |
| `get_combat` | Combat en cours vu avec les droits du joueur ou du MJ, + 20 derniers jets | `fetchCombatContext` |
| `list_rules` / `get_rules(topic)` | Index `00-index.md`, puis un topic entier | bloc statique |
| `get_monster(name)` | **MJ seulement**, non listé pour un joueur, refus serveur en plus | `get_monstre` |

Hors phase 1 : `generate_image` (coût sur la clé du projet), `edit_character` (écriture).

Les noms et descriptions sont en français dans la description, en anglais snake_case pour le nom (cohérent avec `get_page`, `get_character`). Les descriptions disent quand appeler l'outil : c'est ce que le modèle lit.

### 2.2 Instructions serveur (persona condensée)

Extraites de `SYSTEM_PREAMBLE`, sans les sections image / edit / undo :
- Tu es Isilwen du Miroir Astral, tu parles français, tu restes en personnage.
- Avant la première réponse, appelle `get_me`. Pour une question de règles, `get_rules` sur le bon topic ; croise avec la fiche.
- Aucun chiffre qui ne vient pas d'un outil.
- Jamais de stats de monstre à un joueur.
- Journal / codex / pages : va lire, ne demande pas la permission.

Ce texte vit dans `isilwen/persona.ts` à côté du préambule du chat, pour que les deux évoluent ensemble.

### 2.3 OAuth auto-hébergé (phase 1)

L'app est à la fois le serveur MCP (resource server) et le serveur d'autorisation. Ce que le joueur vit : il ajoute `https://arran-dnd.fly.dev/mcp` dans Claude ou ChatGPT, une fenêtre s'ouvre sur la page de login d'Arran (ou il est déjà connecté), un écran « Claude veut parler à Isilwen en ton nom — Autoriser ? », et c'est fini.

**Endpoints à servir** (tous exigés par claude.ai et ChatGPT) :

| Endpoint | Rôle |
|---|---|
| `GET /.well-known/oauth-protected-resource` (et `/.well-known/oauth-protected-resource/mcp`) | RFC 9728 : « le serveur d'autorisation est à cette origine ». `resource` = `https://arran-dnd.fly.dev/mcp`, exactement l'URL saisie. |
| `GET /.well-known/oauth-authorization-server` | RFC 8414 : URLs des endpoints, `code_challenge_methods_supported: ["S256"]`, `token_endpoint_auth_methods_supported: ["none"]`, `grant_types_supported: ["authorization_code","refresh_token"]`. |
| `POST /oauth/register` | Dynamic Client Registration (RFC 7591). **Redirect URIs sur liste blanche** : `https://claude.ai/api/mcp/auth_callback`, `https://chatgpt.com/connector_platform_oauth_redirect`, `http://localhost:*/callback` et `http://127.0.0.1:*/callback` (Claude Code). Tout autre → refus. |
| `GET /oauth/authorize` | Valide client, redirect_uri, PKCE S256, `resource`. Sans cookie de session → `/login?next=…`. Avec → écran de consentement dans la SPA. |
| `POST /api/oauth/decision` | Le clic « Autoriser » : crée le code (10 min, usage unique), redirige vers `redirect_uri?code=…&state=…`. |
| `POST /oauth/token` | `application/x-www-form-urlencoded`. `authorization_code` + `code_verifier` → access token (1 h) + refresh token (90 jours). `refresh_token` → rotation (l'ancien est révoqué). |
| `POST /oauth/revoke` | Révocation d'un token. |
| `ALL /mcp` | `Authorization: Bearer …` obligatoire. Sans → 401 avec `WWW-Authenticate: Bearer resource_metadata="…/.well-known/oauth-protected-resource"`, c'est ce qui déclenche le flow côté client. Le token doit avoir `aud = https://arran-dnd.fly.dev/mcp`. |

**Tables** (une migration) :
- `oauth_client` : `client_id`, `client_name`, `redirect_uris` (jsonb), `created_at`. Alimentée par DCR.
- `oauth_code` : `code_hash`, `client_id`, `user_id`, `code_challenge`, `redirect_uri`, `resource`, `expires_at`, `used_at`.
- `oauth_token` : `id`, `user_id`, `client_id`, `client_name` (dénormalisé pour l'affichage), `access_hash`, `refresh_hash`, `access_expires_at`, `refresh_expires_at`, `last_used_at`, `revoked_at`.

Seuls des hashs (sha256) sont stockés.

**Implémentation** : `@modelcontextprotocol/server-legacy/auth` fournit `mcpAuthRouter` (monte metadata, `/authorize`, `/token`, `/register`, `/revoke`, fait les vérifications PKCE et le format des erreurs) et `requireBearerAuth`. Notre code est un `OAuthServerProvider` branché sur les tables ci-dessus (`clientsStore`, `authorize`, `exchangeAuthorizationCode`, `exchangeRefreshToken`, `verifyAccessToken`). Ce paquet est gelé mais maintenu ; si à l'implémentation il ne s'installe pas proprement avec les paquets v2, on écrit le routeur à la main (~300 lignes, la spec est petite) en gardant le même provider. À trancher au premier `npm install`, pas avant.

**Côté client (SPA)** :
- `LoginView` accepte `?next=` et y retourne après login (mot de passe et Google). Aujourd'hui il n'y a pas de redirection après login : à ajouter. `next` limité aux chemins relatifs de l'app.
- Nouvelle route `/autoriser` : écran de consentement (`AppPageLayout`, une `AppCard` : nom du client, « Isilwen pourra lire ta fiche, ta campagne, ton journal et tes notes », boutons Autoriser / Refuser). Design par `ux-designer`.
- Dans `/options` : carte « Isilwen dans Claude / ChatGPT » listant les connexions actives (`client_name`, dernière utilisation) avec révocation, et un lien vers le guide. Routes `GET /api/oauth/connections`, `DELETE /api/oauth/connections/:id`.

**En local** : claude.ai et ChatGPT exigent une URL HTTPS publique, donc le test de bout en bout se fait sur Fly. En local on teste avec Claude Code (`claude mcp add --transport http isilwen http://localhost:3566/mcp`, il fait l'OAuth avec un callback localhost) et avec MCP Inspector. `ALLOWED_ORIGINS` et l'URL publique passent par une variable `PUBLIC_URL` dans `.env` (le `resource` doit être exact).

### 2.4 Plugin et skills (phase 2)

Dossier `plugin/` dans le monorepo (le marketplace pointe sur `owner/repo` avec un chemin) :

```
plugin/
├── .claude-plugin/plugin.json      # name: arran-dnd, description, version
├── .mcp.json                       # { "isilwen": { "type": "http", "url": "https://arran-dnd.fly.dev/mcp" } } — Claude Code fait l'OAuth, aucun secret
└── skills/
    ├── isilwen/SKILL.md            # persona complète + ordre des outils MCP + exemples
    ├── regles-arran/               # SKILL.md (résumé + quand lire quoi) + references/ = creation, combat, magie, equipement
    ├── voies-arran/                # SKILL.md + references/ = voies-de-profil, voies-de-prestige, races
    └── monde-arran/                # SKILL.md + references/ = monde-arran, monde-lore-*
```

- **Une seule source de vérité** : `scripts/build-plugin.mjs` copie `knowledge/topics/*.md` dans les `references/` et produit `dist/skills/<nom>.zip` pour l'upload claude.ai. Les `references/` sont gitignorés ; seuls les `SKILL.md` sont écrits à la main.
- Le bestiaire **n'est jamais** dans un skill : un joueur avec Pro l'uploaderait et lirait les stats.
- `SKILL.md` d'un skill de règles : 30 à 60 lignes, « quel fichier lire pour quelle question », pas de règle recopiée (elle serait vite fausse).
- Marketplace : `.claude-plugin/marketplace.json` à la racine du repo.
- Guide joueur `docs/isilwen-connecteur.md` : 3 parcours (Claude.ai, ChatGPT, Claude Code), captures, et le texte à coller dans un Projet ChatGPT pour compenser l'absence de skills.

### 2.5 Écritures (phase 3)

Toutes avec `readOnlyHint: false`, `destructiveHint: false` ; ChatGPT et claude.ai demandent confirmation à l'appel. La règle « annonce et attends le oui » du préambule reste dans les instructions.

| Outil | Passe par | Points d'attention |
|---|---|---|
| `update_my_stats(changes)` | même `sanitizeChanges` + update que `edit_character` | broadcast SSE campagne pour que l'écran se rafraîchisse |
| `set_my_hp_mp(hp, mp)` | logique de `PATCH /api/characters/:id` | le combat en cours lit `hpCurrent` |
| `add_my_note` / `update_my_note` | logique de `routes/notes.ts` | privé à l'utilisateur |
| `update_page(id, content)` | logique de `routes/journal.ts` | **verrous** d'édition (`journal/locks.ts`) et révisions (`revisions/`) : refuser si la page est verrouillée par quelqu'un d'autre |
| `add_codex_entry` (MJ) | logique de `routes/codex.ts` | MJ seulement |
| `set_active_campaign(name)` / `set_active_character(name)` | même update que l'app (`users.activeCampaignId`, `characters.isActive`) | en phase 1 la campagne et le perso actifs sont lus tels que réglés dans l'app, jamais demandés au joueur |

Prérequis : sortir la logique métier des handlers de route vers des fonctions de service (le CLAUDE.md le demande déjà : « keep route handlers thin »). Chaque écriture MCP appelle la même fonction que la route REST.

L'OAuth est déjà en place depuis la phase 1 : les écritures n'ajoutent qu'un scope `write` demandé au consentement (« Isilwen pourra aussi modifier ta fiche et tes notes »). Les tokens émis avant gardent le scope `read` seul ; le joueur ré-autorise une fois pour obtenir l'écriture.

---

## 3. Phases et découpage

### Phase 1 — MCP lecture seule avec OAuth (zones : `server-isilwen`, `server-oauth`, `server-mcp`, `client`, `docs`)

Ordre : 1 et 2 en parallèle (indépendants), puis 3 (dépend de 1), puis 4 (dépend de 2), 5 et 6 à la fin.

1. `server/isilwen/` : déplacer les fonctions de contexte hors de `index.ts`, ajouter `loadActiveCharacter`, `MCP_INSTRUCTIONS` dans `persona.ts`. → vérif : `npm test -w server` vert, `npm run e2e` vert, le chat de l'app se comporte pareil.
2. `server/oauth/` : migration des 3 tables, provider, routeur (legacy ou maison), `requireBearerAuth`, liste blanche de redirect URIs, `PUBLIC_URL`. Routes `/api/oauth/connections`. → vérif : tests Vitest du provider (PKCE faux → refus, code réutilisé → refus, refresh rotation, redirect_uri hors liste → refus, token expiré → 401) ; `curl` des deux `.well-known`.
3. `server/mcp/` : serveur stateless, 12 outils lecture avec `readOnlyHint`, instructions. → vérif : test Vitest avec le client MCP en mémoire (outils joueur vs MJ, `get_monster` refusé pour un joueur, `get_me` sur le bac à sable, `get_combat` sans combat).
4. `client` : `?next=` sur le login, écran `/autoriser`, carte des connexions dans `/options`. → vérif : Chrome en mobile, flow complet avec Claude Code en local.
5. `docs` : guide joueur (Claude.ai, ChatGPT, Claude Code). → vérif : suivi à la lettre sur un compte claude.ai Free et un ChatGPT Plus.
6. Déploiement Fly, ajout du connecteur depuis claude.ai et ChatGPT, une conversation de test (« qui suis-je ? », « combien coûte mon sort ? », « où en est le combat ? »), puis révocation depuis `/options` et vérification que le connecteur est bien coupé.

### Phase 2 — Plugin et skills (zone : `plugin`, `scripts`, `docs`)
1. Script de build + 4 skills + `plugin.json` + `marketplace.json`. → vérif : `claude plugin marketplace add` local, `/plugin install`, `/isilwen` répond ; ZIP uploadé dans claude.ai Pro.
2. Guide joueur complété.

### Phase 3 — Écritures (zones : `server`, `client`)
1. Extraction des services depuis les routes (notes, journal pages, codex, characters PATCH).
2. Outils d'écriture MCP avec annotations, scope `write`.
3. Écran de consentement : texte adapté au scope demandé.

### Phase 4 — Bonus, à décider plus tard
- `generate_image` via MCP (coût à assumer, ou quota par joueur).
- Outils `search` / `fetch` pour la Deep Research de ChatGPT.

---

## 4. Tests

- Unitaires : rendu texte de chaque outil (`isilwen/*.test.ts`, déjà en partie couvert par `campaignContext.test.ts` et `combatContext.test.ts`).
- Intégration MCP : `server/src/mcp/server.test.ts` avec le client MCP officiel branché en mémoire sur `createIsilwenServer(user)`. Cas : liste d'outils joueur vs MJ, refus `get_monster`, jeton révoqué → 404, `get_combat` sans combat.
- Pas d'e2e Playwright : le connecteur est côté Claude/ChatGPT, on ne peut pas l'automatiser. Validation manuelle documentée dans le guide.

---

## 5. Risques

| Risque | Parade |
|---|---|
| `server-legacy/auth` incompatible avec les paquets v2 | routeur OAuth écrit à la main sur le même provider ; décision au premier `npm install` |
| DCR ouvert = n'importe qui enregistre un client | liste blanche de redirect URIs ; un client ne donne rien sans le login du joueur |
| Réveil Fly > 10 s pendant la discovery OAuth (4 requêtes à la suite) | réessayer ; sinon `min_machines_running = 1` |
| `resource` ne correspond pas à l'URL saisie | `PUBLIC_URL` en `.env`, une seule orthographe documentée dans le guide (`https://arran-dnd.fly.dev/mcp`, sans slash final) |
| ChatGPT Plus sans outils d'écriture | phase 1 est lecture seule ; à tester avant la phase 3 |
| Le modèle du joueur ignore les instructions serveur | le skill `isilwen` pour Claude ; le texte de Projet pour ChatGPT ; `get_me` documenté « appelle-moi en premier » |
| Divergence chat app / MCP | une seule fonction par donnée dans `isilwen/`, utilisée par les deux |
| Bestiaire dans un skill uploadé par un joueur | le script de build l'exclut ; test qui échoue si `bestiaire.md` apparaît dans `plugin/` |

---

## 6. Décisions (15/09/2026)

1. **Auth phase 1** : OAuth auto-hébergé dès le départ. Pas de jeton dans l'URL.
2. **Règles dans les skills** : fichiers complets copiés en `references/` par le script de build.
3. **Emplacement du plugin** : `plugin/` dans ce repo.
4. **`generate_image` dans le MCP** : pas en v1, à revoir en phase 4.

## 7. Reste à vérifier pendant l'implémentation

- Que `@modelcontextprotocol/server-legacy/auth` s'installe et exporte `mcpAuthRouter` à côté des paquets v2.
- Que ChatGPT Plus expose bien les outils d'écriture (ne bloque que la phase 3).
- Que claude.ai mémorise « Toujours autoriser » par outil sur un connecteur custom (sinon un clic par appel, à documenter dans le guide).
