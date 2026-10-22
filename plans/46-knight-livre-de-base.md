# 46 — Knight conforme au livre de base

> Statut : **plan, rien d'implémenté**. Suite du plan 43, qui a livré le premier jalon : plomberie, jet de
> combo, fiche minimale.
> Sources : *Knight — Livre de base* V1.5, partie règles (p. 1–174) et annexe 2 Arsenal (p. 410–448).
> Le Livre du MJ (bestiaire p. 362+, cadres d'aventures) **n'est pas** dans les PDF fournis.
> Questions ouvertes pour le MJ de la campagne (Raziel) : `docs/questions_knight.txt`. Les lots qui
> en dépendent le signalent par **[Q n]**.

## 0. Principe

- Pour Knight, la référence est **le livre**, avec les règles maison de Raziel par-dessus. L'ébauche
  qui a servi au plan 43 ne fait plus foi (catalogues écrits par une IA, cf. 43 § 7.2).
- Pour WoW Forever, rien ne change. Chaque lot garde les e2e WoW verts.
- Un lot = livrable seul, avec tests unitaires sur la logique pure (`utils/knight/*`) et mise à jour de
  `knowledge/topics/knight.md` dans le même changement.
- UI : `ux-designer` avant chaque lot qui ajoute un écran (fiche méta-armure, arsenal, assistant,
  fiche PNJ). La fiche Knight est dense ; règle des 7 boutons par barre.
- **Droits** : les catalogues (armes, modules, lames, capacités d'armure) reprennent les textes du livre.
  On n'y met que des **libellés courts et des chiffres**, pas de recopie des descriptions. Leur place
  dépend de la visibilité du dépôt (à trancher avec Thomas, cf. 43 § 7.6).

## 1. Écarts entre l'app et le livre

### 1.1 Faux aujourd'hui

| Sujet | App | Livre | Lot |
|---|---|---|---|
| Initiative | carac + OD, figée à l'entrée en combat | **3D6 + score**, lancé au début de chaque phase de conflit. 2D6 avec *Trop prudent*. +10 en embuscade. Bandes à 1. Masque exceptionnel majeur à 30 (p. 86, 101, 116) | 1 |
| Espoir < 10 | aucun effet | **−1 dé par point sous 10** à tous les jets. À 0 : chevalier noir, sauf un point d'héroïsme dépensé (p. 96) | 1 |
| Méta-armures | 13 noms, sans stats | **9 armures** avec PA / PE / CdF, slots par zone, OD de base, capacités, évolutions (p. 133–167). Psion, Monk, Sorcerer et Necromancer viennent de suppléments **[Q 1]** | 2 |
| Sections | 9 avec Kraken | 8, plus le Kraken réservé aux grands chevaliers. Chacune donne +1 aspect, +1 à ses 3 caracs, des modules offerts et un inconvénient (p. 169–170) | 6 |
| PG | un seul compteur | Deux valeurs : **PG actuels** (monnaie) et **PG total accumulé**, qui ne baisse jamais. Le total débloque les paliers d'arsenal (100 / 300 / 500) et les évolutions d'armure (150 / 200 / 250) | 1 |
| Inventaire | or / argent / cuivre, objets WoW | Monnaie = PG. Armes, améliorations, modules à slots, nods, grenades | 3 |
| Repos / fin de séance | applique les règles WoW (chance, mana…) aux fiches Knight | **Fin de mission** (PS, PA, PE, contacts au max, nods rechargés). La *partie* (séance) n'a presque pas d'effet | 5 |

### 1.2 Juste mais incomplet

- **Jet de combo** : lecture des pairs, OD, exploit unique, échec critique et réussite **strictement
  supérieure** à la difficulté sont conformes (p. 74–76).
  - Manquent : l'entraide, le sacrifice de dés (optionnel), le malus d'espoir, les dés en ± (styles,
    véhicules), la dépense d'héroïsme et les réussites auto des avantages.
- **Valeurs dérivées** : l'app laisse choisir la carac de référence, comme le dit p. 171. Le résumé
  p. 108 dit « la plus haute » **[Q 6]**.
  - Manquent les modificateurs : *Dur à cuir* +5 PS, OD Endurance niv. 3 +6 PS en armure,
    *Forteresse spirituelle* +5 espoir max, OD Aura niv. 5 + Aura en défense, OD Instinct niv. 3.
- **Héroïsme** : un compteur 0–6. Il ne sert à rien pour l'instant (§ 4).
- **Identité** : les archétypes sont conformes (17 + libre).
  - Manquent : les lames du tarot (22, texte libre aujourd'hui), les hauts faits (14, texte libre),
    les motivations structurées (1 majeure + 3 mineures dont le vœu du blason).
  - Le blason est bon.

### 1.3 Absent

- Table des blessures et agonie (p. 89–91).
- Combat Knight : PNJ, bandes, dégâts, effets d'armes, styles.
- Arsenal : 40 armes, 18 améliorations, 57 modules, 15 OD achetables, 19 véhicules.
- Mode héroïque et cartes du destin (p. 97–99).
- Progression en PX (p. 107) et motivations (p. 126–127).
- Assistant de création (10 étapes).
- Réglages de campagne.

## 2. Modèle de données (`character.sheet`, jsonb)

Ajouts à `KnightSheet`. On ne migre pas la base : `normalizeKnightSheet` complète les fiches existantes
avec des défauts.

```ts
pg: { current: number; total: number }            // remplace pg: number
espoir: { current; max }                           // existe ; max = 50 + modificateurs
identite: { …, lames: LameId[]; avantages: LameId[]; inconvenients: LameId[];   // ids, plus texte libre
            hautFait: HautFaitId | { custom: string }; motivations: { majeure?: Motivation; mineures: Motivation[] } }
armure: { modele: ArmureId; pa; pe; cdf; foldee: boolean;
          options: { warriorTypes?: TypeId[]; warriorTypeActif?: TypeId; impulsions?: ImpulsionId[]; goliathMetres?: number };
          modules: { id; niveau; zone[] }[]; odAchetes: Partial<Record<CaracId, number>>; evolutionsAchetees?: string[] }  // Ranger
arsenal: { armes: { id; ameliorations: id[]; rackee: boolean }[] }
consommables: { nodSoin; nodArmure; nodEnergie; grenades }
blessures: { id: BlessureId; malus?: Partial<Record<CaracId, number>>; note? }[]
implants: number
cartesDestin: CarteId[]                            // cartes conservées
```

- La **carac effective** vaut base − malus de blessures, plancher 0. L'**OD effectif** vaut OD de
  l'armure + OD achetés + section (Giant, Cyclope) + type Warrior actif. Les OD ne comptent qu'en
  armure déployée (p. 128).
  - Une seule fonction pure, `effectiveSheet(sheet)`, alimente dérivées, jets et affichage.
- PNJ Knight : colonne `sheet jsonb` sur `encounter_monster` et `combat_participant` (déjà prévue en
  43 § 4.1). Une migration.
- `campaign.settings jsonb` (43 § 4.1) : une migration.

## 3. Catalogues `client/src/data/knight/`

| Fichier | Contenu | Source |
|---|---|---|
| `armures.ts` | 9 armures : génération, PA/PE/CdF, slots ×6, OD de base, capacités (coût PE, action, durée, résumé court), 3 évolutions | p. 133–167 |
| `lames.ts` | 22 lames : aspect, avantage, inconvénient, effet chiffré quand il y en a un (`+5 PS`, `init 2D6`, `aspects ≤ 7`…) | p. 113–121 |
| `hautsFaits.ts` | 14 + libre : prérequis, archétypes interdits, aspect (ou choix), surnoms | p. 122–124 |
| `sections.ts` | 8 + Kraken : aspect, modules offerts, inconvénient | p. 169–170 |
| `blessures.ts` | Table 6 × 6 : id, libellé, malus caracs, « à la discrétion du MJ », mort | p. 91 |
| `effets.ts` | 32 effets : id, X ou non, résumé court | p. 413–416 |
| `armes.ts` | 40 armes : palier, coût PG, contact/distance, profils (dégâts, violence, portée, PE, effets) | p. 419–425 |
| `ameliorations.ts` / `modules.ts` / `overdrives.ts` / `vehicules.ts` | Améliorations, modules (catégorie, slots par zone, niveaux, coûts), OD (10/30/50/70/100 PG, bonus par niveau), véhicules | p. 426–448 |
| `cartesDestin.ts` | 22 cartes : effet, instantanée ou conservable | p. 97–98 |

Les extractions annotées du livre (`ch5-creation.md`, `arsenal.md`, faites le 2026-10-20) servent de base
pour saisir ces catalogues ; elles sont dans `docs/knight-livre/`, gitignoré (dépôt public, texte sous licence). Elles listent aussi les
ambiguïtés de mise en page à faire valider **[Q 16, 18]**.

## 4. Lots

Ordre proposé : d'abord ce qui sert à chaque séance (fiche juste, armure, jets), puis la gestion
(arsenal, combat, fin de mission), enfin le confort (assistant, tarot).

### Lot 1 — Fiche juste
- `pg {current,total}`, espoir max calculé, malus d'espoir dans `comboPool`, modificateurs des
  dérivées **[Q 6]**.
- Initiative serveur : 3D6 + score lancé à l'ajout dans le combat ; 2D6 avec *Trop prudent* ;
  OD Instinct 2 (deux jets, garder le meilleur) et 3 (+3 par OD). Le MJ peut relancer et cocher
  « embuscade » (+10) **[Q 10]**.
- Héroïsme utile dans `KnightRollSheet`.
  - Ajouter une 3e carac (OD compris) pour 1 point, avant le jet.
  - Relancer un jet raté pour 1 point.
- Tests : `effectiveSheet`, `comboPool` avec espoir, `rollInitiative` (rng injecté).

### Lot 2 — Méta-armure
- Catalogue `armures.ts` et carte « Méta-armure » refaite.
  - Le modèle remplit PA, PE, CdF, slots et OD de base.
  - Les capacités deviennent des boutons qui **dépensent les PE** **[Q 15]**.
  - Les évolutions s'affichent débloquées selon `pg.total` ; pour la Ranger, elles s'achètent.
- Spécifiques :
  - Warrior : 3 types au choix, type actif = OD temporaires.
  - Warmaster : 3 impulsions au choix.
  - Barbarian : stepper Goliath de 0 à 4 m (+1 réussite Force/Endurance, +1D6 au contact, +1 CdF,
    −1 défense, −2 réaction par mètre).
- État **foldée** (combinaison Guardian : 5 PA, CdF 5, plus d'OD ni de module) et règle « 1 PS
  perdu par tranche de 5 PA perdus d'un coup », sauf avec *Infatigable*.
- Consommables : 3 nods de chaque + 5 grenades par mission. Utiliser un nod lance 3D6 et crédite
  la jauge.
- Tests : `armorEffects` (OD effectifs, Goliath, foldée), coûts d'impulsion Warmaster.

### Lot 3 — Arsenal et inventaire Knight
- Inventaire par système : la vue Inventaire aiguille vers `KnightArsenal` (premier vrai cas du
  registre `systems/` de 43 § 4.3).
- Achat en PG : le palier dépend de `pg.total` (standard / 100 avancé / 300 rare / 500 prototypes),
  avec un avertissement plutôt qu'un blocage, comme décidé en 43. Contrôle des slots par zone ;
  rack de 5 armes ; améliorations (1 / 2 / 3 selon une main, deux mains ou lourde).
- Fiche d'arme et **jet d'attaque** depuis l'arme.
  - Combo Combat/Tir, malus de portée −1 réussite par palier.
  - Dégâts = dés + fixe + Force (contact) + 3 × OD Force, plus *lesté*, *précision* et
    *orfèvrerie*. Violence à part. Option « valeur moyenne ».
  - Les effets s'affichent en badges, avec infobulle.
- Tests : `weaponDamage(profile, sheet)`, `canEquip(module, slots)`, `availableTier(pgTotal)`.

### Lot 4 — Combat Knight **[Q 20–25]**
- Fiche PNJ Knight (rencontres et participants).
  - 5 aspects, aspects exceptionnels (mineur/majeur + score), défense, réaction, initiative.
  - PS, PA, CdF ou bouclier, PE.
  - Type : hostile, salopard, patron, colosse, bande, allié. Niveau : recrue, initié, héros.
  - Points faibles cachés aux joueurs, capacités en texte, armes.
  - Le bestiaire n'étant pas fourni, le MJ saisit ses PNJ ; modèles réutilisables comme les
    rencontres WoW **[Q 3]**.
- Jet PNJ : nombre de dés = aspect, réussites auto = aspect exceptionnel. Opposition d'un PJ contre un
  PNJ = aspect / 2 + exceptionnel.
- **Moteur de dégâts pur** `utils/knight/damage.ts` : bouclier → CdF → PA → PS.
  - Effets : pénétrant X, perce armure X, ignore CdF, ignore armure, anti-Anathème, destructeur,
    meurtrier.
  - Colosse et véhicule : par tranches de 10, sauf anti-véhicule. PNJ à PA seuls.
  - Bonus des aspects exceptionnels : Chair mineure soustrait, Bête mineure/majeure ajoute,
    Machine/Masque mineurs ajoutent à la réaction / la défense.
- **Bandes** : cohésion (baissée par la violence, plus ultraviolence et fureur), débordement cumulé à
  chaque tour, initiative 1.
- Effets à durée via le système d'états existant (`etats.ts`, `turns`) : barrage, lumière, choc,
  parasitage, dégâts continus, désignation.
- Styles de combat par PJ, choisis au début du combat (6 styles, ± dés, défense, réaction).
- **Agonie Knight** : à 0 PS, tirage 1D6 × 1D6 sur la table des blessures. La blessure s'ajoute à
  `blessures`, et ses malus s'appliquent aux caracs effectives.
  - 2e attaque à l'agonie : nouvelle blessure ; 3e : mort.
  - Dépenser 1 héroïsme ignore la mise à l'agonie.
  - *Trompe la mort* ignore le résultat « mort » une fois par mission.
- Tests : `damage.test.ts` (chaque effet, ordre, colosse, bande), `woundTable`, `bandeTick`.

### Lot 5 — Fin de mission et progression
- Bouton MJ « Fin de mission », qui remplace le repos WoW pour une campagne Knight.
  - Remet au max PS, PA, PE et contacts ; recharge nods et grenades ; retire les cartes et les
    contacts temporaires.
  - Saisie des PX (identiques pour tous, barème p. 106 proposé) et des PG (par PJ). Les PG nourrissent
    `current` **et** `total`.
  - Annonce les évolutions d'armure et les paliers d'arsenal nouvellement débloqués.
- La fin de séance d'une campagne Knight ne touche plus aux champs WoW **[Q 30]**.
- **Dépense de PX** :
  - aspect = nouveau score × 5 (un seul aspect par mission) ; carac = nouveau score × 2 ;
  - plafonds : aspect 9, *Vétéran* 7, *Brute* Machine 5 ; *Soif d'apprendre* divise le coût par 2.
- **Motivations** : une mineure accomplie rend 1D6 d'espoir ; une majeure accomplie donne +25 au max et
  au courant ; jauge 50/100 optionnelle **[Q 28]**.
- Implant cybernétique (20 PG, −3 espoir max, 6 maximum) et reconstruction (100 PG) retirent des
  blessures.
- Tests : `xpCost`, `endOfMission`.

### Lot 6 — Assistant de création
- Parcours plein écran, une étape par écran : bases, archétype, 5 lames (2 avantages, 1 inconvénient),
  haut fait (prérequis contrôlés), blason, motivations, points bonus (option), armure, section (option),
  dérivées, 60 PG d'arsenal standard.
- `computeCreation(choices)` pur. Un bonus qui dépasserait l'aspect est perdu (p. 113) **[Q 13]**.
  Cas particuliers : Maison-Dieu (2 points d'aspect), Fou (6 points de carac), XIII et XVI
  incompatibles, *Amnésique* (avantages choisis par le MJ et masqués).
- Vérification : recalculer les 9 prétirés du livre (p. 136–168) en test.

### Lot 7 — Héroïsme avancé
- **Mode héroïque** à 6 points (4 avec *Chevalier véritable*).
  - Initiative max ; les jets des adjuvants s'ajoutent à celui du héros ; aucune dépense de PE.
  - Les réussites au-delà de la défense ou de la réaction s'ajoutent aux dégâts.
  - 5 PG à la fin.
- **Cartes du destin** (si le MJ les active) : 3 héroïsme pour tirer dans un paquet partagé par la
  campagne, cartes conservées sur la fiche, effets instantanés appliqués quand c'est mécanique
  (Empereur, Pendu, Pape, Ermite…) **[Q 26]**.
- **Entraide** : un PJ « aidant » lance une carac sans OD et ses réussites s'ajoutent au jet suivant
  de l'aidé (3 aidants maximum) **[Q 8]**.

### Lot 8 — Réglages de campagne
- `campaign.settings.knight` :
  - armures autorisées (avec ou sans suppléments) ;
  - paliers d'arsenal ;
  - lames choisies ou tirées ;
  - points bonus ; sections ; sacrifice de dés ; cartes du destin ;
  - PG de départ (60).
- Édition dans `CampaignOptionsSheet`. Les lots précédents lisent ces réglages avec les défauts du
  livre ; ce lot ne fait qu'ajouter l'édition.

### Hors périmètre pour l'instant
- Véhicules jouables, poursuites, armes improvisées et décor, chute, feu, noyade : le MJ arbitre à la
  main. Les véhicules entrent au catalogue en lecture seule **[Q 33]**.
- Bestiaire du Livre du MJ : rien à importer tant qu'il n'est pas fourni.

## 5. Vérification d'ensemble

- `npm test` vert à chaque lot (WoW et Knight).
- e2e : étendre `12-knight.spec.ts` lot par lot.
  - Lot 1 : initiative avec 3D6.
  - Lot 2 : activer une capacité baisse les PE.
  - Lot 4 : un PNJ prend des dégâts CdF → PA → PS.
  - Lot 5 : la fin de mission remet les jauges.
- `playtester` après les lots 2, 3 et 6, sur téléphone.
