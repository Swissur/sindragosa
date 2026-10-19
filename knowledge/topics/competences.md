# Compétences (pouvoirs)

Règles telles que l'app les applique. Origine : `docs/regles/Compétences & Domaines (Sindragosa).pdf`. Catalogue : `client/src/data/sindragosa/abilities.ts` (491 compétences : les 490 du PDF, en transcription assistée, plus une compétence maison, Forme de félin). Le catalogue prime sur le PDF. Moteur : `client/src/utils/sindragosa/prerequisites.ts`.

## Fonctionnement

- Une compétence se **débloque automatiquement** dès que tous ses prérequis sont réunis. Le joueur ne voit que ses compétences débloquées ; le catalogue complet (verrouillées comprises) est réservé au MJ.
- Prérequis possibles : rang d'un domaine, rang d'un domaine avancé, niveau d'une spécialité, titre. Un prérequis sans rang précisé vaut **rang 1**. Une spécialité écrite « Dagues/Lutte » accepte l'une ou l'autre, et les synonymes de `personnage.md` comptent.
- Une compétence peut avoir une **autre voie** : Forme d'ours s'obtient par ses prérequis du PDF **ou** par la spécialité Forme animale (Apprenti).
- Les **titres** exigés (22) ne s'accordent que par le MJ (`progression.md`).
- Débloquer certaines compétences ouvre un domaine avancé (Ivresse du combat, Danse des lames, compétences d'artisanat hybride) ou offre une spécialité du même nom (Second souffle, Analyse des failles) : voir `personnage.md`.
- Chaque compétence précise un **type d'action** (complète, rapide, réaction, passif, hors combat, dialogue), une condition éventuelle, une recharge en tours et une **limite d'usage** : par combat, repos court, repos long, jour, séance, scénario ou campagne. La recharge est indiquée sur la carte, pas décomptée.

### Usages limités

Une compétence limitée s'utilise **une fois par période** : le joueur la marque utilisée sur sa carte (un second tap la rend, pour corriger). Les repos lancés par le MJ remettent les usages à zéro (`combat.md`) :

| Repos | Usages rendus |
|---|---|
| Repos court | par combat, par repos court |
| Repos long | les mêmes + par repos long et « 1/jour » (1/jour = 1/repos long, décidé le 2026-10-18) |
| Fin de séance | par séance |

Les usages par scénario et par campagne ne reviennent jamais d'eux-mêmes.

### Attaques (décidé le 2026-10-19)

Toute compétence qui fait une attaque lance son jet depuis sa carte :

- **à l'arme** : avec l'arme équipée (un tir prend l'arme de tir, une frappe l'arme de contact, à défaut la première arme équipée) ; sans arme équipée, pas de jet ;
- **naturelle** : avec l'arme naturelle équipée, sinon les mains nues (Athlétisme) ;
- **sort** : jet de domaine sans arme, avec le domaine avancé le plus spécialisé des prérequis, sinon le domaine de magie de base. Seuls les sorts qui infligent des dégâts sont des attaques.

### Transformations

Une transformation se prend et se quitte d'un tap sur sa carte ; les repos ne la lèvent pas. Son arme naturelle **remplace** les armes équipées, pour la frappe simple comme pour les compétences d'attaque à l'arme.

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

**Forme de félin** est une compétence maison (décidé le 2026-10-19) : le PDF exige la « Forme de Félide » (Griffe d'ombre, Célérité céleste, Instinct de survie) sans rien qui la donne. Elle s'obtient avec la spécialité Forme animale (Apprenti). La Forme du Vide n'a pas d'arme : c'est une forme de sorts.

## Catégories

| Catégorie | Compétences |
|---|---|
| Voies offensives | 25 |
| Voies défensives, survie & endurance | 21 (dont Forme de félin) |
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
