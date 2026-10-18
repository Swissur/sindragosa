# Roadmap — Sindragosa

## Refonte Sindragosa : nouveau jeu, nouvelles règles (décidée le 2026-10-17)

Sindragosa n’est plus un outil pour les Terres d’Arran (Chroniques Oubliées). C’est un **JDR maison inspiré de World of Warcraft**, avec ses propres règles. L’application est à retravailler entièrement autour de ce système.

**Source des règles** : `Sindragosa.pdf` (version incomplète, fournie le 2026-10-17). Elle sert de base ; les trous seront comblés au fil de l’eau.

### Décisions

- **Plus de voies, plus de profils ni de classes au départ.** Le personnage naît vierge : aucun historique imposé, aucune compétence, aucune classe.
- **Nouvelle hiérarchie** : 6 Caractéristiques (Force, Agilité, Endurance, Intelligence, Sagesse, Charisme) → 5 **Domaines** par caractéristique (rang 0 à 5) → **Spécialités** dans un domaine (Apprenti, Expert, Maître). Les spécialités du PDF sont des exemples : les joueurs peuvent en proposer d’autres.
- **Jets en réserve de d6** : nombre de dés = caractéristique + rang du domaine (+ bonus de spécialité). Un 5 ou un 6 = 1 succès. Seuils : 1 facile, 2 moyen, 3 difficile, 4+ exploit. Échec critique : aucun succès et au moins un 1. Il remplace le d20 + modificateur.
- **Progression par coches**, et non plus par niveaux :
  - un domaine passe au rang suivant après 2, 3, 4, 5 puis 6 coches ;
  - un niveau de spécialité coûte 2 coches ;
  - 3 coches au maximum par séance ;
  - nombre de spécialités dans un domaine ≤ rang de ce domaine.
- **PV** :
  - 20 au départ ;
  - +2 par rang dans un domaine de Force ou d’Endurance ;
  - +5 par rang en Résistance physique ;
  - +8 par point d’Endurance.
- **Combat en opposition** :
  - initiative = Agilité + Sagesse + Perception & Sens ;
  - marge = succès de l’attaque − succès de la défense (parer ou esquiver) ;
  - dégâts = dégâts de l’arme + marge − armure.
- **Magie** : ni innée, ni acquise à la création. Elle s’apprend en jeu, et chaque sort décrit son propre usage.
- **Races WoW** : 6 pour l’Alliance, 6 pour la Horde. Chacune donne +1 à une caractéristique et un pouvoir racial utilisable une fois par jour.
- **Classes émergentes** : un titre se débloque quand le personnage atteint une combinaison de compétences et accomplit un haut-fait. Pas de choix de classe à la création.
- **Lore** : on quitte Arran pour **World of Warcraft**. Tous les fichiers de `knowledge/` (règles et lore d’Arran) sont à effacer et à remplacer par les règles et le lore de Sindragosa.
- **Bestiaire conservé**, mais réorganisé pour le nouveau système : les statistiques façon CO (NC, DEF, d20) doivent devenir des caractéristiques, des domaines, une armure et des dégâts compatibles avec les réserves de d6.
- **Caractéristiques à la main du MJ** : elles montent à la discrétion du MJ, sans coches. Leur valeur se règle directement sur la fiche (boutons + / −).
- **Critiques** (confirmé le 2026-10-17) : un 5 ou un 6 reste un succès. Seul un 6 compte comme réussite critique. Le 5 compte aussi comme critique si le jet utilise une spécialité au niveau Maître.
- **Agilité partout** : le terme « Dextérité » disparaît de tout le système (règles, fiche, code, abréviation DEX → AGI).
- **Domaines, compétences, repos, artisanat, sort des mécaniques d’Arran** (tranchés le 2026-10-17) : voir `plans/31-refonte-regles-sindragosa.md` § 6. En bref :
  - 5 domaines par carac (Médecine & Soins passe sous Intelligence, Volonté spirituelle s’ajoute sous Sagesse) ;
  - caracs à 2 à la création ;
  - compétences débloquées automatiquement ;
  - points de chance : 2 par séance, et chacun ajoute +1d6 ;
  - avantage +1d6, désavantage −1d6 ;
  - personnages existants supprimés.
