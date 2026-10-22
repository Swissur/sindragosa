import { buildMonster } from '../../../utils/sindragosa/bestiary'
import type { Dungeon, LootItem } from '../types'

/**
 * Les Mortemines, version d'avant le Cataclysme (Edwin VanCleef vivant).
 * Noms français du jeu pour les boss ; sources : Wowhead FR, JudgeHype, warcraft.wiki.gg.
 * Calibré pour 4 ou 5 personnages débutants (20 à 40 PV, réserves de 4 à 6 d6).
 */

// ── La Confrérie défias ─────────────────────────────────────────────────────

const mineur = buildMonster({
  name: 'Mineur défias',
  size: 'moyenne',
  threat: 1,
  stats: { str: 3, agi: 2, end: 3, int: 1, wis: 2, cha: 1 },
  hp: 8,
  armorKind: 'aucune',
  attacks: [{ name: 'Pioche', damage: 3 }],
  abilities: [
    {
      name: 'Perce-armure',
      description: "Quand sa pioche touche, l'armure de la cible baisse de 1 jusqu'à la fin du combat (−2 au plus, toutes sources confondues).",
    },
  ],
  description: 'Paysan ruiné de la Marche de l’Ouest, il creuse pour VanCleef contre un toit et une soupe.',
})

const sbire = buildMonster({
  name: 'Sbire défias',
  size: 'moyenne',
  threat: 1,
  stats: { str: 3, agi: 3, end: 3, int: 2, wis: 2, cha: 2 },
  hp: 10,
  armorKind: 'cuir',
  attacks: [{ name: 'Gourdin', damage: 3 }],
  abilities: [
    {
      name: 'En meute',
      description: "+1d6 à l'attaque contre une cible qu'un autre Défias a déjà attaquée ce round.",
    },
  ],
  description: 'Gros bras au masque rouge, recruté dans les tavernes de Ruisselune.',
})

const guetteur = buildMonster({
  name: 'Guetteur défias',
  size: 'moyenne',
  threat: 1,
  stats: { str: 2, agi: 4, end: 3, int: 2, wis: 3, cha: 2 },
  hp: 10,
  armorKind: 'cuir',
  attacks: [
    { name: 'Arbalète', damage: 3, range: 30 },
    { name: 'Dague', damage: 2 },
  ],
  abilities: [
    {
      name: 'Tir à couvert',
      description: "Tant qu'il ne s'est pas déplacé ce tour, +1d6 en défense contre les tirs et les sorts à distance.",
    },
    {
      name: 'Viser le soigneur',
      description: 'Il tire en priorité sur qui soigne ou lance des sorts.',
    },
  ],
  description: 'Sentinelle postée en hauteur, carreau prêt.',
})

const evocateur = buildMonster({
  name: 'Évocateur défias',
  size: 'moyenne',
  threat: 2,
  stats: { str: 2, agi: 3, end: 2, int: 4, wis: 3, cha: 2 },
  hp: 10,
  armorKind: 'aucune',
  attacks: [
    { name: 'Bâton', damage: 2 },
    { name: 'Boule de feu', damage: 4, range: 30, note: 'feu', stat: 'int' },
  ],
  abilities: [
    {
      name: 'Pluie de feu',
      description: "Action complète, recharge 3 tours. Une zone de 6 m de diamètre à 30 m au plus : chaque créature dedans fait un test d'AGI (palier moyenne) ; en cas d'échec, 4 dégâts de feu, moins l'armure.",
    },
    {
      name: 'Insensible au feu',
      description: 'Le feu ne lui fait rien, ses propres sorts compris.',
    },
  ],
  description: 'Mage renégat qui loue ses flammes à la Confrérie.',
})

