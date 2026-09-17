# 29 — Plugin Isilwen : MCP + skills, pour Claude et ChatGPT

**Statut** : plan écrit le 16/09/2026, questions tranchées (références committées + test de sync, persona identique à `MCP_INSTRUCTIONS` avec test d'égalité, icône générée avec `/generate-image`). Implémenté le 16/09/2026 (dossier `plugin/`, 1 skill, sync + test, route `GET /plugin`, guide, bouton Options). Reste : déployer, puis vérifier sur claude.ai Pro (upload du zip vs dépôt), Codex et ChatGPT Plus. Suite de la phase 2 du plan 28.
**Objectif** : un seul dossier `plugin/` qu'un joueur installe dans Claude (claude.ai, Claude Code) ou ChatGPT (ChatGPT, Codex). Il contient le connecteur MCP déjà déployé et un jeu de skills : la persona d'Isilwen, la façon d'utiliser les outils, et les règles complètes. Il se télécharge en zip sur `https://arran-dnd.fly.dev/plugin`, et s'installe aussi depuis le dépôt GitHub.

---

## 1. Ce qui a changé depuis le plan 28 (vérifié le 16/09/2026)

Le plan 28 disait « un plugin ne marche que dans Claude Code, ChatGPT n'a pas de skills ». Ce n'est plus vrai :

| Produit | Plugins | Skills | Comment on installe |
|---|---|---|---|
| **claude.ai / Desktop** (Pro, Max, Team) | oui : Personnaliser > Plugins | oui | upload d'un zip, **ou** « Ajouter depuis un dépôt » (URL GitHub d'un marketplace) |
| **claude.ai Free** | non | non | connecteur seul (déjà documenté) |
| **Claude Code** | oui | oui | `claude plugin marketplace add tmouchart/arran-dnd` puis `/plugin install` |
| **ChatGPT web** (Plus, Pro) | à confirmer sur un compte Plus : le répertoire public existe, l'install privée d'un plugin n'est pas documentée | Business/Enterprise seulement | connecteur MCP + instructions de Projet (déjà documenté), plugin si le compte le permet |
| **Codex** (CLI, IDE) | oui | oui | `codex plugin marketplace add <repo>` |

Deux standards cohabitent, et ils rentrent dans le **même dossier** sans se marcher dessus :

- **Claude** : `.claude-plugin/plugin.json` + `.mcp.json` + `skills/`.
- **Agent Plugins 1.0** (OpenAI, Cursor, Microsoft, Amazon, Vercel — pas Anthropic) : `plugin.json` + `mcp.json` + `skills/`, avec un overlay `.codex-plugin/plugin.json` pour Codex. C'est ce que ChatGPT et Codex lisent.

Les `SKILL.md` sont identiques pour tout le monde (même spec Agent Skills). Le dossier `skills/` est partagé.

Le plugin Penbox (`~/penbox/plugins/penbox`) fait exactement ça, zip servi par le serveur compris. On reprend sa forme, en plus simple (un seul environnement).

## 2. Ce qu'on livre

```
arran-dnd/
├── .claude-plugin/marketplace.json     # Claude : le dépôt est un marketplace
├── .agents/plugins/marketplace.json    # Codex/ChatGPT : idem, à la racine (Codex ne regarde que là)
└── plugin/
    ├── plugin.json                     # Agent Plugins 1.0 (ChatGPT, Codex)
    ├── mcp.json                        # idem, { isilwen: streamable-http → https://arran-dnd.fly.dev/mcp }
    ├── .claude-plugin/plugin.json      # Claude
    ├── .mcp.json                       # Claude + Codex (sans $schema : Codex le refuse)
    ├── .codex-plugin/plugin.json       # overlay Codex (skills, mcpServers, interface)
    ├── README.md                       # install en 4 lignes par produit
    ├── assets/icon.png                 # icône d'Isilwen, générée avec /generate-image (512 px)
    └── skills/
        └── isilwen/
            ├── SKILL.md                # persona + ordre des outils + table « question → fichier »
            └── references/             # les 12 topics à plat (tout sauf bestiaire et 00-index)
```

Côté serveur : une seule route publique, `GET /plugin`, qui renvoie le zip (§ 2.5). Le MCP est déjà en prod.

### 2.1 Les manifestes

Écrits à la main, pas générés : un seul environnement (prod), donc rien à stamper. Cinq petits JSON, c'est moins de code qu'un script.