- [ ] **Concentration des sorts** (Économe / Étendue / Puissante) : gardée, mais à adapter au système d6. Aujourd'hui, un sélecteur s'affiche sur les compétences de magie actives. « Puissante » monte les dés de l'effet. « Économe » n'a plus d'effet, faute de PM.
- [x] **Fiche, Mes actions, jets en d6, outils du MJ** (plan 31, étapes 4 à 6 ; plan 32) : faits le 2026-10-17 sur la branche `refonte-sindragosa`.
- [x] **Bestiaire et combat** (plan 31, étapes 7 et 8 ; plan 33) : 211 monstres convertis au d6, faits le 2026-10-18.
- [ ] **Bestiaire à calibrer** après un premier combat test : l'échelle des dégâts (÷ 2) et l'armure par catégorie sont des hypothèses.
- [ ] **« L'hallali » du Worg** : une plage « 1 à 5 au d20 » sans équivalent d6, à réécrire.

### TODO — retours du 2026-10-17

- [x] **Favoris depuis la fiche** : une étoile sur chaque domaine (onglet Domaines) et sur chaque compétence débloquée. Les favoris sont partagés avec Mes actions. Fait le 2026-10-18.
- [x] **Compétences à l'aveugle** : le joueur ne voit que ses compétences débloquées, dans l'onglet Domaines avancés, section « Compétences ». Le catalogue complet (verrouillées, prérequis) reste visible du MJ dans la fiche d'un membre. Fait le 2026-10-18.
- [x] **Onglets de la fiche** : Héros / Domaines / Domaines avancés. Le dernier regroupe domaines avancés, titres et compétences. Fait le 2026-10-18.
- [ ] **Prérequis des compétences** : audit fait le 2026-10-18, décisions à prendre.
  - Toutes les compétences (490) demandent au moins un domaine de base ; aucune n'est débloquée d'office. 281 ne demandent que des domaines de base.
  - [x] **Domaines avancés atteignables** (tranché le 2026-10-18) : chacun s'ouvre par ses prérequis (domaines de base ou avancés, table du plan 31 § 7) ou par la compétence du même nom (Ivresse du Combat, Danse des Lames). Son jet prend la plus haute des caractéristiques liées. Les 121 compétences qui en exigent un sont donc atteignables.
  - [x] **Spécialités homonymes** (tranché le 2026-10-18) : débloquer une compétence qui porte le nom d'une spécialité exigée la donne au niveau Apprenti, hors limite de spécialités. Concerne « Analyse des failles » (#60, rattachée à Tactique & Analyse) ; « Second souffle » est déjà une spécialité d'exemple de Volonté & Récupération.
  - [x] **Spécialités d'exemple** (tranché le 2026-10-18) : les suggestions de chaque domaine sont désormais les spécialités qu'exigent les compétences ; les 11 domaines qu'aucune compétence ne cite gardent les exemples du livre. Une table d'équivalences (« Bouclier » = « Boucliers »…) et la lecture des alternatives « A/B » et « (A/B) » garantissent que chaque spécialité exigée est atteignable (testé).
  - **22 titres** sont exigés (26 compétences), sans liste officielle : le MJ les tape à la main dans ses outils, au risque d'une faute de frappe. Une liste de titres dans les outils du MJ éviterait ça.
- [ ] **Prérequis des domaines avancés** : à proposer (déduits des compétences), puis à valider.

### TODO — termes utilisés par les règles mais pas encore définis

On ne touche pas aux mécaniques tant que ces points ne sont pas définis.

