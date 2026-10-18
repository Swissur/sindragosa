# Artisanat

Source : `docs/regles/Artisanat (Sindragosa).pdf`. Catalogue : `client/src/data/sindragosa/crafts.ts` (24 métiers, 300 recettes). Moteur : `client/src/utils/sindragosa/crafting.ts`.

## Fabriquer

**Réunir les composants de la recette, puis réussir un jet du domaine du métier** (le premier domaine cité dans sa base). - Il faut **avoir les composants** dans l'inventaire pour lancer le jet (singulier et pluriel se valent : « Lingot de Fer brut » = « Lingots de Fer brut »).
- Les composants sont **consommés à chaque jet**, réussi ou raté.
- Un jet réussi (au moins 1 succès) met l'objet **directement dans l'inventaire** du fabricant, avec son type déduit du patron (arme et son gabarit, armure et son AP, consommable, composant).

- Les **métiers de base** ont des rangs de 1 à 5 : on accède aux recettes de son rang et des rangs inférieurs.
- Les **métiers hybrides** croisent deux domaines ou plus ; leurs recettes n'ont pas de rang.

## Métiers

| Métier | Type | Base | Résumé | Recettes |
|---|---|---|---|---|
| Forge & Métallurgie | de base | Artisanat lourd - Force | Armes, plaques, minage, gros œuvrage. | 50 |
| Travail du Cuir & Écorchage | de base | Artisanat de précision - Agilité | Cuir, mailles légères, couture, écorchage. | 50 |
| Ingénierie Goblino-Gnome | de base | Ingénierie - Intelligence | Explosifs, tourelles, gadgets, automates. | 50 |
| Alchimie & Herboristerie | de base | Alchimie & Botanique - Sagesse | Potions, Plantes, Toxines. | 50 |
| Forge-Magie & Enchantement Métallique | hybride | Artisanat lourd + Arcanes | Armes runiques, lames d'énergie. | 5 |
| Alchimi-Cuir & Toxicologie Végétale | hybride | Artisanat de précision + Alchimie | Armures empoisonnées, masques à gaz. | 5 |
| Méca-Botanique & Chimiste Explosif | hybride | Ingénierie + Alchimie/Nature | Grenades de spores, robots alchimiques. | 5 |
| Électro-Mécanique (Ingénierie de la Foudre) | hybride | Ingénierie + Chamanisme | Condensateurs, cages électriques. | 5 |
| Nécro-Forge & Sang-Métal | hybride | Artisanat lourd + Ombre/Nécromancie | Lames vampiriques, cuirasses maudites. | 5 |
| Cuirasse Sacrée & Orfèvrerie Bénie | hybride | Artisanat de précision + Sacré | Reliques d'argent, tissus de lumière. | 5 |
| Archerie d'Artisan & Pièges de Chasse | hybride | Artisanat de précision + Tir/Survie | Arbalètes d'engrenage, empennages rares. | 5 |
| Horlogerie Chronomantique | hybride | Ingénierie + Chronomancie | Cadrans de hâte, horloges de réversion. | 5 |
| Forge-Feu & Pyro-Métallurgie | hybride | Artisanat lourd + Pyromancie | Armes de magma, pyrite incandescente. | 5 |
| Tissage Végétal & Tisses-Bois | hybride | Artisanat de précision + Druidisme | Écorce de fer tissée, capes de lianes. | 5 |
| Gemmologie & Cristallomancie | hybride | Artisanat lourd + Precision + Arcanes | Taillage de rubis, prismes magiques. | 5 |
| Artillerie de Siège & Canonnerie | hybride | Artisanat lourd + Ingénierie | Mortiers portables, démolition de fortins. | 5 |
| Botterie & Équipement d'Acrobatie | hybride | Artisanat de précision + Acrobatie | Bottes silencieuses, crampons de dragon. | 5 |
| Cyber-Équipement & Exosquelettes | hybride | Artisanat lourd + Ingénierie + Force | Servo-bras, plaques cinétiques. | 5 |
| Parcheminerie & Tissage Runique | hybride | Artisanat de précision + Arcanes | Parchemins de sorts, reliures d'acier. | 5 |
| Prothésiste & Chirurgie Mécanique | hybride | Ingénierie + Soins | Membres en mithril, injecteurs automatiques. | 5 |
| Chimie Explosive & Poudre Noire | hybride | Ingénierie + Alchimie + Tir | Poudre enrichie, mines au naphte. | 5 |
| Charpenterie de Marine & Siège | hybride | Artisanat lourd + Tactique | Barricades d'urgence, béliers lourds. | 5 |
| Tissage d'Ambre & Soie d'Arachnide | hybride | Artisanat de précision + Nature/Ombre | Tunique en soie d'araignée, filets d'acier-soie. | 5 |
| Dracono-Forge & Écaillage Légendaire | hybride | Artisanat lourd + Précision + Magie draconique | Armures en écailles de dragon, armes en os d'Ancien. | 5 |
