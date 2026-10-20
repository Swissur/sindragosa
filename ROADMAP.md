# Roadmap — Sindragosa

Sindragosa est un **JDR maison inspiré de World of Warcraft**, joué en réserves de d6. L'app a quitté les Terres d'Arran (Chroniques Oubliées) le 2026-10-17. Le travail se fait sur la branche `refonte-sindragosa`.

**Source des règles** : les 3 PDF de `docs/regles/` ont servi de base. Depuis, l'app et les décisions de `plans/` priment (voir `CLAUDE.md`). Analyse des écarts et questions de départ : `plans/31-refonte-regles-sindragosa.md`.

## Reste à faire

### Règles à définir

On ne touche pas aux mécaniques concernées tant que ces points ne sont pas définis.

- [ ] **Ressources de classe** citées par les compétences : Énergie, Rage, Ferveur, Focalisation, Points de Combo, Puissance Runique / Sacrée / Céleste, Éclats d'Âme, Charges Arcaniques, Fureur démoniaque, Insalubrité. La mana est tranchée (plan 40), pas les autres.
- [ ] **Classes émergentes** : liste des titres, des combinaisons de compétences et des hauts-faits. En attendant, le MJ accorde les titres à la main.

### À calibrer en jeu

- [ ] **Bestiaire** : l'échelle des dégâts (÷ 2) et l'armure par catégorie sont des hypothèses, à recaler après un premier combat test.
- [ ] **Dégâts des armes** : légère 2, une main 3, deux mains 5, naturelle 1 (plan 35, plan 39).

### Divers

- [ ] **Hébergement NAS** (plan 36) : reste le test temps réel (étape 7) et la copie hors NAS par Hyper Backup.
- [ ] **Lore** : il s'arrête au début de World of Warcraft (fin du PDF). Régions et extensions à ajouter avec `/add-knowledge`.

## Fait