const surveillant = buildMonster({
  name: 'Surveillant défias',
  size: 'moyenne',
  threat: 2,
  stats: { str: 4, agi: 2, end: 4, int: 2, wis: 2, cha: 3 },
  hp: 16,
  armorKind: 'cuir',
  attacks: [{ name: 'Masse', damage: 4 }],
  abilities: [
    {
      name: 'Coup de fouet',
      description: "Action rapide : un Défias allié à portée de voix gagne +1d6 à sa prochaine attaque.",
    },
    {
      name: "Rappel à l'ordre",
      description: 'Tant qu’il est debout, les Mineurs défias ne fuient pas.',
    },
  ],
  description: 'Contremaître des galeries : il compte les pépites et les coups de fouet.',
})

const sorcier = buildMonster({
  name: 'Sorcier défias',
  size: 'moyenne',
  threat: 2,
  stats: { str: 1, agi: 3, end: 2, int: 4, wis: 3, cha: 3 },
  hp: 9,
  armorKind: 'aucune',
  attacks: [{ name: 'Projectiles des Arcanes', damage: 3, range: 30, note: 'arcanes', stat: 'int' }],
  abilities: [
    {
      name: 'Métamorphose',
      description: "Action complète, 1/combat. Une cible à 30 m fait un test de SAG (palier moyenne) ; en cas d'échec, elle devient un mouton jusqu'à la fin de son prochain tour : ni attaque ni sort. Le premier coup qu'elle reçoit lui rend sa forme.",
    },
    {
      name: 'Transfert',
      description: "Réaction, 1/combat : quand un ennemi l'attaque au contact, il se téléporte à 6 m avant le jet. L'attaque est perdue.",
    },
  ],
  description: 'Ancien apprenti de Hurlevent, chassé de sa tour et rallié à la cause de VanCleef.',
})

const pirate = buildMonster({
  name: 'Pirate défias',
  size: 'moyenne',
  threat: 2,
  stats: { str: 3, agi: 4, end: 3, int: 2, wis: 2, cha: 2 },
  hp: 16,
  armorKind: 'cuir',
  attacks: [{ name: 'Coutelas', damage: 3 }],
  abilities: [
    {
      name: "À l'abordage !",
      description: '+1d6 à sa première attaque du combat, et +2 aux dégâts si elle touche.',
    },
  ],
  description: 'Marin de l’équipage de VanCleef, rompu aux combats sur un pont qui tangue.',
})

const mandeTempete = buildMonster({
  name: 'Mande-tempête défias',
  size: 'moyenne',
  threat: 2,
  stats: { str: 2, agi: 3, end: 3, int: 3, wis: 4, cha: 2 },
  hp: 14,
  armorKind: 'aucune',
  attacks: [
    { name: 'Bâton', damage: 2 },
    { name: 'Éclair de givre', damage: 3, range: 30, note: 'givre', stat: 'wis' },
  ],
  abilities: [
    {
      name: 'Morsure du givre',
      description: "Si son Éclair de givre touche avec une marge d'au moins 2, la cible est Ralentie jusqu'à la fin de son prochain tour (une seule action).",
    },
    {
      name: 'Vague de soins',
      description: 'Action complète, recharge 2 tours : un allié à 30 m récupère 6 PV.',
    },
  ],
  description: 'Chamane des côtes qui commande aux grains et aux embruns pour l’équipage.',
})

const gardeNoir = buildMonster({
  name: 'Garde noir défias',
  size: 'moyenne',
  threat: 2,
  stats: { str: 3, agi: 4, end: 3, int: 2, wis: 3, cha: 2 },
  hp: 18,
  armorKind: 'cuir',
  attacks: [{ name: 'Épée courte', damage: 4 }],
  abilities: [
    {
      name: 'Camouflage',
      description: "Commence le combat caché (en réserve). Le repérer demande un jet de Perception & Sens (palier difficile).",
    },
    {
      name: 'Embuscade',
      description: "Sa première attaque en sortant de l'ombre se fait avec +2d6, et +2 aux dégâts si elle touche.",
    },
  ],
  description: 'Garde du corps de l’élite de la Confrérie, formé aux arts de l’ombre par VanCleef lui-même.',
})

