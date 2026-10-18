/**
 * Caractéristiques, domaines et domaines avancés de Sindragosa.
 * Source : docs/regles/Sindragosa.pdf, décisions dans plans/31-refonte-regles-sindragosa.md § 6.
 */
import { ABILITIES } from './abilities'
import { CRAFTS } from './crafts'

export type StatId = 'str' | 'agi' | 'end' | 'int' | 'wis' | 'cha'

export interface Stat {
  id: StatId
  label: string
  abbr: string
  description: string
}

export const STATS: Stat[] = [
  { id: 'str', label: 'Force', abbr: 'FOR', description: 'Puissance physique, puissance musculaire et capacité à porter/imposer son poids.' },
  { id: 'agi', label: 'Agilité', abbr: 'AGI', description: 'Coordination, réflexes, précision et vitesse de déplacement.' },
  { id: 'end', label: 'Endurance', abbr: 'END', description: 'Résistance physique, métabolisme, santé et vigueur globale.' },
  { id: 'int', label: 'Intelligence', abbr: 'INT', description: 'Érudition, raisonnement logique, analyse et magie profane.' },
  { id: 'wis', label: 'Sagesse', abbr: 'SAG', description: 'Intuition, perception, connexion spirituelle, magie divine et naturelle.' },
  { id: 'cha', label: 'Charisme', abbr: 'CHA', description: "Force de personnalité, leadership, illusion et magie de l'Ombre/Fél." },
]

export interface Domain {
  id: string
  stat: StatId
  label: string
  /**
   * Spécialités suggérées sur la fiche. Depuis le 2026-10-18, ce sont celles
   * qu'exigent les compétences (un joueur qui suit l'exemple est sur la voie
   * d'une compétence). Les domaines qu'aucune compétence ne cite gardent les
   * exemples du livre de règles. Les joueurs peuvent en proposer d'autres.
   */
  specialties: string[]
}

