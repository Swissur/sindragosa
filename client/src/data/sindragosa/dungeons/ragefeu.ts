import { buildMonster } from '../../../utils/sindragosa/bestiary'
import type { Dungeon, LootItem } from '../types'

/**
 * Le Gouffre de Ragefeu, version d'avant le Cataclysme (Taragaman, Jergosh, Bazzalan).
 * Noms français du jeu pour les boss ; sources : JudgeHype, warcraft.wiki.gg, Wowhead.
 * Calibré pour 4 ou 5 personnages débutants (20 à 40 PV, réserves de 4 à 6 d6),
 * un cran sous les Mortemines : c'est le premier donjon de la Horde.
 */

// ── Les troggs et les bêtes des profondeurs ─────────────────────────────────

const trogg = buildMonster({
  name: 'Trogg de Ragefeu',
  size: 'petite',
  threat: 1,
  stats: { str: 3, agi: 2, end: 3, int: 1, wis: 2, cha: 1 },
  hp: 8,
  armorKind: 'cuir',
  attacks: [{ name: 'Massue de pierre', damage: 3 }],
  abilities: [
    {
      name: 'Fuite et retour',
      description: "À 3 PV ou moins, il fuit. Deux tours plus tard, il revient avec un trogg de plus (le MJ révèle un trogg gardé en réserve).",
    },
  ],
  description: 'Trogg des cavernes sous Orgrimmar, remonté des profondeurs par la chaleur du magma.',
})

const chaman = buildMonster({
  name: 'Chaman de Ragefeu',
  size: 'petite',
  threat: 1,
  stats: { str: 2, agi: 2, end: 3, int: 2, wis: 4, cha: 2 },
  hp: 9,
  armorKind: 'cuir',
  attacks: [
    { name: 'Bâton', damage: 2 },
    { name: 'Éclair', damage: 3, range: 30, note: 'nature', stat: 'wis' },
  ],
  abilities: [
    {
      name: 'Vague de soins',
      description: 'Action complète, recharge 2 tours : un trogg à 30 m récupère 5 PV.',
    },
  ],
  description: 'Sorcier des troggs, qui marmonne aux pierres et soigne les siens.',
})

const foreTerre = buildMonster({
  name: 'Fore-terre',
  size: 'moyenne',
  threat: 1,
  stats: { str: 3, agi: 2, end: 4, int: 1, wis: 2, cha: 1 },
  hp: 12,
  armorKind: 'carapace',
  attacks: [{ name: 'Mandibules acides', damage: 3, note: 'acide' }],
  abilities: [
    {
      name: 'Acide corrosif',
      description: "Quand ses mandibules touchent, l'armure de la cible baisse de 1 jusqu'à la fin du combat (−2 au plus, toutes sources confondues).",
    },
    {
      name: 'Fouisseur',
      description: "Il surgit du sol : il commence le combat caché (en réserve) si le groupe n'a pas réussi un jet de Perception & Sens (palier moyenne).",
    },
  ],
  description: 'Ver géant qui creuse la roche tiède du gouffre.',
})

const elementaire = buildMonster({
  name: 'Élémentaire en fusion',
  size: 'moyenne',
  threat: 2,
  stats: { str: 4, agi: 2, end: 4, int: 1, wis: 2, cha: 1 },
  hp: 16,
  armorKind: 'carapace',
  attacks: [{ name: 'Poing de lave', damage: 4, note: 'feu' }],
  abilities: [
    {
      name: 'Corps brûlant',
      description: "Qui le frappe au contact avec une arme de métal ou à mains nues subit 1 dégât de feu, moins l'armure.",
    },
    {
      name: 'Élémentaire',
      description: 'Insensible au feu, au poison et au saignement.',
    },
  ],
  description: 'Magma animé, arraché au lac de lave par les sortilèges de la Lame ardente. Moins terrible qu’il n’en a l’air.',
})

// ── La Lame ardente ─────────────────────────────────────────────────────────

const cultiste = buildMonster({
  name: 'Cultiste de la Lame ardente',
  size: 'moyenne',
  threat: 1,
  stats: { str: 3, agi: 3, end: 3, int: 2, wis: 2, cha: 2 },
  hp: 11,
  armorKind: 'cuir',
  attacks: [{ name: 'Lame ardente', damage: 3, note: 'feu' }],
  abilities: [
    {
      name: 'Coup assommant',
      description: "Si son attaque touche avec une marge d'au moins 2, la cible est Étourdie jusqu'à la fin de son prochain tour.",
    },
  ],
  description: 'Orc renégat qui a renié Thrall pour les promesses des démons.',
})

