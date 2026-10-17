# 31 — Refonte des règles : de Chroniques Oubliées à Sindragosa

Analyse des écarts entre l'app actuelle (moteur Arran / CO) et les règles Sindragosa, puis proposition de schéma et de découpage. Décisions de cadrage : voir `ROADMAP.md`, section « Refonte Sindragosa ».

## 0. Sources

| Document | Contenu | Statut |
|---|---|---|
| `Sindragosa.pdf` | Règles de base : d6, création, coches, magie, combat, domaines, races, lore WoW | reçu le 2026-10-17, incomplet |
| `Compétences & Domaines (Sindragosa).pdf` | ~490 compétences débloquables, avec prérequis, type d'action, condition, effet | reçu le 2026-10-17 |
| `Artisanat (Sindragosa).pdf` | 4 métiers de base (5 rangs × 10 patrons) + 20 métiers hybrides (5 patrons chacun) | reçu le 2026-10-17 |

**À faire avant tout code** : versionner ces PDF dans `docs/regles/`. C'est la référence, et la seule copie complète.

## 1. Ce que les deux nouveaux documents ajoutent

### Compétences débloquables

Chaque compétence a :
- des **prérequis** : 2 ou 3 éléments parmi un domaine à un rang donné, une spécialité à un niveau donné, un **domaine avancé** à un rang donné, un **titre** ;
- un **type d'action** : Complète, Rapide, Gratuite, Réaction, Passif (dont aura et posture), Hors combat, Dialogue ;
- une **condition d'activation** : position, état de la cible, seuil de PV, équipement requis, ressource consommée ;
- des **limites d'usage** : recharge en tours, 1 fois par combat, par repos court, par repos long, par séance, par scénario ou par campagne ;
- un **effet** : dés en plus ou en moins, dégâts, soin, état appliqué, durée en tours.

Les premières compétences ont des prérequis sans rang : « (2) » suivi de deux domaines. Plus loin, les rangs sont explicites (« Mêlée bourrine Rang 3 »).

### Notions nouvelles par rapport à `Sindragosa.pdf`

- **Domaines avancés**, un niveau au-dessus des domaines : Ivresse du Combat, Tactique de Choc, Danse des Lames, Poisons & Toxines, Nécromancie & Peste, Maîtrise des Arcanes, Magie du Givre & Altération, Pyromancie, Chronomancie, Runes Anciennes, Maîtrise des Éléments, Astral & Céleste, Lumière Vengeuse, Discipline & Absolution, Démonologie & Fél, Malédictions & Affliction, Magie du Vide, Ingénierie Goblino-Gnome, Élixirs Arcaniques, Toxines Sauvages, Dressage Sauvage, Magie Draconique.
- **Titres** (les classes émergentes), cités comme prérequis : Saigneur de la Nuit, Chevalier de la Mort, Archimage, Grand Chaman, Mangeur de Totems, Archidruide, Paladin du Sacré, Séraphin, Démoniste du Conseil, Pénitent du Vide, Maître Ingénieur, Maître Bricoleur, Maître Forgeron, Maître Démolisseur, Protecteur d'Azeroth, Inflexible, Colosse, Ambassadeur, Capitaine, Courtier / Marchand, Héros d'Azeroth, Baron Noir.
- **Ressources de classe** : Mana, Énergie, Rage, Ferveur, Focalisation, Points de Combo, Puissance Runique, Puissance Sacrée, Puissance Céleste, Éclats d'Âme, Charges Arcaniques, Fureur démoniaque, Insalubrité / Énergie du Vide, Bouclier de foudre (charges).
- **Deux termes enfin définis par l'artisanat** :
  - **AP** = Armure Physique. C'est une valeur chiffrée, apportée par l'équipement (« Armure physique +2 »).
  - **RP** = Résistance Psychique. C'est une réserve qu'on restaure (« +3 RP », « 100 % de la RP »).
