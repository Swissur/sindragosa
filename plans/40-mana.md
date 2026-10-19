# 40 — La mana

Décidé le 2026-10-19 avec le joueur-concepteur.

## Règles

**Domaines magiques** : les 4 domaines de base (Magie profane & Arcanes, Magie
divine & Sacrée, Communion naturelle & Chamanisme, Magie de l'Ombre & Fél) et
les domaines avancés de magie (Pyromancie, Démonologie & Fél, Nécromancie &
Peste…). Les artisanats hybrides, Élixirs arcaniques et Dressage sauvage n'en
sont pas. Liste : `client/src/data/sindragosa/magic.ts`.

**Jauge** : débloquée dès un rang dans un domaine magique.
Mana max = plus haute carac magique (INT, SAG ou CHA) + somme des rangs dans
les domaines magiques. Ex. INT 3 + Profane 1 = 4 ; INT 4 + Profane 4 +
Pyromancie 3 = 11. (La proposition de départ, INT + VOL, ne collait pas : il
n'y a pas de carac VOL, INT + SAG lésait les démonistes et ne grandissait pas.)

**Repos** : court = + ⌈max / 3⌉ (au moins 1) ; long = plein.
Quand la mana max monte (nouveau rang), la mana courante monte d'autant.

**Coût des sorts** : un sort = une compétence active qui exige un domaine
magique. Son coût est écrit dans le catalogue (`manaCost`, éditable sort par
sort), généré une fois par : rang exigé dans un domaine de base → ce rang ;
rang exigé dans un domaine avancé → ce rang + 2 ; le plus haut ; plafond 5.

**Concentration** (sur les sorts) :
- Économe : coût − ⌊coût / 3⌋, réduction d'au moins 1, le sort coûte toujours au moins 1.
- Étendue : portée ou durée ×2 (inchangé).
- Puissante : +1d6 au jet de domaine. Absente des sorts sans jet (soin, buff, hors combat).

**Sans assez de mana** : le bouton est grisé.

## Implémentation

1. `data/sindragosa/magic.ts` + `utils/sindragosa/mana.ts` (max, repos court, coût économe) → tests.
2. `manaCost` dans `abilities.ts` (script de génération) → test catalogue.
3. Colonnes `mana_current` / `mana_max` (migration 052), whitelist, GM patch, `useCharacter`.
4. Repos serveur : `RestState` + delta mana, modale du récap → tests `rest.test.ts`.
5. Concentration : modes réservés aux sorts, Puissante = +1d6 (source de dé `puissance`).
6. Carte de sort : coût affiché, bouton Lancer (sorts sans jet), l'attaque passe coût et Puissante à la feuille de jet, qui débite la mana au lancer.
7. Jauge Mana dans `VitalsCard`.
8. `knowledge/topics/magie.md`.