const demoniste = buildMonster({
  name: 'Démoniste de la Lame ardente',
  size: 'moyenne',
  threat: 2,
  stats: { str: 2, agi: 3, end: 2, int: 4, wis: 3, cha: 3 },
  hp: 10,
  armorKind: 'aucune',
  attacks: [
    { name: 'Dague rituelle', damage: 2 },
    { name: "Trait de l'ombre", damage: 4, range: 30, note: 'ombre', stat: 'int' },
  ],
  abilities: [
    {
      name: 'Invocation du Vide',
      description: "Action complète, 1/combat : il appelle un Larbin marcheur du Vide (le MJ révèle celui gardé en réserve). S'il tombe, le larbin disparaît à la fin du round.",
    },
    {
      name: 'Corruption',
      description: "Action rapide, recharge 3 tours : une cible à 30 m fait un test d'END (palier moyenne) ; en cas d'échec, elle perd 2 PV au début de chacun de ses 3 prochains tours.",
    },
  ],
  description: 'Sorcier du Conseil de l’ombre, qui prie la Légion au fond du gouffre.',
})

const executeur = buildMonster({
  name: 'Exécuteur de la Lame ardente',
  size: 'moyenne',
  threat: 2,
  stats: { str: 4, agi: 3, end: 4, int: 2, wis: 2, cha: 3 },
  hp: 18,
  armorKind: 'cuir',
  attacks: [{ name: 'Hache à deux mains', damage: 5 }],
  abilities: [
    {
      name: 'Coup assommant',
      description: "Si son attaque touche avec une marge d'au moins 2, la cible est Étourdie jusqu'à la fin de son prochain tour.",
    },
    {
      name: 'Garde du culte',
      description: "Réaction, 1/round : quand un démoniste ou un boss à son contact est attaqué, il prend sa place et subit l'attaque.",
    },
  ],
  description: 'Bras armé du culte, chargé de faire taire les curieux venus d’Orgrimmar.',
})

const larbin = buildMonster({
  name: 'Larbin marcheur du Vide',
  size: 'grande',
  threat: 1,
  stats: { str: 4, agi: 2, end: 4, int: 1, wis: 2, cha: 1 },
  hp: 14,
  armorKind: 'aucune',
  attacks: [{ name: 'Torrent du Vide', damage: 3, note: 'ombre' }],
  abilities: [
    {
      name: 'Tourment',
      description: "Action rapide : une cible à 10 m a −1d6 à toute attaque qui ne le vise pas, jusqu'à la fin de son prochain tour.",
    },
  ],
  description: 'Serviteur du Vide sans visage, lié au démoniste qui l’a appelé.',
})

// ── Les boss ────────────────────────────────────────────────────────────────

const lorgnesilex = buildMonster({
  name: 'Lorgnesilex',
  size: 'moyenne',
  threat: 2,
  stats: { str: 5, agi: 2, end: 5, int: 1, wis: 2, cha: 2 },
  hp: 28,
  armorKind: 'cuir',
  attacks: [{ name: 'Masse de chef', damage: 5 }],
  abilities: [
    {
      name: 'Cri de ralliement',
      description: 'Action rapide, 1/combat : tous les troggs gardés en réserve entrent en jeu, et les troggs en fuite reviennent aussitôt.',
    },
    {
      name: 'Coup de boutoir',
      description: "Action complète, recharge 2 tours : une attaque ; si elle touche, la cible est repoussée de 3 m et tombe à terre.",
    },
  ],
  description: 'Chef des troggs de Ragefeu, plus gros, plus bête et plus têtu que les autres.',
})

const taragaman = buildMonster({
  name: "Taragaman l'Affameur",
  size: 'grande',
  threat: 3,
  stats: { str: 6, agi: 3, end: 6, int: 3, wis: 2, cha: 3 },
  hp: 50,
  armorKind: 'carapace',
  attacks: [{ name: 'Griffes gangrenées', damage: 7, note: 'gangrène' }],
  abilities: [
    {
      name: 'Uppercut',
      description: "Action complète, recharge 2 tours : une attaque ; si elle touche, la cible est projetée de 6 m. Si elle atterrit dans la lave, elle subit 6 dégâts de feu et doit passer son prochain tour à en sortir.",
    },
    {
      name: 'Nova de feu',
      description: "Action complète, recharge 3 tours : chaque créature à 3 m fait un test d'AGI (palier moyenne) ; en cas d'échec, 4 dégâts de feu, moins l'armure, et elle est repoussée de 3 m.",
    },
    {
      name: 'Démon',
      description: 'Insensible au feu.',
    },
  ],
  description: "Gangregarde affamé, au milieu du lac de lave. Neeru Garde-feu veut son cœur : « Tuez la bête ! »",
})

