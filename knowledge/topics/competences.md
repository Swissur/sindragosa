# Compétences (pouvoirs)

Source : `docs/regles/Compétences & Domaines (Sindragosa).pdf`. Catalogue : `client/src/data/sindragosa/abilities.ts` (490 compétences, transcription assistée). Moteur : `client/src/utils/sindragosa/prerequisites.ts`.

## Fonctionnement

- Une compétence se **débloque automatiquement** dès que tous ses prérequis sont réunis.
- Prérequis possibles : rang d'un domaine, rang d'un domaine avancé, niveau d'une spécialité, titre. Un prérequis sans rang précisé vaut **rang 1**. Une spécialité écrite « Dagues/Lutte » accepte l'une ou l'autre.
- Chaque compétence précise un **type d'action** (complète, rapide, réaction, gratuite, passif, hors combat, dialogue), une condition éventuelle, une recharge en tours et une **limite d'usage** : par combat, repos court, repos long, jour, séance, scénario ou campagne. Les repos remettent ces usages à zéro (`combat.md`).

## Catégories

| Catégorie | Compétences |
|---|---|
| Voies offensives | 25 |
| Voies défensives, survie & endurance | 20 |
| Voies arcaniques, technomancie & érudition | 20 |
| Voies divines, spirituelles & naturelles | 20 |
| Voies d'ombre, fél, commandement & tromperie | 15 |
| Voies martiales, guerre & sang | 50 |
| Voies arcaniques, éléments & chronomancie | 50 |
| Voies divines, lumière & sacré | 40 |
| Voies de l'ombre, fél & démonologie | 40 |
| Voies techniques, artisanat & tactique | 20 |
| Passifs de survie, d'armure & de santé | 15 |
| Voies sociales & commerce | 30 |
| Voies de l'endurance, ténacité & survie extrême | 20 |
| Voies de la force, brutalité & destruction | 10 |
| Perfectionnement des artisanats de départ | 10 |
| Artisanats dérivés & hybrides | 40 |
| Suite & fin des compétences d'artisanat | 65 |

Le texte complet de chaque compétence vit dans le catalogue de l'app ; ce fichier n'en garde que l'organisation.
