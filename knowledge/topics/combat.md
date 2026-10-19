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
   - **Parer** : le domaine de l'arme de contact tenue, avec sa caractéristique (Force + Mêlée bourrine pour une hache, Agilité + Combat de précision pour une dague), plus la spécialité de cette arme si le personnage l'a ;
   - **Esquiver** : Agilité + Acrobatie & Furtivité.
3. **Résolution** : marge = succès de l'attaque − succès de la défense.
   - Marge ≤ 0 : attaque parée ou esquivée, pas de dégâts.
   - Marge > 0 : **dégâts = dégâts de l'arme + marge − armure**.

## Armure

L'**Armure Physique (AP)** se retire des dégâts reçus. Elle vaut 0 de base et n'est modifiée **que par l'équipement et les compétences** : AP = armures **équipées** dans l'inventaire + bonus des compétences (réglé en mode édition). Celle des monstres vient du bestiaire (`bestiaire.md`).

## Armes

Les armes sont des objets de l'inventaire. Leurs dégâts sont **fixes selon le gabarit** (à tester en jeu), plus un bonus éventuel :

| Gabarit | Dégâts |
|---|---|
| Légère (dague, arme de jet) | 2 |
| Une main | 3 |
| Deux mains | 5 |

Une arme **équipée** donne une attaque (« Frapper ») dans la liste des compétences et dans Mes actions, avec son domaine d'attaque.

## Actions et déplacement

- **Types d'action** : Rapide, Mouvement, Complète. À son tour, un personnage fait une action Rapide et une action de Mouvement, ou une action Complète à la place des deux. Les compétences « Gratuite » et « Réaction » s'utilisent comme leur texte l'indique.
- **Déplacement** : 6 m par action de Mouvement pour tout le monde, sauf exception ou modification par une compétence ou un pouvoir racial.

## Repos et fin de séance

Lancés par le MJ pour tout le groupe. Chaque repos remet à zéro les usages limités des compétences de sa période.

| Repos | Usages rendus | Autres effets |
|---|---|---|
| Repos court | « combat », « repos court » | — |
| Repos long | + « repos long », « jour » | PV au maximum, états levés |
| Fin de séance | « séance » | chance remise à 2, coches de séance à zéro ; le MJ y ajoute un repos long s'il le souhaite |

« 1/jour » veut dire une fois par repos long.

## Agonie

À 0 PV, jets de mort au d20, gardés d'Arran (décidé le 2026-10-18) : ≥ 11 = succès, 3 succès pour se stabiliser, 3 échecs pour mourir ; un 20 stabilise, un 1 tue.

## Hérité d'Arran, à adapter

- **États préjudiciables** (`client/src/data/etats.ts`) : Aveuglé, Affaibli, Étourdi, Immobilisé, Paralysé, Ralenti, Renversé, Surpris, Désarmé, Bloqué, Repoussé, Diversion, Menacé. Leurs effets sont encore écrits en d20.

## Non définis par les règles

Résistance Psychique (RP), Mana / Énergie, liste des états. Voir la TODO de `ROADMAP.md`.