const jergosh = buildMonster({
  name: "Jergosh l'Invocateur",
  size: 'moyenne',
  threat: 2,
  stats: { str: 3, agi: 3, end: 4, int: 5, wis: 4, cha: 4 },
  hp: 35,
  armorKind: 'aucune',
  attacks: [
    { name: 'Dague sacrificielle', damage: 4 },
    { name: "Trait de l'ombre", damage: 5, range: 30, note: 'ombre', stat: 'int' },
  ],
  abilities: [
    {
      name: 'Malédiction de faiblesse',
      description: "Action rapide, recharge 2 tours : une cible à 30 m fait un test de SAG (palier moyenne) ; en cas d'échec, elle est Affaiblie (−1d6 à tous ses jets) jusqu'à la fin du combat.",
    },
    {
      name: 'Immolation',
      description: "Action complète, recharge 3 tours : une cible à 30 m subit 4 dégâts de feu, moins l'armure, puis 2 au début de ses 2 prochains tours.",
    },
    {
      name: 'Invocation du Vide',
      description: "À 18 PV, il appelle son Larbin marcheur du Vide (le MJ révèle celui gardé en réserve).",
    },
  ],
  description: "Démoniste orc, chef du cercle de la Lame ardente au fond du gouffre. Thrall veut sa tête : il complote contre Orgrimmar.",
})

const bazzalan = buildMonster({
  name: 'Bazzalan',
  size: 'moyenne',
  threat: 2,
  stats: { str: 3, agi: 5, end: 3, int: 3, wis: 3, cha: 4 },
  hp: 25,
  armorKind: 'cuir',
  attacks: [{ name: 'Lames de satyre', damage: 4 }],
  abilities: [
    {
      name: 'Poison',
      description: "La cible touchée fait un test d'END (palier moyenne) ; en cas d'échec, elle perd 2 PV au début de ses 2 prochains tours.",
    },
    {
      name: 'Bond fourchu',
      description: 'Action rapide, recharge 2 tours : il bondit à 10 m, sans attaque d’opportunité.',
    },
  ],
  description: "Satyre caché sur la passerelle au-dessus de Jergosh, l'autre meneur de la Lame ardente. Faible, mais rusé.",
})

// ── Le butin des boss ───────────────────────────────────────────────────────
// Objets du jeu (noms anglais du jeu Classic traduits, Wowhead / warcraft.wiki.gg),
// convertis à l'inventaire Sindragosa comme pour les Mortemines. `chance` = taux de
// drop du jeu, en % ; Lorgnesilex et Bazzalan n'ont pas de taux publié, estimés.

const butinLorgnesilex: LootItem[] = [
  { name: 'Inspirateur de Lorgnesilex', type: 'arme', size: 'une-main', domainId: 'melee-bourrine', description: 'Masse du chef trogg. Équipée : une fois par combat, +1d6 à un jet de Commandement & Inspiration.', chance: 30 },
]

const butinTaragaman: LootItem[] = [
  { name: 'Gangrelame maudite', type: 'arme', size: 'une-main', damageBonus: 1, domainId: 'combat-precision', description: 'Épée forgée dans le gangrefer. Équipée : +1 aux dégâts contre les démons.', chance: 16 },
  { name: 'Manchettes cristallines', type: 'divers', description: 'Brassards de tissu. Équipés : une fois par combat, +1d6 à un jet de magie.', chance: 30 },
  { name: 'Cape souterraine', type: 'divers', description: 'Cape. Équipée : +2 PV max (bonus de PV).', chance: 32 },
]

const butinJergosh: LootItem[] = [
  { name: 'Lame psalmodiante', type: 'arme', size: 'legere', domainId: 'combat-precision', description: "Dague. Équipée : une fois par combat, +1d6 à un jet de magie de l'ombre & gangrène.", chance: 16 },
  { name: "Robe d'évocation", type: 'armure', armor: 1, description: 'Robe de tissu. Équipée : +1 aux dégâts de ses sorts de feu.', chance: 36 },
  { name: 'Brassards de troglodyte', type: 'armure', armor: 1, description: 'Brassards de mailles. Équipés : +2 PV max (bonus de PV).', chance: 33 },
]

const butinBazzalan: LootItem[] = [
  { name: 'Dague brûlante', type: 'arme', size: 'legere', domainId: 'combat-precision', description: 'Dague dont la lame reste tiède. Équipée : +1 dégât de feu.', chance: 30 },
  { name: 'Marche-gouffre', type: 'armure', armor: 1, description: 'Bottes de cuir. Équipées : +1d6 aux jets d’Athlétisme pour grimper ou sauter.', chance: 30 },
  { name: 'Cape en peau de satyre', type: 'divers', description: 'Cape. Équipée : +1d6 aux jets d’Acrobatie & Furtivité.', chance: 30 },
]

