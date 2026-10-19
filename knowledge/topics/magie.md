# Magie

Règles telles que l'app les applique. Origine : `docs/regles/Sindragosa.pdf` § 3.

- La magie n'est **ni innée, ni acquise à la création**.
- Un personnage s'y initie en jeu : étude, lecture, confrontation à la magie, pacte avec une entité, objets à aura magique, apprentissage auprès d'un mage reconnu.
- Une fois les bases apprises, c'est le **mélange des domaines** qui ouvre de nouvelles arcanes. Les sorts sont des compétences (`competences.md`), débloquées automatiquement dès que leurs prérequis sont réunis.
- Chaque sort décrit son propre usage : condition, recharge, limite d'usage (« 1/repos court »…), remise à zéro par les repos (`combat.md`).

Domaines magiques de base : Magie profane & Arcanes (Intelligence), Magie divine & Sacrée et Communion naturelle & Chamanisme (Sagesse), Magie de l'Ombre & Fél (Charisme). Les écoles plus pointues sont des **domaines avancés** (Pyromancie, Chronomancie, Démonologie & Fél…), qui s'ouvrent par leurs prérequis et se lancent avec la plus haute des caractéristiques liées, sans spécialité.

## Lancer un sort offensif

Un sort qui inflige des dégâts lance un **jet de domaine, sans arme** :

- le domaine avancé le plus spécialisé de ses prérequis (Pyromancie pour Météore) ;
- sinon le domaine de magie de base qu'il demande (Magie de l'Ombre & Fél pour Trait d'ombre) ;
- les bombes d'ingénieur se lancent avec Explosifs & Ingénierie.

Les sorts qui touchent d'office (Trait du Chaos maudit) ne lancent pas de jet d'attaque. Leurs dégâts suivent le texte du sort.

## Mana

Décidée le 2026-10-19 (`plans/40-mana.md`).

- **Domaines magiques** : les 4 domaines de base cités plus haut et les domaines avancés de magie (Nécromancie & Peste, Maîtrise des Arcanes, Givre & Altération, Pyromancie, Chronomancie, Runes Anciennes, Maîtrise des Éléments, Astral & Céleste, Lumière Vengeuse, Discipline & Absolution, Démonologie & Fél, Malédictions & Affliction, Magie du Vide, Magie Draconique). Les artisanats hybrides, Élixirs arcaniques et Dressage sauvage n'en sont pas.
- **Jauge** : elle apparaît sur la fiche dès un rang dans un domaine magique. **Mana max = la plus haute carac entre INT, SAG et CHA + la somme des rangs dans les domaines magiques.** Ex. : INT 3 et Profane 1 → 4 ; INT 4, Profane 4 et Pyromancie 3 → 11. Un nouveau rang magique remplit la jauge d'autant.
- **Repos** : le repos court rend un tiers de la mana max, arrondi au-dessus (4 → +2, 10 → +4) ; le repos long la remplit.
- **Sorts** : toute compétence active qui exige un domaine magique coûte de la mana (`manaCost` dans le catalogue, de 1 à 5). Coût de départ = rang exigé dans le domaine de base, ou rang exigé dans le domaine avancé + 2, plafonné à 5 ; le catalogue peut ensuite régler chaque sort à part.
- **Lancer** : un sort avec un jet paie sa mana au moment du jet (une relance repaie). Un sort sans jet (soin, buff, hors combat) réussit d'office et se paie d'un tap sur la carte. Sans assez de mana, le bouton est grisé.

## Concentration

Sur un sort, le joueur peut choisir **un** mode, pour ce lancer seulement :

- **Économe** : coût en mana − ⌊coût / 3⌋, avec au moins 1 de réduction ; un sort coûte toujours au moins 1 (1 → 1, 2 → 1, 3 → 2, 5 → 4, 6 → 4) ;
- **Étendue** : portée ou durée ×2 ;
- **Puissante** : +1d6 au jet de domaine. Elle n'existe pas pour les sorts sans jet (réussite automatique).

## Non défini par les règles

Rage, Énergie et autres réserves de classe : la fiche propose des **réserves libres** (un nom, une valeur et un maximum, réglés à la main). Aucun repos ne les remplit.
