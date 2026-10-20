# 45 — Mode MJ sur la fiche d'un joueur

## Problème

La couronne de la fiche d'un membre ouvrait `GmToolsSheet` : un panneau à part, sur
un brouillon, avec des listes déroulantes et un bouton « Enregistrer » qu'on oubliait.
Fermer le panneau perdait tout, sans prévenir.

## Décision

La couronne devient un **interrupteur « mode MJ »**. La fiche reste la même ; des
commandes MJ apparaissent directement dessus. **Chaque geste s'enregistre seul**
(sauvegarde regroupée après une courte pause), plus de bouton Enregistrer.

Le MJ peut **tout donner** :

| Où | Quoi |
|---|---|
| Héros, sous le nom | Titres : pastilles retirables + liste (ou « Autre… »). Rien n'est affiché au joueur s'il n'en a aucun. |
| Héros, caracs | Boutons − / + sur chaque caractéristique. |
| Domaines, chaque ligne | 🎁 + 1 coche (récompense, hors limite de séance) — domaines, spécialités, domaines avancés. |
| Domaines, ligne dépliée | Rang du domaine en − / + (rang forcé, coches remises à 0). |
| Domaines, spécialités | Ajouter une spécialité **sans limite de rang** ; retirer (avec confirmation). |
| Domaines avancés | Tous accessibles, même verrouillés (rangés derrière « + N à rang 0 »). |
| Onglet Patrons | Le catalogue, filtré d'abord sur les patrons connus. Taper ✓ / verrou fait oublier ou apprend un patron (pastille « bonus du MJ » / « oublié »). |

Les compétences ne se « donnent » pas : elles découlent des prérequis (rangs,
spécialités, titres), que le MJ règle désormais tous ici.

## Technique

- `utils/sindragosa/gmPatch.ts` : la fiche → le `GmCharacterPatch` (caracs, domaines,
  spécialités, domaines avancés, titres, PV max, mana max). Pur, testé.
- `CampaignCharacterView` : `gmMode` ; une surveillance du patch qui l'envoie
  (400 ms après le dernier geste) s'il diffère du dernier envoyé.
- Prop `gm` sur `HeroCard`, `DomainsCard`, `DomainRow`, `AdvancedDomainRow`.
  `StatsCard` reçoit simplement `editing`.
- `TitlesEditor.vue` (repris de `GmToolsSheet`) ; `GmToolsSheet.vue` supprimé.
- `addSpecialty(..., force)` : le MJ passe outre la limite d'une spécialité par rang.
- Patrons : colonne `recipe_grants` (`{ [recipeId]: true | false }`, migration 058), réglable
  par le MJ seul (`GM_EDITABLE_FIELDS`). `recipesFor` / `recipesByDomain` / `isKnownRecipe`
  la font primer sur le rang du métier ; `toggleRecipeGrant` retire l'entrée quand elle
  redevient inutile. L'onglet réutilise `RecipeCatalogPanel` (props `gm`, `knownFirst`).
- Le reste passe par `PATCH /campaigns/:id/members/:userId/character`, qui existait déjà.

## Vérification

- Tests unitaires : `gmPatch`, `addSpecialty` forcé, patrons accordés / oubliés.
- e2e `02-fiche` : récompense, retrait de spécialité, titre et patron passent par le mode MJ.
