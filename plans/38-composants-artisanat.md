# 38 — Composants d'artisanat : de la récolte au patron

Décidé le 2026-10-19.

## Problème

Le PDF d'artisanat liste 300 patrons qui consomment 343 composants différents, mais ne dit
presque jamais comment les obtenir. Les rares patrons de raffinage produisaient des noms que
personne ne demandait (« Barre de fer forgé » alors que les patrons veulent « Lingot de Fer brut »).
Un artisan ne pouvait donc pas être autonome.

## Règle

Trois étages :

1. **Récolte** — les matières premières (`client/src/data/sindragosa/harvest.ts`) : minage,
   bûcheronnage, cueillette, dépeçage, butin de créature. Aucun patron ne les fabrique ; elles
   s'obtiennent par un jet de spécialité (Extraction, Dépeçage…) arbitré par le MJ.
2. **Composant** — fabriqué à partir de la récolte ou d'autres composants
   (`componentRecipes.ts`, 99 patrons maison, effet « Composant d'artisanat. »).
3. **Patron** — les patrons du PDF consomment les composants.

Chaque composant vient du **métier de sa matière** :

| Métier | Fabrique |
|---|---|
| Forge | lingots (fonte), fils de métal, montures, gemmes taillées, flux, manches |
| Travail du cuir | cuirs (tannage), fils de soie, tissus, feutres, sangles, cordes, papyrus |
| Ingénierie | pièces, plaques, engrenages, ressorts, pistons, boîtiers, poudres, verre, lentilles, piles |
| Alchimie | fioles, acides, huiles, teintures, encres, eaux bénites, catalyseurs |

Un artisan dédié à un métier achète ou échange ce qui vient d'un autre (la Forge achète son cuir).
Les artisanats avancés (hybrides) n'ont pas de patron de composant : ils s'appuient sur les métiers
de base qu'ils exigent déjà.

**Rang** : dans un métier de base, un composant de ce métier s'ouvre au plus tard au rang du
premier patron qui le consomme.

## Changements dans le catalogue du PDF

- **Règle 1** : les patrons de raffinage prennent le nom de ce qu'ils produisent — Lingot de Fer,
  d'Acier, de Mithril, de Thorium, d'Arcanite ; Lanière de cuir ; Cuir durci (×2) ; Cuir d'élite
  (×3, ex-« Cuir de bête des neiges traité ») ; Cuir légendaire (×3, ex-« Cuir d'élite tannée au
  feu ») ; Ressort ; Engrenage de précision ; Pile à vapeur ; Cœur d'énergie.
- **Doublons fusionnés** dans les composants : « Lingot de Fer brut » / « Lingots de Fer » →
  Lingot de Fer ; 7 sortes de boîtiers → Boîtier de fer ; tous les ressorts → Ressort ; tous les
  pistons et vérins → Piston hydraulique ; etc. La table complète est dans l'historique git de
  `crafts.ts` (commit de ce plan).
- Quelques composants désignent un patron existant : « Potion de soins » → Potion de soins
  mineure, « Toxines de paralyse » → Poison paralytique mortel, « Detonateur » → Détonateur à
  poussoir mécanique…

## Garde-fous

`componentRecipes.test.ts` vérifie que chaque composant se récolte ou se fabrique, qu'aucune
matière première n'est fabriquée ni inutile, et la règle de rang. `componentKey` traite le seul
pluriel irrégulier (« Cristaux »).

## Hors périmètre

- Les objets déjà en inventaire sous un ancien nom (« Lingot de Fer brut ») ne correspondent plus :
  à renommer à la main dans l'inventaire.
- Pas d'affichage de la liste de récolte dans l'app pour l'instant.
