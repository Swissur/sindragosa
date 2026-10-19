/**
 * Compétences qui portent une attaque : leur carte lance le jet d'attaque (plans/39).
 * Interprétation de la transcription (`abilities.ts` reste fidèle au PDF).
 *
 * - `weapon` : avec l'arme équipée. `distance` = tir ou lancer, on prend l'arme de tir
 *   si le personnage en porte une ; `naturelle` = sans arme, avec une arme naturelle
 *   (mains nues par défaut). Une forme prise remplace l'arme dans tous les cas.
 * - `domainId` : un sort (ou une bombe), lancé comme un jet de domaine, sans arme.
 *   Domaine = le domaine avancé le plus spécialisé des prérequis, sinon le domaine de magie.
 *   Seuls les sorts qui infligent des dégâts y sont ; ceux qui touchent d'office non.
 */
export type WeaponReach = 'contact' | 'distance' | 'naturelle'

export type AbilityAttack = { weapon: WeaponReach } | { domainId: string }

const contact: AbilityAttack = { weapon: 'contact' }
const distance: AbilityAttack = { weapon: 'distance' }
const naturelle: AbilityAttack = { weapon: 'naturelle' }
const domaine = (domainId: string): AbilityAttack => ({ domainId })

export const ABILITY_ATTACKS: Record<number, AbilityAttack> = {
  // Avec l'arme équipée
  1: contact, // Attaque sournoise
  2: contact, // Estropier
  3: contact, // Poinçon sanglant
  4: contact, // Suriner
  5: contact, // Volée de lames
  6: contact, // Heurt de bouclier
  7: contact, // Vengeance
  8: contact, // Ivresse du combat
  9: contact, // Onde de choc
  13: distance, // Tir traqueur
  14: distance, // Tir dispersif
  15: contact, // Envenimer
  16: distance, // Tir de la chimère
  17: distance, // Volée de flèches
  22: contact, // Déchirement
  23: contact, // Coup bas
  24: contact, // Aiguillon perfide
  25: contact, // Pression mortelle
  101: contact, // Tempête d'acier
  102: contact, // Siphon d'âme du massacreur
  103: contact, // Bond héroïque
  106: contact, // Broyeur de crânes
  107: contact, // Coup de bouclier dévastateur
  110: contact, // Frappe de la gorge
  112: contact, // Vaincre les faibles
  117: contact, // Série de coups
  120: distance, // Volée de piques
  121: contact, // Frappe de l'Ombre
  125: contact, // Désarmer
  126: contact, // Frappe de runes arcaniques
  127: contact, // Moisson d'âmes
  128: contact, // Frappe de la Mort
  132: contact, // Frappe du Fléau
  136: contact, // Balayage sauvage
  137: distance, // Transpercement
  139: contact, // Choc martial écrasant (l'arme de contact, projetée)
  141: contact, // Embuscade mortelle
  142: contact, // Rupture
  143: distance, // Tir de neutralisation
  144: distance, // Camouflage du serpent
  147: contact, // Morsure de la mangouste
  148: distance, // Tir mortel
  202: contact, // Châtiment divin
  238: contact, // Marteau du vertueux
  239: contact, // Bouclier de piété
  366: contact, // Démolition de structure
  368: contact, // Balayage d'arme lourde
  369: contact, // Écrasement d'armure
  371: contact, // Enfoncement de bouclier

  // Sans arme : arme naturelle
  195: naturelle, // Griffe d'ombre (griffes de la Forme de félin)
  367: naturelle, // Projection d'ennemi
  370: naturelle, // Lancer de débris colossal
  372: naturelle, // Piétinement sismique
  373: naturelle, // Poigne de fer étrangleuse
  375: naturelle, // Impact de météore humain

  // Sorts, bombes et bêtes : jet de domaine
  46: domaine('magie-profane-arcanes'), // Déflagration d'Arcane
  50: domaine('explosifs-ingenierie'), // Détonation de Poudre
  55: domaine('magie-profane-arcanes'), // Choc de flammes
  56: domaine('magie-profane-arcanes'), // Implosion d'Ombre-flamme
  63: domaine('explosifs-ingenierie'), // Bombe à fragmentation
  68: domaine('magie-divine-sacree'), // Châtiment
  70: domaine('communion-naturelle-chamanisme'), // Horion de feu
  71: domaine('communion-naturelle-chamanisme'), // Horion de givre
  72: domaine('communion-naturelle-chamanisme'), // Éclat lunaire
  79: domaine('communion-naturelle-chamanisme'), // Colère de la nature
  80: domaine('communion-naturelle-chamanisme'), // Sarments
  82: domaine('magie-divine-sacree'), // Écrasement sacré
  86: domaine('magie-ombre-fel'), // Trait d'ombre
  87: domaine('magie-ombre-fel'), // Douleur maudite
  91: domaine('magie-ombre-fel'), // Vol de vie
  104: domaine('necromancie-peste'), // Poigne de la Mort
  122: domaine('necromancie-peste'), // Bombe à la peste
  130: domaine('necromancie-peste'), // Vague de sang
  133: domaine('necromancie-peste'), // Voile mortel
  135: domaine('necromancie-peste'), // Hiver impitoyable
  149: domaine('dressage-sauvage'), // Bête féroce
  150: domaine('dressage-sauvage'), // Ordre de tuer
  154: domaine('pyromancie'), // Souffle du dragon
  155: domaine('pyromancie'), // Explosion pyrotechnique
  156: domaine('pyromancie'), // Déflagration d'Ombre
  157: domaine('magie-givre-alteration'), // Orbe de givre
  161: domaine('maitrise-arcanes'), // Choc arcanique
  164: domaine('pyromancie'), // Météore
  165: domaine('communion-naturelle-chamanisme'), // Chaîne d'éclairs
  166: domaine('communion-naturelle-chamanisme'), // Horion de terre
  171: domaine('communion-naturelle-chamanisme'), // Nova de foudre
  176: domaine('magie-givre-alteration'), // Froid mordant
  177: domaine('maitrise-arcanes'), // Nova arcanique
  186: domaine('maitrise-arcanes'), // Rayon de météore arcanique
  188: domaine('communion-naturelle-chamanisme'), // Éclat solaire
  189: domaine('astral-celeste'), // Météores célestes
  190: domaine('astral-celeste'), // Éruption astrale
  197: domaine('maitrise-elements'), // Esprit du volcan
  204: domaine('magie-divine-sacree'), // Main de rétribution
  205: domaine('magie-divine-sacree'), // Bouclier du vengeur
  206: domaine('magie-divine-sacree'), // Marteau de courroux
  211: domaine('discipline-absolution'), // Pénitence
  217: domaine('magie-divine-sacree'), // Révélation divine
  219: domaine('magie-divine-sacree'), // Châtiment des impies
  223: domaine('magie-divine-sacree'), // Jugement de lumière
  228: domaine('magie-divine-sacree'), // Halo sacré
  229: domaine('magie-divine-sacree'), // Étoile divine
  230: domaine('discipline-absolution'), // Barrière d'absolution
  235: domaine('pyromancie'), // Flammes du Ciel
  243: domaine('demonologie-fel'), // Invocateur d'Infierno
  244: domaine('pyromancie'), // Immolation
  245: domaine('pyromancie'), // Pluie de Feu du Fél
  249: domaine('maledictions-affliction'), // Affliction instable
  250: domaine('maledictions-affliction'), // Agonie progressive
  251: domaine('maledictions-affliction'), // Corrompre l'âme
  252: domaine('maledictions-affliction'), // Graine de Corruption
  259: domaine('magie-vide'), // Singularité du Vide
  260: domaine('magie-vide'), // Éruption du Vide
  261: domaine('magie-vide'), // Attaque mentale
  262: domaine('magie-vide'), // Fouet mental
  264: domaine('demonologie-fel'), // Malédiction d'agonie éternelle
  265: domaine('magie-vide'), // Sombres pensées
  268: domaine('necromancie-peste'), // Peste dévorante
  272: domaine('magie-ombre-fel'), // Onde du Fél
  274: domaine('magie-vide'), // Trait du Néant
  275: domaine('demonologie-fel'), // Main de Gul'dan
  276: domaine('demonologie-fel'), // Implosion d'Imps
  277: domaine('pyromancie'), // Trait de l'Ombre ardent
}
