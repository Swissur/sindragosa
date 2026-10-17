/**
 * Races jouables de Sindragosa : +1 à une caractéristique et un pouvoir racial 1/jour.
 * Source : docs/regles/Sindragosa.pdf, « Les Races jouables ».
 */
import type { StatId } from './domains'

export type Faction = 'alliance' | 'horde'

export interface Race {
  id: string
  label: string
  faction: Faction
  /** Caractéristique phare : +1 à la création. */
  stat: StatId
  flavor: string
  power: {
    name: string
    actionLabel: string
    effect: string
  }
}

export const RACES: Race[] = [
  {
    id: 'humain', label: 'Humain', faction: 'alliance', stat: 'cha',
    flavor: 'Adaptabilité, diplomatie et leadership.',
    power: {
      name: 'Chacun pour soi', actionLabel: 'Action Rapide (Réaction)',
      effect: "Dissipe immédiatement n'importe quel effet d'incapacité mentale ou physique (Étourdissement, Enracinement, Peur ou Sommeil) qui affecte le personnage et restaure instantanément +3 points de RP.",
    },
  },
  {
    id: 'nain', label: 'Nain', faction: 'alliance', stat: 'end',
    flavor: 'Une constitution légendaire taillée dans la roche.',
    power: {
      name: 'Forme de Pierre', actionLabel: 'Action Rapide',
      effect: 'Pendant 2 tours, le Nain gagne +2 AP (Armure Physique) supplémentaire, purge tous les effets actifs de Saignement, Poison et Maladie, et devient immunisé à ces derniers pour la durée du pouvoir.',
    },
  },
  {
    id: 'elfe-nuit', label: 'Elfe de la Nuit', faction: 'alliance', stat: 'agi',
    flavor: 'Grâce aérienne, réflexes félins et précision.',
    power: {
      name: "Camouflage dans l'Ombre", actionLabel: 'Action Rapide',
      effect: "L'Elfe fond instantanément dans les ombres et devient totalement invisible tant qu'il reste immobile. Si la première action qu'il effectue en sortant du camouflage est une attaque, celle-ci gagne +2d6 aux dégâts.",
    },
  },
  {
    id: 'gnome', label: 'Gnome', faction: 'alliance', stat: 'int',
    flavor: 'Esprit vif, inventivité et génie mécanique.',
    power: {
      name: "Artiste de l'Évasion", actionLabel: 'Action Rapide',
      effect: 'Se libère instantanément de tout piège au sol, lien, filet ou effet de ralentissement/enracinement. De plus, il gagne +3 mètres de déplacement pour le tour en cours.',
    },
  },
  {
    id: 'draenei', label: 'Draeneï', faction: 'alliance', stat: 'wis',
    flavor: 'Guidés par la Lumière et une mémoire millénaire.',
    power: {
      name: 'Don des Naaru', actionLabel: 'Action Complète',
      effect: 'Invoque une bénédiction lumineuse sur le Draeneï ou un allié adjacent. La cible régénère 5 PV par tour pendant 3 tours (soit 15 PV au total). Ce soin ne peut pas être interrompu par les dégâts.',
    },
  },
  {
    id: 'worgen', label: 'Worgen', faction: 'alliance', stat: 'str',
    flavor: 'Puissance sauvage et férocité canine.',
    power: {
      name: 'Sombre Trot', actionLabel: 'Action Rapide',
      effect: 'Le Worgen prend sa forme sauvage et double sa vitesse de déplacement pendant 2 tours. Sa prochaine attaque de mêlée au cours de cette charge inflige +1d6 de dégâts tranchants supplémentaires.',
    },
  },
  {
    id: 'orc', label: 'Orc', faction: 'horde', stat: 'str',
    flavor: 'La Fureur de la Horde et une musculature colossale.',
    power: {
      name: 'Fureur Sanguinaire', actionLabel: 'Action Rapide',
      effect: 'Pendant 2 tours, le personnage ajoute +1d6 à tous ses jets de dégâts physiques en mêlée ou à distance, et devient totalement immunisé aux effets de Peur.',
    },
  },
  {
    id: 'troll', label: 'Troll', faction: 'horde', stat: 'agi',
    flavor: 'Souplesse vaudou, vitesse et précision au tir.',
    power: {
      name: 'Berserker', actionLabel: 'Action Rapide',
      effect: 'Le Troll entre dans une transe de frénésie. Pendant 1 tour complet, toutes ses actions coûtent 1 cran de moins (une Action Complète devient une Action Rapide, une Action Rapide devient une Action Gratuite).',
    },
  },
  {
    id: 'tauren', label: 'Tauren', faction: 'horde', stat: 'end',
    flavor: 'Gabarit massif et connexion profonde avec la Terre-Mère.',
    power: {
      name: 'Choc Martial', actionLabel: 'Action Complète',
      effect: "Frappe violemment le sol du sabot. Tous les ennemis adjacents (rayon de 3 mètres) doivent réussir un jet d'Athlétisme/Équilibre sous peine d'être assommés (Étourdissement 1 tour) et projetés À terre.",
    },
  },
  {
    id: 'reprouve', label: 'Réprouvé', faction: 'horde', stat: 'wis',
    flavor: 'Volonté macabre, résistance à la douleur et esprit tenace.',
    power: {
      name: 'Volonté des Réprouvés', actionLabel: 'Action Rapide (Réaction)',
      effect: "Immunise ou annule immédiatement les effets de Charme, Peur et Sommeil. De plus, si le Réprouvé consomme le cadavre d'un humanoïde ou d'une bête fraîchement tuée hors combat (1 minute), il régénère 50 % de ses PV Max.",
    },
  },
  {
    id: 'elfe-sang', label: 'Elfe de Sang', faction: 'horde', stat: 'int',
    flavor: 'Affinité exceptionnelle avec la magie et les arcanes.',
    power: {
      name: 'Torrent Arcane', actionLabel: 'Action Rapide',
      effect: "Libère une onde de choc magique qui réduit au silence tous les lanceurs de sorts ennemis dans un rayon de 4 mètres pendant 1 tour, tout en restaurant 5 points de Mana / Énergie (ou 3 RP) à l'Elfe de Sang.",
    },
  },
  {
    id: 'goblin', label: 'Goblin', faction: 'horde', stat: 'cha',
    flavor: 'Sens des affaires, marchandage culotté et ruse.',
    power: {
      name: 'Saut de Fusée / Fusée de Poche', actionLabel: 'Action Rapide',
      effect: "Au choix lors du déclenchement — Saut : déploie sa ceinture à fusée pour se propulser instantanément à 8 mètres dans n'importe quelle direction (ignore les obstacles au sol). Tir : tire une roquette de poche infligeant 2d6 dégâts de Feu de zone (2m) à distance.",
    },
  },
]

export const raceById = (id: string): Race | undefined => RACES.find((r) => r.id === id)