const compagnon = buildMonster({
  name: 'Compagnon défias',
  size: 'tres petite',
  threat: 1,
  stats: { str: 1, agi: 4, end: 2, int: 2, wis: 3, cha: 3 },
  hp: 3,
  armorKind: 'aucune',
  attacks: [{ name: 'Bec', damage: 1 }],
  abilities: [
    {
      name: 'Vol',
      description: 'Il vole : hors de portée des attaques au contact tant qu’il ne pique pas sur sa cible.',
    },
    {
      name: 'Cri moqueur',
      description: "Action rapide : une cible à 10 m a −1d6 à sa prochaine action (« Coco veut de l'or ! »).",
    },
  ],
  description: 'Perroquet du Capitaine Vertepeau, aussi bavard que mal élevé.',
})

// ── Les gobelins de la Confrérie ────────────────────────────────────────────

const sculpteur = buildMonster({
  name: 'Sculpteur gobelin',
  size: 'petite',
  threat: 1,
  stats: { str: 2, agi: 4, end: 3, int: 3, wis: 2, cha: 2 },
  hp: 10,
  armorKind: 'cuir',
  attacks: [
    { name: 'Hachette', damage: 3 },
    { name: 'Hachette lancée', damage: 2, range: 10 },
  ],
  abilities: [
    {
      name: 'Lancer assommant',
      description: "Si sa hachette lancée touche avec une marge d'au moins 2, la cible est Étourdie jusqu'à la fin de son prochain tour.",
    },
  ],
  description: 'Charpentier gobelin qui taille les mâts du cuirassé. Payé à la pièce, donc pressé.',
})

const artisan = buildMonster({
  name: 'Artisan gobelin',
  size: 'petite',
  threat: 1,
  stats: { str: 3, agi: 3, end: 3, int: 3, wis: 2, cha: 2 },
  hp: 12,
  armorKind: 'cuir',
  attacks: [
    { name: 'Marteau', damage: 3 },
    { name: 'Métal en fusion', damage: 3, range: 10, note: 'feu', stat: 'int' },
  ],
  abilities: [
    {
      name: 'Coulée brûlante',
      description: 'Une cible touchée par le Métal en fusion est Ralentie jusqu’à la fin de son prochain tour.',
    },
  ],
  description: 'Fondeur de la fonderie gobeline, tablier roussi et lunettes fumées.',
})

const ingenieur = buildMonster({
  name: 'Ingénieur gobelin',
  size: 'petite',
  threat: 1,
  stats: { str: 2, agi: 3, end: 2, int: 4, wis: 2, cha: 2 },
  hp: 10,
  armorKind: 'aucune',
  attacks: [{ name: 'Clé à molette', damage: 2 }],
  abilities: [
    {
      name: 'Golem télécommandé',
      description: "Action complète, 1/combat : il active un Golem télécommandé (le MJ révèle celui gardé en réserve). S'il tombe, le golem continue sur sa dernière consigne.",
    },
  ],
  description: 'Bricoleur génial et sans scrupules, sous contrat avec la Confrérie.',
})

const golem = buildMonster({
  name: 'Golem télécommandé',
  size: 'petite',
  threat: 1,
  stats: { str: 4, agi: 2, end: 4, int: 1, wis: 1, cha: 1 },
  hp: 12,
  armorKind: 'lourde',
  attacks: [{ name: 'Poings mécaniques', damage: 3 }],
  abilities: [
    {
      name: 'Mécanique',
      description: 'Insensible au poison, au saignement et à la peur.',
    },
    {
      name: 'Cible prioritaire',
      description: 'Il fonce sur qui soigne ou lance des sorts.',
    },
  ],
  description: 'Petit automate en tôle rivetée, piloté à distance par un ingénieur.',
})

// ── Les boss ────────────────────────────────────────────────────────────────

