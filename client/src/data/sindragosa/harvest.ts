/**
 * Matières premières : les composants qu'aucun patron ne fabrique. On les récolte
 * (jet de la spécialité adaptée, arbitré par le MJ) ou on les prend sur une créature.
 * Tout le reste se fabrique : voir componentRecipes.ts (décidé le 2026-10-19 — plans/38).
 */
export type HarvestSource = 'minage' | 'depecage' | 'cueillette' | 'bucheronnage' | 'butin'

const list = (source: HarvestSource, names: string[]) => names.map((name) => ({ name, source }))

export const HARVEST: { name: string; source: HarvestSource }[] = [
  ...list('minage', [
    'Minerai de Fer', 'Minerai de Cuivre', "Minerai d'Étain", "Minerai d'Argent", "Minerai d'Or", 'Minerai de Pyrite',
    'Minerai de Mithril', 'Minerai de Thorium', "Minerai d'Adamantine", "Poussière d'Adamantine",
    'Charbon', 'Salpêtre', 'Sable', 'Sel de roche', 'Phosphore', 'Pierre à feu', 'Pierre de foyer', 'Quartz',
    'Gemme brute', 'Rubis brut', 'Saphir brut', 'Émeraude brute', 'Diamant brut', 'Éclat de météorite', "Cristal d'Azérite",
  ]),
  ...list('bucheronnage', [
    'Bois simple', 'Bois dur', 'Bois-fer', "Bois d'ébène", "Bois d'épinette", "Bois d'Ancien", 'Écorce', 'Écorce de Bois-fer',
  ]),
  ...list('cueillette', [
    'Eau de source', 'Graine oléagineuse', 'Feuillargent', 'Terre-racine', 'Pacifique', 'Mageroie', 'Douce-amère', 'Herbe amère',
    'Églantine', 'Sang-royal', 'Chape-argent', 'Ortis-de-mer', 'Algues-de-kelp', "Champignon d'ombre", 'Champignon du Néant',
    'Fleur de peste', 'Fleur de Lotus', 'Lotus de givre', 'Lotus Noir', 'Sansam', 'Sansam aveugle', 'Gromsanguine', 'Sauge-argent',
    "Racine d'acier", 'Rosée du matin', "Larmes d'ambre", 'Sève sacrée', 'Soie végétale', 'Feuillet de lianes', 'Liane renforcée',
    'Épine de ronces', "Graine d'épines métalliques", 'Spore de champignons vénéneux',
  ]),
  ...list('depecage', [
    'Peau brute', 'Peau épaisse', 'Laine', 'Laine rare', "Soie d'araignée", "Soie d'araignée géante", 'Soie de nuit',
    'Tendon de bête', 'Tendon de bête rapide', 'Graisse animale', 'Dent de prédateur', 'Griffe de bête', 'Griffe de dragonnet',
    "Fourrure d'hiver", 'Écaille mineure', 'Écaille rare', 'Écaille de basilic', 'Écaille légendaire', 'Écaille de dragon noir',
    'Écaille de dragon bleu', "Écaille de dragon d'albâtre", 'Écaille de dragon ancestral', 'Os géant', 'Os de dragon rouge',
    'Os de dragon vert', 'Plume de griffon', 'Plume de griffon alpha', 'Plume de phénix', 'Glande à venin mineure',
    'Glande de basilic', 'Glande de poison', 'Glande de Wyverne', 'Venin de veuve', 'Venin de Dragon Noir', 'Sécrétion acide',
    'Sang de dragonnet', 'Sang de wyrm', 'Sang de Chimère', 'Sang de démon majeur', 'Moelle de bête géante', 'Œil de chimère',
    'Oeil de nyctaclope', 'Œil de wyrm', 'Cervelle de Fiend', "Crâne d'élite", 'Herbivore lyophilisé', 'Cœur de Leshen Ancien',
    'Cœur de Phénix primordial',
  ]),
  ...list('butin', [
    "Acide d'Ancien", 'Cendre de démon', "Cœur d'Arcane", "Cœur d'Archidémon", "Cœur d'éléments", 'Cœur de feu', 'Cœur de lave',
    "Cristal d'Arcane", 'Cristal de foudre', 'Cristal de mana', 'Cristal de temps', 'Cristal du Néant', "Essence d'eau",
    "Essence d'ombre", 'Essence de feu', 'Essence de force', 'Essence de polymorphe', 'Essence de sang', 'Essence de titan',
    "Essence d'Arcane", 'Essence de nature purifiée', 'Essence de sang séché', 'Essence de vide', 'Fragment de cristal sacré',
    "Noyau d'élémentaire d'eau", 'Noyau de pierre', 'Noyau de pierre lourde', 'Noyau de séisme', "Poussière d'Arcanite",
    "Poussière d'étoile", 'Poussière de braise', 'Poussière de téléportation', 'Poussière de sanctuaire', 'Poussière de tombe',
    'Sable du temps', 'Sable du temps primordial',
  ]),
]
