# 41 — Donjons prêts : les Mortemines

## Contexte

Le MJ veut des combats tout prêts, tirés des donjons de WoW, avec leurs monstres
et boss dans le bestiaire, et une référence « donjon / raid » pour classer les
rencontres. Premier donjon : les Mortemines, version d'avant le Cataclysme
(Edwin VanCleef), cohérente avec une campagne à l'époque de Sindragosa.

## Ce qui est fait

- **Bestiaire des donjons** : `client/src/data/sindragosa/dungeons/<donjon>.ts`,
  à côté de `monsters.ts` (généré par script, à ne pas éditer). Les monstres
  sont écrits au d6 avec `buildMonster` : formules du plan 33, et une attaque
  peut être un sort (caractéristique + R). `BESTIARY` réunit les deux catalogues.
- **Combats tout prêts** : chaque donjon liste ses combats dans l'ordre du
  parcours (`DungeonEncounter`). `dungeonEncounters()` les déplie en rencontres,
  monstres numérotés comme une duplication, renforts en réserve.
- **Référence donjon / raid** : colonne `encounter_template.dungeon`
  (migration 053), éditable dans l'éditeur de rencontre.
- **Import** : `POST /api/campaigns/:id/encounters/import`, en une transaction.
  Dans le volet Combat, le château ouvre « Donjons prêts » ; un donjon déjà
  importé est coché. Les rencontres sont regroupées par donjon (accordéon), les
  rencontres libres d'abord.

## Butin des boss

- `DungeonEncounter.loot` : objets d'inventaire sans id + `chance` (taux de drop
  Wowhead Classic). Importé dans `encounter_template.loot`, copié dans
  `combat.loot` au lancement (migration 054), masqué aux joueurs par
  `serializeCombat`.
- `POST /api/campaigns/:id/combats/:cid/loot/:index/give { userId }` : le héros
  doit être un PJ du combat ; l'objet est concaténé en SQL à `character.items`
  et marqué `givenTo` dans le combat. Le joueur reçoit `items` par l'évènement
  SSE `character` (avec `loot` = nom de l'objet, pour le toast).
- Client : `LootSheet` (tirage pondéré `pickLoot`, roue qui ralentit, puis choix
  du héros). S'ouvre après « Terminer » dans l'écran de combat, rouvrable par le
  cadeau de la barre du haut.
- Limite connue : la sauvegarde auto du joueur envoie toute sa fiche. Un joueur
  hors ligne au moment du don, qui modifie sa fiche sans recharger, peut écraser
  l'objet reçu (même risque que les autres réglages du MJ).

## Mortemines : sources et choix

Sources : Wowhead FR (noms des boss), JudgeHype et Millenium (capacités, parcours),
warcraft.wiki.gg (ordre des zones, compositions, lore).

- Noms officiels FR pour les boss (M. Châtiment, Capitaine Vertepeau, Macaron).
  Butin : noms du client français Classic ; les objets de « M. Smite » (son nom
  en Classic) sont renommés « …de Châtiment » pour coller au boss de l'app.
  Les noms de certains sbires sont des traductions maison (Mande-tempête
  défias, Guetteur défias, Garde noir défias).
- Les effets forts se déclenchent sur une marge ≥ 2 (un « critique » = un 6,
  trop fréquent).
- Le piétinement de M. Châtiment étourdit sans jet, comme dans le jeu : c'est
  la signature du combat, en contrepartie il perd son tour suivant.

## À calibrer en jeu

Les PV et dégâts des boss sont une première estimation pour 4–5 débutants.
Après un premier passage, ajuster dans `mortemines.ts`.