- [ ] **RP = Résistance Psychique** (nom donné par l’artisanat) : quel maximum, comment la perd-on, à quoi sert-elle ?
- [ ] **AP = Armure Physique** (nom donné par l’artisanat, apportée par l’équipement) : est-ce la somme des pièces portées ? Y a-t-il une valeur de base ?
- [ ] **Ressources de classe** citées par les compétences : Énergie, Rage, Ferveur, Focalisation, Points de Combo, Puissance Runique / Sacrée / Céleste, Éclats d’Âme, Charges Arcaniques, Fureur démoniaque, Insalubrité.
- [ ] **Repos court / repos long / séance** : ce sont les unités qui remettent les usages à zéro.
- [ ] **Noms de domaines** différents d’un PDF à l’autre : liste à valider dans `plans/31-refonte-regles-sindragosa.md` § 6.
- [ ] **Mana / Énergie** : existe-t-il une réserve de mana ou d’énergie ? Comment se calcule-t-elle et se récupère-t-elle ?
- [ ] **Types d’action** : Action Rapide, Action Complète, Action Gratuite, Réaction. Combien par tour ?
- [ ] **Déplacement** : vitesse de base en mètres (les pouvoirs raciaux parlent de « +3 m », « double sa vitesse », « 8 m »)
- [ ] **« 1/jour »** : qu’est-ce qu’un jour en jeu ? (repos, séance, jour narratif)
- [ ] **États** : Étourdissement, Enracinement, Peur, Sommeil, Charme, Silence, Saignement, Poison, Maladie, À terre. Liste officielle et effets.
- [ ] **Jet « Athlétisme/Équilibre »** (pouvoir du Tauren) : Équilibre n’est pas un domaine.
- [ ] **Parade « Force + Armes de Contact »** : le domaine « Armes de Contact » n’existe pas. Est-ce Mêlée bourrine ? Combat de précision ?
- [ ] **Alchimie & Herboristerie** : présente sous Intelligence **et** sous Sagesse. Doublon voulu ?
- [ ] **Dégâts des armes** : valeur fixe ou dés ? Catalogue d’armes ?
- [ ] **Classes émergentes** : liste des titres, des combinaisons de compétences et des hauts-faits.
- [ ] **Récapitulatif d’équilibre par race** : il donne « Troll » alors que la fiche raciale dit « Trolle ». Harmoniser le nom.

### Mécaniques de l’app actuelle (Arran) absentes des règles Sindragosa

L’app gère déjà ces mécaniques, héritées d’Arran / Chroniques Oubliées. Pour chacune, il faudra décider : **garder** (et l’écrire dans les règles), **adapter** au d6, ou **retirer**.

| Mécanique dans l’app | Où (code) | Piste |
|---|---|---|
| **Points de magie (PM)** et coût des sorts | fiche, Mes actions, `useSpellCast` | Lien avec Mana / Énergie (TODO) |
| **Concentration des sorts** : Économe (−2 PM), Étendue, Puissante (dés plus forts) | `utils/concentration.ts` | Bonne idée à adapter au d6 |
| **Points de chance (PC)** : relancer un jet ou +10 au résultat | Mes actions | Adapter : relancer les dés ratés ? |
| **Points de récupération (PR) + dé de vie** : se soigner hors combat | `useRest`, modale Repos | Reste à décider |
| **Repos du groupe** (long / complet), lancé par le MJ, avec bilan pour chaque joueur | `campfire/`, `RestSummaryModal` | Garder : peut porter le « 1/jour » |
| **Agonie** : jets de mort à 0 PV (3 succès / 3 échecs) | `AgonieModal` | Adapter au d6 |
| **États** (13 : Aveuglé, Affaibli, Étourdi, Immobilisé, Paralysé, Ralenti, Renversé, Surpris, Désarmé, Bloqué, Repoussé, Diversion, Menacé) | `data/etats.ts`, combat | Fusionner avec les états des règles (TODO) |
| **Défense fixe (DEF)** | fiche, combat | Remplacée par l’opposition parer / esquiver |
| **Bonus d’attaque contact / distance / magique** | `attackBonus.ts` | Remplacés par carac. + domaine |
| **Armures et boucliers** : catalogue, malus d’initiative | `armorsCatalog`, fiche Combat | À relier à l’AP (TODO) |
| **Formations martiales** (familles d’armes autorisées) | fiche Combat | Remplacées par les spécialités d’armes ? |
| **Catalogue d’armes** : dés de dégâts, portée, caractéristique de dégâts | `weaponsCatalog` | À garder pour les dégâts d’arme (TODO) |
| **Combat à deux armes** (main directrice / main faible) | `useDualWield` | Spécialité « Combat à deux armes » |
| **Avantage** : lancer 2 dés et garder le meilleur, accordé par des passifs | jets, `usePathEffects` | Adapter : +1d6 ? |
| **Passifs et effets de voie** qui modifient la fiche | `useSheetEffects`, `usePathEffects` | À remplacer par les effets de spécialité / pouvoirs raciaux |
| **Capacités typées** : Attaque, Limitée, Gratuite, coût en PM | Mes actions, badges | Lien avec les types d’action (TODO) |
| **Talents magiques** des profils mystiques | `mysticTalents` | Remplacés par la magie apprise en jeu |
| **Niveaux et montée de niveau**, croissance des PV par niveau | modales Montée en niveau, Progression des PV | Remplacées par les coches et la formule de PV |
| **Moment critique** : animation quand on fait un 20 ou un 1 | `useCriticalMoment` | Adapter : réussite / échec critique du d6 |
| **Initiative modifiée par l’armure** | `characterStats` | Remplacée par Agilité + Sagesse + Perception & Sens |
| **Monnaie** (po / pa / pc) et inventaire | Inventaire | Garder (monnaie WoW : or / argent / cuivre) |
| **Monstres** : NC, renforts en réserve, PV visibles du MJ seul | Rencontres, Combat | Garder la mécanique, convertir les stats |
| **Jets cachés du MJ** (visibles par lui seul) | log des jets | Garder |

