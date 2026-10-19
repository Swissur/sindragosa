# 39 — Les compétences qui attaquent lancent leur jet

Décidé le 2026-10-19. Beaucoup de compétences de combat ne proposaient aucun jet :
toute compétence qui fait une attaque porte désormais le bouton d'attaque (épées
croisées) sur sa carte.

## Trois sortes d'attaques

Table : `client/src/data/sindragosa/abilityAttacks.ts` (interprétation, la
transcription du PDF reste intacte).

| Sorte | Jet | Exemples |
|---|---|---|
| Arme (`contact` / `distance`) | domaine de l'arme équipée, rappel des dégâts | Attaque sournoise, Tir mortel |
| Naturelle | domaine de l'arme naturelle (mains nues par défaut) | Projection d'ennemi, Griffe d'ombre |
| Sort | jet de domaine, sans arme | Boule de feu, Trait d'ombre |

- **Arme** : un tir prend l'arme de tir équipée, une frappe une arme de contact,
  à défaut la première arme équipée. Sans arme équipée, le bouton est grisé.
- **Sort** : le domaine avancé le plus spécialisé de ses prérequis (le dernier
  cité), sinon le domaine de magie de base, sinon le premier domaine (les bombes
  d'ingénieur : Explosifs & Ingénierie). Seuls les sorts qui infligent des dégâts
  sont des attaques ; ceux qui touchent automatiquement (Trait du Chaos maudit) non.

## Armes naturelles

- Nouveau gabarit **Naturelle** : 1 dégât. On peut en créer dans l'inventaire (cornes, griffes).
- Tout personnage a d'office des **Mains nues** (naturelle, Athlétisme), sans objet.
  « Frapper : Mains nues » apparaît quand aucune arme n'est équipée.

## Transformations

Une transformation prise (bouton patte sur sa carte, champ `form` de la fiche)
donne une arme naturelle qui **remplace** les armes équipées : « Frapper » et
toutes les compétences d'attaque à l'arme passent par elle.

| Forme | Arme naturelle | Dégâts | Domaine |
|---|---|---|---|
| Forme d'ours (42) | Griffes d'ours | 3 | Mêlée bourrine |
| Forme de félin (1001) | Griffes de félin | 2 | Combat de précision |
| Avatar (140) | Poings de pierre | 5 | Mêlée bourrine |
| Ascendance élémentaire (170) | Frappe de vent | 3 | Communion naturelle |
| Métamorphose démoniaque (241) | Décharge de Fél | 4 | Magie de l'Ombre & Fél |
| Esprit du loup (77) | Crocs de loup | 2 | Combat de précision |
| Forme d'esprit végétal (187) | Branches | 2 | Communion naturelle |
| Worgen (pouvoir racial) | Griffes de worgen | 2 | Mêlée bourrine |

La Forme du Vide (260) n'est pas suivie : c'est une forme de sorts, sans arme.

La spécialité **Forme animale** donne Forme d'ours (en plus de ses prérequis du
PDF) et **Forme de félin**, compétence maison (n° 1001) qu'exigent Griffe d'ombre,
Célérité céleste et Instinct de survie.

La forme se quitte à la main ; les repos ne la lèvent pas.