export const DOMAINS: Domain[] = [
  // Force
  { id: 'athletisme', stat: 'str', label: 'Athlétisme', specialties: ['Lutte / Mains nues'] },
  { id: 'melee-bourrine', stat: 'str', label: 'Mêlée bourrine', specialties: ['Haches', 'Armes à deux mains', 'Masses', 'Exécution'] },
  { id: 'armures-boucliers', stat: 'str', label: 'Armures & boucliers', specialties: ['Boucliers', 'Armures de plaques'] },
  { id: 'intimidation-physique', stat: 'str', label: 'Intimidation physique', specialties: ['Provocation (Taunt)', 'Posture imposante', 'Rugissement de guerre'] },
  { id: 'artisanat-lourd', stat: 'str', label: 'Artisanat lourd', specialties: ['Extraction (Minage)'] },
  // Agilité
  { id: 'acrobatie-furtivite', stat: 'agi', label: 'Acrobatie & Furtivité', specialties: ["Discrétion dans l'ombre", 'Esquive'] },
  { id: 'combat-precision', stat: 'agi', label: 'Combat de précision', specialties: ['Dagues', 'Combat à deux armes', 'Poisons/Saignements', 'Lances/Bâtons', 'Tranchant/Perçant'] },
  { id: 'tir-lancer', stat: 'agi', label: 'Tir & Lancer', specialties: ['Armes à feu/Arcs', 'Lancer de Shurikens/Dagues', "Lancer d'armes", 'Lances/Javelots'] },
  { id: 'escamotage-crochetage', stat: 'agi', label: 'Escamotage & Crochetage', specialties: ['Désamorçage de pièges', 'Vol à la tire', 'Crochetage de coffres'] },
  { id: 'artisanat-delicat', stat: 'agi', label: 'Artisanat délicat', specialties: ['Ingénierie de précision', 'Travail du cuir', 'Dépeçage'] },
  // Endurance
  { id: 'resistance-physique', stat: 'end', label: 'Résistance physique', specialties: ['Résistance aux impacts', 'Endurcissement', 'Absorber les coups'] },
  { id: 'volonte-recuperation', stat: 'end', label: 'Volonté & Récupération', specialties: ['Second souffle'] },
  { id: 'survie-milieu-hostile', stat: 'end', label: 'Survie en milieu hostile', specialties: ['Climats extrêmes'] },
  { id: 'tolerance-toxines', stat: 'end', label: 'Tolérance aux toxines', specialties: ['Résistance aux poisons', 'Tolérance à la Peste', 'Résistance aux maladies'] },
  { id: 'energie-souffle', stat: 'end', label: 'Énergie & Souffle', specialties: ['Marche forcée', 'Apnée', 'Course de fond'] },
  // Intelligence
  { id: 'magie-profane-arcanes', stat: 'int', label: 'Magie profane & Arcanes', specialties: ["Sorts d'Arcane", 'Sorts de Feu', 'Téléportation', 'Chronomancie', 'Décryptage de langues/Runes'] },
  { id: 'explosifs-ingenierie', stat: 'int', label: 'Explosifs & Ingénierie', specialties: ['Bricolage Goblino-Gnome', 'Explosifs'] },
  { id: 'histoire-geographie', stat: 'int', label: "Histoire & Géographie d'Azeroth", specialties: ['Histoire des Titans', "Géographie d'Outreterre", 'Runes anciennes'] },
  { id: 'tactique-analyse', stat: 'int', label: 'Tactique & Analyse', specialties: ['Analyse des failles'] },
  { id: 'medecine-soins', stat: 'int', label: 'Médecine & Soins', specialties: ['Premiers secours', 'Traitement des malédictions', 'Sutures'] },
  // Sagesse
  { id: 'perception-sens', stat: 'wis', label: 'Perception & Sens', specialties: ['Pistage'] },
  { id: 'magie-divine-sacree', stat: 'wis', label: 'Magie divine & Sacrée', specialties: ['Soins Sacrés'] },
  { id: 'communion-naturelle-chamanisme', stat: 'wis', label: 'Communion naturelle & Chamanisme', specialties: ['Esprits des éléments', 'Forme animale', 'Magie de la Nature'] },
  { id: 'alchimie-herboristerie', stat: 'wis', label: 'Alchimie & Herboristerie', specialties: ['Découverte des plantes', 'Potions de soins', 'Fortifiants', 'Transmutation'] },
  { id: 'volonte-spirituelle', stat: 'wis', label: 'Volonté spirituelle', specialties: [] },
  // Charisme
  { id: 'persuasion-diplomatie', stat: 'cha', label: 'Persuasion & Diplomatie', specialties: ['Négociation diplomatique', 'Séduction', 'Conviction'] },
  { id: 'commandement-inspiration', stat: 'cha', label: 'Commandement & Inspiration', specialties: ['Cris de ralliement', "Aura d'inspiration", 'Charisme de chef de guerre'] },
  { id: 'magie-ombre-fel', stat: 'cha', label: "Magie de l'Ombre & Fél", specialties: ['Malédictions', "Sorts d'Ombre", 'Trait du Chaos'] },
  { id: 'negociation-commerce', stat: 'cha', label: 'Négociation & Commerce', specialties: ['Lois du marché', "Évaluation d'objets rares", "Troc d'Hôtel des Ventes"] },
  { id: 'tromperie-comedie', stat: 'cha', label: 'Tromperie & Comédie', specialties: ["Réseau d'informateurs", 'Musique / Chant'] },
]

/** Prérequis d'un domaine avancé : un domaine de base ou un autre domaine avancé. */
export interface AdvancedPrerequisite {
  kind: 'domain' | 'advanced'
  id: string
  rank: number
}

/**
 * Domaines avancés : progressent comme un domaine et s'ouvrent par prérequis
 * (décidé le 2026-10-18, table du plan 31 § 7). Le jet utilise la plus haute des
 * caractéristiques liées à leurs prérequis (`utils/sindragosa/advanced.ts`).
 */
export interface AdvancedDomain {
  id: string
  label: string
  prerequisites: AdvancedPrerequisite[]
  /** Compétences qui l'ouvrent (l'une suffit) ; ses prérequis ne servent alors qu'à la carac du jet. */
  openedBy?: number[]
}