### Chantiers

1. **Analyse** : écart entre les règles Sindragosa et le modèle actuel (fiche, combat, jets, données).
2. **Base de données** : nouveau schéma de personnage (caractéristiques, domaines, spécialités, coches, pouvoir racial), plus migrations. Les voies et profils disparaissent.
3. **Moteur de règles** (`client/src/utils`) : jets en d6, calcul des PV, initiative, résolution d’attaque, progression. Le tout avec des tests unitaires.
4. **Fiche personnage et Mes actions** : refaites autour des domaines et spécialités.
5. **Combat** : initiative, opposition attaque/défense, dégâts.
6. **Bestiaire** : conversion des monstres au nouveau format.
7. ~~**Knowledge** : purge d’Arran, intégration des règles et du lore Sindragosa / WoW.~~ Fait le 2026-10-18. Le lore s’arrête au début de World of Warcraft (fin du PDF) : régions et extensions à ajouter avec `/add-knowledge`.
8. ~~**UI** : refonte des écrans à partir des wireframes `docs/ecrans.excalidraw`.~~ Abandonnée le 2026-10-18 (maquettes obsolètes, fichier supprimé).

### Sources

- `Sindragosa.pdf` (règles de base), `Compétences & Domaines (Sindragosa).pdf` (~490 compétences), `Artisanat (Sindragosa).pdf` (24 métiers et leurs patrons). Tous reçus le 2026-10-17, à versionner dans `docs/regles/`.
- Analyse des écarts, schéma proposé, découpage et questions ouvertes : **`plans/31-refonte-regles-sindragosa.md`**.

---

*Phases A à C ci-dessous : feuille de route historique (Terres d’Arran), déjà réalisée pour l’essentiel.*

## Phase A — Données persistées et comptes utilisateurs

### Base PostgreSQL

- Intégrer **PostgreSQL** au monorepo (schéma versionné, migrations, configuration dev/prod).
- Connexion sécurisée depuis l’API Node ; variables d’environnement pour l’URL et les secrets.

### Authentification et provisioning

- **Connexion** : identifiant / mot de passe **classiques** (pas d’OAuth ni de fournisseur tiers prévu dans cette roadmap).
- **Lien de préremplissage** : possibilité d’ouvrir l’app avec des **valeurs préremplies** via l’URL (ex. nom d’utilisateur ou paramètres convenus), pour que le joueur n’ait qu’à saisir son mot de passe — le lien est **distribué manuellement** par le MJ (WhatsApp, autre canal).
- **Création des comptes** : **aucune** inscription ni création d’utilisateur dans l’interface. Les utilisateurs sont **créés hors ligne** via un **script Node** (opérateur / machine de déploiement), qui insère les enregistrements en base (hash du mot de passe, etc.).

