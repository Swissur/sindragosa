# 44 — Tableau des fiches (relations entre fiches)

Un « Excalidraw simplifié » dans l'onglet **Journal › Fiches** : les joueurs posent
des fiches (PNJ, lieux, autres) sur un tableau partagé et les relient par des
flèches pour montrer qui est en relation avec qui.

## Décisions

- **Un tableau par campagne**, partagé par tous les membres (MJ compris), en direct.
- Les fiches **se posent à la main** : le tableau démarre vide, le bouton « + »
  liste les fiches pas encore posées. Retirer une fiche du tableau ne la supprime pas
  (ses flèches partent avec elle).
- Une flèche relie deux fiches posées. Elle a :
  - un **sens** : simple (`one`, de `from` vers `to`) ou va-et-vient (`both`) ;
    « inverser » échange `from` et `to` ;
  - un **trait** : plein ou pointillé ;
  - un **libellé optionnel** (« trahit », « frère de »), affiché au milieu.
- Une seule flèche par paire de fiches (dans un sens comme dans l'autre) : tirer
  une flèche vers une paire déjà reliée sélectionne la flèche existante.

- Une fiche a une **couleur** optionnelle (palette de 8 tons + « sans couleur »),
  choisie dans son formulaire (`AppColorSwatches`). Sa carte sur le tableau prend
  un fond teinté, une bordure et une icône de cette couleur. Le fond du tableau
  est uni (pas de grille de points).

- Un **lieu** est une zone : plus grand par défaut (320 × 220), nom en en-tête, il
  s'agrandit en tirant son coin bas-droit (poignée visible quand il est
  sélectionné). Les lieux sont dessinés **sous** les flèches et les autres fiches
  (le plus grand tout au fond) : on pose des personnages dedans, et toucher un
  personnage posé dans un lieu le sélectionne, lui. Déplacer un lieu ne déplace
  pas ce qu'il contient.

## Données

Migration `1700000000057_codex_board.sql` :

- `codex_board_node` : `campaign_id`, `codex_entry_id` (unique — une fiche est posée
  au plus une fois), `x`, `y`. Cascade sur la suppression de la fiche.
- `codex_entry.color` (migration `1700000000059_codex_color.sql`) : `''` ou `#rrggbb`.
  Elle entre dans l'historique de la fiche ; restaurer une version d'avant la
  couleur ne l'efface pas.
- `codex_board_node.w` / `h` (migration `1700000000061_codex_board_size.sql`) :
  taille de la carte, `NULL` = taille par défaut du type. `PATCH …/nodes/:nodeId`
  accepte `{ x, y, w, h }` pour redimensionner.
- `codex_board_link` : `campaign_id`, `from_node_id`, `to_node_id` (cascade sur le
  nœud), `direction` (`one` | `both`), `dashed`, `label`.

## API (`server/src/routes/codexBoard.ts`)

Toutes les routes : membres de la campagne. Chaque écriture renvoie le tableau
complet **et** le diffuse sur le flux SSE de campagne (`codex-board`). Le tableau
porte un `rev` (horodatage serveur) : le client ignore un état plus ancien que celui
qu'il affiche (une réponse HTTP peut arriver après la diffusion suivante).

| Méthode | Route | Corps |
|---|---|---|
| GET | `/api/campaigns/:id/codex-board` | — |
| POST | `…/codex-board/nodes` | `{ entryId, x, y }` |
| PATCH | `…/codex-board/nodes/:nodeId` | `{ x, y }` |
| DELETE | `…/codex-board/nodes/:nodeId` | — |
| POST | `…/codex-board/links` | `{ fromNodeId, toNodeId, direction, dashed, label }` |
| PATCH | `…/codex-board/links/:linkId` | `{ direction?, dashed?, label?, reverse? }` |
| DELETE | `…/codex-board/links/:linkId` | — |

## Client

- `CodexTab` : bascule Liste / Tableau (AppToggleGroup) dans la barre d'outils.
- `components/journal/codex-board/CodexBoard.vue` : un seul `<svg>` (pas de
  positionnement CSS absolu). Fiches = cartes de taille fixe, flèches = segments
  coupés au bord des cartes, pointes calculées (pas de `marker`, pour la couleur).
- Gestes : glisser le fond = déplacer la vue, pincer / molette = zoom, glisser une
  fiche = la déplacer, toucher une fiche = la sélectionner (une poignée apparaît :
  la tirer jusqu'à une autre fiche crée une flèche), toucher une flèche = la
  sélectionner.
- Barre d'outils contextuelle (≤ 7 boutons) :
  - rien de sélectionné : ajouter une fiche, style des nouvelles flèches
    (→ / ↔, plein / pointillé), recadrer ;
  - fiche : ouvrir la fiche, retirer du tableau ;
  - flèche : → / ↔, plein / pointillé, inverser, libellé, supprimer.
- `utils/codexBoard.ts` : géométrie pure (bord de carte, pointe de flèche, fiche
  sous le doigt, zoom autour d'un point, recadrage, place libre) — testée.

## Vérification

1. Tests unitaires de la géométrie → `npm test -w client`.
2. Typecheck client + serveur.
3. e2e `13-tableau-fiches.spec.ts` : poser deux fiches, les relier, passer la flèche
   en pointillé, recharger, tout est là.
