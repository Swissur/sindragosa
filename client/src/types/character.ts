/** Fiche de personnage Sindragosa (plans/31-refonte-regles-sindragosa.md § 3). */

import type { EtatId } from '../data/etats'
import type { StatId } from '../data/sindragosa/domains'

export interface ItemRow {
  id: string
  name: string
  description?: string
  quantity: number
}

/** Rang d'un domaine (ou domaine avancé) et coches accumulées vers le rang suivant. */
export interface DomainProgress {
  rank: number
  ticks: number
}

export interface SpecialtyRow {
  id: string
  domainId: string
  name: string
  /** 1 Apprenti, 2 Expert, 3 Maître. */
  level: number
  ticks: number
}

/** Compteur libre (Mana, Rage, Énergie…), réglé à la main. */
export interface ResourceRow {
  id: string
  name: string
  current: number
  max: number
}

export interface WeaponRow {
  id: string
  name: string
  /** Dégâts fixes de l'arme (dégâts = arme + marge − armure). */
  damage: number
  /** Domaine utilisé pour attaquer. */
  domainId: string
}

export type Stats = Record<StatId, number>

export interface Character {
  id: string
  name: string
  /** Background / backstory (UI: « Histoire »). */
  histoire: string
  /** Id de `data/sindragosa/races.ts`, '' tant qu'elle n'est pas choisie. */
  race: string
  portraitImageId: number | null

  stats: Stats
  hpCurrent: number
  /** PV max stockés (calculés par `maxHp`, renvoyés au serveur pour le combat et le repos). */
  hpMax: number
  /** Bonus de PV max divers (objets, compétences passives). */
  hpBonus: number
  /** Armure physique (AP). */
  armor: number

  domains: Record<string, DomainProgress>
  specialties: SpecialtyRow[]
  advancedDomains: Record<string, DomainProgress>
  titles: string[]
  /** Usages consommés par période : { [période]: { [abilityId]: nombre } }. */
  abilityUses: Record<string, Record<string, number>>
  sessionTicks: { success: number; critFail: number }
  resources: ResourceRow[]
  /** Métiers d'artisanat connus : { [craftId]: rang }. */
  crafts: Record<string, number>
  weapons: WeaponRow[]

  items: ItemRow[]
  /** Monnaie : 1 or = 10 argent = 100 cuivre. */
  goldCoins: number
  silverCoins: number
  copperCoins: number

  /** Points de chance : 2 par séance, chacun ajoute 1d6 à un jet. */
  pcCurrent: number
  /** États préjudiciables en cours (voir `data/etats.ts`). */
  states: EtatId[]
}
