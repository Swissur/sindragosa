# 47 — Scénarios du MJ

Une page réservée au MJ, accessible hors session (icône `BookMarked` dans la
barre du haut, entre « Écran MJ » et le Journal). Un scénario appartient à une
campagne.

## Décisions (2026-10-22)

- **Blocs ordonnés.** Un scénario est une liste de blocs : texte, image, objet,
  PNJ. Le MJ les réordonne (mode « réorganiser »).
- **Le drapeau.** Une ligne rouge « on en est là » posée *après* un bloc
  (`bookmark` = id du bloc, `''` = tout en haut, `null` = pas de drapeau). La
  page s'ouvre sur le drapeau.
- **Images.** Le MJ importe une photo (réduite à 1600px côté client). « Partager »
  l'ouvre en grand chez tous les joueurs connectés (et sur le mode table), et la
  range dans l'onglet **Images** du Journal.
- **Objets.** « Donner » copie l'objet dans l'inventaire d'un joueur, comme le
  butin de combat ; le bloc garde « donné à X » et peut être redonné.
- **PNJ = fiche du Codex.** Une fiche créée depuis un scénario est *du MJ*
  (`gm_owned`) et *cachée* (`hidden`). Cachée, aucun joueur ne la voit (liste,
  tableau des fiches, mentions, historique, portrait). Révélée, elle apparaît
  dans les Fiches en lecture seule, avec une zone **Mes notes** privée par
  joueur (`codex_player_note`). Les notes secrètes du MJ (`gm_notes`) ne
  sortent jamais du serveur pour un joueur.

## Données

- `scenario` (campagne, titre, `blocks` jsonb, `bookmark`).
- `shared_image` (campagne, image, légende, date de partage).
- `codex_entry` + `gm_owned`, `hidden`, `gm_notes`, `image_id`.
- `codex_player_note` (fiche, joueur, contenu) — unique par paire.

Les champs posés par le serveur dans un bloc (`givenTo`, `sharedAt`) ne sont
jamais repris du client : un PUT du scénario les recopie depuis la base
(`server/src/scenarios/blocks.ts`, testé).

## Temps réel

- `image-shared` : la popup plein écran (`SharedImageModal`).
- `codex-reveal` : toast « Nouvelle fiche » + rechargement de l'onglet Fiches.
- `character` (existant) : l'objet arrive dans l'inventaire avec son toast.

## Hors périmètre (v1)

- Bloc de stats de combat sur un PNJ (le bestiaire et les rencontres existent).
- Partage d'une image à un seul joueur.
