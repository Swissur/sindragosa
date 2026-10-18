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
3. **Spécialités** dans un domaine, 3 niveaux (Apprenti, Expert, Maître). Celles ci-dessous sont des exemples : les joueurs peuvent en proposer d'autres.

### Force (FOR)

Puissance physique, puissance musculaire et capacité à porter/imposer son poids.

| Domaine | Spécialités d'exemple |
|---|---|
| Athlétisme | Escalade, Saut, Natation, Brutalité |
| Mêlée bourrine | Masses à deux mains, Haches, Boucliers, Lutte à mains nues |
| Armures & boucliers | Armures de plaques, Mailles, Maintien de posture |
| Intimidation physique | Provocation (Taunt), Posture imposante, Rugissement de guerre |
| Artisanat lourd | Forgerie, Extraction (Minage), Port de charges lourdes |

### Agilité (AGI)

Coordination, réflexes, précision et vitesse de déplacement.

| Domaine | Spécialités d'exemple |
|---|---|
| Acrobatie & Furtivité | Discrétion dans l'ombre, Course sur les toits, Esquive |
| Combat de précision | Dagues, Épées à une main, Combat à deux armes |
| Tir & Lancer | Arcs, Arbalètes, Armes à feu, Lancer de shurikens |
| Escamotage & Crochetage | Désamorçage de pièges, Vol à la tire, Crochetage de coffres |
| Artisanat délicat | Ingénierie de précision, Travail du cuir, Dépeçage |

### Endurance (END)

Résistance physique, métabolisme, santé et vigueur globale.

| Domaine | Spécialités d'exemple |
|---|---|
| Résistance physique | Résistance aux impacts, Endurcissement, Absorber les coups |
| Volonté & Récupération | Second souffle, Méditation, Détermination |
| Survie en milieu hostile | Orientation, Campement sauvage, Piste de chasse |
| Tolérance aux toxines | Résistance aux poisons, Tolérance à la Peste, Résistance aux maladies |
| Énergie & Souffle | Marche forcée, Apnée, Course de fond |

### Intelligence (INT)

Érudition, raisonnement logique, analyse et magie profane.

| Domaine | Spécialités d'exemple |
|---|---|
| Magie profane & Arcanes | Sorts d'Arcane, Conjuration, Téléportation & Portails |
| Explosifs & Ingénierie | Bricolage Goblino-Gnome, Explosifs, Rétro-ingénierie |
| Histoire & Géographie d'Azeroth | Histoire des Titans, Géographie d'Outreterre, Runes anciennes |
| Tactique & Analyse | Analyse des points faibles, Stratégie de siège, Décryptage de langues |
| Médecine & Soins | Premiers secours, Traitement des malédictions, Sutures |

### Sagesse (SAG)

Intuition, perception, connexion spirituelle, magie divine et naturelle.

| Domaine | Spécialités d'exemple |
|---|---|
| Perception & Sens | Vigilance, Détection du camouflage, Pistage, Sensibilité à la Mana |
| Magie divine & Sacrée | Lumière sacrée, Bénédictions, Exorcisme |
| Communion naturelle & Chamanisme | Esprits des éléments, Esprits des ancêtres, Formes animales druidiques |
| Alchimie & Herboristerie | Découverte des plantes, Potions de soins, Fortifiants, Transmutation |
| Volonté spirituelle |  |

### Charisme (CHA)

Force de personnalité, leadership, illusion et magie de l'Ombre/Fél.

| Domaine | Spécialités d'exemple |
|---|---|
| Persuasion & Diplomatie | Négociation diplomatique, Séduction, Conviction |
| Commandement & Inspiration | Cris de ralliement, Aura d'inspiration, Charisme de chef de guerre |
| Magie de l'Ombre & Fél | Démonologie, Magie du Vide, Malédictions, Manipulation mentale |
| Négociation & Commerce | Lois du marché, Évaluation d'objets rares, Troc d'Hôtel des Ventes |
| Tromperie & Comédie | Déguisement, Usurpation d'identité, Bobards & Bluff |

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