### Modèle utilisateur et personnages

- Table **`user`** avec identifiants et secrets gérés comme ci‑dessus.
- Chaque utilisateur possède **plusieurs personnages** (relation 1–N).
- Un des personnages est marqué comme **personnage actif** : c’est celui utilisé par défaut lorsqu’il **rejoint une session** et lors des échanges avec **Isilwen** (assistant IA), tant qu’aucun autre contexte de personnage n’est imposé par la session.

### Persistance de la fiche

- Faire migrer la fiche (PV/PM, caractéristiques, compétences, attaques, voies, etc.) du **localStorage seul** vers le **modèle serveur** lié aux personnages, en conservant une expérience fluide hors ligne si souhaité (stratégie de sync : ultérieure).

---

## Phase B — Sessions de jeu et rôles

*(Comportement métier ci‑dessous ; la **persistance** des sessions en PostgreSQL pourrait s’ajouter quand la Phase A sera en place — aujourd’hui : mémoire.)*

### Diffusion des mises à jour (SSE)

- Les **changements d’état de la session** (combat, initiative, participants, etc.) doivent être **envoyés aux clients** via **SSE** (*Server-Sent Events*, événements temps réel) : chaque joueur connecté reçoit les mises à jour sans recharger la page ni s’appuyer sur du polling pour l’essentiel de la synchronisation.

### Création et adhésion

- Un utilisateur peut **créer une session** ; il devient le **MJ (GM)** de cette session.
- Les joueurs peuvent **lister les sessions en cours** et **rejoindre** une session (code, lien, ou liste selon le choix produit).

### Combat partagé (vue MJ / joueurs)

- Dans une session, le MJ peut **ajouter des monstres au combat** avec leurs **PV**.
- **Visibilité des PV** :
  - **MJ** : voit les PV des monstres (et gère le combat côté ennemis).
  - **Joueurs** : ne voient **pas** les PV des monstres.
  - **Joueurs** : peuvent voir les **PV des autres joueurs** (personnages des participants), pour le suivi de table.

### Initiative et ordre de tour

- Chaque joueur peut **modifier la valeur d’initiative** de son personnage (dans les limites prévues par les règles / l’UI).
- **Tous** voient l’**ordre de jeu** (personnages + monstres) dérivé de l’initiative, sur un **écran adapté mobile** (responsive, utilisable au téléphone en partie).

---

## Phase C — Interface joueur : onglets Combat et Personnage

Pour chaque participant connecté à une session :

- **Onglet « Combat »**  
  - Affiche le **combat en cours** : ordre d’initiative, état visible selon les règles de visibilité ci-dessus, contexte de la rencontre (selon ce que le MJ partage).

- **Onglet « Personnage »**  
  - Affiche la **fiche du personnage** du joueur : **PV**, **caractéristiques**, **voies de profil**, **attaques** et **compétences** disponibles — aligné sur le modèle Chroniques Oubliées / Terres d’Arran déjà présent dans l’app.

---

## Transversal

- **Isilwen** : lier le contexte chat au **personnage actif** (et éventuellement à la **session** / campagne) pour des réponses plus pertinentes.
- **Sécurité** : autorisation stricte (seul le MJ modifie monstres/PV cachés ; chaque joueur ne modifie que ses données autorisées).
- **Temps réel** : aujourd’hui **SSE** pour pousser les événements aux clients connectés à une session ; WebSocket ou autre n’est pas nécessaire tant que le modèle unidirectionnel suffit.

---

## Hors scope explicite (pour l’instant)

- **Inscription ou création de compte** par les joueurs dans l’app (remplacée par le script Node + liens manuels).
- Parsing automatique du PDF des règles (le corpus reste manuel dans `knowledge/`).
- RAG / embeddings pour la Q&A (hors roadmap courte ci-dessus).

---

*Dernière mise à jour : mars 2026 — à synchroniser avec `docs/PLAN.md` et `AGENTS.md` lorsque des phases sont livrées.*