const rhahkZor = buildMonster({
  name: "Rhahk'Zor",
  size: 'grande',
  threat: 2,
  stats: { str: 6, agi: 2, end: 6, int: 1, wis: 2, cha: 2 },
  hp: 40,
  armorKind: 'cuir',
  attacks: [{ name: 'Marteau de contremaître', damage: 7 }],
  abilities: [
    {
      name: "Frappe de Rhahk'Zor",
      description: "Action complète, recharge 2 tours : une attaque ; si elle touche, la cible est Étourdie jusqu'à la fin de son prochain tour.",
    },
    {
      name: 'Gardien de la porte',
      description: 'La lourde porte vers les mines ne s’ouvre qu’à sa mort.',
    },
  ],
  description: "Ogre contremaître des Mortemines. « VanCleef payer cher pour vos têtes ! »",
})

const mineurJohnson = buildMonster({
  name: 'Mineur Johnson',
  size: 'moyenne',
  threat: 2,
  stats: { str: 5, agi: 2, end: 5, int: 2, wis: 2, cha: 1 },
  hp: 25,
  armorKind: 'cuir',
  attacks: [{ name: 'Pioche lourde', damage: 5 }],
  abilities: [
    {
      name: 'Perce-armure',
      description: "Quand sa pioche touche, l'armure de la cible baisse de 1 jusqu'à la fin du combat (−3 au plus).",
    },
  ],
  description: 'Rare : il n’est pas toujours là. Chef de galerie, plus costaud que ses mineurs.',
})

const dechiqueteur = buildMonster({
  name: 'Déchiqueteur de Sneed',
  size: 'grande',
  threat: 2,
  stats: { str: 6, agi: 2, end: 6, int: 1, wis: 2, cha: 1 },
  hp: 30,
  armorKind: 'carapace',
  attacks: [{ name: 'Scies circulaires', damage: 6 }],
  abilities: [
    {
      name: 'Douleur accablante',
      description: "Quand ses scies touchent, la cible a −1d6 à ses sorts et compétences jusqu'à la fin de son prochain tour.",
    },
    {
      name: 'Mécanique',
      description: 'Insensible au poison, au saignement et à l’étourdissement.',
    },
    {
      name: 'Éjection',
      description: 'À 0 PV, la machine explose et Sneed en jaillit : le MJ le révèle.',
    },
  ],
  description: 'Machine de bûcheronnage gobeline pilotée par Sneed, qui découpe les mâts du cuirassé.',
})

const sneed = buildMonster({
  name: 'Sneed',
  size: 'petite',
  threat: 2,
  stats: { str: 2, agi: 4, end: 3, int: 4, wis: 2, cha: 2 },
  hp: 18,
  armorKind: 'aucune',
  attacks: [{ name: 'Clé à molette', damage: 4 }],
  abilities: [
    {
      name: 'Désarmement',
      description: "Action rapide, recharge 2 tours : test d'AGI opposé contre une cible au contact ; s'il l'emporte, elle est Désarmée (une action de mouvement pour ramasser son arme).",
    },
    {
      name: 'Rage du pilote',
      description: '+1d6 à l’attaque à son premier tour : on vient de casser sa machine.',
    },
  ],
  description: 'Gobelin pilote du déchiqueteur, furieux qu’on abîme son investissement.',
})

const gilnid = buildMonster({
  name: 'Gilnid',
  size: 'petite',
  threat: 2,
  stats: { str: 3, agi: 3, end: 4, int: 4, wis: 3, cha: 3 },
  hp: 25,
  armorKind: 'cuir',
  attacks: [
    { name: 'Marteau de forge', damage: 4 },
    { name: 'Métal en fusion', damage: 4, range: 10, note: 'feu', stat: 'int' },
  ],
  abilities: [
    {
      name: 'Coulée brûlante',
      description: 'Une cible touchée par le Métal en fusion est Ralentie jusqu’à la fin de son prochain tour, et a −1d6 pour se défendre tant qu’elle l’est.',
    },
    {
      name: 'Maître de la fonderie',
      description: 'Action rapide, 1/combat : il siffle ses ouvriers. Tous les gobelins gardés en réserve entrent en jeu.',
    },
  ],
  description: 'Le Fondeur, maître de la fonderie gobeline. Sa mort ouvre la porte vers le cuirassé.',
})

