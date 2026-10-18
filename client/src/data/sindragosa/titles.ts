/**
 * Titres (classes émergentes) : ceux qu'exigent les compétences. Seul le MJ en
 * accorde, depuis ses outils ; il peut aussi en écrire un autre.
 */
import { ABILITIES } from './abilities'

export const TITLES: string[] = [
  ...new Set(ABILITIES.flatMap((a) => a.prerequisites.flatMap((p) => (p.kind === 'title' ? [p.name] : [])))),
].sort((a, b) => a.localeCompare(b, 'fr'))
