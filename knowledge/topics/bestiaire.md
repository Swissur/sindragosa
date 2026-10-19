# Bestiaire

Règles telles que l'app les applique. Catalogue : `client/src/data/sindragosa/monsters.ts` (211 monstres), plus les monstres des donjons d'Azeroth (`client/src/data/sindragosa/dungeons/`). Les deux sont réunis dans `BESTIARY` (`client/src/data/sindragosa/bestiary.ts`), où cherchent l'éditeur de rencontre et le combat. Conversion : `plans/33-bestiaire-sindragosa.md`, `client/src/utils/sindragosa/bestiary.ts`, `scripts/convert-bestiary.ts`.

Le bestiaire vient de Chroniques Oubliées, converti au système d6. Les sources CO (catalogue et scans du livre) sont gardées dans `scripts/sources/`.

## Un monstre en jeu

Un monstre n'a pas les 30 domaines : il a **6 caractéristiques** et un **rang de menace R** (0 à 5 ; de 1 à 5 dans le catalogue), qui tient lieu de rang de domaine.

| Valeur | Calcul |
|---|---|
| Réserve d'attaque | max(Force, Agilité) + R, en d6 |
| Réserve d'un sort (monstres des donjons) | caractéristique du sort (Intelligence, Sagesse) + R, en d6 |
| Réserve de défense (parer ou esquiver) | max(Force, Agilité) + R, en d6 |
| Jet hors combat (pister, résister…) | caractéristique + R |
| Initiative | Agilité + Sagesse + R |
| Dégâts | fixes, par attaque : dégâts + marge − armure de la cible |

L'attaque et la défense se résolvent comme pour un joueur (`combat.md`). Le MJ lance l'attaque et la défense d'un monstre depuis le combat ; ces jets partent dans le journal, cachés aux joueurs. Un monstre à 0 PV est mort : son tour est sauté, sans agonie.

Le MJ peut aussi créer un monstre sur mesure (R, PV, armure, défense, initiative, caractéristiques), ou retoucher ces valeurs dans une rencontre.

**Ce que voient les joueurs** : le nom, l'initiative, l'armure, les états, la position et un état de santé (intact, blessé, mal en point, agonisant, mort). Ni R, ni la réserve de défense, ni les PV exacts, ni les attaques et capacités.

## Donjons d'Azeroth

Monstres écrits directement au d6 (`buildMonster`, `client/src/utils/sindragosa/bestiary.ts`) : on fixe R, les caractéristiques, les PV, la catégorie d'armure, les dégâts et les capacités ; réserves, défense, initiative et armure suivent les formules ci-dessus.

Chaque donjon fournit aussi ses **combats tout prêts**, dans l'ordre du parcours. Le MJ les importe d'un coup depuis le volet Combat (château « Donjons prêts ») : chaque combat devient une rencontre de la campagne, classée sous la référence **donjon / raid** (le nom du donjon). Le MJ peut aussi poser cette référence à la main sur ses propres rencontres. Les renforts (Sneed dans son déchiqueteur, gardes noirs camouflés) entrent **en réserve**.

Conventions des capacités : les effets forts (étourdir, ralentir) se déclenchent sur une **marge d'au moins 2**, pas sur un critique (un 6 sort trop souvent avec 5 dés). Les seuils de phase d'un boss sont écrits en PV.

| Donjon | Combats | Monstres | Boss |
|---|---|---|---|
| Les Mortemines (avant le Cataclysme) | 12 | 23 | Rhahk'Zor, Mineur Johnson (rare), Déchiqueteur de Sneed et Sneed, Gilnid, M. Châtiment, Macaron (optionnel), Capitaine Vertepeau, Edwin VanCleef |

### Butin des boss

Un combat de boss porte une **table de butin** : des objets d'inventaire (arme avec gabarit, bonus de dégâts et domaine ; armure avec sa valeur ; le reste en effet écrit, appliqué à la main) et leur **chance** (le taux de drop du jeu, en %). Le butin est copié dans le combat à son lancement et reste caché aux joueurs.

Quand le MJ termine le combat, le volet **Butin** s'ouvre (et se rouvre par le cadeau) : **Faire tomber** tire un objet parmi ceux pas encore donnés, au prorata des chances ; le MJ peut aussi en taper un. Il le donne ensuite à un héros du combat : l'objet entre dans son inventaire (non équipé) et le joueur reçoit un toast. Chaque objet ne se donne qu'une fois ; combien en tirer est au choix du MJ.

Les Mortemines sont calibrées pour 4 ou 5 personnages débutants (20 à 40 PV, réserves de 4 à 6 d6) : sbires R1, élites R2, M. Châtiment et VanCleef R3.

## Conversion depuis CO

| Élément | Formule |
|---|---|
| Caractéristiques | 2 + mod CO ÷ 2 (arrondi), minimum 1. DEX → Agilité, CON → Endurance |
| R | NC ÷ 3, arrondi au-dessus, plafonné à 5 |
| Dégâts | moyenne de l'expression CO ÷ 2, minimum 1 |
| PV | PV CO ÷ 2, minimum 1 |
| Armure | base de la catégorie × (R + 5) ÷ 10, plus la RD fixe ÷ 2 |

Catégories d'armure, lues dans le nom : aucune (0), cuir épais (2), carapace ou armure portée (4), lourde (6). La base est l'armure d'un monstre de rang 5 ; au rang 0, il en a la moitié. Une RD conditionnelle (« 5/magie ») devient une capacité « Résistance » : « +3 d'armure, sauf contre : magie ».

Le texte des capacités et des descriptions est traduit au d6 :

- « +N en attaque », « +N DEF », « +N discrétion », « malus de −N » → ±⌈N ÷ 3⌉d6 ; « +N init » → +⌈N ÷ 3⌉ en initiative ;
- dégâts écrits en dur (« 2d6 DM », « 5 DM », « +XdY aux dégâts ») → la moitié de la moyenne, en dégâts ;
- PV écrits en dur, RD et points de réduction → ÷ 2 (« RD 5 » → +3 d'armure) ;
- « difficulté N » ou « SAG 19 » → palier (≤ 10 facile, ≤ 15 moyenne, ≤ 20 difficile, au-delà exploit) ; « [10+BU] » → palier difficile ;
- « sur un résultat de A à 20 » → « sur un critique » ; « deux d20, garder le meilleur » → avec avantage (+1d6) ;
- « affaibli (d12) » → affaibli ; « option d12 » → −1d6 à l'attaque ;
- les formules en NC sont calculées pour le monstre, puis ramenées à l'échelle d6.

Il ne reste aucun vocabulaire d20 dans le bestiaire (un test le vérifie).

## À calibrer

L'échelle des dégâts (÷ 2) et les valeurs d'armure sont des hypothèses, à recaler après un premier combat test.

« L'hallali » (Worg, Aventuriers NC15) : quand sa cible rate une attaque, chaque créature proche dotée de la capacité lui porte une Attaque en traître gratuite.