const chatiment = buildMonster({
  name: 'M. Châtiment',
  size: 'grande',
  threat: 3,
  stats: { str: 6, agi: 3, end: 6, int: 2, wis: 3, cha: 2 },
  hp: 50,
  armorKind: 'cuir',
  attacks: [
    { name: 'Épée (phase 1)', damage: 6 },
    { name: 'Épées jumelles (phase 2, deux attaques)', damage: 4 },
    { name: 'Grand marteau (phase 3)', damage: 9 },
  ],
  abilities: [
    {
      name: 'Piétinement de Châtiment',
      description: "À 37 PV puis à 25 PV, il frappe le pont du sabot : tous les ennemis à 6 m sont Étourdis jusqu'à la fin de leur prochain tour. Il passe ensuite son tour suivant à changer d'arme au coffre.",
    },
    {
      name: 'Trois armes',
      description: 'Phase 1 : épée. Phase 2 (après le premier piétinement) : deux épées, deux attaques par action. Phase 3 (après le second) : grand marteau à deux mains.',
    },
  ],
  description: "Tauren second du Capitaine Vertepeau. « On nous attaque ! Repoussez les envahisseurs ! »",
})

const vertepeau = buildMonster({
  name: 'Capitaine Vertepeau',
  size: 'petite',
  threat: 2,
  stats: { str: 3, agi: 4, end: 4, int: 3, wis: 3, cha: 4 },
  hp: 30,
  armorKind: 'cuir',
  attacks: [
    { name: 'Coutelas', damage: 4 },
    { name: 'Harpon empoisonné', damage: 3, range: 10, note: 'poison' },
  ],
  abilities: [
    {
      name: 'Enchaînement',
      description: 'Quand son coutelas touche, un second ennemi à son contact subit la moitié des dégâts.',
    },
    {
      name: 'Harpon empoisonné',
      description: "La cible touchée fait un test d'END (palier moyenne) ; en cas d'échec, elle est Affaiblie (−1d6 à tous ses jets) jusqu'au prochain repos court.",
    },
  ],
  description: 'Gobelin de Baie-du-Butin, ancien chef d’une flotte pirate, capitaine du cuirassé en construction.',
})

const vanCleef = buildMonster({
  name: 'Edwin VanCleef',
  size: 'moyenne',
  threat: 3,
  stats: { str: 3, agi: 5, end: 4, int: 4, wis: 4, cha: 5 },
  hp: 55,
  armorKind: 'cuir',
  attacks: [{ name: 'Lames jumelles (deux attaques)', damage: 5 }],
  abilities: [
    {
      name: 'Ambidextrie',
      description: 'Chaque action d’attaque lui donne deux attaques, contre la même cible ou deux cibles au contact.',
    },
    {
      name: 'Rosser',
      description: 'Action rapide, recharge 2 tours : une attaque de plus contre une cible qu’il a déjà touchée ce tour.',
    },
    {
      name: 'Les alliés de VanCleef',
      description: 'À 27 PV, il siffle : les Gardes noirs gardés en réserve sortent de l’ombre.',
    },
    {
      name: 'Maître des ombres',
      description: '+1d6 en défense tant qu’au moins un Garde noir est debout.',
    },
  ],
  description: "Ancien maître de la guilde des tailleurs de pierre de Hurlevent, trahi par la Chambre des nobles, chef de la Confrérie défias. « Nul ne défie la Confrérie ! »",
})

