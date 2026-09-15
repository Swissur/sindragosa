# Parler à Isilwen depuis Claude ou ChatGPT

Isilwen, l'assistante des Terres d'Arran, peut répondre dans ton propre Claude ou ChatGPT. Elle y connaît ta fiche, ta campagne, le journal de bord, tes notes et le combat en cours, exactement comme dans l'app. En lecture seule pour l'instant : elle ne modifie rien.

L'adresse à donner à ton assistant, toujours la même :

```
https://arran-dnd.fly.dev/mcp
```

Copie-la depuis le cadre ci-dessus. Un espace ou un point en trop à la fin et ton assistant dira « aucun serveur MCP à cette adresse ».

Au moment de l'ajouter, une page « Terres d'Arran » s'ouvre. Connecte-toi si besoin, puis clique **Autoriser**. C'est tout. Pour couper l'accès plus tard : dans l'app, **Options > Isilwen dans Claude / ChatGPT**, puis la corbeille.

## Claude (claude.ai, appli mobile ou bureau)

Marche avec un compte gratuit, Pro ou Max. Un compte gratuit n'a droit qu'à un seul connecteur personnalisé.

1. Ouvre claude.ai, puis **Personnaliser** (ou **Paramètres**) > **Connecteurs**.
2. **Ajouter un connecteur personnalisé**.
3. Nom : `Isilwen`. URL : `https://arran-dnd.fly.dev/mcp`. Laisse les champs avancés vides.
4. **Ajouter**, puis **Se connecter**. Autorise sur la page Terres d'Arran.
5. Dans une conversation, vérifie que le connecteur Isilwen est activé (icône des outils sous la zone de texte).

Au premier appel de chaque outil, Claude demande ton accord. Coche **Toujours autoriser** pour ne plus être dérangé.

Pour que Claude joue Isilwen sans qu'on le lui rappelle, commence la conversation par « Tu es Isilwen » ou crée un Projet avec le texte de la section « Instructions à coller » plus bas.

### Skills Arran (Pro et Max)

Les skills donnent à Claude les règles complètes sans passer par le serveur, et la persona d'Isilwen en détail. Ils arrivent avec la phase 2 du projet : des fichiers ZIP à uploader dans **Paramètres > Capacités > Skills**.

## ChatGPT (Plus ou Pro, sur le web)

Le compte gratuit ne permet pas d'ajouter de connecteur.

1. Ouvre chatgpt.com, **Paramètres** > **Apps et connecteurs** > **Paramètres avancés**, active **Mode développeur**.
2. Retour dans **Apps et connecteurs** > **Créer**.
3. Nom : `Isilwen`. URL du serveur MCP : `https://arran-dnd.fly.dev/mcp`. Authentification : **OAuth**. Laisse le reste vide.
4. **Créer**, puis connecte-toi et **Autorise** sur la page Terres d'Arran.
5. Dans une conversation, ouvre le menu **+** (ou **Outils**) et coche Isilwen.

ChatGPT n'a pas de skills. Pour qu'il joue Isilwen d'office, crée un **Projet** et colle le texte ci-dessous dans ses instructions.

## Claude Code (pour les curieux du terminal)

```
claude mcp add --transport http isilwen https://arran-dnd.fly.dev/mcp
```

Claude Code ouvre le navigateur pour l'autorisation. Le plugin `arran-dnd` (phase 2) fera la même chose et ajoutera les skills.

## Instructions à coller dans un Projet

```
Tu es Isilwen du Miroir Astral, Elfe Bleue divinatrice des Terres d'Arran (règles Chroniques Oubliées).
Tu parles français, en personnage, avec concision.
Avant ta première réponse, appelle l'outil get_me pour savoir à qui tu parles.
Pour toute question de règles : list_rules puis get_rules sur le bon chapitre, et croise avec get_my_character.
Ne donne jamais un chiffre qui ne vient pas d'un outil.
Ne révèle jamais les statistiques d'un monstre à un joueur.
Journal, codex, pages, notes : va les lire avec les outils, sans demander la permission.
```

## Ce qu'Isilwen sait faire ici

| Tu demandes | Elle appelle |
|---|---|
| « Qui suis-je ? », « combien de PV il me reste ? » | `get_me`, `get_my_character` |
| « Décris-moi Nym » | `get_companion` |
| « Qui est le tavernier de la session 3 ? » | `get_campaign`, `get_journal`, `list_pages`, `get_page` |
| « Rappelle-moi ma note sur le temple » | `get_my_notes` |
| « Où en est le combat, à qui le tour ? » | `get_combat` |
| « Comment je calcule un critique ? » | `list_rules`, `get_rules` |
| Fiche d'un monstre | `get_monster`, **réservé au meneur de jeu** |

## Si ça coince

- **« Ce lien de connexion n'est plus valide »** : la page d'autorisation a expiré (10 minutes). Relance l'ajout du connecteur.
- **L'ajout échoue à la première tentative** : le serveur se réveille en quelques secondes après une période sans activité. Réessaie.
- **Isilwen dit qu'il n'y a pas de campagne active** : choisis ta campagne dans l'app, elle est lue depuis ton compte.
- **Isilwen ne joue pas son rôle** : dis-lui « Tu es Isilwen » ou utilise les instructions de Projet ci-dessus.
