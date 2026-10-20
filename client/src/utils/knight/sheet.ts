/**
 * Fiche Knight : valeurs par défaut, lecture du jsonb, valeurs dérivées
 * (plans/43). Les règles viennent de l'ébauche, à vérifier contre le livre.
 */

import {
  ASPECTS, ASPECT_MAX, ASPECT_MIN, ASPECT_OF, CARACS, DERIVED, OVERDRIVE_MAX,
  type AspectId, type CaracId,
} from '../../data/knight/aspects'
import type { Gauge, KnightSheet } from '../../types/knight'

export const ESPOIR_START = 50

const fill = <K extends string>(keys: readonly K[], value: number) =>
  Object.fromEntries(keys.map((k) => [k, value])) as Record<K, number>

export function createKnightSheet(): KnightSheet {
  return {
    aspects: fill(ASPECTS.map((a) => a.id), 2),
    carac: fill(CARACS, 1),
    overdrive: fill(CARACS, 0),
    derived: { defense: 'hargne', reaction: 'tir', initiative: 'discretion', sante: 'force', contacts: 'aura' },
    espoir: { current: ESPOIR_START, max: ESPOIR_START },
    contacts: 1,
    heroisme: 0,
    px: 0,
    pg: 0,
    armure: { modele: '', cdf: 0, pa: { current: 0, max: 0 }, pe: { current: 0, max: 0 } },
    identite: { surnom: '', archetype: '', section: '', blason: '', hautFait: '', motivations: '', avantages: '', inconvenients: '' },
  }
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
const int = (v: unknown, fallback: number, min = 0, max = Infinity) =>
  typeof v === 'number' && Number.isFinite(v) ? Math.max(min, Math.min(max, Math.round(v))) : fallback
const str = (v: unknown) => (typeof v === 'string' ? v : '')

function gauge(v: unknown, fallback: Gauge): Gauge {
  if (!isObj(v)) return { ...fallback }
  const max = int(v.max, fallback.max)
  return { max, current: int(v.current, fallback.current, 0, max) }
}

/**
 * Lit le jsonb `sheet` : ce qui manque prend sa valeur par défaut, ce qui sort des
 * bornes est ramené dedans. Une fiche vierge (`{}`) donne une fiche de départ.
 */
export function normalizeKnightSheet(raw: unknown): KnightSheet {
  const d = createKnightSheet()
  if (!isObj(raw)) return d
  const aspects = isObj(raw.aspects) ? raw.aspects : {}
  const carac = isObj(raw.carac) ? raw.carac : {}
  const od = isObj(raw.overdrive) ? raw.overdrive : {}
  const derived = isObj(raw.derived) ? raw.derived : {}
  const armure = isObj(raw.armure) ? raw.armure : {}
  const identite = isObj(raw.identite) ? raw.identite : {}

  for (const a of ASPECTS) d.aspects[a.id] = int(aspects[a.id], d.aspects[a.id], ASPECT_MIN, ASPECT_MAX)
  for (const c of CARACS) {
    d.carac[c] = int(carac[c], d.carac[c], 0, d.aspects[ASPECT_OF[c]])
    d.overdrive[c] = int(od[c], 0, 0, OVERDRIVE_MAX)
  }
  for (const x of DERIVED) {
    const pick = derived[x.id]
    if (typeof pick === 'string' && ASPECT_OF[pick as CaracId] === x.aspect) d.derived[x.id] = pick as CaracId
  }
  d.espoir = gauge(raw.espoir, d.espoir)
  d.contacts = int(raw.contacts, d.contacts)
  d.heroisme = int(raw.heroisme, 0)
  d.px = int(raw.px, 0)
  d.pg = int(raw.pg, 0)
  d.armure = {
    modele: str(armure.modele),
    cdf: int(armure.cdf, 0),
    pa: gauge(armure.pa, d.armure.pa),
    pe: gauge(armure.pe, d.armure.pe),
  }
  for (const k of Object.keys(d.identite) as (keyof KnightSheet['identite'])[]) {
    d.identite[k] = str(identite[k])
  }
  return d
}

/** Carac + overdrive : ce que vaut une valeur dérivée de combat. */
export const withOverdrive = (s: KnightSheet, c: CaracId) => s.carac[c] + s.overdrive[c]

export interface KnightDerived {
  defense: number
  reaction: number
  initiative: number
  /** PS max = 10 + 6 × carac de Chair choisie (sans overdrive). */
  santeMax: number
  /** Contacts max = carac de Dame choisie (sans overdrive). */
  contactsMax: number
}

export function knightDerived(s: KnightSheet): KnightDerived {
  return {
    defense: withOverdrive(s, s.derived.defense),
    reaction: withOverdrive(s, s.derived.reaction),
    initiative: withOverdrive(s, s.derived.initiative),
    santeMax: 10 + 6 * s.carac[s.derived.sante],
    contactsMax: s.carac[s.derived.contacts],
  }
}

/** Monter ou baisser un aspect plafonne ses caracs. */
export function setAspect(s: KnightSheet, aspect: AspectId, value: number): void {
  const v = Math.max(ASPECT_MIN, Math.min(ASPECT_MAX, value))
  s.aspects[aspect] = v
  for (const c of ASPECTS.find((a) => a.id === aspect)!.caracs) s.carac[c] = Math.min(s.carac[c], v)
}

/** Jet de combo : la réserve et les overdrives de deux caracs différentes. */
export function comboSetup(s: KnightSheet, base: CaracId, combo: CaracId): { count: number; baseCount: number; overdrive: number } | null {
  if (base === combo) return null
  return {
    count: s.carac[base] + s.carac[combo],
    baseCount: s.carac[base],
    overdrive: s.overdrive[base] + s.overdrive[combo],
  }
}