const macaron = buildMonster({
  name: 'Macaron',
  size: 'petite',
  threat: 2,
  stats: { str: 3, agi: 4, end: 4, int: 2, wis: 3, cha: 2 },
  hp: 22,
  armorKind: 'aucune',
  attacks: [
    { name: 'Louche', damage: 4 },
    { name: "Jet d'acide", damage: 3, range: 6, note: 'acide' },
  ],
  abilities: [
    {
      name: 'Cuisine de Macaron',
      description: "Action complète, recharge 3 tours : il met un plat sur le feu. Au début de son tour suivant, il le mange et récupère 8 PV, sauf si une attaque l'a touché entre-temps : la marmite est renversée.",
    },
  ],
  description: 'Optionnel. Murloc cuisinier du cuirassé, qui défend ses fourneaux à la louche. « Mrglmrgl ! »',
})

// ── Le butin des boss ───────────────────────────────────────────────────────
// Objets du jeu (noms du client français Classic, Wowhead), convertis à l'inventaire
// Sindragosa : gabarit et bonus de dégâts pour une arme, armure pour une pièce
// portée, le reste en effet écrit (réglé à la main sur la fiche). `chance` = taux de
// drop du jeu, en %. Les objets de M. Smite prennent le nom du boss dans l'app.

const butinRhahkZor: LootItem[] = [
  { name: "Marteau de Rhahk'Zor", type: 'arme', size: 'deux-mains', domainId: 'melee-bourrine', description: 'Masse de contremaître, lourde et sans fioritures.', chance: 72 },
  { name: 'Fend-le-roc', type: 'arme', size: 'deux-mains', damageBonus: 1, domainId: 'melee-bourrine', description: 'Hache taillée pour la roche. Équipée : +1d6 aux jets de Force pour briser (porte, rocher, bouclier).', chance: 4 },
]

const butinJohnson: LootItem[] = [
  { name: 'Targe plaquée or', type: 'armure', armor: 1, nature: 'cuir', description: 'Bouclier. Équipée : +3 PV max (bonus de PV).', chance: 41 },
  { name: 'Cape de mineur', type: 'divers', description: 'Cape. Équipée : +2 PV max (bonus de PV).', chance: 55 },
]

const butinSneed: LootItem[] = [
  { name: 'Coutelas trancheur', type: 'arme', size: 'une-main', domainId: 'combat-precision', description: 'Épée crantée, tirée des pièces du déchiqueteur.', chance: 10 },
  { name: 'Lame sifflante', type: 'arme', size: 'legere', domainId: 'combat-precision', description: 'Dague qui siffle quand on la manie.', chance: 52 },
  { name: "Gants tachetés d'or", type: 'divers', description: "Gants de tissu. Équipés : une fois par combat, +1d6 à un jet de Force ou d'Intelligence.", chance: 68 },
  { name: 'Hache du sous-chef', type: 'arme', size: 'deux-mains', damageBonus: 1, domainId: 'melee-bourrine', description: 'Équipée : +3 PV max (bonus de PV).', chance: 27 },
]

const butinGilnid: LootItem[] = [
  { name: 'Anneau somptueux', type: 'divers', description: "Unique. Équipé : une fois par combat, +1d6 à un jet de magie profane & arcanes.", chance: 38 },
  { name: 'Pantalon de fusion', type: 'armure', armor: 1, nature: 'cuir', description: 'Jambières de cuir. Équipées : +2 PV max (bonus de PV).', chance: 56 },
]

const butinChatiment: LootItem[] = [
  { name: 'Puissant marteau de Châtiment', type: 'arme', size: 'deux-mains', damageBonus: 2, domainId: 'melee-bourrine', description: 'Équipé : +1d6 aux jets de Force pour bousculer ou renverser.', chance: 18 },
  { name: 'Hache de Châtiment', type: 'arme', size: 'une-main', domainId: 'melee-bourrine', description: 'La hache du second, encore poisseuse de goudron.', chance: 37 },
  { name: 'Lame du larron', type: 'arme', size: 'une-main', domainId: 'combat-precision', description: "Unique. Équipée : +1d6 aux jets d'Escamotage & Crochetage.", chance: 39 },
]

