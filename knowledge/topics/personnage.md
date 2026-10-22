# Personnage : caractéristiques, domaines, spécialités

Règles telles que l'app les applique. Origine : `docs/regles/Sindragosa.pdf` § 1.B et 5. Catalogue : `client/src/data/sindragosa/domains.ts`.

## Création

Le personnage naît vierge : aucun historique imposé, aucune compétence, aucune classe. Il est défini par ses actes, ses survies et ses échecs.

- Les 6 caractéristiques valent **2**, plus **+1** dans la caractéristique phare de la race (`races.md`).
- Tous les domaines sont au rang 0, sans spécialité.
- 20 PV, 2 points de chance.
- Inventaire : ses **Poings**, arme naturelle équipée d'office (1 dégât, Athlétisme).

## Hiérarchie

1. **6 caractéristiques** : le potentiel brut. Elles montent à la discrétion du MJ.
2. **5 domaines par caractéristique**, rang 0 à 5 : la réserve de base des jets.
3. **Spécialités** dans un domaine de base, 3 niveaux (Apprenti, Expert, Maître). Un domaine en accueille **autant que son rang** (aucune au rang 0). Les joueurs peuvent en proposer d'autres que les suggestions. Effets des niveaux : `regles-jets.md`.

Les spécialités suggérées ci-dessous sont celles qu'exigent les compétences (décidé le 2026-10-18) : un joueur qui suit une suggestion est sur la voie d'une compétence. Les domaines qu'aucune compétence ne cite gardent les exemples du livre de règles.

Noms équivalents pour les prérequis : une spécialité écrite « A/B » ou « A (B) » accepte chacun des noms, et ces synonymes comptent pour la même spécialité (le premier est le nom affiché) :

- Boucliers = Bouclier
- Discrétion dans l'ombre = Furtivité
- Téléportation = Téléportation & Portails
- Armes à deux mains = Épées / Masses / Haches à deux mains
- Masses = Masse
- Forme animale = Formes animales druidiques
- Analyse des failles = Analyse des points faibles
- Poisons/Saignements = Poisons

**Spécialité offerte** : débloquer une compétence qui porte le nom d'une spécialité exigée ailleurs (Second souffle, Analyse des failles) donne cette spécialité au niveau Apprenti, en plus de la limite du domaine.

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

- Un domaine avancé **s'ouvre** quand ses prérequis sont réunis (domaines de base ou autres domaines avancés), sauf ceux qui portent le nom d'une **compétence** (Ivresse du Combat, Danse des Lames) : ils s'ouvrent seulement quand le personnage la débloque, et leurs prérequis ne servent plus qu'à choisir la carac du jet (décidé le 2026-10-18). Un rang donné par le MJ l'ouvre aussi. Ceux qui restent fermés ne s'affichent pas au joueur.
- Une fois ouvert, il part du rang 0 et **progresse comme un domaine** (mêmes paliers de coches).
- Son **jet** : la plus haute des caractéristiques liées à ses prérequis (en remontant ceux qui sont eux-mêmes avancés) + son rang. Pas de spécialité.

| Domaine avancé | Prérequis |
|---|---|
| Ivresse du Combat | Mêlée bourrine 2 + Volonté & Récupération 1 (s'ouvre par la compétence Ivresse du combat) |
| Tactique de Choc | Intimidation physique 2 + Tactique & Analyse 1 |
| Danse des Lames | Combat de précision 2 + Acrobatie & Furtivité 1 (s'ouvre par la compétence Danse des lames) |
| Poisons & Toxines | Escamotage & Crochetage 2 + Alchimie & Herboristerie 1 |
| Nécromancie & Peste | Mêlée bourrine 2 + Magie de l'Ombre & Fél 1 |
| Maîtrise des Arcanes | Magie profane & Arcanes 2 |
| Magie du Givre & Altération | Magie profane & Arcanes 2 |
| Pyromancie | Magie profane & Arcanes 2 |
| Chronomancie | Magie profane & Arcanes 3 + Histoire & Géographie 1 |
| Runes Anciennes | Magie profane & Arcanes 2 + Histoire & Géographie 2 |
| Maîtrise des Éléments | Communion naturelle & Chamanisme 3 |
| Astral & Céleste | Communion naturelle & Chamanisme 2 + Magie profane & Arcanes 2 |
| Lumière Vengeuse | Magie divine & Sacrée 3 + Commandement & Inspiration 1 |
| Discipline & Absolution | Magie divine & Sacrée 2 + Volonté spirituelle 2 |
| Démonologie & Fél | Magie de l'Ombre & Fél 2 |
| Malédictions & Affliction | Magie de l'Ombre & Fél 2 |
| Magie du Vide | Magie de l'Ombre & Fél 2 + Volonté spirituelle 1 |
| Ingénierie Goblino-Gnome | Explosifs & Ingénierie 2 |
| Élixirs Arcaniques | Alchimie & Herboristerie 2 + Magie profane & Arcanes 1 |
| Toxines Sauvages | Alchimie & Herboristerie 2 + Survie en milieu hostile 1 |
| Dressage Sauvage | Communion naturelle & Chamanisme 2 + Survie en milieu hostile 1 |
| Magie Draconique | Magie profane & Arcanes 3 + Histoire & Géographie 2 |

**Artisanats avancés** (décidé le 2026-10-18) : chacun des 20 métiers hybrides est aussi un domaine avancé. Il s'ouvre quand l'une de ses deux compétences est débloquée ; ses prérequis (ceux de ces deux compétences) ne servent qu'à choisir la carac du jet. Liste et patrons : `artisanat.md`.
