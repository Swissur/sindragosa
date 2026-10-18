# Bestiaire

Catalogue : `client/src/data/sindragosa/monsters.ts` (211 monstres). Conversion : `plans/33-bestiaire-sindragosa.md`, `client/src/utils/sindragosa/bestiary.ts`, `scripts/convert-bestiary.ts`.

Le bestiaire vient de Chroniques Oubliées, converti au système d6. Les sources CO (catalogue et scans du livre) sont gardées dans `scripts/sources/`.

## Un monstre en jeu

Un monstre n'a pas les 30 domaines : il a **6 caractéristiques** et un **rang de menace R** (0 à 5), qui tient lieu de rang de domaine.

| Valeur | Calcul |
|---|---|
| Réserve d'attaque | max(Force, Agilité) + R, en d6 |
| Réserve de défense (parer ou esquiver) | max(Force, Agilité) + R, en d6 |
| Jet hors combat (pister, résister…) | caractéristique + R |
| Initiative | Agilité + Sagesse + R |
| Dégâts | fixes, par attaque : dégâts + marge − armure de la cible |

L'attaque et la défense se résolvent comme pour un joueur (`combat.md`).

## Conversion depuis CO

| Élément | Formule |
|---|---|
| Caractéristiques | 2 + mod CO ÷ 2 (arrondi), minimum 1 |
| R | NC ÷ 3, arrondi au-dessus, plafonné à 5 |
| Dégâts | moyenne de l'expression CO ÷ 2, minimum 1 |
| PV | PV CO ÷ 2, minimum 1 |
| Armure | base de la catégorie × (R + 5) ÷ 10, plus la RD fixe ÷ 2 |

Catégories d'armure, lues dans le nom : aucune (0), cuir épais (2), carapace ou armure portée (4), lourde (6). La base est l'armure d'un monstre de rang 5 ; au rang 0, il en a la moitié. Une RD conditionnelle (« 5/magie ») devient une capacité « Résistance ».

## À calibrer

L'échelle des dégâts (÷ 2) et les valeurs d'armure sont des hypothèses, à recaler après un premier combat test. Une capacité reste à réécrire : « L'hallali » du Worg.
