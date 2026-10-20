/** Les 5 aspects de Knight et leurs 3 caractéristiques (plans/43). */

export type AspectId = 'chair' | 'bete' | 'machine' | 'dame' | 'masque'

export type CaracId =
  | 'deplacement' | 'force' | 'endurance'
  | 'hargne' | 'combat' | 'instinct'
  | 'tir' | 'savoir' | 'technique'
  | 'aura' | 'parole' | 'sangfroid'
  | 'discretion' | 'dexterite' | 'perception'

export interface AspectDef {
  id: AspectId
  label: string
  caracs: CaracId[]
}

export const ASPECTS: AspectDef[] = [
  { id: 'chair', label: 'Chair', caracs: ['deplacement', 'force', 'endurance'] },
  { id: 'bete', label: 'Bête', caracs: ['hargne', 'combat', 'instinct'] },
  { id: 'machine', label: 'Machine', caracs: ['tir', 'savoir', 'technique'] },
  { id: 'dame', label: 'Dame', caracs: ['aura', 'parole', 'sangfroid'] },
  { id: 'masque', label: 'Masque', caracs: ['discretion', 'dexterite', 'perception'] },
]

export const CARAC_LABELS: Record<CaracId, string> = {
  deplacement: 'Déplacement', force: 'Force', endurance: 'Endurance',
  hargne: 'Hargne', combat: 'Combat', instinct: 'Instinct',
  tir: 'Tir', savoir: 'Savoir', technique: 'Technique',
  aura: 'Aura', parole: 'Parole', sangfroid: 'Sang-Froid',
  discretion: 'Discrétion', dexterite: 'Dextérité', perception: 'Perception',
}

export const CARACS: CaracId[] = ASPECTS.flatMap((a) => a.caracs)

export const ASPECT_OF: Record<CaracId, AspectId> = Object.fromEntries(
  ASPECTS.flatMap((a) => a.caracs.map((c) => [c, a.id])),
) as Record<CaracId, AspectId>

/** Bornes de la fiche. */
export const ASPECT_MIN = 1
export const ASPECT_MAX = 9
export const OVERDRIVE_MAX = 5

/** Les valeurs dérivées : chacune se calcule sur une carac choisie dans son aspect. */
export type DerivedId = 'defense' | 'reaction' | 'initiative' | 'sante' | 'contacts'

export const DERIVED: { id: DerivedId; label: string; aspect: AspectId }[] = [
  { id: 'defense', label: 'Défense', aspect: 'bete' },
  { id: 'reaction', label: 'Réaction', aspect: 'machine' },
  { id: 'initiative', label: 'Initiative', aspect: 'masque' },
  { id: 'sante', label: 'Santé', aspect: 'chair' },
  { id: 'contacts', label: 'Contacts', aspect: 'dame' },
]

/** Difficultés du livre, pour le sélecteur du jet. */
export const DIFFICULTIES: { value: number; label: string }[] = [
  { value: 1, label: 'Facile' },
  { value: 2, label: 'Faisable' },
  { value: 3, label: 'Normal' },
  { value: 4, label: 'Délicat' },
  { value: 5, label: 'Ardu' },
  { value: 6, label: 'Difficile' },
  { value: 7, label: 'Complexe' },
  { value: 9, label: 'Très difficile' },
  { value: 12, label: 'Insurmontable' },
  { value: 15, label: 'Impossible' },
]