/**
 * Artisanats avancés (décidé le 2026-10-18) : chaque métier hybride est un
 * domaine avancé, ouvert par l'une de ses deux compétences (386 à 425 du PDF,
 * deux par métier dans l'ordre du catalogue). Au rang 1, ses patrons
 * s'ajoutent à l'onglet Artisanat. Prérequis = ceux des deux compétences.
 */
const HYBRID_CRAFT_ABILITIES: Record<string, [number, number]> = {
  'forge-magie': [386, 387],
  'alchimi-cuir': [388, 389],
  'meca-botanique': [390, 391],
  'electro-mecanique': [392, 393],
  'necro-forge': [394, 395],
  'cuirasse-sacree': [396, 397],
  'archerie-artisan': [398, 399],
  'horlogerie-chronomantique': [400, 401],
  'forge-feu': [402, 403],
  'tissage-vegetal': [404, 405],
  gemmologie: [406, 407],
  'artillerie-siege': [408, 409],
  'botterie-acrobatie': [410, 411],
  'cyber-equipement': [412, 413],
  'parcheminerie-runique': [414, 415],
  prothesiste: [416, 417],
  'chimie-explosive': [418, 419],
  'charpenterie-marine': [420, 421],
  'tissage-ambre': [422, 423],
  'dracono-forge': [424, 425],
}

const CRAFT_DOMAINS: AdvancedDomain[] = CRAFTS.filter((c) => c.kind === 'hybrid').map((c) => {
  const openedBy = HYBRID_CRAFT_ABILITIES[c.id]
  const prerequisites = new Map<string, AdvancedPrerequisite>()
  for (const p of ABILITIES.filter((a) => openedBy.includes(a.id)).flatMap((a) => a.prerequisites)) {
    if (p.kind !== 'domain' && p.kind !== 'advanced') continue
    const key = `${p.kind}:${p.id}`
    if (!prerequisites.has(key) || prerequisites.get(key)!.rank > p.rank) prerequisites.set(key, { kind: p.kind, id: p.id, rank: p.rank })
  }
  return { id: c.id, label: c.label, prerequisites: [...prerequisites.values()], openedBy }
})

