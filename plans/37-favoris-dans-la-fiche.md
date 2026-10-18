# 37 — Favoris dans la fiche, fin de la page Mes actions

## Objectif

Fusionner « Mes actions » dans la fiche Personnage. Dès qu'un domaine, une
compétence ou un patron est en favori, un onglet **Favoris** apparaît juste
après **Héros**. Il reprend tous les favoris en 3 sections repliables
(ouvertes par défaut) : Domaines, Compétences, Patrons. La page `/actions`
disparaît.

## Ce qui change

- **Patrons épinglables** : nouvelle épingle `recipe:<id>` (`utils/sindragosa/pins.ts`),
  étoile sur chaque ligne de `RecipeList` (onglets Domaines et Artisanat).
- **`useFavorites`** : résout les épingles en listes (domaines + domaines avancés
  ouverts, spécialités, pouvoir racial + compétences débloquées, patrons des
  métiers maîtrisés). Un favori disparu (spécialité supprimée, métier perdu) ne
  s'affiche plus. Helper pur `pinnedOf`, testé.
- **`FavoritesCard`** : Domaines et spécialités en tuiles qui lancent le jet,
  compétences en `AbilityCard`, patrons en `RecipeList`. L'onglet disparaît
  quand le dernier favori est retiré (retour sur Héros).

## Flux préservés

- **Combat** : l'onglet « Mes actions » du combat embarquait la vue. Son contenu
  devient `components/actions/ActionsPanel.vue` (inchangé : favoris, combat, hors combat).
- **Agonie** : à 0 PV, les jets de mort s'ouvraient depuis la page Mes actions.
  Extrait dans `AgonieWatch.vue`, posé sur la fiche et dans le panneau du combat.
- **Anciens liens** : `/actions` redirige vers `/personnage`.
- Les épingles restent dans le même stockage (`sindragosa-pins-v2-<id>`) : rien à migrer.

## Vérifications

- `npm test -w client` : `pins.test.ts` (pinnedOf, togglePin d'un patron).
- `npm run e2e` : specs 02, 03, 04, 05, 09 réécrites sur l'onglet Favoris,
  le panneau du combat et la redirection.
