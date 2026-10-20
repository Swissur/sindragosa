/** Fiche Knight, rangée dans `character.sheet` (plans/43 § 4.1). */

import type { AspectId, CaracId, DerivedId } from '../data/knight/aspects'

export interface Gauge {
  current: number
  max: number
}

export interface KnightSheet {
  aspects: Record<AspectId, number>
  carac: Record<CaracId, number>
  overdrive: Record<CaracId, number>
  /** Carac de référence de chaque valeur dérivée, au choix du joueur. */
  derived: Record<DerivedId, CaracId>
  /** Points d'espoir. */
  espoir: Gauge
  /** Contacts restants ; le max vient de la carac de Dame choisie. */
  contacts: number
  heroisme: number
  px: number
  /** Points de gloire accumulés. */
  pg: number
  armure: {
    modele: string
    /** Champ de force : il se retire des dégâts (recopié dans `character.armor` pour le combat). */
    cdf: number
    pa: Gauge
    pe: Gauge
  }
  identite: {
    surnom: string
    archetype: string
    section: string
    blason: string
    hautFait: string
    motivations: string
    avantages: string
    inconvenients: string
  }
}
