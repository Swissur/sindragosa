# 42 — Les états

Décidé le 2026-10-19. Remplace les 13 états d'Arran, écrits en d20 (`client/src/data/etats.ts`).

## Principe

Un état est un **rappel avec une durée** : il garde un compteur de tours, qui baisse à la fin du tour de la créature, et s'efface tout seul à 0. Le MJ applique l'effet aux jets ; rien n'est ajouté automatiquement à la feuille de jet. Une durée absente = jusqu'à ce qu'on le retire (Maladie, Désarmé). Le repos long lève toujours tout.

« X » = la valeur donnée par la compétence ou le monstre qui pose l'état.

## Les 14 états

| État | Effet |
|---|---|
| **Étourdissement** | Aucune action ; −2d6 en défense (parer, esquiver). |
| **Paralysie** | Aucune action ni défense : la marge de l'attaquant compte en entier. |
| **Sommeil** | Aucune action ni défense. Se réveille dès qu'il subit des dégâts, ou si un allié le secoue (action Rapide). |
| **Surprise** | Au premier tour : aucune action ; −2d6 en défense. |
| **Peur** | Chaque tour, utilise son action de Mouvement pour s'éloigner de la source ; ne peut pas l'attaquer. Garde son action Rapide. |
| **Charme** | Voit le lanceur en ami : ne peut ni l'attaquer ni le cibler. Cesse si le lanceur ou ses alliés l'attaquent. |
| **Silence** | Ne peut lancer aucun sort ni utiliser une compétence vocale (cri, chant, commandement). |
| **Enracinement** | Ne peut pas se déplacer ; −1d6 pour esquiver (la parade reste normale). |
| **Ralentissement** | Déplacement divisé par deux (3 m au lieu de 6). |
| **À terre** | −1d6 à l'attaque et à la défense ; se relever coûte l'action de Mouvement. |
| **Aveuglement** | −1d6 à l'attaque au contact et à la défense ; attaques à distance et sorts ciblés impossibles. |
| **Affaiblissement** | −1d6 à tous les jets. |
| **Désorientation** | −1d6 à tous les jets (courte durée, souvent 1 tour). |
| **Désarmé** | A lâché son arme : la ramasser coûte l'action de Mouvement. En attendant, Mains nues (Athlétisme, 1 dégât). |

Et trois états qui font perdre des PV ou empêchent d'en récupérer :

| État | Effet |
|---|---|
| **Saignement** | Perd X PV (1 par défaut) au début de chacun de ses tours, sans armure. Un jet de Médecine & Soins d'1 succès (action Complète) ou un soin magique l'arrête. |
| **Poison** | Perd X PV par tour, sans armure. À la fin de chacun de ses tours, un jet de Tolérance aux toxines (palier du poison, moyen par défaut) l'en débarrasse. |
| **Maladie** | −1d6 à tous les jets ; le repos long ne rend pas de PV. Se guérit par un jet de Médecine & Soins ou de Tolérance aux toxines, ou par un soin magique. Dure des jours, pas des tours. |

## Ce qui disparaît

- **Bloqué** et **Immobilisé** : fondus dans Enracinement.
- **Repoussé** : effet instantané, la compétence dit de combien on recule.
- **Diversion** et **Menacé** : rien ne les produit dans Sindragosa.
- Étourdi devient Étourdissement, Renversé devient À terre, Paralysé devient Paralysie, etc. (noms des règles).

**Migration** : les états posés aujourd'hui sont tous effacés (fiches et combattants). Ils ne durent qu'un combat.

## Implémentation

1. `data/etats.ts` : les 17 états, leurs effets en d6, icônes Lucide et emoji du pion → tests.
2. Stockage : `states` passe de `string[]` à `{ id, turns? }[]` (fiche et `combat_participant`), migration qui vide les états → whitelist serveur.
3. Durée : le passage au tour suivant décrémente les états de la créature dont le tour s'achève et retire ceux à 0 → tests.
4. UI : durée affichée sur la pastille, choisie à la pose (AppStepper, vide = sans durée).
5. ~~Saignement / Poison : X affiché sur la pastille, rappel au début du tour.~~ Pas fait : X reste dans le texte de la compétence.
6. `knowledge/topics/combat.md` (section états), puis ROADMAP.

## État (2026-10-19)

Étapes 1 à 4 et 6 faites. La durée choisie à la pose vaut 1 tour par défaut (0 = sans durée) ; pour changer la durée d'un état posé, on le retire puis on le repose. « Précédent » ne rend pas les tours retirés. Sur sa propre fiche, un joueur pose ses états sans durée.
