/**
 * Nature de chaque armure fabriquée (décidé le 2026-10-22) : la forge donne de la
 * plaque (les mailles et le plastron de recrue en fer : maille), le travail du cuir
 * du cuir (les écailles : maille). Un bouclier suit ses composants : bois et cuir →
 * cuir, fer → maille, acier ou mieux → plaque.
 */
import type { ArmorNature } from '../../utils/sindragosa/armorNature'

/** Par id de patron (`RECIPES`). Tout patron qui fabrique une armure doit y figurer. */
export const ARMOR_RECIPE_NATURES: Record<string, ArmorNature> = {
  // Forge : plaque, sauf les mailles
  'forge-r1-02': 'maille', // Plastron du recrue en fer — maille, choisi le 2026-10-22
  'forge-r1-07': 'maille', // Jambières en mailles simples
  'forge-r2-02': 'plaque', // Cuirasse de plaques de garde
  'forge-r2-04': 'plaque', // Grand bouclier de rempart — bouclier en acier
  'forge-r2-06': 'plaque', // Gantelets de poigne de fer
  'forge-r2-07': 'plaque', // Bottes de cuirassé articulées
  'forge-r3-01': 'plaque', // Plastron complet en mithril
  'forge-r3-03': 'plaque', // Bouclier réfléchissant à pointes — bouclier en mithril
  'forge-r3-05': 'plaque', // Jambières d'acier-mithril articulées
  'forge-r3-07': 'plaque', // Épaulières du colosse
  'forge-r3-09': 'plaque', // Heaume à visière de chevalier
  'forge-r4-01': 'plaque', // Harnois de plaques en thorium massif
  'forge-r4-03': 'plaque', // Pavois de citadelle en thorium — bouclier en thorium
  'forge-r4-05': 'plaque', // Gantelets de titan en thorium
  'forge-r4-06': 'plaque', // Bottes de roc inébranlable
  'forge-r5-01': 'plaque', // Égide du Titan noir en adamantine
  'forge-r5-03': 'plaque', // Pavois d'invulnérabilité en arcanite — bouclier en arcanite
  'forge-r5-05': 'plaque', // Harnois complet du souverain antique
  'forge-r5-07': 'plaque', // Gantelets brise-montagne
  'forge-r5-08': 'plaque', // Jambières d'invincibilité
  'forge-r5-09': 'plaque', // Couronne de seigneur de guerre en arcanite
  // Travail du cuir : cuir, sauf les écailles (maille)
  'cuir-r1-01': 'cuir', // Bottes en cuir souple
  'cuir-r1-02': 'cuir', // Plastron du traqueur brut
  'cuir-r1-06': 'cuir', // Jambières en cuir simple
  'cuir-r2-01': 'cuir', // Plastron en cuir durci
  'cuir-r2-03': 'cuir', // Bottes de pas silencieux
  'cuir-r2-04': 'cuir', // Gantelets de tireur d'élite
  'cuir-r2-07': 'cuir', // Jambières d'agilité en cuir souple
  'cuir-r3-01': 'cuir', // Plastron en cuir d'ours de Norfendre
  'cuir-r3-02': 'cuir', // Cape du traqueur de brume
  'cuir-r3-03': 'cuir', // Gantelets de poigne du félin
  'cuir-r3-04': 'cuir', // Bottes d'esquive acrobatique
  'cuir-r3-05': 'cuir', // Jambières renforcées en cuir de dragonnet
  'cuir-r3-06': 'cuir', // Casque de vision nocturne en cuir
  'cuir-r3-10': 'cuir', // Ceinturon de colosse en cuir dur
  'cuir-r4-01': 'maille', // Plastron en écailles de basilic — écailles : maille
  'cuir-r4-02': 'cuir', // Manteau de l'assassin de la Voile Sanglante
  'cuir-r4-03': 'cuir', // Bottes de célérité du guépard
  'cuir-r4-04': 'cuir', // Gantelets de maître escrimeur
  'cuir-r4-05': 'cuir', // Jambières d'imperméabilité au venin
  'cuir-r4-09': 'cuir', // Casque de prédateur des sommets
  'cuir-r5-01': 'maille', // Plastron légendaire du Dragon d'Albâtre — écailles de dragon : maille
  'cuir-r5-02': 'cuir', // Manteau des ombres éternelles
  'cuir-r5-03': 'cuir', // Bottes de vent céleste
  'cuir-r5-04': 'cuir', // Gantelets de frappe mortelle du Cobra
  'cuir-r5-05': 'cuir', // Jambières de l'Archidruide des serres
  'cuir-r5-06': 'cuir', // Casque du Vengeur de la Nuit
  'cuir-r5-07': 'cuir', // Cape de peau de Chimaera géante
  'cuir-r5-09': 'cuir', // Ceinturon de puissance du Traqueur d'Âmes
  // Forge-magie
  'forge-magie-05': 'plaque', // Harnois de plaques de flux magique
}
