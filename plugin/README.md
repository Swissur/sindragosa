# Plugin Isilwen

Un serveur MCP et un skill, pour Claude (claude.ai, Claude Code) et ChatGPT (Codex).
Isilwen lit ta fiche, ta campagne, le journal, tes notes, le combat en cours, et répond aux
règles des Terres d'Arran. En lecture seule.

## Installer

### Claude Code

```
claude plugin marketplace add tmouchart/arran-dnd
/plugin install isilwen@arran-dnd
```

### Codex

```
codex plugin marketplace add tmouchart/arran-dnd
codex plugin install isilwen
```

### claude.ai (Pro, Max, Team)

**Personnaliser** > **Plugins** > **Ajouter depuis un dépôt**, avec `https://github.com/tmouchart/arran-dnd`.
Ou télécharge le zip sur https://arran-dnd.fly.dev/plugin et uploade-le.

### Depuis le zip

Le zip de https://arran-dnd.fly.dev/plugin est un marketplace qui contient le plugin. Dézippé
dans `~/isilwen-plugin`, il s'installe tel quel :

```
claude plugin marketplace add ~/isilwen-plugin      # Claude Code
codex plugin marketplace add ~/isilwen-plugin       # Codex
```

Ensuite, **ouvre une nouvelle session**. Un plugin installé en pleine conversation reste
invisible pour cette conversation.

La connexion se fait en OAuth au premier appel d'un outil : une page Terres d'Arran s'ouvre,
tu te connectes, tu autorises. Aucun jeton dans ce plugin.

## Skill

Un seul skill, `isilwen` : la persona, l'ordre des outils du connecteur, et les règles
complètes du livre dans `references/` (création de personnage, combat, magie, équipement,
peuples, voies, lore). Les fichiers de `references/` sont des copies de `knowledge/topics/`,
faites par `npm run plugin:sync` ; un test casse si elles dérivent.

## Trois agents, trois manifestes

| Fichier | Lu par |
| --- | --- |
| `plugin.json`, `mcp.json` | Agent Plugins 1.0 (ChatGPT, Codex) |
| `.claude-plugin/plugin.json`, `.mcp.json` | Claude |
| `.codex-plugin/plugin.json`, `.mcp.json` | Codex |

Codex refuse `$schema` dans `.mcp.json`, d'où sa copie sans.
