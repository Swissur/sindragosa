---
name: add-knowledge
description: Analyse un fichier .txt de contenu brut (règles, lore, PDF copié) et l'intègre dans la base de knowledge du projet
allowed_tools: Read, Glob, Grep, Write, Edit, Bash, TodoWrite
---

Tu es chargé d'intégrer du nouveau contenu dans la base de knowledge du projet Sindragosa (jeu maison inspiré de World of Warcraft).

## Étape 1 — Trouver le fichier source

Cherche un fichier `.txt` récemment ajouté ou modifié dans le répertoire racine du projet (ou demande à l'utilisateur quel fichier utiliser si aucun n'est évident).

```bash
ls -lt *.txt 2>/dev/null | head -5
```

Si aucun fichier `.txt` n'est trouvé, demande à l'utilisateur de préciser le chemin du fichier source avant de continuer.

## Étape 2 — Lire le contexte existant

Avant d'analyser le contenu source, lis :
- `knowledge/README.md` — index des fichiers existants
- `knowledge/topics/00-index.md` — index court pour LLM

Cela te permettra de décider si le contenu doit :
- **enrichir** un fichier existant (ajouter des sections manquantes ou corriger des lacunes)
- **créer** un nouveau fichier topic

## Étape 3 — Analyser le contenu source

Lis le fichier `.txt` source en entier. Identifie :

1. **Le sujet principal** : règles de jeu, lore, races, domaines, compétences, etc.
2. **Le format** : extrait PDF, notes manuscrites, texte structuré
3. **Les lacunes à signaler** : passages flous, chiffres à vérifier, références croisées manquantes — marque-les avec ⚠️ *à vérifier dans le PDF*

## Étape 4 — Décider de la destination

En te basant sur l'index existant :

| Type de contenu | Fichier cible |
|---|---|
| Lancer de dés, succès, critiques, chance | `topics/regles-jets.md` |
| Création, caractéristiques, domaines, spécialités | `topics/personnage.md` |
| Coches, rangs, titres (classes émergentes) | `topics/progression.md` |
| Combat, armure, repos, états | `topics/combat.md` |
| Magie, sorts | `topics/magie.md` |
| Races jouables, pouvoirs raciaux | `topics/races.md` |
| Compétences débloquables | `topics/competences.md` |
| Artisanat, métiers, recettes | `topics/artisanat.md` |
| Monstres | `topics/bestiaire.md` |
| Lore, histoire, géographie d'Azeroth | `topics/monde-azeroth.md` |
| Nouveau sujet sans fichier existant | Créer `topics/<nom-slug>.md` |

Si le contenu touche plusieurs sujets, répartis-le dans les fichiers appropriés.

## Étape 5 — Écrire le knowledge

### Structure d'un fichier existant (enrichissement)
- Lis d'abord le fichier cible en entier
- Ajoute les nouvelles sections sans dupliquer l'existant
- Respecte le style : titres `##`, listes `-`, tableaux Markdown
- Marque les passages non vérifiés : ⚠️ *à vérifier dans le PDF*

### Structure d'un nouveau fichier
```markdown
---
source: tda-livre-joueur
version: "0.1"
last_reviewed: <date du jour>
---

# <Titre du sujet>

<Contenu structuré en sections ##, listes, et tableaux>
```

## Étape 6 — Mettre à jour les index

### `knowledge/topics/00-index.md`
Ajoute ou mets à jour l'entrée correspondante dans la liste des sujets.

### `knowledge/README.md`
Ajoute ou mets à jour la ligne dans la table "Topic index".

## Étape 7 — Rapport final

Une fois terminé, affiche un résumé :

```
✓ Contenu intégré dans : <fichiers modifiés ou créés>
⚠ Points à vérifier manuellement : <liste des passages douteux>
```

**Important** : ne supprime jamais de contenu existant sans confirmation de l'utilisateur. En cas de conflit entre l'ancien et le nouveau contenu, garde les deux avec une note de clarification.
