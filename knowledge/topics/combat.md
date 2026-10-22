# Combat

Règles telles que l'app les applique. Origine : `docs/regles/Sindragosa.pdf` § 1.B et 4. Moteur : `client/src/utils/sindragosa/combat.ts`.

## Points de vie

- 20 PV au départ.
- +2 PV par rang dans n'importe quel domaine de Force ou d'Endurance.
- +5 PV par rang en **Résistance physique** (au lieu de +2).
- +8 PV par point d'Endurance gagné **depuis la création** (le +1 racial de départ ne compte pas).
- Plus un **bonus de PV** réglé à la main en mode édition (objets, compétences passives), qui peut être négatif.

Les PV restent entre 0 et le maximum.

## Initiative

**Agilité + Sagesse + rang en Perception & Sens**, sans jet : c'est une valeur fixe. Les participants jouent par initiative décroissante ; à égalité, dans l'ordre où ils sont entrés dans le combat.

- Un joueur à 0 PV reste dans l'ordre (il est en agonie) ; un monstre à 0 PV est mort et son tour est sauté.
- Les renforts que le MJ garde en réserve n'entrent dans l'ordre qu'une fois révélés, sans voler le tour en cours.

## Le tour de combat : attaque contre défense

1. **L'attaquant** lance sa réserve : caractéristique + domaine d'attaque (celui de son arme).
2. **Le défenseur** réagit avec sa propre réserve :
   - **Parer** : le domaine de l'arme de contact tenue, avec sa caractéristique (Force + Mêlée bourrine pour une hache, Agilité + Combat de précision pour une dague), plus la spécialité de cette arme si le personnage l'a ;
   - **Esquiver** : Agilité + Acrobatie & Furtivité.
3. **Résolution** : marge = succès de l'attaque − succès de la défense.
   - Marge ≤ 0 : attaque parée ou esquivée, pas de dégâts.
   - Marge > 0 : **dégâts = dégâts de l'arme + marge − armure**, jamais moins de 0.

Le jet d'attaque d'une arme rappelle cette formule avec les dégâts de l'arme ; le joueur et le MJ appliquent le résultat à la main.

## Armure

L'**Armure Physique (AP)** se retire des dégâts reçus. Elle vaut 0 de base et n'est modifiée **que par l'équipement et les compétences** : AP = somme des armures **équipées** dans l'inventaire + bonus des compétences (réglé à la main en mode édition). Celle des monstres vient du bestiaire (`bestiaire.md`).

## Armes

Les armes sont des objets de l'inventaire, avec un gabarit, un domaine d'attaque et un bonus de dégâts éventuel (patron, enchantement). Leurs dégâts sont **fixes selon le gabarit** (à tester en jeu), plus ce bonus :

| Gabarit | Dégâts |
|---|---|
| Naturelle (mains nues, griffes, cornes) | 1 |
| Légère (dague, arme de jet) | 2 |
| Une main | 3 |
| Deux mains | 5 |

- Une arme sans domaine d'attaque se manie avec Mêlée bourrine.
- Chaque arme **équipée** donne une attaque « Frapper » dans la liste des compétences et dans les actions du combat.
- Tout personnage naît avec ses **Poings** équipés (arme naturelle, 1 dégât, Athlétisme). Sans aucune arme équipée, il frappe à **mains nues** (mêmes valeurs).

### Transformations

Prendre une forme (bouton sur la carte de sa compétence) donne une arme naturelle qui **remplace** toutes les armes équipées, pour « Frapper » comme pour les compétences d'attaque à l'arme. La forme se quitte à la main ; les repos ne la lèvent pas.

| Forme | Arme naturelle | Dégâts | Domaine |
|---|---|---|---|
| Forme d'ours | Griffes d'ours | 3 | Mêlée bourrine |
| Forme de félin | Griffes de félin | 2 | Combat de précision |
| Avatar | Poings de pierre | 5 | Mêlée bourrine |
| Ascendance élémentaire | Frappe de vent | 3 | Communion naturelle & Chamanisme |
| Métamorphose démoniaque | Décharge de Fél | 4 | Magie de l'Ombre & Fél |
| Esprit du loup | Crocs de loup | 2 | Combat de précision |
| Forme d'esprit végétal | Branches | 2 | Communion naturelle & Chamanisme |
| Forme sauvage (pouvoir racial du Worgen) | Griffes de worgen | 2 | Mêlée bourrine |

La Forme du Vide n'en fait pas partie : c'est une forme de sorts, sans arme.

## Compétences qui attaquent

Une compétence qui fait une attaque lance son propre jet, de trois façons :

