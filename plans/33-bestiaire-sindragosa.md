# 33 — Bestiaire converti au système d6

Étape 8 du plan 31. Formules validées le 2026-10-18.

## Source

Le catalogue CO vient de `scripts/output/monsters.json` (211 monstres). Le script
`scripts/convert-bestiary.ts` applique le convertisseur et génère
`client/src/data/sindragosa/monsters.ts`. L'ancien `client/src/data/monstersCatalog.ts`
disparaît.

## Formules (`client/src/utils/sindragosa/bestiary.ts`, testé)

| Élément | Formule |
|---|---|
| Caracs | 2 + mod CO ÷ 2 (arrondi), minimum 1. DEX → AGI, CON → END. |
| Rang de menace R | NC ÷ 3, arrondi au-dessus, plafonné à 5 |
| Réserve d'attaque | max(FOR, AGI) + R, en d6 |
| Réserve de défense | max(FOR, AGI) + R, en d6 |
| Dégâts | moyenne de l'expression CO ÷ 2, minimum 1 |
| PV | PV CO ÷ 2, minimum 1 |
| Initiative | AGI + SAG + R |
| Armure | arrondi(base × (R + 5) ÷ 10) + RD fixe ÷ 2 |

### Armure par catégorie, classée sur le nom

La base est l'armure d'un monstre de rang 5 ; un monstre de rang 0 en a la moitié.

| Catégorie | Base | Mots-clés du nom |
|---|---|---|
| Lourde (pierre, métal, écailles de dragon) | 6 | golem de fer, golem de pierre, dragon, fléau, orhu'nomathan |
| Carapace ou armure portée | 4 | insecte, combattant, raykenn, guivre, hydre, crocodile, serpent géant, squelette de géant |
| Cuir épais | 2 | ours, sanglier, bison, troll, géant, golem de chair, lion, tigre, loup-garou, worg, griffon, shargren, aventurier, centaure, démon, ogre, orque |
| Aucune | 0 | tout le reste (bêtes légères, esprits, mystiques…) |

La RD conditionnelle (« 5/magie », « 10/feu et haches ») ne compte pas dans
l'armure : elle devient une capacité « Résistance » qui garde le texte.

### Texte des capacités

Conversions automatiques :

- « +N en attaque » → « +⌈N/3⌉d6 à l'attaque » (idem DEF → défense) ;
- « +XdY aux DM » → « +⌈moyenne/2⌉ aux dégâts » ;
- « test de CARAC difficulté N » → palier (≤ 10 facile, ≤ 15 moyenne, ≤ 20 difficile, au-delà exploit) ;
- « sur un résultat de A à 20 », « 20 naturel » → « sur un critique » ;
- DEX → AGI, CON → END.

Ce qui reste en vocabulaire d20 (d20, DEF, NC, Mod.) est marqué `review: true`
et signalé « à relire » dans l'app.

## Base (migration 049)

`encounter_monster` et `combat_participant` :

- `nc` → `threat` (entier) ;
- `def` → `armor` ; ajout de `defense` (réserve) ;
- `stat_dex` → `stat_agi`, `stat_con` → `stat_end` ;
- `rd` supprimé (`encounter_monster`).

Les monstres et combats existants sont au format CO : la migration les supprime
(seul le bac à sable en contient ; `npm run seed-dev` le recrée).

## Combat (fin de l'étape 7)

- Le MJ lance l'attaque d'un monstre en réserve de d6 : succès, palier, et rappel
  « dégâts = X + marge − armure ».
- Il lance aussi la défense du monstre quand un joueur l'attaque.
- Les jets partent dans le journal, cachés aux joueurs comme avant.

## Vérification

- Tests unitaires du convertisseur, et un test sur tout le catalogue (valeurs dans les bornes, classement d'armure attendu sur quelques monstres).
- Typecheck, tests, e2e du combat.
