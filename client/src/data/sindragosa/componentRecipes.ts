/**
 * Patrons de composants (maison, décidé le 2026-10-19 — plans/38-composants-artisanat.md).
 * Le PDF ne dit pas comment obtenir la plupart des composants : ces patrons ferment la chaîne
 * récolte (harvest.ts) → composant → patron. Chaque composant vient du métier de sa matière :
 * la Forge fond le métal, le Travail du cuir tanne et file, l'Alchimie fait fioles, huiles et encres,
 * l'Ingénierie façonne les lingots en pièces et fait les poudres.
 */
import type { Recipe } from './types'

type Line = [qty: number, name: string]

function recipe(craft: string, n: number, rank: number, name: string, components: Line[], batch: number | null = null): Recipe {
  return {
    id: `${craft}-c${String(n).padStart(2, '0')}`,
    craft,
    rank,
    name,
    batch,
    components: components.map(([qty, name]) => ({ qty, name })),
    effect: "Composant d'artisanat.",
  }
}

const by = (craft: string) => (n: number, rank: number, name: string, components: Line[], batch?: number) =>
  recipe(craft, n, rank, name, components, batch)
const forge = by('forge')
const cuir = by('cuir')
const inge = by('ingenierie')
const alchi = by('alchimie')

export const COMPONENT_RECIPES: Recipe[] = [
  // Forge : fonte et métal travaillé (les lingots de Fer, Acier, Mithril, Thorium et Arcanite sont dans le PDF)
  forge(1, 1, 'Lingot de Cuivre', [[2, 'Minerais de Cuivre']]),
  forge(2, 1, 'Lingot de Bronze', [[1, 'Minerai de Cuivre'], [1, "Minerai d'Étain"]]),
  forge(3, 1, "Fil d'étain", [[1, "Minerai d'Étain"]], 2),
  forge(4, 1, 'Charbon purifié', [[2, 'Charbons']]),
  forge(5, 1, 'Manche en bois', [[1, 'Bois dur']]),
  forge(6, 1, 'Crochet de fer', [[1, 'Lingot de Fer']], 2),
  forge(7, 1, 'Monture en bronze', [[1, 'Lingot de Bronze']]),
  forge(8, 2, 'Manche renforcé', [[1, 'Bois dur'], [1, 'Lingot de Fer']]),
  forge(9, 2, "Lingot d'Argent", [[2, "Minerais d'Argent"]]),
  forge(10, 2, "Lingot d'Or", [[2, "Minerais d'Or"]]),
  forge(11, 2, 'Lingot de Pyrite', [[2, 'Minerais de Pyrite']]),
  forge(12, 2, "Fil d'argent", [[1, "Lingot d'Argent"]], 2),
  forge(13, 2, "Fil d'acier", [[1, "Lingot d'Acier"]], 2),
  forge(14, 2, "Fil d'or sacré", [[1, "Lingot d'Or"]], 2),
  forge(15, 2, 'Monture en argent', [[1, "Lingot d'Argent"]]),
  forge(16, 2, 'Monture en or', [[1, "Lingot d'Or"]]),
  forge(17, 3, 'Flux arcanique', [[1, "Essence d'Arcane"], [1, 'Sel de roche']]),
  forge(18, 3, 'Gemme taillée', [[1, 'Gemme brute']]),
  forge(19, 4, 'Flux de maître', [[1, 'Flux arcanique'], [1, 'Charbon purifié']]),
  forge(20, 4, 'Rubis parfait', [[1, 'Rubis brut']]),
  forge(21, 4, 'Saphir parfait', [[1, 'Saphir brut']]),
  forge(22, 4, 'Chaîne impie', [[2, 'Lingots de Thorium'], [1, "Essence d'ombre"]]),
  forge(23, 5, "Lingot d'Adamantine", [[3, "Minerais d'Adamantine"]]),

  // Travail du cuir : tannage et textiles (Lanière, Cuir durci, Cuir d'élite et Cuir légendaire sont dans le PDF)
  cuir(1, 1, 'Cuir brut', [[1, 'Peau brute']]),
  cuir(2, 1, 'Fil simple', [[1, 'Laine']], 2),
  cuir(3, 1, 'Tissu', [[2, 'Laines']]),
  cuir(4, 1, 'Feutre', [[2, 'Laines']]),
  cuir(5, 1, 'Corde en boyau', [[2, 'Tendons de bête']]),
  cuir(6, 2, 'Cuir traité', [[2, 'Cuirs bruts'], [1, 'Herbe amère']], 2),
  cuir(7, 2, 'Cuir fin', [[2, 'Cuirs bruts'], [1, 'Graisse animale']], 2),
  cuir(8, 2, 'Fil de soie', [[2, "Soies d'araignée"]], 2),
  cuir(9, 2, 'Sangle de cuir', [[2, 'Lanières de cuir']]),
  cuir(10, 2, 'Papyrus de soie', [[1, 'Peau brute'], [1, 'Fil de soie']], 2),
  cuir(11, 2, "Fil d'ambre", [[1, 'Fil de soie'], [1, "Larmes d'ambre"]]),
  cuir(12, 3, 'Cuir épais', [[1, 'Peau épaisse'], [1, 'Sel de roche']]),
  cuir(13, 4, "Fil de soie d'ombre", [[2, 'Soies de nuit']], 2),

  // Ingénierie : pièces façonnées, poudres, optique et énergie
  inge(1, 1, 'Pièce de cuivre', [[1, 'Lingot de Cuivre']], 2),
  inge(2, 1, 'Engrenage', [[1, 'Lingot de Bronze']], 2),
  inge(3, 1, 'Poudre noire', [[1, 'Charbon'], [1, 'Salpêtre']], 2),
  inge(4, 1, 'Papier kraft', [[1, 'Bois simple']], 2),
  inge(5, 1, 'Mèche', [[1, 'Papier kraft'], [1, 'Poudre noire']], 3),
  inge(6, 1, 'Verre', [[2, 'Sables']]),
  inge(7, 1, 'Crosse en bois', [[1, 'Bois simple']]),
  inge(8, 1, 'Douille', [[1, 'Pièce de cuivre']], 5),
  inge(9, 2, 'Bobine de cuivre pur', [[2, 'Lingots de Cuivre']]),
  inge(10, 2, 'Pièce de bronze', [[1, 'Lingot de Bronze']], 2),
  inge(11, 2, 'Pièce de fer', [[1, 'Lingot de Fer']], 2),
  inge(12, 2, 'Plaque de fer', [[2, 'Lingots de Fer']]),
  inge(13, 2, 'Plaque de bronze', [[2, 'Lingots de Bronze']]),
  inge(14, 2, 'Poudre forte', [[2, 'Poudres noires'], [1, 'Salpêtre']]),
  inge(15, 2, 'Boîtier de fer', [[1, 'Plaque de fer']]),
  inge(16, 2, "Boîtier d'or", [[1, "Lingot d'Or"]]),
  inge(17, 2, 'Hélice', [[2, 'Pièces de bronze']]),
  inge(18, 2, 'Canon', [[1, "Lingot d'Acier"]]),
  inge(19, 2, 'Lentille', [[1, 'Verre'], [1, 'Quartz']]),
  inge(20, 2, 'Seringue de verre', [[1, 'Verre'], [1, 'Pièce de cuivre']]),
  inge(21, 2, 'Trépied', [[3, 'Pièces de fer']]),
  inge(22, 2, 'Niveau à bulle', [[1, 'Verre'], [1, 'Pièce de bronze']]),
  inge(23, 2, 'Mât de cuivre', [[3, 'Lingots de Cuivre']]),
  inge(24, 3, 'Poudre lourde', [[2, 'Poudres fortes'], [1, 'Charbon']]),
  inge(25, 3, 'Émetteur', [[2, 'Pièces de cuivre'], [1, 'Quartz']]),
  inge(26, 3, 'Quartz arcanique', [[1, 'Quartz'], [1, "Essence d'Arcane"]]),
  inge(27, 3, 'Piston hydraulique', [[2, 'Pièces de fer'], [1, 'Ressort']]),
  inge(28, 3, 'Condensateur', [[1, 'Bobine de cuivre pur'], [1, 'Plaque de fer']]),
  inge(29, 3, 'Générateur à manivelle', [[1, 'Bobine de cuivre pur'], [2, 'Engrenages']]),
  inge(30, 4, 'Pièce de Thorium', [[1, 'Lingot de Thorium']], 2),
  inge(31, 4, 'Plaque de Thorium', [[2, 'Lingots de Thorium']]),
  inge(32, 4, 'Poudre Nitro', [[2, 'Poudres lourdes'], [2, 'Salpêtres']]),
  inge(33, 4, "Amorçage d'élite", [[1, 'Poudre Nitro'], [1, 'Pièce de Thorium']]),
  inge(34, 4, 'Chargeur tambour', [[2, 'Pièces de Thorium'], [1, 'Ressort']]),
  inge(35, 4, "Lentille d'arcanite", [[1, 'Lentille'], [1, 'Cristal de mana']]),
  inge(36, 4, "Pile d'élite", [[2, 'Piles à vapeur'], [1, 'Cristal de mana']]),
  inge(37, 4, 'Micro-processeur méca', [[2, 'Pièces de Thorium'], [1, 'Quartz arcanique']]),
  inge(38, 4, 'Gyroscope de maître', [[2, 'Engrenages de précision'], [1, 'Pièce de Thorium']]),
  inge(39, 5, "Pièce d'Arcanite", [[1, "Lingot d'Arcanite"]], 2),
  inge(40, 5, "Plaque d'Arcanite", [[2, "Lingots d'Arcanite"]]),
  inge(41, 5, "Boîtier d'arcanite", [[1, "Plaque d'Arcanite"]]),
  inge(42, 5, "Poudre d'Azérite", [[1, "Cristal d'Azérite"], [1, 'Poudre Nitro']]),

  // Alchimie : fioles, huiles, teintures, encres et eaux bénites
  alchi(1, 1, "Fiole d'eau", [[1, 'Sable'], [1, 'Eau de source']]),
  alchi(2, 1, 'Eau-de-vie', [[2, 'Mageroie']]),
  alchi(3, 1, 'Alcohest', [[1, 'Eau-de-vie'], [1, 'Feuillargent']]),
  alchi(4, 1, 'Huile végétale', [[2, 'Graines oléagineuses']]),
  alchi(5, 1, 'Teinture', [[2, "Champignons d'ombre"]]),
  alchi(6, 1, 'Nitre purifié', [[2, 'Salpêtres']]),
  alchi(7, 2, "Fiole d'eau purifiée", [[1, "Fiole d'eau"], [1, 'Charbon']]),
  alchi(8, 2, 'Poudre de suie', [[2, 'Charbons']]),
  alchi(9, 2, 'Eau bénite', [[1, "Fiole d'eau purifiée"], [1, 'Poussière de sanctuaire']]),
  alchi(10, 2, 'Huile incendiaire', [[1, 'Huile végétale'], [1, 'Poussière de braise']]),
  alchi(11, 2, 'Venin concentré', [[2, 'Glandes à venin mineures']]),
  alchi(12, 2, 'Filtre de charbon végétal', [[2, 'Charbons']]),
  alchi(13, 2, "Poudre d'ambre pur", [[2, "Larmes d'ambre"]]),
  alchi(14, 2, 'Encre arcanique', [[1, 'Teinture'], [1, "Essence d'Arcane"]]),
  alchi(15, 3, 'Fiole renforcée', [[1, "Fiole d'eau"], [1, 'Sel de roche']]),
  alchi(16, 3, "Fiole d'acide", [[1, 'Fiole renforcée'], [2, 'Sécrétions acides']]),
  alchi(17, 3, 'Huile bénite', [[1, 'Huile végétale'], [1, 'Eau bénite']]),
  alchi(18, 3, "Essence d'Arcane purifiée", [[2, "Essences d'Arcane"]]),
  alchi(19, 4, 'Eau bénite majeure', [[2, 'Eaux bénites'], [1, 'Fragment de cristal sacré']]),
  alchi(20, 4, 'Catalyste sacré', [[1, 'Eau bénite majeure'], [1, 'Cristal de mana']]),
  alchi(21, 5, "Fiole d'acide suprême", [[1, "Fiole d'acide"], [1, "Acide d'Ancien"]]),
]
