# 43 — Deuxième système de jeu : Knight

> Statut : **étapes 1 à 3 livrées le 2026-10-19** (premier jalon jouable), voir § 9.
> Suite : **plan 46** (conformité au livre de base), qui remplace les étapes 4 à 8 ci-dessous.
> Source : une ébauche HTML autonome (« Knight — Feuille de chevalier », générée hors de l'app,
> stockage `window.storage`, MVC à la main). Elle sert de cahier des charges, **pas de référence de
> règles** : ses catalogues ont été écrits par une IA et doivent être vérifiés contre le livre (§ 7).

## 1. Objectif

- Tout ce qui existe aujourd'hui devient explicitement le système **WoW Forever** (règles Sindragosa).
- Un second système, **Knight**, se branche sur la même app et profite de tout ce qui est
  indépendant des règles : campagnes, flux SSE et log de jets, dés 3D, fiche et ses UX, inventaire,
  journal / codex / notes / échange avec le MJ, mode table, champ de bataille 3D, composants `App*`.
- Ce qui dépend des règles (fiche, jet, combat, repos, bestiaire, catalogues) passe par un
  **contrat de système** au lieu d'être importé en dur.

## 2. Ce que contient l'ébauche Knight

| Bloc | Contenu | Ce que ça devient dans l'app |
|---|---|---|
| Identité | Nom, surnom, archétype (18), section (9), méta-armure (13), blason (10) + vœu, haut fait, motivations, avantages / inconvénients (tarot), Table Ronde | Onglet Identité de la fiche Knight |
| Aspects & caractéristiques | 5 aspects (1–9), 3 caracs chacun (plafonnées par l'aspect), overdrives 0–5 | Carte « Aspects » (≈ `StatsCard` + `AppStepper`) |
| Valeurs dérivées | Défense (Bête), Réaction (Machine), Initiative (Masque), Santé = 10 + 6 × carac Chair, Contacts (Dame) ; carac de référence au choix | Calcul pur `utils/knight/derived.ts` |
| Jauges | PS, PES (espoir, 50), Contacts, PA, PE, CdF, ressource spéciale (Flux du Psion), héroïsme, PX, PG | Vitals de la fiche, jauges de combat |
| Jet de combo | Base + combo (2 caracs différentes) = nb de d6 ; **pair = réussite** ; OD = réussites auto ; tous pairs = exploit (relance et cumul) ; aucune réussite = échec critique | Variante du moteur de réserve (§ 4.2) |
| Méta-armure | CdF, PA, PE, 6 slots, capacités ; 4 modèles 2038 détaillés, règles génériques 4e génération | Carte « Méta-armure » |
| Table des blessures | 2d6 (colonne × ligne) à l'agonie | Branche dans `AgonieModal` |
| Arsenal | Armes (Standard / Avancée / Rare), améliorations, modules (9 catégories), 2038, prestige ; budget en **PG** | Inventaire + catalogues `data/knight/` |
| Assistant de création | 10 étapes : bases, archétype, tarot (5 lames, 2 avantages, 1 inconvénient), haut fait, blason, motivations, armure, section, dérivées, arsenal | Parcours plein écran, une étape par écran mobile |
| Mode MJ | Armures autorisées, contenu 2038, Table Ronde + seuil, seuils de disponibilité, budget PG de départ | **Réglages de campagne** (`campaign.settings`), pas un onglet de la fiche |

## 3. Où l'app est couplée à Sindragosa aujourd'hui

**Déjà indépendant des règles (réutilisable tel quel)** : auth, campagnes et membres, flux SSE
(`useCampaignRolls`, `useCampaignLive`), journal / codex / notes / révisions, échange MJ
(`gmMessages`), mode table (`ViewerView`), champ de bataille 3D et murs, dés 3D et leurs styles,
toasts, autosave, tous les `App*`.

**Couplé en dur** :

| Zone | Couplage | Fichiers |
|---|---|---|
| Personnage (DB) | Colonnes plates Sindragosa : `str…cha`, `domains`, `specialties`, `advancedDomains`, `titles`, `crafts`, `pcCurrent`, `mana*`, `form`, pièces or/argent/cuivre | `server/src/db/schema.ts` |
| Personnage (client) | `Character`, `toCharacter`, `toServerPayload`, calculs à l'écriture (PV max, AP, mana) | `types/character.ts`, `composables/useCharacter.ts` |
| Jet | `RollPool.reached` = échelle Sindragosa, réussite = 5–6, `critFrom`, `sources` | `utils/rollOutcome.ts`, `utils/sindragosa/pool.ts`, `server/src/campaigns/rollPool.ts` |
| Dés 3D | Couleur « réussite » des faces suppose 5–6 | `dice3d/`, `poolDiceStyles.ts` |
| Combat | Initiative = AGI + SAG + Perception ; monstres avec `statFor…statCha`, `threat`, `defense` en d6 | `server/src/combats/initiative.ts`, `encounterMonsters`, `combatParticipants` |
| Repos / séance | Chance, coches, mana, usages par période | `server/src/campaigns/rest.ts` |
| Composants | **32 vues/composants** importent `data/sindragosa` ou `utils/sindragosa` | fiche, capacités, actions, RollSheet, CombatView, EncounterEditView, Savoir, Loot… |

**Plomberie déjà là** : `campaign.system` (défaut `'wow-forever'`), `CAMPAIGN_SYSTEMS` côté serveur
et client, sélecteur dans `CampaignOptionsSheet`. Il manque : le système **du personnage**, et
quelque chose qui lise `campaign.system` pour choisir le comportement.

## 4. Architecture proposée

### 4.1 Données

- **`character.system`** `varchar(40) not null default 'wow-forever'`. Toutes les fiches existantes
  basculent en WoW Forever par la valeur par défaut, sans rien réécrire.
- **`character.sheet`** `jsonb not null default '{}'` : la fiche propre au système. Knight y range
  aspects, caracs, OD, dérivées choisies, identité Knight, méta-armure, PES, contacts, héroïsme,
  PX, PG.
- On **ne déplace pas** les colonnes Sindragosa dans `sheet` : chantier risqué sans gain. Elles
  restent, ignorées par Knight.
- **Colonnes partagées**, lues par le combat et le mode table quel que soit le système :
  `name`, `histoire`, `portraitImageId`, `hpCurrent/hpMax` (= PS pour Knight), `armor`,
  `states`, `resources`, `items`. Pour Knight, `armor` porte le **CdF** (ce qui se soustrait aux
  dégâts) ; PA et PE vivent dans `sheet` et s'affichent via l'adaptateur de vitals (§ 4.3).
- **`campaign.settings`** `jsonb not null default '{}'` : réglages MJ par système (Knight : armures
  autorisées, 2038, Table Ronde, seuils, PG de départ).
- **Garde-fou** : rejoindre une campagne (`/join`, `PATCH members/:userId/character`) refuse un
  personnage d'un autre système. Créer un personnage depuis une campagne hérite de son système.
- **Monstres Knight** : leurs stats ne rentrent pas dans `statFor…statCha`. Ajouter
  `encounter_monster.sheet` et `combat_participant.sheet` (jsonb) : aspects + aspects exceptionnels,
  défense, réaction, PS/PA/CdF, bande (cohésion…). Les colonnes communes (`name`, `pv`, `armor`,
  `init`, `hidden`, `pos*`, `states`) restent partagées.
- `roll_event.pool` est déjà en jsonb : pas de migration, seulement la validation (§ 4.2).

### 4.2 Le jet : une réserve de d6 à deux lectures

Les deux systèmes lancent des d6 et comptent des réussites ; seule la lecture change. C'est le
morceau qui rapporte le plus, car il nourrit le dé 3D, le log, le flux et le mode table.

```ts
// utils/rollOutcome.ts — le pool devient une union discriminée
type RollPool =
  | { system?: 'wow-forever'; critFrom: 5 | 6; reached: Difficulty; critFail: boolean; sources?: PoolDieSource[] }
  | { system: 'knight'; autoSuccesses: number; exploit: boolean; critFail: boolean;
      exploitDice?: number[]; difficulty?: number; sources?: KnightDieSource[] }
```

- `system` absent = WoW Forever : les jets déjà en base restent lisibles sans migration.
- `isSuccessFace(system, face)` : `face >= 5` ou `face % 2 === 0`. Le dé 3D et le log colorent
  les faces avec ça au lieu du 5–6 en dur.
- `rollOutcome` : exploit Knight → `'critical'`, échec critique → `'fumble'`. La fanfare de
  `CriticalMomentOverlay` marche telle quelle.
- `parsePool` côté serveur valide les deux variantes.
- Moteur pur `utils/knight/combo.ts` (`comboPool`, `readCombo`, `rollCombo` avec rng injectable),
  testé comme `pool.ts`.

### 4.3 Le contrat de système côté client

Un registre `client/src/systems/` avec une entrée par système. **Les fichiers Sindragosa ne
bougent pas** : `systems/wow-forever/index.ts` ne fait que pointer vers `data/sindragosa` et
`utils/sindragosa`.

```ts
interface GameSystem {
  id: 'wow-forever' | 'knight'
  label: string
  /** Vues chargées à la demande : seul le système de la campagne est téléchargé. */
  SheetView: () => Promise<Component>
  CreationView?: () => Promise<Component>
  RollSheet: () => Promise<Component>
  /** Ce que le combat, le mode table et la grille membres affichent d'un PJ. */
  vitals(c: CharacterBase): { label: string; current: number; max: number; tone: string }[]
  initiative(c: CharacterBase): number
  /** Lecture d'un jet loggé (libellé, faces réussies) pour le log et le mode table. */
  describeRoll(e: RollEvent): RollSummary
  itemTypes: ItemTypeDef[]
  currency: CurrencyDef
}
```

`useSystem()` lit `campaign.system` de la campagne active (fiche hors campagne → `character.system`).
`CharacterSheetView`, `JetsView`, `InventaireView`, `CombatView` et `EncounterEditView` choisissent
leurs sous-composants par ce registre au lieu de les importer.

### 4.4 Côté serveur

Même idée, en plus petit : `server/src/systems/{wow-forever,knight}/` exposent
`computeInitiative`, `applyRest` et la validation des champs modifiables de la fiche
(`characters/updatable.ts`). Les routes appellent `systemOf(campaign)` puis la fonction.

## 5. Ce que Knight récupère, élément par élément

| Brique | Réutilisée | À adapter |
|---|---|---|
| **Flux / log de jets** | SSE, historique, filtre PJ/PNJ, visibilité MJ | `describeRoll` Knight (base + combo, OD, exploit) |
| **Dés 3D** | Animation, styles, couleur par origine | Faces réussies paires ; origines `base`/`combo`/`od`/`exploit` |
| **Fiche** | `AppPageLayout`, `AppTabs`, `AppStepper`, `AppTickGauge`, `HeroCard` (portrait, nom), `ResourcesCard`, favoris, autosave | Cartes Knight : Aspects, Dérivées, Méta-armure, Identité |
| **Inventaire** | `ItemsCard`, `ItemEditorSheet`, quantité, équipé | Types `arme`/`module`/`amelioration`/`objet`, coût en PG, slots ; monnaie = PG au lieu de or/argent/cuivre |
| **Chat / journal** | Échange MJ, notes, codex, mentions, révisions — rien à changer | — |
| **Combat** | Ordre de tour, SSE, carte 3D, états, réserve cachée, butin | Initiative, jauges PS/PA/CdF, fiche PNJ Knight, dégâts CdF → PA → PS |
| **Agonie** | `AgonieWatch`, `AgonieModal` | Table des blessures 2d6 à la place du jet Sindragosa |
| **Repos / séance** | Bouton MJ, modale « ce qui a bougé » | Fin de mission Knight : contacts au max, PE/PA rechargés, nods (règles à confirmer) |
| **Mode table** | Initiative, flux | Via `vitals()` et `describeRoll()` |
| **Écran MJ** | Grille membres, rencontres, raccourcis | Réglages Knight dans `CampaignOptionsSheet` |

À construire de zéro : la fiche Knight, le jet de combo, l'assistant de création, les catalogues
`data/knight/`, le bestiaire Knight, `knowledge/knight/`.

## 6. Découpage

Chaque étape se livre seule et garde WoW Forever intact (e2e vert à chaque étape).

1. **Plomberie système** : migration `character.system` + `character.sheet` + `campaign.settings` ;
   `'knight'` ajouté à `CAMPAIGN_SYSTEMS` (client et serveur) ; garde-fou à l'adhésion ; choix du
   système à la création d'un personnage ; registre `systems/` avec WoW Forever seul.
   → vérif : tests serveur sur le garde-fou, e2e existants verts, aucune fiche modifiée en base.
2. **Jet générique** : union `RollPool`, `isSuccessFace`, `parsePool`, dés 3D et log par système ;
   moteur `utils/knight/combo.ts`.
   → vérif : tests unitaires des deux lectures ; anciens jets toujours affichés.
3. **Fiche Knight minimale** : aspects / caracs / OD, dérivées, vitals (PS, PES, contacts, PA, PE,
   CdF, héroïsme), méta-armure, RollSheet de combo branché sur le flux.
   → vérif : tests de `derived.ts` ; un jet Knight apparaît dans le log du MJ en direct.
4. **Inventaire & arsenal** : types d'objets et monnaie par système, catalogues, budget PG, seuils
   de disponibilité (avertissement, pas blocage).
5. **Assistant de création** : les 10 étapes, calcul pur `computeStats` repris de l'ébauche et testé
   (plafonds par aspect, Maison-Dieu, Fou, haut fait à aspect au choix).
6. **Combat Knight** : PNJ Knight (`sheet` jsonb), initiative, CdF → PA → PS, table des blessures.
7. **Réglages MJ & 2038** : `campaign.settings`, Table Ronde, prestige, filtres des sélecteurs.
8. **Knowledge** : `knowledge/knight/` décrit les règles telles que l'app les implémente.

Les étapes 1–3 forment un premier jalon jouable : une campagne Knight où l'on lance des combos
qui s'affichent dans le flux de tout le monde.

## 7. Points à trancher

1. **Fiches multi-systèmes et fiche active** : `one_active_per_user` impose une seule fiche active
   par joueur, tous systèmes confondus. Un joueur dans une campagne WoW et une campagne Knight
   doit-il basculer de fiche en changeant de campagne ? Proposition : la fiche affichée est celle
   de `campaign_member.characterId` de la campagne active ; `isActive` ne sert plus qu'hors campagne.
2. **Exactitude des règles de l'ébauche**, à vérifier dans le livre avant d'en faire la vérité de l'app :
   - réussite du test : `réussites > difficulté` (ébauche) ou `≥` ?
   - initiative : l'ébauche donne carac + OD, mais l'inconvénient « Trop prudent » parle de
     2D6 au lieu de 3D6 → l'initiative serait **3D6 + valeur** ;
   - les 9 méta-armures de base n'ont aucune stat ni capacité (seules les 4 de 2038 en ont) ;
   - les améliorations d'armes et certains modules ont des descriptions qui semblent inventées.
3. **Règles absentes de l'ébauche** qu'il faudra fournir pour le combat : dégâts vs violence,
   bandes et cohésion, effets d'armes (glossaire), mode héroïque, nods, coût en PX, fiches de PNJ.
4. **Monnaie Knight** : PG uniquement, ou aussi l'argent civil ?
5. **Le repos** a-t-il un sens en Knight, ou seulement « fin de mission » ?
6. Les catalogues reprennent des textes du livre Knight : à garder dans l'instance privée, pas dans
   un dépôt public.

## 8. Avant d'implémenter

- `game-designer` sur le point 7.2 / 7.3 une fois le livre en main.
- `ux-designer` sur la fiche Knight mobile (5 aspects × 3 caracs × OD, c'est dense) et sur
  l'assistant de création en 10 étapes.

## 9. Avancement

### Livré le 2026-10-19 (étapes 1 à 3)

- **Plomberie** : migration 056 (`character.system`, `character.sheet`) ; `'knight'` dans les
  systèmes (serveur `campaigns/systems.ts`, client `data/systems.ts`) ; le système d'une fiche se
  choisit à la création (celui de la campagne active, `useNewCharacter`) et ne change plus.
- **Fiche active** (point 7.1 tranché) : rejoindre une campagne prend la fiche active du bon
  système, sinon la première, sinon en crée une ; entrer dans une campagne active sa fiche ;
  activer une fiche d'un autre système ne la met pas dans la campagne active. L'entrée en campagne
  ne propose le choix du perso que s'il y a plusieurs fiches **de ce système**.
- **Garde-fou** : le MJ ne peut pas changer le système d'une campagne dont des fiches ne suivent pas.
- **Jet générique** : `RollPool` = union `SindragosaPool | KnightPool` (sans `system` = WoW
  Forever, les vieux jets restent lisibles) ; validé côté serveur ; critique, palier du log et
  couleurs des dés par système. Les overdrives vont dans `bonus`.
- **Fiche Knight** : onglets Chevalier (portrait/nom/histoire via `HeroCard` et son slot
  `identity`, identité, jauges, réserves, profil), Aspects (taper une carac lance un combo),
  Méta-armure. Feuille de jet `KnightRollSheet`, branchée sur le log et le flux.
  La fiche vue par le MJ (`CampaignCharacterView`) l'affiche en lecture.
- **Combat** : initiative serveur selon le système ; Santé et CdF passent par `hpCurrent/hpMax`
  et `armor`, donc la carte, le mode table et le combat les montrent déjà.
- Tests : unitaires (`utils/knight/*`, `systems`, `rollPool`, `initiative`, `entryRoute`,
  `rollOutcome`, `rollDetail`) et e2e `12-knight.spec.ts`.

**Écart avec § 4.3** : pas de registre `systems/` pour l'instant. Seules deux vues aiguillent
(`CharacterSheetView`, `CampaignCharacterView`) : un `v-if` sur `character.knight` suffit. Le
registre viendra quand Jets, Inventaire, Combat et Rencontres auront eux aussi deux versions.

### Reste à faire

- Étape 4 : inventaire Knight (types d'objets, PG, catalogues de l'arsenal). Aujourd'hui une fiche
  Knight a l'inventaire WoW Forever (or / argent / cuivre).
- Étape 5 : assistant de création.
- Étape 6 : PNJ Knight, dégâts CdF → PA → PS, table des blessures (l'agonie WoW n'est pas montée
  sur la fiche Knight).
- Étape 7 : réglages MJ (`campaign.settings`) ; les outils du MJ (`GmToolsSheet`) sont masqués
  sur une fiche Knight.
- Repos / fin de séance : le serveur applique encore les règles WoW (chance, mana…) aux fiches
  Knight ; sans effet visible sur la fiche Knight, mais à remplacer par la fin de mission.
- La liste « Choix du personnage » montre toutes les fiches, tous systèmes confondus.
- Barre du bas : Inventaire et Jets restent ceux de WoW Forever.