- `name: "isilwen"` partout (le serveur MCP s'appelle déjà `isilwen`, et c'est le nom que le joueur tape dans `/plugin install isilwen@arran-dnd`).
- `version: "1.0.0"`, `description` en français, `author` Thomas, `homepage` = le guide, `license: "UNLICENSED"`.
- `.codex-plugin/plugin.json` ajoute `interface` (displayName « Isilwen », category, `defaultPrompt` = les trois questions du guide, `composerIcon`).
- Dans le dépôt, l'URL MCP est écrite en dur : `https://arran-dnd.fly.dev/mcp` (une install depuis git doit marcher sans rien calculer). Le zip servi par `/plugin` la remplace par `<PUBLIC_URL>/mcp`, ce qui donne un plugin local gratuit pour tester (§ 2.5).

### 2.2 Les skills

Le principe (même que Penbox) : **un skill dit dans quel ordre faire les choses et où lire, il ne recopie pas ce qu'un outil renvoie**. Exception assumée : les règles, copiées en `references/` (décision du plan 28), parce qu'un joueur veut pouvoir demander « comment marche un critique ? » sans que le connecteur soit branché, et parce qu'un fichier lu localement ne coûte rien au serveur.

**Un seul skill, `isilwen`** (~115 lignes). Description : quand le charger (Arran, Chroniques Oubliées, fiche, campagne, combat, règle, peuple, voie, monde). Contenu, dans cet ordre :
- La persona complète (reprise de `MCP_INSTRUCTIONS`, même texte, pour que les deux évoluent ensemble — noté en commentaire dans `persona.ts`).
- L'ordre des outils : `get_me` d'abord, puis la table « tu demandes → elle appelle » du guide.
- Où sont les règles : une seule table « la question porte sur → `references/<fichier>.md` » (résumé d'une ligne par fichier, repris de `00-index.md`). Si le connecteur est branché, `get_rules` renvoie le même texte : un seul des deux, jamais les deux.
- Les croisements classiques (« un sort : `magie.md` pour le coût, puis la voie dans `voies-de-profil.md` »).
- Le bestiaire : jamais de chiffres à un joueur ; `get_monster` n'existe que pour le meneur.
- Sans connecteur : Isilwen répond aux règles avec les references, et dit en une phrase que la fiche et la campagne demandent le connecteur.
- Si la règle n'y est pas : le dire, proposer le livre, alternative prudente annoncée comme telle.

Aucune règle recopiée dans le SKILL.md. `references/` = copies exactes de `knowledge/topics/*.md`, à plat, **sans `bestiaire.md` ni `00-index.md`**.

### 2.3 Une seule source de vérité pour les règles

- `scripts/sync-plugin-rules.mjs` : copie les topics dans les bons `references/`, efface ce qui n'existe plus. `npm run plugin:sync`.
- Les copies sont **committées** (une install depuis git ne peut pas lancer de script).
- `server/src/knowledge/pluginSync.test.ts` : échoue si une copie diffère de son topic, si un topic non-bestiaire manque, ou si `bestiaire` apparaît quelque part dans `plugin/`. Le test tourne dans `npm test`, donc `/add-knowledge` qui oublie le sync casse la CI.
- `/add-knowledge` : ajouter une ligne « lancer `npm run plugin:sync` » à la fin du skill.

### 2.5 `GET /plugin` : le zip

Public, sans auth, comme les `.well-known`. Renvoie `isilwen-plugin.zip` (`Content-Disposition: attachment`).

Contenu du zip = **un marketplace qui contient le plugin**, comme Penbox : une fois dézippé, les deux CLI l'installent tel quel (`claude plugin marketplace add ~/isilwen-plugin`, `codex plugin marketplace add ~/isilwen-plugin`), et claude.ai l'accepte en « upload d'un plugin ».

```
isilwen-plugin.zip
├── .claude-plugin/marketplace.json
├── .agents/plugins/marketplace.json
└── isilwen/                 # = plugin/ du dépôt, tel quel, sauf l'URL MCP
```

Implémentation, `server/src/plugin/archive.ts` (~80 lignes) :
- `PLUGIN_DIR` ajouté dans `server/src/paths.ts` à côté de `KNOWLEDGE_DIR` ; le Dockerfile copie `plugin/` comme il copie `knowledge/`.
- Lit `plugin/` récursivement. Dans `mcp.json` et `.mcp.json`, remplace l'URL par `${publicUrl()}/mcp` (fonction déjà dans `oauth/config.ts`). Ajoute les deux `marketplace.json` (générés ici, mêmes valeurs que ceux committés à la racine du dépôt).
- Zip avec `jszip` (dépendance à ajouter, pure JS, c'est ce que Penbox utilise), dates figées pour que les mêmes fichiers donnent les mêmes octets, ETag = sha256 du buffer.
- Construit au premier appel puis gardé en mémoire en prod ; reconstruit à chaque appel en dev pour voir ses modifs.
- Route montée dans `index.ts` juste après `mountOAuth(app)`, donc avant le catch-all SPA. Aucune route Vue ne s'appelle `/plugin`, pas de collision.
- Test `server/src/plugin/archive.test.ts` : le zip contient les 2 marketplaces, les 5 manifestes et les 4 `SKILL.md` ; l'URL MCP est celle de `PUBLIC_URL` ; aucune entrée ne contient `bestiaire`.

À vérifier à la validation : le format exact que claude.ai attend pour « upload d'un plugin » (marketplace ou dossier du plugin seul). Si c'est le plugin seul, on ajoute `?format=plugin`, pas avant.

### 2.4 Guide et app

- `docs/isilwen-connecteur.md` : remplacer le paragraphe « Skills Arran (phase 2) » par une section « Le plugin » avec les 4 parcours (claude.ai : Plugins > Ajouter depuis un dépôt > `https://github.com/tmouchart/arran-dnd` ; Claude Code : 2 commandes ; Codex : 2 commandes ; ChatGPT web : ce que le test sur Plus aura montré). Garder le connecteur seul comme parcours Free.
- `IsilwenConnectionsCard.vue` : ajouter un bouton « Télécharger le plugin » (`AppButton` en lien vers `/plugin`, icône `Download`) à côté du lien vers le guide.

## 3. Découpage

Une seule zone, séquentielle, un agent `implementer` :

1. Manifestes + marketplaces + README + icône. → vérif : `claude plugin marketplace add /Users/thomasmouchart/arran-dnd`, `/plugin install isilwen@arran-dnd`, nouvelle session, `/isilwen` apparaît, le MCP `isilwen` est listé dans `/mcp` et l'OAuth part.
2. Script de sync + test + references. → vérif : `npm test -w server` vert ; retirer une ligne d'une copie → le test échoue.
3. Skill `isilwen`. → vérif : dans Claude Code avec le plugin, « qui suis-je ? » appelle `get_me` sans qu'on le demande ; « comment marche un critique ? » lit `references/combat.md`.
4. Route `/plugin` + Dockerfile + test. → vérif : `curl -o p.zip localhost:3566/plugin && unzip -l p.zip` montre l'arbre attendu, l'URL MCP est `http://localhost:3566/mcp` ; `claude plugin marketplace add` sur le dossier dézippé installe et l'OAuth part sur le serveur local.
5. Guide + bouton dans la carte Options + ligne dans `/add-knowledge`.

Puis validation (session principale) : claude.ai Pro « Ajouter depuis un dépôt », Codex `codex plugin marketplace add`, et le test ChatGPT Plus qui décidera du texte du guide.

## 4. Décisions (16/09/2026)

1. Références **committées**, test de sync dans `npm test`.
2. Skill `isilwen` : le bloc persona est **le texte exact** de `MCP_INSTRUCTIONS`. Un test (`server/src/knowledge/pluginSync.test.ts`) vérifie que `plugin/skills/isilwen/SKILL.md` le contient tel quel. Le skill ajoute ensuite ses sections propres (ordre des outils, references, sans connecteur).
3. Icône **générée** avec `/generate-image` : Isilwen, Elfe Bleue divinatrice, PNG carré 512 px, fond uni, dans le style de l'app. Session principale, avant l'agent.
4. (16/09/2026) **Un seul skill** au lieu de quatre : `isilwen` porte la persona, l'ordre des outils et les 12 references à plat. `regles-arran`, `voies-arran` et `monde-arran` sont supprimés ; le mapping de sync n'a plus qu'une clé.

## 5. Risques

| Risque | Parade |
|---|---|
| ChatGPT Plus n'installe pas de plugin privé | connecteur + instructions de Projet restent le parcours ChatGPT ; le plugin sert Codex |
| claude.ai charge le skill ET appelle `get_rules` (double lecture) | le skill `isilwen` dit explicitement « un seul des deux » |
| Références qui dérivent des topics | test de sync dans `npm test` |
| `$schema` dans `.mcp.json` | Codex le refuse : seul `mcp.json` (racine) porte le `$schema` |
| Plugin installé en pleine conversation invisible | README : « ouvre une nouvelle session » |
| claude.ai refuse le zip « marketplace » à l'upload | à tester ; si besoin `?format=plugin` renvoie le dossier seul |
| `plugin/` absent de l'image Docker → 500 sur `/plugin` | ligne `COPY` dans le Dockerfile + test qui lit le vrai dossier |
