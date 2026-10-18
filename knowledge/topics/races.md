# Races jouables

Source : `docs/regles/Sindragosa.pdf` § 6. Catalogue : `client/src/data/sindragosa/races.ts`.

Six races pour l'Alliance, six pour la Horde. Chacune donne **+1 à une caractéristique** et un **pouvoir racial utilisable une fois par repos court**. Chaque caractéristique est la caractéristique phare d'une race dans chaque faction.

### Alliance

| Race | Carac. +1 | Pouvoir racial (1/repos court) |
|---|---|---|
| Humain | Charisme | **Chacun pour soi** (Action Rapide (Réaction)) : Dissipe immédiatement n'importe quel effet d'incapacité mentale ou physique (Étourdissement, Enracinement, Peur ou Sommeil) qui affecte le personnage et restaure instantanément +3 points de RP. |
| Nain | Endurance | **Forme de Pierre** (Action Rapide) : Pendant 2 tours, le Nain gagne +2 AP (Armure Physique) supplémentaire, purge tous les effets actifs de Saignement, Poison et Maladie, et devient immunisé à ces derniers pour la durée du pouvoir. |
| Elfe de la Nuit | Agilité | **Camouflage dans l'Ombre** (Action Rapide) : L'Elfe fond instantanément dans les ombres et devient totalement invisible tant qu'il reste immobile. Si la première action qu'il effectue en sortant du camouflage est une attaque, celle-ci gagne +2d6 aux dégâts. |
| Gnome | Intelligence | **Artiste de l'Évasion** (Action Rapide) : Se libère instantanément de tout piège au sol, lien, filet ou effet de ralentissement/enracinement. De plus, il gagne +3 mètres de déplacement pour le tour en cours. |
| Draeneï | Sagesse | **Don des Naaru** (Action Complète) : Invoque une bénédiction lumineuse sur le Draeneï ou un allié adjacent. La cible régénère 5 PV par tour pendant 3 tours (soit 15 PV au total). Ce soin ne peut pas être interrompu par les dégâts. |
| Worgen | Force | **Sombre Trot** (Action Rapide) : Le Worgen prend sa forme sauvage et double sa vitesse de déplacement pendant 2 tours. Sa prochaine attaque de mêlée au cours de cette charge inflige +1d6 de dégâts tranchants supplémentaires. |

### Horde

| Race | Carac. +1 | Pouvoir racial (1/repos court) |
|---|---|---|
| Orc | Force | **Fureur Sanguinaire** (Action Rapide) : Pendant 2 tours, le personnage ajoute +1d6 à tous ses jets de dégâts physiques en mêlée ou à distance, et devient totalement immunisé aux effets de Peur. |
| Troll | Agilité | **Berserker** (Action Rapide) : Le Troll entre dans une transe de frénésie. Pendant 1 tour complet, toutes ses actions coûtent 1 cran de moins (une Action Complète devient une Action Rapide, une Action Rapide devient une Action Gratuite). |
| Tauren | Endurance | **Choc Martial** (Action Complète) : Frappe violemment le sol du sabot. Tous les ennemis adjacents (rayon de 3 mètres) doivent réussir un jet d'Athlétisme/Équilibre sous peine d'être assommés (Étourdissement 1 tour) et projetés À terre. |
| Réprouvé | Sagesse | **Volonté des Réprouvés** (Action Rapide (Réaction)) : Immunise ou annule immédiatement les effets de Charme, Peur et Sommeil. De plus, si le Réprouvé consomme le cadavre d'un humanoïde ou d'une bête fraîchement tuée hors combat (1 minute), il régénère 50 % de ses PV Max. |
| Elfe de Sang | Intelligence | **Torrent Arcane** (Action Rapide) : Libère une onde de choc magique qui réduit au silence tous les lanceurs de sorts ennemis dans un rayon de 4 mètres pendant 1 tour, tout en restaurant 5 points de Mana / Énergie (ou 3 RP) à l'Elfe de Sang. |
| Goblin | Charisme | **Saut de Fusée / Fusée de Poche** (Action Rapide) : Au choix lors du déclenchement — Saut : déploie sa ceinture à fusée pour se propulser instantanément à 8 mètres dans n'importe quelle direction (ignore les obstacles au sol). Tir : tire une roquette de poche infligeant 2d6 dégâts de Feu de zone (2m) à distance. |

Repères : le PDF dit « 1/jour », passé à 1/repos court le 2026-10-19 ; déplacement de base 6 m ; AP = Armure Physique (`combat.md`). Encore non définis : RP, Mana / Énergie, jet « Athlétisme/Équilibre » (voir `ROADMAP.md`).

Le contexte historique des peuples est dans `monde-azeroth.md`.
