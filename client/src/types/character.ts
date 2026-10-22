/** Fiche de personnage Sindragosa (plans/31-refonte-regles-sindragosa.md § 3). */

import type { EtatEntry } from '../data/etats'
import type { StatId } from '../data/sindragosa/domains'
import type { ArmorNature } from '../utils/sindragosa/armorNature'
import type { FormId } from '../data/sindragosa/forms'
import type { GameSystemId } from '../data/systems'
import type { KnightSheet } from './knight'

export type ItemType = 'arme' | 'armure' | 'consommable' | 'composant' | 'divers'
export type WeaponSize = 'naturelle' | 'legere' | 'une-main' | 'deux-mains'

/** Un objet de l'inventaire (plans/35-equipement.md). */
export interface ItemRow {
  id: string
  name: string
  description?: string
  quantity: number
  /** Absent sur les objets créés avant le 2026-10-18 : « divers ». */
  type?: ItemType
  /** Arme ou armure portée. */
  equipped?: boolean
  /** Arme : gabarit (fixe les dégâts), bonus de dégâts, domaine d'attaque. */
  size?: WeaponSize
  damageBonus?: number
  domainId?: string
  /** Armure : Armure Physique apportée quand elle est équipée. */
  armor?: number
  /** Armure : tissu, cuir, maille ou plaque, qui fixe ses malus (absente = tissu). */
  nature?: ArmorNature
  /** Objet divers : ±d6 sur les jets d'un domaine, tant qu'il est dans l'inventaire (malus = objet maudit). */
  domainBonus?: { domainId: string; dice: number }
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

export type Stats = Record<StatId, number>

export interface Character {
  id: string
  /** Système de la fiche (plans/43). Les champs Sindragosa ci-dessous ne servent qu'à WoW Forever. */
  system: GameSystemId
  /** Fiche Knight (colonne `sheet`), `null` pour WoW Forever. */
  knight: KnightSheet | null
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
  /** Armure Physique (AP) totale : armures équipées + `armorBonus`. Synchronisée pour le combat. */
  armor: number
  /** AP apportée par les compétences, réglée à la main. */
  armorBonus: number

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
  /** Patrons réglés par le MJ : { [recipeId]: true (appris en bonus) | false (oublié) }. Sans entrée, le rang du métier décide. */
  recipeGrants: Record<string, boolean>

  items: ItemRow[]
  /** Monnaie : 1 or = 10 argent = 100 cuivre. */
  goldCoins: number
  silverCoins: number
  copperCoins: number

  /** Points de chance : 2 par séance, chacun ajoute 1d6 à un jet. */
  pcCurrent: number
  /** Mana (plans/40-mana.md). `manaMax` est calculée par `maxMana`, stockée pour le repos. */
  manaCurrent: number
  manaMax: number
  /** États préjudiciables en cours (voir `data/etats.ts`). */
  states: EtatEntry[]
  /** Transformation prise : son arme naturelle remplace les armes équipées (plans/39). */
  form: FormId | null
}
