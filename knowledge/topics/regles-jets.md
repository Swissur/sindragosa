# Jets de dés : la réserve de d6

Source : `docs/regles/Sindragosa.pdf` § 1.A et 1.C. Décisions : `plans/31-refonte-regles-sindragosa.md` § 6.
Moteur : `client/src/utils/sindragosa/pool.ts`.

## La réserve

**Nombre de d6 = Caractéristique + Rang du domaine**, plus les bonus :

| Bonus | Effet |
|---|---|
| Spécialité Expert ou Maître | +1d6 (les niveaux se cumulent : un Maître garde le dé de l'Expert) |
| Avantage | +1d6 |
| Désavantage | −1d6 |
| Point de chance dépensé | +1d6 par point |

Le joueur choisit la spécialité utilisée ; elle doit correspondre exactement à l'action.

## Lire le résultat

- **Succès** : chaque dé qui affiche 5 ou 6.
- **Palier atteint** :

| Succès | Palier |
|---|---|
| 0 | Échec |
| 1 | Facile |
| 2 | Moyenne |
| 3 | Difficile |
| 4 et plus | Exploit héroïque |

- **Réussite critique** : un dé qui affiche 6. Avec une spécialité **Maître**, un 5 compte aussi comme critique.
- **Échec critique** : aucun succès et au moins un 1. Conséquence narrative (blessure, alarme, outil brisé), mais le personnage apprend : il peut cocher le domaine ou la spécialité (voir `progression.md`).

## Bonus de spécialité

| Niveau | Effet |
|---|---|
| 1 — Apprenti | Relance un résultat de 1 de la réserve |
| 2 — Expert | +1d6 à la réserve |
| 3 — Maître | Critique sur 5 ou 6 |

## Points de chance

- 2 points par séance, rendus à la fin de séance.
- Chaque point dépensé ajoute 1d6 à un jet, décidé avant de lancer.

## Écarts connus avec le PDF

Tranchés dans le plan 31 § 6–7 :

- Le PDF dit qu'un échec critique donne « 2 cases de pratique » puis, plus loin, « 1 coche automatique ». L'app applique **1 coche** (hypothèse à confirmer).
- Le PDF définit aussi la réussite critique comme « aucun 1 et une marge d'au moins 1 ». L'app applique la règle validée : critique sur 6, et sur 5 avec une spécialité Maître.
