/**
 * Les états préjudiciables de Sindragosa (plans/42-etats.md), en d6.
 *
 * Un état est un rappel : le MJ applique l'effet aux jets, rien n'est ajouté
 * tout seul à la feuille de jet. Il peut porter une durée en tours, qui baisse
 * à la fin du tour de la créature (côté serveur) ; sans durée, il reste jusqu'à
 * ce qu'on le retire.
 *
 * L'emoji sert au pion du champ de bataille, qui est un canvas 3D : on ne peut
 * pas y poser un SVG Lucide sans le rastériser. Les icônes Lucide (rendu Vue)
 * viendront à côté, l'emoji reste la source pour le pion.
 */

import type { FunctionalComponent } from 'vue'
import {
  Biohazard, Droplet, EyeOff, Ghost, Heart, Lock, MicOff, Moon, Orbit, PersonStanding,
  Skull, Sparkles, Sprout, Sword, Turtle,
} from 'lucide-vue-next'

export const ETAT_IDS = [
  'etourdi', 'paralyse', 'sommeil', 'surpris', 'peur', 'charme', 'silence', 'enracine',
  'ralenti', 'renverse', 'aveugle', 'affaibli', 'desoriente', 'desarme',
  'saignement', 'poison', 'maladie',
] as const

export type EtatId = (typeof ETAT_IDS)[number]

/** Un état posé sur une créature. `turns` absent = sans durée. */
export interface EtatEntry {
  id: EtatId
  turns?: number
}

export interface Etat {
  id: EtatId
  label: string
  /** La ligne de règle, affichée telle quelle. */
  effect: string
  /**
   * L'icone Lucide du rendu Vue. Absente pour affaibli / surpris : aucun
   * pictogramme lisible, ces deux-la affichent leur emoji partout.
   */
  icon?: FunctionalComponent
  /** Ce que dessine le pion 3D. */
  emoji: string
  /** Empêche d'agir : passe en tête quand il faut couper la liste. */
  blocking?: boolean
}

/** Un état du catalogue, avec la durée qui lui reste. */
export type ActiveEtat = Etat & { turns?: number }

export const ETATS: Etat[] = [
  { id: 'etourdi', icon: Sparkles, label: 'Étourdissement', effect: 'Aucune action ; −2d6 en défense (parer, esquiver).', emoji: '😵', blocking: true },
  { id: 'paralyse', icon: Lock, label: 'Paralysie', effect: "Aucune action ni défense : la marge de l'attaquant compte en entier.", emoji: '🔒', blocking: true },
  { id: 'sommeil', icon: Moon, label: 'Sommeil', effect: "Aucune action ni défense. Se réveille dès qu'il subit des dégâts, ou si un allié le secoue (action Rapide).", emoji: '💤', blocking: true },
  { id: 'surpris', label: 'Surprise', effect: 'Au premier tour : aucune action ; −2d6 en défense.', emoji: '😲', blocking: true },
  { id: 'peur', icon: Ghost, label: 'Peur', effect: "Chaque tour, utilise son action de Mouvement pour s'éloigner de la source ; ne peut pas l'attaquer. Garde son action Rapide.", emoji: '😱' },
  { id: 'charme', icon: Heart, label: 'Charme', effect: "Voit le lanceur en ami : ne peut ni l'attaquer ni le cibler. Cesse si le lanceur ou ses alliés l'attaquent.", emoji: '💘' },
  { id: 'silence', icon: MicOff, label: 'Silence', effect: 'Ne peut lancer aucun sort ni utiliser une compétence vocale (cri, chant, commandement).', emoji: '🤐' },
  { id: 'enracine', icon: Sprout, label: 'Enracinement', effect: 'Ne peut pas se déplacer ; −1d6 pour esquiver (la parade reste normale).', emoji: '🌱' },
  { id: 'ralenti', icon: Turtle, label: 'Ralentissement', effect: 'Déplacement divisé par deux (3 m au lieu de 6).', emoji: '🐢' },
  { id: 'renverse', icon: PersonStanding, label: 'À terre', effect: "−1d6 à l'attaque et à la défense ; se relever coûte l'action de Mouvement.", emoji: '⬇️' },
  { id: 'aveugle', icon: EyeOff, label: 'Aveuglement', effect: '−1d6 au contact et en défense ; attaques à distance et sorts ciblés impossibles.', emoji: '🙈' },
  { id: 'affaibli', label: 'Affaiblissement', effect: '−1d6 à tous les jets.', emoji: '🥀' },
  { id: 'desoriente', icon: Orbit, label: 'Désorientation', effect: '−1d6 à tous les jets.', emoji: '💫' },
  { id: 'desarme', icon: Sword, label: 'Désarmé', effect: "A lâché son arme : la ramasser coûte l'action de Mouvement. En attendant, Mains nues (Athlétisme, 1 dégât).", emoji: '🗡️' },
  { id: 'saignement', icon: Droplet, label: 'Saignement', effect: "Perd X PV (1 par défaut) au début de chacun de ses tours, sans armure. Médecine & Soins (1 succès, action Complète) ou un soin magique l'arrête.", emoji: '🩸' },
  { id: 'poison', icon: Skull, label: 'Poison', effect: "Perd X PV par tour, sans armure. À la fin de chacun de ses tours, un jet de Tolérance aux toxines (palier du poison, moyen par défaut) l'en débarrasse.", emoji: '☠️' },
  { id: 'maladie', icon: Biohazard, label: 'Maladie', effect: '−1d6 à tous les jets ; le repos long ne rend pas de PV. Se guérit par Médecine & Soins, Tolérance aux toxines ou un soin magique.', emoji: '🤢' },
]

export const ETAT_BY_ID = Object.fromEntries(ETATS.map((e) => [e.id, e])) as Record<EtatId, Etat>

export function isEtatId(value: unknown): value is EtatId {
  return typeof value === 'string' && value in ETAT_BY_ID
}

/**
 * Lit une liste d'états venue du serveur ou d'une vieille sauvegarde : garde les
 * ids connus (un id seul compte comme un état sans durée), une seule fois chacun.
 */
export function normalizeEtats(raw: unknown): EtatEntry[] {
  if (!Array.isArray(raw)) return []
  const seen = new Set<string>()
  const out: EtatEntry[] = []
  for (const item of raw) {
    const id = typeof item === 'string' ? item : (item as { id?: unknown } | null)?.id
    if (!isEtatId(id) || seen.has(id)) continue
    seen.add(id)
    const turns = (item as { turns?: unknown } | null)?.turns
    out.push(typeof turns === 'number' && Number.isInteger(turns) && turns > 0 ? { id, turns } : { id })
  }
  return out
}

/** Trie (bloquants d'abord, puis ordre du catalogue) et dédoublonne. */
export function sortEtats(entries: readonly (EtatEntry | string)[]): ActiveEtat[] {
  const rank = (e: Etat) => (e.blocking ? 0 : 1)
  return normalizeEtats(entries)
    .map(({ id, turns }) => (turns ? { ...ETAT_BY_ID[id], turns } : ETAT_BY_ID[id]))
    .sort((a, b) => rank(a) - rank(b) || ETAT_IDS.indexOf(a.id) - ETAT_IDS.indexOf(b.id))
}

/** Ce que le pion affiche : `max` pastilles, et le reste compté. */
export function visibleEtats(entries: readonly (EtatEntry | string)[], max = 3): { etats: ActiveEtat[]; overflow: number } {
  const all = sortEtats(entries)
  if (all.length <= max) return { etats: all, overflow: 0 }
  return { etats: all.slice(0, max), overflow: all.length - max }
}