// ── Le donjon ───────────────────────────────────────────────────────────────

export const RAGEFEU: Dungeon = {
  name: 'Le Gouffre de Ragefeu',
  kind: 'donjon',
  description:
    "Sous Orgrimmar, dans la Faille de l'ombre, des cavernes volcaniques baignées de lave. Les troggs y remontent des profondeurs, et la Lame ardente, une secte du Conseil de l'ombre, y complote contre la Horde de Thrall.",
  monsters: [
    trogg, chaman, foreTerre, elementaire,
    cultiste, demoniste, executeur, larbin,
    lorgnesilex, taragaman, jergosh, bazzalan,
  ],
  encounters: [
    {
      name: "L'entrée des troggs",
      description: "Le tunnel d'entrée, sous la tente de Neeru Garde-feu. Les troggs fuient quand ils sont blessés et reviennent en nombre : ne pas les laisser filer.",
      monsters: [
        { name: 'Trogg de Ragefeu', count: 3 },
        { name: 'Chaman de Ragefeu' },
        { name: 'Trogg de Ragefeu', hidden: true },
      ],
    },
    {
      name: 'Le nid des fore-terre',
      description: "Une galerie à la roche criblée de trous. Les vers jaillissent du sol et rongent les armures : se méfier des coups qui s'accumulent.",
      monsters: [{ name: 'Fore-terre', count: 2 }, { name: 'Fore-terre', hidden: true }],
    },
    {
      name: 'Lorgnesilex',
      description: "Optionnel : le campement des troggs. Leur chef rameute tout le monde dès qu'il le peut. Il garde un cadavre que des quêtes d'Orgrimmar veulent fouiller.",
      monsters: [
        { name: 'Lorgnesilex' },
        { name: 'Trogg de Ragefeu', count: 2 },
        { name: 'Chaman de Ragefeu' },
        { name: 'Trogg de Ragefeu', count: 2, hidden: true },
      ],
      loot: butinLorgnesilex,
    },
    {
      name: 'Les rives du lac de lave',
      description: "Le sentier longe le magma. Les élémentaires en sortent par deux. Tomber dans la lave : 6 dégâts de feu et un tour pour en sortir.",
      monsters: [{ name: 'Élémentaire en fusion', count: 2 }],
    },
    {
      name: 'Le camp des cultistes',
      description: "Les tentes de la Lame ardente, au bord du lac. Le démoniste appelle son larbin au premier tour : le faire taire vite.",
      monsters: [
        { name: 'Cultiste de la Lame ardente', count: 2 },
        { name: 'Démoniste de la Lame ardente' },
        { name: 'Larbin marcheur du Vide', hidden: true },
      ],
    },
    {
      name: "Taragaman l'Affameur",
      description: "L'îlot au milieu du lac de lave. Le gangregarde projette ses ennemis : se battre loin des bords, le dos à la roche. Sur lui, son cœur, pour Neeru Garde-feu.",
      monsters: [{ name: "Taragaman l'Affameur" }],
      loot: butinTaragaman,
    },
    {
      name: 'La garde de la Lame ardente',
      description: "Le passage vers la dernière salle. L'exécuteur protège les démonistes : l'occuper ou le contourner.",
      monsters: [
        { name: 'Exécuteur de la Lame ardente' },
        { name: 'Cultiste de la Lame ardente', count: 2 },
        { name: 'Démoniste de la Lame ardente' },
        { name: 'Larbin marcheur du Vide', hidden: true },
      ],
    },
    {
      name: "Jergosh l'Invocateur",
      description: "La dernière salle, autour d'un cercle rituel. Jergosh maudit et brûle à distance, son larbin arrive à mi-PV : un soigneur est le bienvenu. Thrall veut sa tête.",
      monsters: [
        { name: "Jergosh l'Invocateur" },
        { name: 'Exécuteur de la Lame ardente' },
        { name: 'Larbin marcheur du Vide', hidden: true },
      ],
      loot: butinJergosh,
    },
    {
      name: 'Bazzalan',
      description: "Optionnel et caché : une rampe discrète, sur la plate-forme de lave la plus à l'ouest, monte à la passerelle au-dessus de Jergosh. Thrall veut aussi sa tête.",
      monsters: [{ name: 'Bazzalan' }, { name: 'Cultiste de la Lame ardente', count: 2 }],
      loot: butinBazzalan,
    },
  ],
}