- **À l'arme** (Attaque sournoise, Tir mortel…) : avec le domaine de l'arme équipée. Un tir prend l'arme de tir (Tir & Lancer), une frappe une arme de contact, à défaut la première arme équipée. Sans arme équipée, impossible.
- **Sans arme** (Projection d'ennemi, Griffe d'ombre…) : avec l'arme naturelle équipée, sinon les mains nues.
- **Sort ou bombe** : un jet de domaine, sans arme (voir `magie.md`).

Une forme prise remplace l'arme dans les deux premiers cas.

## Actions et déplacement

- **Types d'action** : Rapide, Mouvement, Complète. À son tour, un personnage fait une action Rapide et une action de Mouvement, ou une action Complète à la place des deux. Les compétences « Gratuite » et « Réaction » s'utilisent comme leur texte l'indique.
- **Déplacement** : 6 m par action de Mouvement pour tout le monde, sauf exception ou modification par une compétence ou un pouvoir racial.
- **Recharges** (« recharge 2 tours ») : affichées sur la compétence, suivies à la main.

## Repos et fin de séance

Lancés par le MJ pour tout le groupe. Chaque repos remet à zéro les usages limités des compétences de sa période (le joueur coche lui-même une compétence utilisée).

| Repos | Usages rendus | Autres effets |
|---|---|---|
| Repos court | « combat », « repos court » | mana +⅓ du max, arrondi au-dessus (`magie.md`) |
| Repos long | + « repos long », « jour » | PV et mana au maximum, états levés |
| Fin de séance | « séance » | chance remise à 2, coches de séance à zéro ; le MJ y ajoute un repos long s'il le souhaite |

- « 1/jour » veut dire une fois par repos long.
- La fin d'un combat ne rend rien : les usages « 1/combat » reviennent au repos court.
- Aucun repos ne rend les usages « 1/scénario » ni « 1/campagne », ni les réserves libres (Rage, Énergie…) : on les règle à la main.

## Agonie

À 0 PV, jets de mort au d20, gardés d'Arran (décidé le 2026-10-18) : ≥ 11 = succès, 3 succès pour se stabiliser, 3 échecs pour mourir ; un 20 stabilise, un 1 tue. Stabilisé, le personnage reste à 0 PV jusqu'à ce qu'on le soigne.

## États

Décidés le 2026-10-19 (`plans/42-etats.md`, catalogue `client/src/data/etats.ts`). Un état est un **rappel** : le MJ applique l'effet aux jets, rien n'est ajouté tout seul. Il peut porter une **durée en tours**, qui baisse à la fin du tour de son porteur ; à 0, l'état s'efface. Sans durée, il reste jusqu'à ce qu'on le retire. Le MJ pose les états de tout le monde en combat, en choisissant la durée ; un joueur gère les siens depuis sa fiche (sans durée). Le repos long les lève tous.

| État | Effet |
|---|---|
| Étourdissement | Aucune action ; −2d6 en défense (parer, esquiver) |
| Paralysie | Aucune action ni défense : la marge de l'attaquant compte en entier |
| Sommeil | Aucune action ni défense ; se réveille dès qu'il subit des dégâts, ou si un allié le secoue (action Rapide) |
| Surprise | Au premier tour : aucune action ; −2d6 en défense |
| Peur | Chaque tour, s'éloigne de la source avec son action de Mouvement ; ne peut pas l'attaquer ; garde son action Rapide |
| Charme | Voit le lanceur en ami : ne peut ni l'attaquer ni le cibler ; cesse si le lanceur ou ses alliés l'attaquent |
| Silence | Ni sort ni compétence vocale (cri, chant, commandement) |
| Enracinement | Ne peut pas se déplacer ; −1d6 pour esquiver (la parade reste normale) |
| Ralentissement | Déplacement divisé par deux (3 m au lieu de 6) |
| À terre | −1d6 à l'attaque et à la défense ; se relever coûte l'action de Mouvement |
| Aveuglement | −1d6 au contact et en défense ; attaques à distance et sorts ciblés impossibles |
| Affaiblissement | −1d6 à tous les jets |
| Désorientation | −1d6 à tous les jets (courte durée) |
| Désarmé | Ramasser son arme coûte l'action de Mouvement ; en attendant, Mains nues |
| Saignement | Perd X PV (1 par défaut) au début de chacun de ses tours, sans armure ; Médecine & Soins (1 succès, action Complète) ou un soin magique l'arrête |
| Poison | Perd X PV par tour, sans armure ; à la fin de chacun de ses tours, Tolérance aux toxines (palier du poison, moyen par défaut) l'en débarrasse |
| Maladie | −1d6 à tous les jets ; le repos long ne rend pas de PV ; se guérit par Médecine & Soins, Tolérance aux toxines ou un soin magique |

« X » est la valeur donnée par la compétence ou le monstre ; l'app ne la stocke pas.

## Non définis par les règles

Énergie. Voir la TODO de `ROADMAP.md`.
