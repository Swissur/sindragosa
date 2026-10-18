# Combat

Source : `docs/regles/Sindragosa.pdf` § 1.B et 4. Moteur : `client/src/utils/sindragosa/combat.ts`.

## Points de vie

- 20 PV au départ.
- +2 PV par rang dans n'importe quel domaine de Force ou d'Endurance.
- +5 PV par rang en **Résistance physique** (au lieu de +2).
- +8 PV par point d'Endurance gagné **depuis la création** (le +1 racial de départ ne compte pas).
- Plus les bonus divers (objets, compétences passives).

## Initiative

**Agilité + Sagesse + rang en Perception & Sens.** Les participants jouent par initiative décroissante.

## Le tour de combat : attaque contre défense

1. **L'attaquant** lance sa réserve : caractéristique + domaine d'attaque (celui de son arme).
2. **Le défenseur** réagit avec sa propre réserve :
   - **Parer** : Force + domaine d'armes de contact ;
   - **Esquiver** : Agilité + Acrobatie & Furtivité.
3. **Résolution** : marge = succès de l'attaque − succès de la défense.
   - Marge ≤ 0 : attaque parée ou esquivée, pas de dégâts.
   - Marge > 0 : **dégâts = dégâts de l'arme + marge − armure**.

## Armure

L'armure (AP, Armure Physique) se retire des dégâts reçus. Celle d'un personnage se règle sur sa fiche ; celle des monstres vient du bestiaire (`bestiaire.md`).

## Repos et fin de séance

Lancés par le MJ pour tout le groupe. Chaque repos remet à zéro les usages limités des compétences de sa période.

| Repos | Usages rendus | Autres effets |
|---|---|---|
| Repos court | « combat », « repos court » | — |
| Repos long | + « repos long », « jour » | PV au maximum, états levés (hypothèse) |
| Fin de séance | + « séance » | comme un repos long, chance remise à 2, coches de séance à zéro |

## Hérité d'Arran, à adapter

Ces mécaniques existent dans l'app mais les règles Sindragosa ne les décrivent pas encore (voir `ROADMAP.md`) :

- **Agonie** : à 0 PV, jets de mort au d20 (≥ 11 = succès, 3 succès ou 3 échecs).
- **États préjudiciables** (`client/src/data/etats.ts`) : Aveuglé, Affaibli, Étourdi, Immobilisé, Paralysé, Ralenti, Renversé, Surpris, Désarmé, Bloqué, Repoussé, Diversion, Menacé. Leurs effets sont encore écrits en d20.

## Non définis par les règles

Types d'action (rapide, complète, gratuite, réaction) et leur nombre par tour, vitesse de déplacement, Résistance Psychique (RP). Voir la TODO de `ROADMAP.md`.