const butinVertepeau: LootItem[] = [
  { name: 'Ceinture défias noircie', type: 'divers', description: "Ensemble Cuir défias. Équipée : une fois par combat, +1d6 à un jet de Force. Avec l'Armure défias noircie : +1 armure.", chance: 26 },
  { name: 'Bâton de Pierrebraise', type: 'arme', size: 'deux-mains', domainId: 'melee-bourrine', description: 'Bâton de mage. Équipé : +1 aux dégâts de ses sorts de feu.', chance: 38 },
  { name: 'Harpon de perforation', type: 'arme', size: 'deux-mains', domainId: 'combat-precision', description: "Arme d'hast : frappe une cible jusqu'à 3 m.", chance: 28 },
]

const butinVanCleef: LootItem[] = [
  { name: 'Armure défias noircie', type: 'armure', armor: 2, nature: 'cuir', description: 'Ensemble Cuir défias. Équipée : +4 PV max (bonus de PV). Avec la Ceinture défias noircie : +1 armure.', chance: 15 },
  { name: 'Cape de la confrérie', type: 'divers', description: "Équipée : +1d6 aux jets d'Acrobatie & Furtivité.", chance: 23 },
  { name: 'Casaque de corsaire', type: 'armure', armor: 1, nature: 'tissu', description: 'Tunique de tissu. Équipée : une fois par combat, +1d6 à un jet de Volonté & Récupération.', chance: 24 },
  { name: 'Lame de cruauté', type: 'arme', size: 'une-main', damageBonus: 1, domainId: 'combat-precision', description: 'La lame dentelée de VanCleef.', chance: 16 },
]

const butinMacaron: LootItem[] = [
  { name: 'Bâton à touiller de Macaron', type: 'arme', size: 'legere', domainId: 'magie-profane-arcanes', description: "Baguette : tire jusqu'à 30 m, dégâts d'Arcanes.", chance: 34 },
  { name: 'Attendrisseur de Macaron', type: 'arme', size: 'une-main', domainId: 'melee-bourrine', description: 'Maillet de cuisine, étonnamment efficace.', chance: 55 },
  { name: 'Panier à chat (Siamois)', type: 'divers', description: 'Un chat siamois de compagnie. Il ne combat pas, mais il juge.', chance: 10 },
]

// ── Le donjon ───────────────────────────────────────────────────────────────

