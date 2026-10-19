/** Types des catalogues Sindragosa (compétences, artisanat). */

export type ActionType = 'complete' | 'rapide' | 'gratuite' | 'reaction' | 'passif' | 'hors-combat' | 'dialogue'

export type UsesPer = 'combat' | 'repos-court' | 'repos-long' | 'seance' | 'scenario' | 'campagne' | 'jour'

export type Prerequisite =
  | { kind: 'domain'; id: string; rank: number }
  | { kind: 'advanced'; id: string; rank: number }
  | { kind: 'specialty'; name: string; level: number }
  | { kind: 'title'; name: string }

export interface Ability {
  /** Numéro dans `docs/regles/Compétences & Domaines (Sindragosa).pdf`. */
  id: number
  name: string
  nameEn: string | null
  category: string
  prerequisites: Prerequisite[]
  /** Autre façon de la débloquer : remplir tous ces prérequis suffit aussi. */
  alternatePrerequisites?: Prerequisite[]
  /** Texte des prérequis tel qu'écrit dans le PDF. */
  prerequisitesRaw: string
  actionType: ActionType
  actionLabel: string
  condition: string
  cooldownTurns: number | null
  usesPer: UsesPer | null
  effect: string
  /** Coût en mana : présent sur les sorts seulement (plans/40-mana.md). */
  manaCost?: number
  /** Interprétation faite à la transcription, s'il y en a eu une. */
  notes?: string
}

export interface Craft {
  id: string
  label: string
  kind: 'base' | 'hybrid'
  basis: string
  summary: string
}

export interface Recipe {
  id: string
  craft: string
  /** Rang 1 à 5 pour les métiers de base, null pour les métiers hybrides. */
  rank: number | null
  name: string
  /** Quantité produite (« Lot de N »), null si un seul objet. */
  batch: number | null
  components: { qty: number; name: string }[]
  effect: string
}
