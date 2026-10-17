# 32 — Fiche personnage et Mes actions Sindragosa

Suite du plan 31 (étapes 5 et 6). Proposition de l'agent `ux-designer`, condensée et corrigée.

## Principes

- **Un geste pour lancer un jet** : taper un domaine ouvre la feuille de jet, déjà remplie.
- **Le joueur lit, lance et coche. Le MJ règle.** Caracs, titres, récompenses et fin de séance sont regroupés dans une feuille « Outils du MJ », jamais mélangés aux boutons du joueur.
- **Densité** : les 30 domaines sont rangés en 6 accordéons, un par carac. Seuls les domaines à rang > 0 ou avec des coches en cours restent visibles ; les autres sont repliés dans « + N domaines à rang 0 ».
- **Pas de modale de confirmation** pour les petites corrections : un toast avec « Annuler » suffit.

## Fiche : 3 onglets (`AppTabs`, icônes seules sur téléphone)

| Onglet | Icône | Contenu |
|---|---|---|
| Héros | `ScrollText` | identité (portrait, race, faction, histoire), PV et points de chance, caracs (grille 3×2), pouvoir racial, réserves (compteurs libres), états |
| Savoirs | `BookOpen` | bandeau des coches de la séance (●●○ 2/3), 6 accordéons de domaines, domaines avancés, titres |
| Pouvoirs | `Sparkles` | compétences : recherche, filtre Débloquées / Verrouillées / Toutes, filtre par type d'action, groupées par catégorie |

L'inventaire garde son écran actuel (`/inventaire`, déjà dans la barre du haut).

### Ligne de domaine (`DomainRow`)

- Nom, rang en pastille, jauge de coches (r + 1 points).
- Taper la ligne ouvre le jet. Taper le chevron déplie le détail : les spécialités (au plus autant que le rang du domaine), avec leur niveau Apprenti / Expert / Maître et leur jauge de 2 coches.
- Quand la jauge est pleine, le domaine monte d'un rang et un toast l'annonce. Si des compétences se débloquent, l'onglet Pouvoirs reçoit une pastille.

### Compétence (`AbilityCard`)

- Repliée : icône du type d'action, nom, limite d'usage (pastilles), condition.
- Dépliée : effet, prérequis cochés (✓) ou manquants (✗, avec ta valeur actuelle).
- Les verrouillées sont grisées, sans bouton : elles montrent un objectif à atteindre.

## Feuille de jet (`RollSheet`, une seule pour toute l'app)

- **Avant le jet** : domaine (la carac en découle) et spécialité (liste déroulante), puis Désavantage / Normal / Avantage, l'interrupteur « Chance +1d6 » et le calcul de la réserve (« AGI 3 + rang 3 + Expert 1 = 7d6 »). Un gros bouton « Lancer ».
- **Après le jet** : les dés (5-6 en or, 6 avec un éclat, 1 estompés), le nombre de succès, le palier (Facile, Moyenne, Difficile, Exploit), une bannière d'échec critique s'il y a lieu.
- **Coche** : le bouton « +1 coche » est proposé si la limite de séance le permet. Correction par rapport à la proposition de l'agent UX : une réussite marquante vaut **1** coche, et non 2.
- La coche n'est jamais ajoutée d'office : c'est le joueur qui la choisit.

## Outils du MJ (`GmToolsSheet`)

- Caracs (+ / −).
- Récompense : une coche hors limite sur un domaine ou une spécialité.
- Titres : ajouter, retirer.
- Repos court, repos long, fin de séance (cette dernière avec une confirmation en deux temps).
- « Forcer un rang » pour les cas rares.

## Mes actions (`ActionsView` réécrite)

- Une grille de tuiles épinglées (domaines et compétences). Un tap ouvre la feuille de jet.
- Trois onglets : Favoris, Combat, Hors combat.
- Par défaut, les 3 domaines les plus hauts et l'initiative.

## Nouveaux composants partagés (`components/ui/`)

- `AppStepper` : − valeur +. Pour les PV, la chance, les réserves, la monnaie et les caracs.
- `AppTickGauge` : rang en pastille et points de coches.
- `AppAccordion` : bâti sur `Collapsible` de reka-ui.

Chacun sera ajouté au catalogue de `CLAUDE.md` et à `/component-library`.

## À supprimer (modèle Chroniques Oubliées)

`VoiesCard`, `VoiePickerModal`, `LevelUpModal`, `HpGrowthModal`, `CompetencesCard`, `PassifsCard`, `AbilitiesCard`, `AbilityInitModal`, `MartialFormationsCard`, `CombatCard`, l'ancienne `ActionsView`, ainsi que les données et utilitaires de CO (`voies.ts`, `profilesCatalog.ts`, `armorsCatalog.ts`, `characterStats.ts`…).

## Décisions (2026-10-17)

- **Jets partagés comme aujourd'hui** : un jet part dans le journal de la campagne, les dés 3D roulent chez les autres et les jets cachés du MJ sont conservés. Le journal et le rendu 3D passent au d6.
- **Outils du MJ** : dans la fiche d'un membre, côté MJ (`CampaignCharacterView`). Une route serveur réservée au MJ lui permet de modifier la fiche d'un autre. Repos et fin de séance restent sur la page Campagne.
- **Mes actions** : tuiles épinglées. Les épingles sont stockées dans le navigateur, par personnage.
- **Suppression** : une icône corbeille apparaît en mode édition, avec « Annuler » dans un toast. Pas de glissement.
