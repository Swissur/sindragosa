# Personnage : caractéristiques, domaines, spécialités

Source : `docs/regles/Sindragosa.pdf` § 1.B et 5. Catalogue : `client/src/data/sindragosa/domains.ts`.

## Création

Le personnage naît vierge : aucun historique imposé, aucune compétence, aucune classe. Il est défini par ses actes, ses survies et ses échecs.

- Les 6 caractéristiques valent **2**, plus **+1** dans la caractéristique phare de la race (`races.md`).
- Tous les domaines sont au rang 0, sans spécialité.
- 20 PV, 2 points de chance.

## Hiérarchie

1. **6 caractéristiques** : le potentiel brut. Elles montent à la discrétion du MJ.
2. **5 domaines par caractéristique**, rang 0 à 5 : la réserve de base des jets.
3. **Spécialités** dans un domaine, 3 niveaux (Apprenti, Expert, Maître). Les joueurs peuvent en proposer d'autres.

Les spécialités suggérées ci-dessous sont celles qu'exigent les compétences (décidé le 2026-10-18) : un joueur qui suit une suggestion est sur la voie d'une compétence. Les domaines qu'aucune compétence ne cite gardent les exemples du livre de règles. Quelques noms sont équivalents (« Bouclier » = « Boucliers », « Furtivité » = « Discrétion dans l'ombre »…) : voir `SPECIALTY_ALIASES` dans `client/src/data/sindragosa/domains.ts`.

### Force (FOR)

Puissance physique, puissance musculaire et capacité à porter/imposer son poids.

| Domaine | Spécialités suggérées |
|---|---|
| Athlétisme | Lutte / Mains nues |
| Mêlée bourrine | Haches, Armes à deux mains, Masses, Exécution |
| Armures & boucliers | Boucliers, Armures de plaques |
| Intimidation physique | Provocation (Taunt), Posture imposante, Rugissement de guerre |
| Artisanat lourd | Extraction (Minage) |

### Agilité (AGI)

Coordination, réflexes, précision et vitesse de déplacement.

| Domaine | Spécialités suggérées |
|---|---|
| Acrobatie & Furtivité | Discrétion dans l'ombre, Esquive |
| Combat de précision | Dagues, Combat à deux armes, Poisons/Saignements, Lances/Bâtons, Tranchant/Perçant |
| Tir & Lancer | Armes à feu/Arcs, Lancer de Shurikens/Dagues, Lancer d'armes, Lances/Javelots |
| Escamotage & Crochetage | Désamorçage de pièges, Vol à la tire, Crochetage de coffres |
| Artisanat délicat | Ingénierie de précision, Travail du cuir, Dépeçage |

### Endurance (END)

Résistance physique, métabolisme, santé et vigueur globale.

| Domaine | Spécialités suggérées |
|---|---|
| Résistance physique | Résistance aux impacts, Endurcissement, Absorber les coups |
| Volonté & Récupération | Second souffle |
| Survie en milieu hostile | Climats extrêmes |
| Tolérance aux toxines | Résistance aux poisons, Tolérance à la Peste, Résistance aux maladies |
| Énergie & Souffle | Marche forcée, Apnée, Course de fond |

### Intelligence (INT)

Érudition, raisonnement logique, analyse et magie profane.

| Domaine | Spécialités suggérées |
|---|---|
| Magie profane & Arcanes | Sorts d'Arcane, Sorts de Feu, Téléportation, Chronomancie, Décryptage de langues/Runes |
| Explosifs & Ingénierie | Bricolage Goblino-Gnome, Explosifs |
| Histoire & Géographie d'Azeroth | Histoire des Titans, Géographie d'Outreterre, Runes anciennes |
| Tactique & Analyse | Analyse des failles |
| Médecine & Soins | Premiers secours, Traitement des malédictions, Sutures |

### Sagesse (SAG)

Intuition, perception, connexion spirituelle, magie divine et naturelle.

| Domaine | Spécialités suggérées |
|---|---|
| Perception & Sens | Pistage |
| Magie divine & Sacrée | Soins Sacrés |
| Communion naturelle & Chamanisme | Esprits des éléments, Forme animale, Magie de la Nature |
| Alchimie & Herboristerie | Découverte des plantes, Potions de soins, Fortifiants, Transmutation |
| Volonté spirituelle | — |

### Charisme (CHA)

Force de personnalité, leadership, illusion et magie de l'Ombre/Fél.

| Domaine | Spécialités suggérées |
|---|---|
| Persuasion & Diplomatie | Négociation diplomatique, Séduction, Conviction |
| Commandement & Inspiration | Cris de ralliement, Aura d'inspiration, Charisme de chef de guerre |
| Magie de l'Ombre & Fél | Malédictions, Sorts d'Ombre, Trait du Chaos |
| Négociation & Commerce | Lois du marché, Évaluation d'objets rares, Troc d'Hôtel des Ventes |
| Tromperie & Comédie | Réseau d'informateurs, Musique / Chant |

## Domaines avancés

- Un domaine avancé **s'ouvre** quand ses prérequis sont réunis (domaines de base ou autres domaines avancés), ou quand le personnage débloque la **compétence du même nom** (Ivresse du Combat, Danse des Lames). Ceux qui restent fermés ne s'affichent pas au joueur.
- Une fois ouvert, il part du rang 0 et **progresse comme un domaine** (mêmes paliers de coches).
- Son **jet** : la plus haute des caractéristiques liées à ses prérequis + son rang. Pas de spécialité.
- Prérequis de chacun : `client/src/data/sindragosa/domains.ts` (table du plan 31 § 7).

- Ivresse du Combat
- Tactique de Choc
- Danse des Lames
- Poisons & Toxines
- Nécromancie & Peste
- Maîtrise des Arcanes
- Magie du Givre & Altération
- Pyromancie
- Chronomancie
- Runes Anciennes
- Maîtrise des Éléments
- Astral & Céleste
- Lumière Vengeuse
- Discipline & Absolution
- Démonologie & Fél
- Malédictions & Affliction
- Magie du Vide
- Ingénierie Goblino-Gnome
- Élixirs Arcaniques
- Toxines Sauvages
- Dressage Sauvage
- Magie Draconique