export const ADVANCED_DOMAINS: AdvancedDomain[] = [
  { id: 'ivresse-combat', label: 'Ivresse du Combat', prerequisites: [{ kind: 'domain', id: 'melee-bourrine', rank: 2 }, { kind: 'domain', id: 'volonte-recuperation', rank: 1 }] },
  { id: 'tactique-choc', label: 'Tactique de Choc', prerequisites: [{ kind: 'domain', id: 'intimidation-physique', rank: 2 }, { kind: 'domain', id: 'tactique-analyse', rank: 1 }] },
  { id: 'danse-lames', label: 'Danse des Lames', prerequisites: [{ kind: 'domain', id: 'combat-precision', rank: 2 }, { kind: 'domain', id: 'acrobatie-furtivite', rank: 1 }] },
  { id: 'poisons-toxines', label: 'Poisons & Toxines', prerequisites: [{ kind: 'domain', id: 'escamotage-crochetage', rank: 2 }, { kind: 'domain', id: 'alchimie-herboristerie', rank: 1 }] },
  { id: 'necromancie-peste', label: 'Nécromancie & Peste', prerequisites: [{ kind: 'domain', id: 'melee-bourrine', rank: 2 }, { kind: 'domain', id: 'magie-ombre-fel', rank: 1 }] },
  { id: 'maitrise-arcanes', label: 'Maîtrise des Arcanes', prerequisites: [{ kind: 'domain', id: 'magie-profane-arcanes', rank: 2 }] },
  { id: 'magie-givre-alteration', label: 'Magie du Givre & Altération', prerequisites: [{ kind: 'domain', id: 'magie-profane-arcanes', rank: 2 }] },
  { id: 'pyromancie', label: 'Pyromancie', prerequisites: [{ kind: 'domain', id: 'magie-profane-arcanes', rank: 2 }] },
  { id: 'chronomancie', label: 'Chronomancie', prerequisites: [{ kind: 'domain', id: 'magie-profane-arcanes', rank: 3 }, { kind: 'domain', id: 'histoire-geographie', rank: 1 }] },
  { id: 'runes-anciennes', label: 'Runes Anciennes', prerequisites: [{ kind: 'domain', id: 'magie-profane-arcanes', rank: 2 }, { kind: 'domain', id: 'histoire-geographie', rank: 2 }] },
  { id: 'maitrise-elements', label: 'Maîtrise des Éléments', prerequisites: [{ kind: 'domain', id: 'communion-naturelle-chamanisme', rank: 3 }] },
  { id: 'astral-celeste', label: 'Astral & Céleste', prerequisites: [{ kind: 'domain', id: 'communion-naturelle-chamanisme', rank: 2 }, { kind: 'domain', id: 'magie-profane-arcanes', rank: 2 }] },
  { id: 'lumiere-vengeuse', label: 'Lumière Vengeuse', prerequisites: [{ kind: 'domain', id: 'magie-divine-sacree', rank: 3 }, { kind: 'domain', id: 'commandement-inspiration', rank: 1 }] },
  { id: 'discipline-absolution', label: 'Discipline & Absolution', prerequisites: [{ kind: 'domain', id: 'magie-divine-sacree', rank: 2 }, { kind: 'domain', id: 'volonte-spirituelle', rank: 2 }] },
  { id: 'demonologie-fel', label: 'Démonologie & Fél', prerequisites: [{ kind: 'domain', id: 'magie-ombre-fel', rank: 2 }] },
  { id: 'maledictions-affliction', label: 'Malédictions & Affliction', prerequisites: [{ kind: 'domain', id: 'magie-ombre-fel', rank: 2 }] },
  { id: 'magie-vide', label: 'Magie du Vide', prerequisites: [{ kind: 'domain', id: 'magie-ombre-fel', rank: 2 }, { kind: 'domain', id: 'volonte-spirituelle', rank: 1 }] },
  { id: 'ingenierie-goblino-gnome', label: 'Ingénierie Goblino-Gnome', prerequisites: [{ kind: 'domain', id: 'explosifs-ingenierie', rank: 2 }] },
  { id: 'elixirs-arcaniques', label: 'Élixirs Arcaniques', prerequisites: [{ kind: 'domain', id: 'alchimie-herboristerie', rank: 2 }, { kind: 'domain', id: 'magie-profane-arcanes', rank: 1 }] },
  { id: 'toxines-sauvages', label: 'Toxines Sauvages', prerequisites: [{ kind: 'domain', id: 'alchimie-herboristerie', rank: 2 }, { kind: 'domain', id: 'survie-milieu-hostile', rank: 1 }] },
  { id: 'dressage-sauvage', label: 'Dressage Sauvage', prerequisites: [{ kind: 'domain', id: 'communion-naturelle-chamanisme', rank: 2 }, { kind: 'domain', id: 'survie-milieu-hostile', rank: 1 }] },
  { id: 'magie-draconique', label: 'Magie Draconique', prerequisites: [{ kind: 'domain', id: 'magie-profane-arcanes', rank: 3 }, { kind: 'domain', id: 'histoire-geographie', rank: 2 }] },
  ...CRAFT_DOMAINS,
]

/**
 * Noms de spécialités équivalents : les PDF écrivent parfois la même spécialité
 * de deux façons. Les alternatives « A/B » et entre parenthèses sont déjà lues
 * par `specialtyNameVariants` ; ne figurent ici que les vrais synonymes.
 * Le 1er nom de chaque groupe est celui du catalogue : c'est lui qu'affichent les prérequis.
 */
export const SPECIALTY_ALIASES: string[][] = [
  ['Boucliers', 'Bouclier'],
  ["Discrétion dans l'ombre", 'Furtivité'],
  ['Téléportation', 'Téléportation & Portails'],
  ['Armes à deux mains', 'Épées à deux mains', 'Masses à deux mains', 'Haches à deux mains'],
  ['Masses', 'Masse'],
  ['Forme animale', 'Formes animales druidiques'],
  ['Analyse des failles', 'Analyse des points faibles'],
  ['Poisons/Saignements', 'Poisons'],
]

export const domainById = (id: string): Domain | undefined => DOMAINS.find((d) => d.id === id)
export const advancedDomainById = (id: string): AdvancedDomain | undefined => ADVANCED_DOMAINS.find((d) => d.id === id)