- **Repos court et repos long**, qui remettent des usages à zéro.
- **Compagnons, montures, familiers et invocations** : goules, imps, tourelles, totems, bête liée.
- **Toxicité** des décoctions : un malus après l'effet.

### Artisanat

- **4 métiers de base** :
  - Forge (Artisanat lourd, Force) ;
  - Cuir (Artisanat de précision, que le PDF classe sous « Dextérité », donc à comprendre comme Agilité) ;
  - Ingénierie (Intelligence) ;
  - Alchimie (Sagesse).
- **Patrons** : chaque métier a 5 rangs de 10 patrons. Un patron, c'est une liste de composants et un effet.
- **20 métiers hybrides**, débloqués par une compétence (386 à 425), à 5 patrons chacun.
- **Matériaux par paliers** :
  - métaux : Fer, Acier, Mithril, Thorium, Adamantine, Arcanite ;
  - cuirs : brut, traité, épais, élite, légendaire ;
  - plantes nommées (Feuillargent, Mageroie…).

## 2. Écarts avec l'app actuelle

| Aujourd'hui (CO / Arran) | Sindragosa | Impact |
|---|---|---|
| 6 caracs FOR DEX CON INT SAG CHA, valeurs 3-20 avec modificateur | Force, **Agilité**, **Endurance**, Intelligence, Sagesse, Charisme. Petite valeur brute (nombre de d6), réglée à la main par le MJ (+ / −) | renommer `dex`→`agi`, `con`→`end` ; plus de modificateur |
| Profil, famille, niveau, montée de niveau | rien de tout ça | supprimés |
| Voies (rangs, capacités) | Domaines (rang 0-5, coches) → Spécialités (Apprenti / Expert / Maître, 2 coches par niveau) → Domaines avancés | nouveau modèle de données |
| Compétences libres `{name, ability, bonus}` | Spécialités, que le joueur peut proposer | remplacées |
| Capacités de voie | Compétences débloquables (~490), avec prérequis | nouveau catalogue + moteur de prérequis |
| d20 + modificateur ≥ seuil, critique sur 20, échec sur 1 | réserve de d6 (5 ou 6 = succès). Critique : un 6, ou un 5 avec une spécialité Maître. Échec critique : 0 succès et au moins un 1 | moteur de jet entièrement nouveau |
| PV = dé de vie + CON + croissance par niveau | 20 + 2 par rang dans un domaine de Force ou d'Endurance, + 5 par rang en Résistance physique, + 8 par point d'Endurance | nouvelle formule |
| DEF fixe, attaque contre DEF | opposition attaque contre défense (parer : Force + Mêlée, esquiver : Agilité + Acrobatie & Furtivité) | combat à reprendre |
| Initiative = DEX − armure | Agilité + Sagesse + Perception & Sens | nouvelle formule |
| Armures CO (bonus DEF, malus d'init) | AP (armure physique) soustraite aux dégâts | catalogue d'équipement refait |
| Peuples d'Arran | 12 races WoW (+1 à une carac, 1 pouvoir racial par jour) | catalogue refait |
| PM, talents mystiques | magie apprise en jeu, ressources de classe | à définir (TODO de la roadmap) |
| Bestiaire CO (NC, DEF, attaques d20) | même bestiaire, stats converties en d6 | conversion à concevoir |
| Monnaie po / pa / pc | or / argent / cuivre | renommage |
| `knowledge/` Arran | règles et lore Sindragosa / WoW | purge et réécriture |

## 3. Schéma proposé

On reste sur le modèle actuel : un personnage est une ligne, avec ses listes en `jsonb`, et les catalogues statiques vivent dans `client/src/data/`. Pas de nouvelle table pour les compétences ni pour l'artisanat : ce sont des catalogues, pas des données de joueur.

**Table `character`** :
- **Gardé** : `id`, `user_id`, `is_active`, `name`, `histoire`, `portrait_image_id`, `hp_current`, `hp_bonus`, `items`, la monnaie et `states`.
- **Ajouté** :
  - `race` (remplace `people`) ;
  - les caracs `str`, `agi`, `end`, `int`, `wis`, `cha` (petites valeurs, défaut à préciser) ;
  - `domains` jsonb : `{ [domainId]: { rank, ticks } }` ;
  - `specialties` jsonb : `[{ id, domainId, name, level, ticks, custom }]` ;
  - `advanced_domains` jsonb : `{ [id]: { rank, ticks } }` ;
  - `titles` jsonb : `string[]` ;
  - `ability_uses` jsonb : usages consommés, remis à zéro par repos court, repos long ou séance ;
  - `tick_log` jsonb : historique des coches (séance, cible, motif), qui sert à faire respecter les limites par séance ;
  - `crafts` jsonb : métiers et rangs connus.
- **Supprimé** :
  - les champs liés au profil : `profile`, `level`, `hp_level_gains` ;
  - les voies et la magie d'Arran : `paths`, `mystic_talent` ;
  - l'ancien calcul d'attaque et de défense : `martial_formations`, `defense`, `defense_bonus`, `attack_*_bonus`, `initiative_bonus` ;
  - les anciennes listes : `skills`, `competences` ;
  - `mp_*`, mais seulement une fois la question des ressources tranchée.

**Données de combat** :
- **Recharges** (« 2 tours », « 1 fois par combat ») : elles vivent sur `combat_participant`, car elles meurent avec le combat.
- **Monstres** : `encounter_monster` et `combat_participant` passent aux caracs, rangs et AP au format d6.

**Personnages existants** : la migration les supprime tous (décision § 6).

**Également** : `pc_current` est gardé (points de chance, 2 par séance). `resources` (jsonb, `[{ id, name, current, max }]`) remplace `mp_max` et `mp_current`. `pr_current` est supprimé.

## 4. Moteur de règles (`client/src/utils/`, avec tests unitaires)

- `rollPool(dice, { specialtyLevel })` : succès, critiques, échec critique, relance des 1 (Apprenti), +1d6 (Expert), critique sur 5 (Maître).
- `difficulty(successes)` : facile, moyenne, difficile, exploit.
- `maxHp(character)`, `initiative(character)`.
- `resolveAttack(attack, defense, weaponDamage, ap)` : marge, puis dégâts.
- `addTick(character, target, reason, session)` : limites de 3 par séance (2 sur réussite marquante, 1 sur échec critique), passage au rang suivant (2, 3, 4, 5, 6 coches), 2 coches par niveau de spécialité, nombre de spécialités ≤ rang du domaine.
- `meetsPrerequisites(character, ability)`, puis `unlockedAbilities(character)`.

## 5. Découpage

1. Versionner les 3 PDF dans `docs/regles/`. Vérification : fichiers commités.
2. Catalogues statiques (`client/src/data/`) :
   - caracs et domaines ;
   - spécialités d'exemple ;
   - races ;
   - compétences (~490, transcrites depuis le PDF) ;
   - patrons d'artisanat.

   Vérification : un test qui contrôle que chaque prérequis pointe vers un domaine, une spécialité ou un titre qui existe.
3. Moteur de règles (§ 4). Vérification : tests unitaires verts.
4. Migration de la base et du type `Character`. Vérification : `db:migrate`, typecheck, seed du bac à sable mis à jour.
5. Fiche personnage : caracs (+ / −), domaines et coches, spécialités, compétences débloquées. Vérification : e2e de la fiche adaptés.
6. Mes actions, jets de dés et log. Vérification : e2e des jets.
7. Combat : initiative, attaque contre défense, recharges. Vérification : e2e du combat.
8. Bestiaire converti. Vérification : test de conversion.
9. `knowledge/` purgé, puis règles et lore Sindragosa. Vérification : `git grep` sans Arran.
10. Refonte UI des écrans à partir de `docs/ecrans.excalidraw`.

## 6. Décisions (tranchées le 2026-10-17)

### Domaines : 5 par caractéristique

Les noms de `Sindragosa.pdf` font foi. Les variantes des autres PDF sont des alias.

| Carac | Domaines |
|---|---|
| Force | Athlétisme, Mêlée bourrine, Armures & boucliers, Intimidation physique, Artisanat lourd |
| Agilité | Acrobatie & Furtivité, Combat de précision, Tir & Lancer, Escamotage & Crochetage, Artisanat délicat |
| Endurance | Résistance physique, Volonté & Récupération, Survie en milieu hostile, Tolérance aux toxines, Énergie & Souffle |
| Intelligence | Magie profane & Arcanes, Explosifs & Ingénierie, Histoire & Géographie d'Azeroth, Tactique & Analyse, **Médecine & Soins** (vient de Sagesse) |
| Sagesse | Perception & Sens, Magie divine & Sacrée, Communion naturelle & Chamanisme, **Alchimie & Herboristerie** (retirée d'Intelligence), **Volonté spirituelle** (nouveau) |
| Charisme | Persuasion & Diplomatie, Commandement & Inspiration, Magie de l'Ombre & Fél, Négociation & Commerce, Tromperie & Comédie |

**Alias et coquilles** :

| Écrit dans un PDF | Désigne |
|---|---|
| Maîtrise des armures | Armures & boucliers |
| Technomancie & Ingénierie, Ingénierie | Explosifs & Ingénierie |
| Communion naturelle | Communion naturelle & Chamanisme |
| Artisanat de précision (« Dextérité ») | Artisanat délicat (Agilité) |
| Mêlée & Combat lourd | Mêlée bourrine |
| Résistance | Résistance physique |
| Perception, Sens & Pistage | Perception & Sens |
| Histoire & Géographie | Histoire & Géographie d'Azeroth |
| Alchimie, Herboristerie & Toxicologie | Alchimie & Herboristerie |
| Tromperie & Discipline | Tromperie & Comédie |
| Charisme (Intimidation physique) | Intimidation physique (domaine de Force) |
| Nécromancie & Ombre | domaine avancé Nécromancie & Peste |
| Acrobatie & Combat de précision | deux prérequis : Acrobatie & Furtivité rang 1 **et** Combat de précision rang 1 |

Les prérequis du catalogue de compétences désignent un **domaine** (son identifiant), et non le couple carac + domaine. Le déplacement de Médecine & Soins vers Intelligence se répercute donc tout seul. Un test vérifie que chaque prérequis se résout.

### Règles

- **Caracs à la création** : 2 partout, +1 sur la carac raciale. Ensuite, le MJ les règle à la main (+ / −).
- **Compétences** : elles se débloquent **automatiquement** dès que les prérequis sont réunis.
- **Prérequis sans rang** (« (2) X + Y ») : il faut le rang 1 dans chaque domaine cité.
- **Domaines avancés** : ils progressent comme un domaine (rangs 1 à 5, coches) et s'ouvrent par prérequis. Les PDF n'en donnent aucun : **je propose ces prérequis** en les déduisant des compétences, et tu les valides (à faire à l'étape 2).
- **Ressources** (Mana, Énergie, Rage, Points de Combo, Éclats d'Âme…) : des **compteurs libres** sur la fiche (nom, valeur, maximum), réglés à la main. Rien d'automatique tant que les règles ne sont pas écrites.
- **Repos et séance** : le MJ lance un **repos court**, un **repos long** (qui compte aussi comme un court) ou une **fin de séance**. Chacun remet à zéro les usages correspondants. La fin de séance remet aussi les compteurs de coches et les points de chance.
- **Artisanat** : on dépense les composants et on fait un jet du domaine du métier. La difficulté dépend du rang du patron.
- **Personnages existants** : **tous supprimés** par la migration. Chacun recrée son personnage.

### Mécaniques héritées d'Arran

| Sort | Mécaniques |
|---|---|
| **Gardé** | repos de groupe, états, jets cachés du MJ, renforts en réserve, inventaire, monnaie (or / argent / cuivre) |
| **Gardé, règle changée** | **points de chance** : 2 par séance, remis à 2 en fin de séance ; en dépenser 1 ajoute 1d6 au jet. **Avantage** : +1d6. **Désavantage** : −1d6. |
| **Adapté au d6** | agonie à 0 PV, moment critique (sur un critique ou un échec critique), combat à deux armes |
| **Gardé, à adapter (TODO)** | concentration des sorts (Économe / Étendue / Puissante) |
| **Retiré** | niveaux et montée de niveau, formations martiales, PM (remplacés par les compteurs libres), points de récupération et dé de vie |

## 7. Questions encore ouvertes

### Prérequis des domaines avancés (proposition à valider)

Déduits des compétences qui les citent : le domaine de base qui les accompagne le plus souvent, et le rang le plus bas où il apparaît.

| Domaine avancé | Prérequis proposé | Pourquoi |
|---|---|---|
| Ivresse du Combat | Mêlée bourrine 2 + Volonté & Récupération 1 | guerrier fou furieux |
| Tactique de Choc | Intimidation physique 2 + Tactique & Analyse 1 | |
| Danse des Lames | Combat de précision 2 + Acrobatie & Furtivité 1 | toujours avec Combat de précision |
| Poisons & Toxines | Escamotage & Crochetage 2 + Alchimie & Herboristerie 1 | |
| Nécromancie & Peste | Mêlée bourrine 2 + Magie de l'Ombre & Fél 1 | 8 compétences sur 15 demandent Mêlée bourrine (Chevalier de la Mort) |
| Maîtrise des Arcanes | Magie profane & Arcanes 2 | |
| Magie du Givre & Altération | Magie profane & Arcanes 2 | |
| Pyromancie | Magie profane & Arcanes 2 | aussi souvent avec Magie de l'Ombre & Fél (feu gangrené) |
| Chronomancie | Magie profane & Arcanes 3 + Histoire & Géographie 1 | |
| Runes Anciennes | Magie profane & Arcanes 2 + Histoire & Géographie 2 | « Runes anciennes » est une spécialité d'Histoire |
| Maîtrise des Éléments | Communion naturelle & Chamanisme 3 | |
| Astral & Céleste | Communion naturelle & Chamanisme 2 + Magie profane & Arcanes 2 | les 3 compétences demandent les deux |
| Lumière Vengeuse | Magie divine & Sacrée 3 + Commandement & Inspiration 1 | |
| Discipline & Absolution | Magie divine & Sacrée 2 + Volonté spirituelle 2 | |
| Démonologie & Fél | Magie de l'Ombre & Fél 2 | |
| Malédictions & Affliction | Magie de l'Ombre & Fél 2 | |
| Magie du Vide | Magie de l'Ombre & Fél 2 + Volonté spirituelle 1 | |
| Ingénierie Goblino-Gnome | Explosifs & Ingénierie 2 | |
| Élixirs Arcaniques | Alchimie & Herboristerie 2 + Magie profane & Arcanes 1 | |
| Toxines Sauvages | Alchimie & Herboristerie 2 + Survie en milieu hostile 1 | |
| Dressage Sauvage | Communion naturelle & Chamanisme 2 + Survie en milieu hostile 1 | |
| Magie Draconique | Magie profane & Arcanes 3 + Histoire & Géographie 2 | |

### Autres questions

- **Échec critique** : le § 1.A dit « gagne immédiatement 2 cases de pratique », alors que le § D dit « 1 coche automatique ». Le moteur applique pour l'instant **1 coche** (§ D, plus précis).
- **Récompenses du MJ** (quête, donjon, entraînement) : le moteur les compte **hors** de la limite de 3 coches par séance. À confirmer.
- **Niveaux de spécialité cumulatifs** : le moteur suppose qu'un Maître a aussi les bonus d'Apprenti (relance d'un 1) et d'Expert (+1d6). À confirmer.
- **Gain de PV par point d'Endurance** (+8) : le moteur ne compte que les points gagnés **après** la création. À confirmer.
- Points TODO de la roadmap (RP, AP de base, types d'action, déplacement, liste des états, dégâts des armes, titres).
