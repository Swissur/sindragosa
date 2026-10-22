import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { codexBoardLinks, codexBoardNodes, codexEntries } from '../db/schema.js'
import { broadcastCampaignEvent } from './sseStore.js'

/**
 * Tableau des fiches (plans/44-tableau-des-fiches.md) : des fiches posées et les
 * flèches qui les relient. Chaque écriture renvoie et diffuse le tableau entier —
 * il est petit, et un état complet évite toute fusion côté client.
 */

export type LinkDirection = 'one' | 'both'

export interface BoardNode {
  id: number
  entryId: number
  name: string
  type: string
  /** '' = pas de couleur. */
  color: string
  x: number
  y: number
  /** Taille de la carte. null = taille par défaut du type. */
  w: number | null
  h: number | null
}

export interface BoardLink {
  id: number
  fromNodeId: number
  toNodeId: number
  direction: LinkDirection
  dashed: boolean
  label: string
}

export interface Board {
  /** Horodatage serveur : le client ignore un état plus ancien que le sien. */
  rev: number
  nodes: BoardNode[]
  links: BoardLink[]
}

export const LABEL_MAX = 40

export interface LinkStylePatch {
  direction?: LinkDirection
  dashed?: boolean
  label?: string
}

/** Valide le style d'une flèche venu du client. `null` = refusé. */
export function parseLinkStyle(body: Record<string, unknown>): LinkStylePatch | null {
  const patch: LinkStylePatch = {}
  if (body.direction !== undefined) {
    if (body.direction !== 'one' && body.direction !== 'both') return null
    patch.direction = body.direction
  }
  if (body.dashed !== undefined) {
    if (typeof body.dashed !== 'boolean') return null
    patch.dashed = body.dashed
  }
  if (body.label !== undefined) {
    if (typeof body.label !== 'string') return null
    patch.label = body.label.trim().slice(0, LABEL_MAX)
  }
  return patch
}

/** Une taille de carte : ni minuscule, ni démesurée. */
export function isSize(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 40 && value <= 5000
}

/** Une coordonnée du tableau : un nombre fini, raisonnable. */
export function isCoord(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) < 1e6
}

export async function loadBoard(campaignId: number): Promise<Board> {
  const [nodes, links] = await Promise.all([
    db
      .select({
        id: codexBoardNodes.id,
        entryId: codexBoardNodes.codexEntryId,
        name: codexEntries.name,
        type: codexEntries.type,
        color: codexEntries.color,
        x: codexBoardNodes.x,
        y: codexBoardNodes.y,
        w: codexBoardNodes.w,
        h: codexBoardNodes.h,
      })
      .from(codexBoardNodes)
      .innerJoin(codexEntries, eq(codexEntries.id, codexBoardNodes.codexEntryId))
      // Une fiche cachée du MJ n'existe pas pour les joueurs, ni sur le tableau.
      .where(and(eq(codexBoardNodes.campaignId, campaignId), eq(codexEntries.hidden, false)))
      .orderBy(codexBoardNodes.id),
    db
      .select({
        id: codexBoardLinks.id,
        fromNodeId: codexBoardLinks.fromNodeId,
        toNodeId: codexBoardLinks.toNodeId,
        direction: codexBoardLinks.direction,
        dashed: codexBoardLinks.dashed,
        label: codexBoardLinks.label,
      })
      .from(codexBoardLinks)
      .where(eq(codexBoardLinks.campaignId, campaignId))
      .orderBy(codexBoardLinks.id),
  ])
  const visible = new Set(nodes.map((n) => n.id))
  const shown = links.filter((l) => visible.has(l.fromNodeId) && visible.has(l.toNodeId))
  return { rev: Date.now(), nodes, links: shown as BoardLink[] }
}

/** Relit le tableau, le pousse à toute la campagne et le renvoie à l'auteur. */
export async function publishBoard(campaignId: number): Promise<Board> {
  const board = await loadBoard(campaignId)
  broadcastCampaignEvent(campaignId, 'codex-board', board)
  return board
}
