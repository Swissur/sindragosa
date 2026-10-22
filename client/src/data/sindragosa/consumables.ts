/**
 * Consommables proposés dans l'inventaire (liste déroulante, comme les composants) :
 * ceux de l'artisanat (patrons ci-dessous) et ceux de WoW Classic, noms français
 * du client frFR. Constitué le 2026-10-22 ; sources en bas de fichier.
 */

/** Patrons d'artisanat dont l'objet fabriqué se consomme (id de `RECIPES`, crafts.ts). */
export const CRAFTED_CONSUMABLE_RECIPE_IDS: string[] = [
  // Forge : munitions
  'forge-r3-06', // Pointe de carreau en mithril

  // Ingénierie : explosifs, charges, mines, obus
  'ingenierie-r1-01', // Dynamite artisanale légère
  'ingenierie-r1-06', // Petite grenade foudroyante
  'ingenierie-r2-01', // Bombe à fragmentation en bronze
  'ingenierie-r2-10', // Charge de démolition de coffre
  'ingenierie-r3-01', // Grenade au plasma de fer
  'ingenierie-r3-09', // Mine sous-marine/terrestre à pression
  'ingenierie-r4-01', // Obus de mortier de siège portable
  'ingenierie-r4-09', // Bombe à décharge électrique aveuglante
  'ingenierie-r5-01', // Bombe à fission d'Azérite tactique

  // Alchimie : potions, élixirs, huiles, poisons, fioles, bombes
  'alchimie-r1-01', // Potion de soins mineure
  'alchimie-r1-02', // Élixir de peau de grès
  'alchimie-r1-03', // Huile de frappe enflammée
  'alchimie-r1-04', // Décoction de Chat-Huant
  'alchimie-r1-05', // Baume anti-saignement
  'alchimie-r1-06', // Poison de crapaud-buffle
  'alchimie-r1-08', // Tonique de l'Hirondelle
  'alchimie-r1-09', // Solvant de rouille léger
  'alchimie-r1-10', // Sérum d'endurance de voyage
  'alchimie-r2-01', // Potion de soins moyenne
  'alchimie-r2-02', // Élixir du Griffon
  'alchimie-r2-03', // Philtre de Tonnerre
  'alchimie-r2-04', // Potion de clarté mentale
  'alchimie-r2-05', // Huile de contre-bête
  'alchimie-r2-06', // Poison de Veuve Noire
  'alchimie-r2-07', // Élixir de célérité d'Aard
  'alchimie-r2-08', // Fiole de fumée d'aveuglement
  'alchimie-r2-09', // Sérum de Sang-de-Dragonnet
  'alchimie-r2-10', // Potion de vision des auras magiques
  'alchimie-r3-01', // Potion de soins majeure
  'alchimie-r3-02', // Décoction de l'Ours Garou
  'alchimie-r3-03', // Philtre du Marabout
  'alchimie-r3-04', // Poison paralytique mortel
  'alchimie-r3-05', // Huile de massacre de Morts-Vivants
  'alchimie-r3-06', // Élixir de Force du Titan
  'alchimie-r3-07', // Potion d'immunité mentale
  'alchimie-r3-08', // Fiole d'Acide de Gargouille
  'alchimie-r3-09', // Sérum de Phénix
  'alchimie-r3-10', // Potion de métamorphose aqueuse
  'alchimie-r4-01', // Potion de soins supérieure
  'alchimie-r4-02', // Décoction d'Ifrit
  'alchimie-r4-03', // Philtre de Moire
  'alchimie-r4-04', // Flacon de résistance élémentaire suprême
  'alchimie-r4-05', // Venin de Wyverne royale
  'alchimie-r4-06', // Huile de tueur de Démons & Fél
  'alchimie-r4-07', // Élixir de vitesse d'Ombre
  'alchimie-r4-08', // Bombe d'Acide phosphorique étouffant
  'alchimie-r4-09', // Sérum de Clairvoyance suprême
  'alchimie-r4-10', // Potion de purification totale de Peste
  'alchimie-r5-01', // Elixir de Résurrection du Phénix Céleste
  'alchimie-r5-02', // Décoction de Leshen Ancien
  'alchimie-r5-03', // Flacon du Sang des Dieux
  'alchimie-r5-04', // Toxine de mort subite du Dragon Noir
  'alchimie-r5-05', // Huile d'Annihilation des Titans
  'alchimie-r5-06', // Potion d'Invulnérabilité d'Adamantine
  'alchimie-r5-07', // Philtre de Métamorphose en Chimère
  'alchimie-r5-08', // Bombe d'Acide Moléculaire de l'Abîme
  'alchimie-r5-09', // Sérum d'Arrêt du Temps
  'alchimie-r5-10', // Décoction de Mutagène d'Archidémon

  // Méca-Botanique : grenades, mines, explosifs
  'meca-botanique-01', // Grenade à dispersion de spores acides
  'meca-botanique-03', // Mine à graines de ronces mécanisées
  'meca-botanique-05', // Pomme de pin explosive à retardement

  // Archerie : munitions
  'archerie-artisan-02', // Empennage de flèche en plumes de griffon

  // Artillerie de siège : obus, charges
  'artillerie-siege-02', // Obus perforant de blindage
  'artillerie-siege-05', // Charge de démolition de murailles

  // Parcheminerie runique : parchemins
  'parcheminerie-runique-01', // Parchemin d'incantation de Bouclier d'Arcane
  'parcheminerie-runique-03', // Parchemin de téléportation de repli
  'parcheminerie-runique-05', // Parchemin de métamorphose rapide

  // Chimie explosive : munitions, mines, grenades
  'chimie-explosive-01', // Cartouche de poudre noire enrichie au nitre
  'chimie-explosive-02', // Mine incendiaire à dispersion de naphte
  'chimie-explosive-03', // Capsule d'acide nitrique pour tromblon
  'chimie-explosive-04', // Grenade fumigène à phosphore aveuglant

  // Tissage d'ambre : consommables déclarés
  'tissage-ambre-02', // Filet de capture en fil d'acier-soie
  'tissage-ambre-05', // Cocon de soins en soie d'araignée
]

