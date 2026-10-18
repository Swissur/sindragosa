# Progression par coches

Source : `docs/regles/Sindragosa.pdf` § 1.D. Moteur : `client/src/utils/sindragosa/progression.ts`.

Pas de niveaux ni d'expérience : le personnage progresse en pratiquant.

## Gagner des coches

| Motif | Coche | Limite par séance |
|---|---|---|
| Réussite d'une action importante ou d'un test sous tension | 1 au domaine ou à la spécialité utilisé | 2 |
| Échec critique (« c'est en se trompant qu'on apprend ») | 1 au domaine ou à la spécialité concerné | 1 |
| Récompense du MJ : quête, donjon, entraînement auprès d'un PNJ | au choix du MJ | hors limite |

- **3 coches au maximum par séance**, toutes compétences confondues (hors récompenses du MJ).
- Le joueur choisit de prendre sa coche après le jet : elle n'est jamais ajoutée d'office.
- Les compteurs de la séance repartent à zéro à la fin de séance.

## Monter de rang

### Domaines (rang 0 à 5)

| Rang visé | Coches nécessaires | Dés ajoutés |
|---|---|---|
| 1 | 2 | +1d6 |
| 2 | 3 | +2d6 |
| 3 | 4 | +3d6 |
| 4 | 5 | +4d6 |
| 5 | 6 | +5d6 |

Les coches repartent à zéro à chaque nouveau rang.

### Spécialités (3 niveaux)

Chaque niveau coûte **2 coches** : Apprenti, puis Expert, puis Maître.

### Nombre de spécialités

On peut avoir dans un domaine **autant de spécialités que son rang actuel**. Exemple : rang 2 en Mêlée bourrine permet Haches et Boucliers ; une 3ᵉ spécialité demande le rang 3.

## Caractéristiques

Elles ne se gagnent pas avec des coches : elles montent **à la discrétion du MJ** (outils du MJ, fiche du joueur).

## Compétences, domaines avancés et titres

- Une **compétence** se débloque automatiquement dès que tous ses prérequis sont réunis. Un prérequis sans rang précisé vaut rang 1. Voir `competences.md`.
- Un **domaine avancé** s'ouvre par ses prérequis, ou seulement par la compétence du même nom s'il en existe une, puis progresse comme un domaine (mêmes paliers de coches). Voir `personnage.md`.
- Une compétence qui porte le **nom d'une spécialité** exigée ailleurs (ex. « Analyse des failles ») donne cette spécialité au niveau Apprenti quand on la débloque, en plus de la limite de spécialités du domaine.
- Un **titre** (classe émergente) se débloque quand le personnage réunit une combinaison de compétences et accomplit un haut-fait. **Seul le MJ l'accorde**, depuis ses outils : il choisit parmi les 22 titres qu'exigent les compétences (`client/src/data/sindragosa/titles.ts`) ou en écrit un autre. Un joueur ne peut pas s'en donner.

## Précisions confirmées (2026-10-18)

- Un échec critique donne 1 coche (le PDF dit aussi « 2 cases »).
- Les récompenses du MJ ne comptent pas dans la limite de séance.
- Les niveaux de spécialité se cumulent.