export const MORTEMINES: Dungeon = {
  name: 'Les Mortemines',
  kind: 'donjon',
  description:
    "Sous Ruisselune, dans la Marche de l'Ouest, d'anciennes mines d'or abandonnées pendant la Première Guerre. La Confrérie défias d'Edwin VanCleef y a caché sa base et y construit, avec des gobelins, un cuirassé pour frapper Hurlevent.",
  monsters: [
    mineur, sbire, guetteur, evocateur, surveillant, sorcier, pirate, mandeTempete, gardeNoir, compagnon,
    sculpteur, artisan, ingenieur, golem,
    rhahkZor, mineurJohnson, dechiqueteur, sneed, gilnid, chatiment, vertepeau, vanCleef, macaron,
  ],
  encounters: [
    {
      name: 'Les galeries de Ruisselune',
      description: "Entrée des mines, sous la maison abandonnée de Ruisselune. Les mineurs travaillent ; le sbire monte la garde. Un mineur qui fuit va prévenir Rhahk'Zor.",
      monsters: [{ name: 'Mineur défias', count: 3 }, { name: 'Sbire défias' }],
    },
    {
      name: "Rhahk'Zor",
      description: "La salle du contremaître, devant une lourde porte. Deux guetteurs tirent depuis les passerelles pendant que l'ogre cogne. Malin : les attirer un par un.",
      monsters: [{ name: "Rhahk'Zor" }, { name: 'Guetteur défias', count: 2 }],
      loot: butinRhahkZor,
    },
    {
      name: 'Mineur Johnson',
      description: "Optionnel et rare : galerie à gauche après la porte de Rhahk'Zor. À vous de décider s'il est là.",
      monsters: [{ name: 'Mineur Johnson' }, { name: 'Mineur défias', count: 2 }],
      loot: butinJohnson,
    },
    {
      name: 'Le camp des bûcherons',
      description: "Une grotte immense où l'on débite des troncs. Un surveillant mène les gobelins, un évocateur arrose la zone de feu.",
      monsters: [
        { name: 'Sculpteur gobelin', count: 3 },
        { name: 'Surveillant défias' },
        { name: 'Évocateur défias' },
      ],
    },
    {
      name: 'Sneed et son déchiqueteur',
      description: 'La salle des mâts. Le déchiqueteur découpe les troncs ; quand il explose, Sneed en sort (en réserve). Attention aux lanceurs de sorts : la Douleur accablante les gêne.',
      monsters: [
        { name: 'Déchiqueteur de Sneed' },
        { name: 'Sneed', hidden: true },
        { name: 'Sculpteur gobelin', count: 2 },
      ],
      loot: butinSneed,
    },
    {
      name: 'La fonderie gobeline',
      description: "Coulées de métal et vapeur. L'ingénieur active son golem dès qu'il le peut. Bien nettoyer la salle : le combat contre Gilnid attire tout ce qui reste.",
      monsters: [
        { name: 'Artisan gobelin', count: 2 },
        { name: 'Ingénieur gobelin' },
        { name: 'Golem télécommandé', hidden: true },
      ],
    },
    {
      name: 'Gilnid',
      description: 'Le cœur de la fonderie. Gilnid appelle ses ouvriers en réserve. Sa mort ouvre la porte vers le tunnel du cuirassé.',
      monsters: [
        { name: 'Gilnid' },
        { name: 'Artisan gobelin' },
        { name: 'Ingénieur gobelin', hidden: true },
        { name: 'Golem télécommandé', hidden: true },
      ],
      loot: butinGilnid,
    },
    {
      name: 'La porte au canon',
      description: "Au bout du tunnel, une porte de fer. Les héros trouvent de la poudre défias et un canon : la détonation ouvre la porte et réveille la garde du port.",
      monsters: [{ name: 'Pirate défias', count: 2 }, { name: 'Sorcier défias' }, { name: 'Évocateur défias' }],
    },
    {
      name: 'M. Châtiment',
      description: "L'anse du cuirassé, sur le pont. Deux gardes noirs attendent, camouflés, et frappent quand Châtiment piétine. Les éliminer en premier.",
      monsters: [{ name: 'M. Châtiment' }, { name: 'Garde noir défias', count: 2, hidden: true }],
      loot: butinChatiment,
    },
    {
      name: 'Macaron',
      description: "Optionnel : la cuisine sous le pont. Frapper Macaron pendant qu'il cuisine, sinon il se soigne.",
      monsters: [{ name: 'Macaron' }],
      loot: butinMacaron,
    },
    {
      name: 'Capitaine Vertepeau',
      description: 'Le gaillard arrière. Le capitaine, son équipage et son perroquet. Facile à déclencher par mégarde en approchant la cabine.',
      monsters: [
        { name: 'Capitaine Vertepeau' },
        { name: 'Mande-tempête défias' },
        { name: 'Pirate défias' },
        { name: 'Compagnon défias' },
      ],
      loot: butinVertepeau,
    },
    {
      name: 'Edwin VanCleef',
      description: "La cabine du capitaine. Deux gardes noirs l'escortent ; deux autres attendent dans l'ombre (Les alliés de VanCleef, à mi-PV). Sur lui, une lettre qui mène à la suite de l'histoire.",
      monsters: [
        { name: 'Edwin VanCleef' },
        { name: 'Garde noir défias', count: 2 },
        { name: 'Garde noir défias', count: 2, hidden: true },
      ],
      loot: butinVanCleef,
    },
  ],
}