| Chantier | Plan | Date |
|---|---|---|
| Analyse des écarts, nouveau schéma de personnage, moteur de règles d6 | 31 | 2026-10-17 |
| Fiche, jets en d6, outils du MJ | 31, 32 | 2026-10-17 |
| Bestiaire (211 monstres) et combat en opposition | 33 | 2026-10-18 |
| Knowledge : purge d'Arran, règles et lore de Sindragosa | — | 2026-10-18 |
| Équipement : objets typés, armes et armures équipées, AP | 35 | 2026-10-18 |
| Hébergement NAS, étapes 1 à 6 | 36 | 2026-10-18 |
| Favoris dans la fiche, fin de la page Mes actions | 37 | 2026-10-19 |
| Composants d'artisanat : de la récolte au patron | 38 | 2026-10-19 |
| Les compétences qui attaquent lancent leur jet, armes naturelles, transformations | 39 | 2026-10-19 |
| Mana et concentration des sorts | 40 | 2026-10-19 |
| États : 17 états en d6, durée en tours | 42 | 2026-10-19 |
| Bestiaire : plus aucun vocabulaire d20 (« L'hallali » réécrite) | 33 | 2026-10-19 |

Abandonné : la refonte des écrans d'après `docs/ecrans.excalidraw` (maquettes obsolètes, fichier supprimé le 2026-10-18).

## Décisions

### Le système

- **Pas de voies, de profils ni de classes au départ.** Le personnage naît vierge : aucun historique imposé, aucune compétence, aucune classe. Les personnages d'Arran ont été supprimés.
- **Hiérarchie** : 6 Caractéristiques (Force, Agilité, Endurance, Intelligence, Sagesse, Charisme) → 5 **Domaines** par caractéristique (rang 0 à 5) → **Spécialités** dans un domaine (Apprenti, Expert, Maître). Médecine & Soins est sous Intelligence, Volonté spirituelle sous Sagesse, Alchimie & Herboristerie sous Sagesse seulement. Les joueurs peuvent proposer d'autres spécialités.
- **Noms des domaines** (validés le 2026-10-19) : ceux de `Sindragosa.pdf` font foi ; les variantes des autres PDF sont des alias (table du plan 31 § 6), résolus dans les prérequis des compétences.
- **Caractéristiques** : à 2 à la création, puis à la main du MJ, sans coches (boutons + / − sur la fiche). « Dextérité » a disparu partout (DEX → AGI).
- **Jets en réserve de d6** : dés = caractéristique + rang du domaine (+ bonus de spécialité). Un 5 ou un 6 = 1 succès. Seuils : 1 facile, 2 moyen, 3 difficile, 4+ exploit. Échec critique : aucun succès et au moins un 1.
- **Critiques** : seul un 6 est une réussite critique, et aussi le 5 si le jet utilise une spécialité Maître.
- **Avantage** +1d6, **désavantage** −1d6. **Points de chance** : 2 par séance, chacun ajoute +1d6.
- **Progression par coches** :
  - un domaine passe au rang suivant après 2, 3, 4, 5 puis 6 coches ;
  - un niveau de spécialité coûte 2 coches ;
  - 3 coches au maximum par séance ;
  - nombre de spécialités dans un domaine ≤ rang de ce domaine.
- **PV** : 20 au départ, +2 par rang dans un domaine de Force ou d'Endurance, +5 par rang en Résistance physique, +8 par point d'Endurance.
- **Repos** : court, long et séance remettent les usages à zéro (plan 31 § 6). « 1/jour » = une fois par repos long. Le repos long rend tous les PV ; il n'y a plus de points de récupération ni de dé de vie.
- **Races WoW** : 6 pour l'Alliance, 6 pour la Horde. Chacune donne +1 à une caractéristique et un pouvoir racial, utilisable une fois par repos court (le PDF dit 1/jour ; changé le 2026-10-19).
- **Choc Martial du Tauren** (2026-10-19) : le PDF demande un jet d'« Athlétisme/Équilibre », qui n'existe pas. La cible résiste au choix par Athlétisme (FOR) ou Acrobatie & Furtivité (AGI), avec au moins 2 succès.

### Combat

- **Opposition** : initiative = Agilité + Sagesse + Perception & Sens ; marge = succès de l'attaque − succès de la défense (parer ou esquiver) ; dégâts = dégâts de l'arme + marge − armure.
- **Parade** : avec le domaine de l'arme tenue (Mêlée bourrine pour une hache, Combat de précision pour une dague), plus la spécialité de cette arme si on l'a.
- **AP (Armure Physique)** : pas de valeur de base ; armures équipées + bonus des compétences (plan 35).
- **Armes** : objets de l'inventaire, dégâts fixes selon le gabarit, plus un bonus (plan 35). Mains nues et armes naturelles, transformations (plan 39).
- **Types d'action** : à son tour, une action Rapide et une action de Mouvement, ou une action Complète à la place des deux. Les compétences « Gratuite » et « Réaction » gardent leur texte.
- **Déplacement** : 6 m de base, sauf compétence ou pouvoir racial.
- **Agonie** : garde le jet de mort d'Arran au d20, 3 succès / 3 échecs (décidé le 2026-10-18).

### Magie

- Ni innée, ni acquise à la création : elle s'apprend en jeu, et chaque sort décrit son usage.
- **Mana** (plan 40) : jauge = plus haute carac entre INT, SAG et CHA + rangs dans les domaines magiques ; repos court +⅓, repos long plein ; chaque sort coûte de 1 à 5.
- **Concentration** (plan 40) : Économe = coût −⅓ (toujours au moins 1), Étendue = portée ou durée ×2, Puissante = +1d6 au jet de domaine (pas sur les sorts sans jet).

### Compétences et domaines avancés (2026-10-18)

- **Compétences débloquées automatiquement** quand le personnage remplit leurs prérequis. Toutes (490) demandent au moins un domaine de base.
- **À l'aveugle** : le joueur ne voit que ses compétences débloquées. Le catalogue complet (verrouillées, prérequis) reste visible du MJ.
- **Domaines avancés** : chacun s'ouvre par ses prérequis (table du plan 31 § 7) ou par la compétence du même nom (Ivresse du Combat, Danse des Lames). Son jet prend la plus haute des caractéristiques liées.
- **Spécialités homonymes** : débloquer une compétence qui porte le nom d'une spécialité exigée la donne au niveau Apprenti, hors limite de spécialités (« Analyse des failles »).
- **Spécialités d'exemple** : celles qu'exigent les compétences ; les 13 domaines qu'aucune compétence ne cite gardent les exemples du livre. Une table d'équivalences (« Bouclier » = « Boucliers »…) garantit que chaque spécialité exigée est atteignable (testé).
- **Titres** : seul le MJ en accorde, parmi les 22 titres qu'exigent les compétences, ou un autre. Le serveur refuse qu'un joueur modifie ses titres.

### Héritage d'Arran conservé

- Repos du groupe lancé par le MJ, avec un bilan pour chaque joueur.
- Moment critique partagé, adapté aux critiques du d6.
- Monnaie : 1 or = 10 argent = 100 cuivre.
- Monstres : renforts en réserve, PV visibles du MJ seul. Jets cachés du MJ.