/** Consommables de WoW Classic (nom français officiel), hors ceux déjà fabriqués par un patron. */
export const CLASSIC_CONSUMABLES: string[] = [
  // Potions de soins et de mana
  'Potion de soins inférieure',
  'Potion de soins',
  'Potion de soins excellente',
  'Potion de mana mineure',
  'Potion de mana inférieure',
  'Potion de mana',
  'Potion de mana supérieure',
  'Potion de mana excellente',
  'Potion de mana majeure',
  'Potion de régénération majeure',

  // Potions de protection contre les écoles de magie
  'Potion de protection contre le Feu',
  'Potion de protection contre le Givre',
  'Potion de protection contre la Nature',
  "Potion de protection contre l'Ombre",
  'Potion de protection contre le Sacré',
  'Potion de protection contre les Arcanes supérieure',

  // Autres potions
  'Potion de Rage',
  'Potion de Grande rage',
  'Potion de rapidité',
  'Potion de Nage rapide',
  'Potion de libre action',
  'Potion de restauration',
  'Potion de purification',
  "Potion d'Invisibilité inférieure",
  "Potion d'invisibilité",
  "Potion d'invulnérabilité limitée",
  'Potion de Bouclier de pierre supérieure',
  'Potion de sommeil sans rêve',
  'Flacon de pétrification',

  // Élixirs
  'Elixir de force du lion',
  "Elixir d'Agilité mineure",
  'Elixir de Respiration aquatique',
  'Elixir de Taille de géant',
  'Elixir de Sagesse',
  "Elixir de Force d'ogre",
  "Elixir de Marche sur l'eau",
  "Elixir d'oeil de chat",
  'Elixir Noggenfogger',
  'Elixir des arcanes supérieur',
  'Elixir des géants',
  'Elixir de Tueur de démons',
  "Elixir de Puissance de l'ombre",
  'Elixir de défense excellente',
  'Elixir de la Mangouste',
  'Potion de sang de troll majeure',

  // Flacons
  'Flacon des Titans',
  'Flacon de sagesse distillée',
  'Flacon de pouvoir suprême',
  'Flacon de résistance chromatique',

  // Boissons
  'Eau de source',
  'Lait glacé',
  'Jus de melon',
  'Nectar sucré',
  'Eau invoquée',
  'Eau cristalline invoquée',
  'Bière brune naine',

  // Nourriture
  'Viande séchée coriace',
  'Morceau de pain rassis',
  'Pain sorti du four',
  'Pain de maïs moelleux',
  'Pain invoqué',
  'Pomme rouge brillante',
  "Banane de Tel'Abim",
  'Bleu de Darnassus',
  "Ragoût de la marche de l'Ouest",
  'Oeufs aux herbes',
  'Maquereau ombré',
  'Poisson-chat moustachu',
  'Saumon solécaille poché',
  'Soupe de lutjan nagenuit',
  'Calmar grillé',
  'Steak de barracuda',
  "Saucisse d'araignée",
  'Chili de souffle de dragon',
  'Omelette monstrueuse',
  'Boulettes fumées du désert',
  'Courante-surprise',
  'Pyro-côtelettes de chimaerok à la Dirge',

  // Bandages
  'Bandage en lin',
  'Bandage épais en lin',
  'Bandage en laine',
  'Bandage épais en laine',
  'Bandage en soie',
  'Bandage épais en soie',
  'Bandage en tisse-mage',
  'Bandage épais en tisse-mage',
  'Bandage en étoffe runique',
  'Bandage épais en étoffe runique',

  // Parchemins
  'Parchemin de Protection',
  "Parchemin d'esprit",
  "Parchemin d'endurance",
  "Parchemin d'intelligence",
  "Parchemin d'Agilité",
  'Parchemin de force',

  // Poisons de voleur
  'Poison instantané',
  'Poison mortel',
  'Poison douloureux',
  'Poison affaiblissant',
  'Poison de distraction mentale',

  // Pierres à aiguiser et pierres de lest (« Caillou » dans le client frFR)
  'Pierre à aiguiser brute',
  'Pierre à aiguiser lourde',
  'Pierre à aiguiser dense',
  'Pierre à aiguiser élémentaire',
  'Pierre à aiguiser consacrée',
  'Caillou brut',
  'Caillou lourd',
  'Caillou dense',

  // Huiles de sorcier, de mana et d'enduit
  'Huile de sorcier mineure',
  'Huile de sorcier',
  'Huile de sorcier brillante',
  'Huile de sorcier bénite',
  'Huile de mana mineure',
  'Huile de mana brillante',
  'Huile des ténèbres',
  'Huile glaciale',

  // Explosifs d'ingénieur
  'Dynamite basique',
  'Bombe grossière en cuivre',
  'Dynamite grossière',
  'Petite bombe en bronze',
  'Dynamite puissante',
  'Grenade en fer',
  'Grande bombe en fer',
  'Bombe éclairante',
  'Mouton explosif',
  'Mine gobeline',
  'Dynamite solide',
  'Bombe explosive en mithril',
  'Bombe explosive',
  'Dynamite Ev-Lan',
  'Charge de sapeur gobelin',
  'Grenade en thorium',
  'Dynamite dense',
  'Bombe en sombrefer',
  'Bombe des arcanes',

  // Munitions
  'Flèche grossière',
  'Flèche pointue',
  'Flèche rasoir',
  'Flèche barbelée',
  'Flèches à pointe de thorium',
  'Balle légère',
  'Balle lourde',
  'Balle dure',
  'Balles perçantes en mithril',
  'Obus en thorium',

  // Pierres de soins
  'Pierre de soins mineure',
  'Pierre de soins inférieure',
  'Pierre de soins',
  'Pierre de soins supérieure',
  'Pierre de soins majeure',
]

/*
 * Sources (noms frFR lus dans les données des pages, vérifiés le 2026-10-22) :
 * - https://www.wowhead.com/classic/fr/items/consumables/potions
 * - https://www.wowhead.com/classic/fr/items/consumables/elixirs
 * - https://www.wowhead.com/classic/fr/items/consumables/flasks
 * - https://www.wowhead.com/classic/fr/items/consumables/food-and-drinks
 * - https://www.wowhead.com/classic/fr/items/consumables/bandages
 * - https://www.wowhead.com/classic/fr/items/consumables/scrolls
 * - https://www.wowhead.com/classic/fr/items/consumables/item-enhancements-temporary
 * - https://www.wowhead.com/classic/fr/items/consumables
 * - https://www.wowhead.com/classic/fr/items/projectiles
 * - https://nether.wowhead.com/tooltip/item/<id>?dataEnv=4&locale=2 (explosifs et pierres de lest, par id)
 */
