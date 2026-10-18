/**
 * Conversion du bestiaire Chroniques Oubliées vers le système d6 de Sindragosa.
 * Formules validées le 2026-10-18 : plans/33-bestiaire-sindragosa.md.
 * Utilisé par `scripts/convert-bestiary.ts`, qui génère `data/sindragosa/monsters.ts`.
 */
import type { StatId } from '../../data/sindragosa/domains'

/** Un monstre tel que l'écrit le catalogue CO. */
export interface CoMonster {
  name: string
  nc: number
  size: string
  stats: { for: number; dex: number; con: number; int: number; sag: number; cha: number }
  def: number
  pv: number
  init: number
  rd?: string
  attacks: { name: string; bonus: number; damage: string; range?: number }[]
  abilities: { name: string; description: string }[]
  description?: string
}

export type ArmorKind = 'aucune' | 'cuir' | 'carapace' | 'lourde'

export interface MonsterAttack {
  name: string
  /** Réserve d'attaque, en d6. */
  pool: number
  /** Dégâts fixes (dégâts = ceci + marge − armure). */
  damage: number
  range?: number
  /** Ce que l'expression CO portait en plus des dés (« de feu », « + enchevêtrement »). */
  note?: string
}

export interface MonsterAbility {
  name: string
  description: string
  /** Le texte garde du vocabulaire d20 que la conversion n'a pas su traduire. */
  review?: boolean
}

export interface Monster {
  name: string
  size: string
  /** Rang de menace R (0 à 5) : tient lieu de rang de domaine. */
  threat: number
  stats: Record<StatId, number>
  hp: number
  armor: number
  armorKind: ArmorKind
  /** Réserve de défense (parer ou esquiver), en d6. */
  defense: number
  initiative: number
  attacks: MonsterAttack[]
  abilities: MonsterAbility[]
  description?: string
}

export const MAX_THREAT = 5

/** 2 + mod ÷ 2 : un mod 0 (humain moyen) donne 2, la base d'un joueur. */
export function convertStat(mod: number): number {
  return Math.max(1, 2 + Math.round(mod / 2))
}

export function threatRank(nc: number): number {
  return Math.min(MAX_THREAT, Math.ceil(nc / 3))
}

/** Moyenne d'une expression de dégâts CO : somme des « XdY » et des « +N ». */
export function averageDamage(expr: string): number {
  let total = 0
  for (const m of expr.matchAll(/(\d+)d(\d+)|([+-]?\s*\d+)(?!\s*d)/g)) {
    if (m[1]) total += (Number(m[1]) * (Number(m[2]) + 1)) / 2
    else total += Number(m[3].replace(/\s/g, ''))
  }
  return total
}

/** Dégâts fixes Sindragosa : la moitié de la moyenne CO, au moins 1. */
export function convertDamage(expr: string): number {
  return Math.max(1, Math.round(averageDamage(expr) / 2))
}

/** Le reste du texte d'une expression de dégâts, une fois les nombres retirés. */
function damageNote(expr: string): string | undefined {
  const rest = expr.replace(/(\d+d\d+|\d+)/g, '').replace(/^[\s+-]+|[\s+-]+$/g, '').trim()
  return rest || undefined
}

const ARMOR_BASE: Record<ArmorKind, number> = { aucune: 0, cuir: 2, carapace: 4, lourde: 6 }

const ARMOR_RULES: [RegExp, ArmorKind][] = [
  [/golem de (fer|pierre)|dragon|fléau|orhu'nomathan/i, 'lourde'],
  [/insecte|combattant|raykenn|guivre|hydre|crocodile|serpent géant|squelette de géant/i, 'carapace'],
  [/ours|sanglier|bison|troll|géant|golem de chair|lion|tigre|loup-garou|worg|griffon|shargren|aventurier|centaure|démon|ogre|orque/i, 'cuir'],
]

export function armorKind(name: string): ArmorKind {
  return ARMOR_RULES.find(([re]) => re.test(name))?.[1] ?? 'aucune'
}

/** Partie fixe d'une RD CO : « 6 + (5/magie) » → 6, « 5/magie » → 0 (conditionnelle). */
export function fixedRd(rd: string | undefined): number {
  const m = rd?.trim().match(/^(\d+)(?!\s*\/)/)
  return m ? Number(m[1]) : 0
}

/** La catégorie donne l'armure d'un monstre de rang 5 ; au rang 0, il en a la moitié. */
export function convertArmor(kind: ArmorKind, threat: number, rd?: string): number {
  return Math.round((ARMOR_BASE[kind] * (threat + 5)) / 10) + Math.round(fixedRd(rd) / 2)
}

const plusDice = (n: number) => Math.max(1, Math.ceil(n / 3))

function tier(difficulty: number): string {
  if (difficulty <= 10) return 'facile'
  if (difficulty <= 15) return 'moyenne'
  if (difficulty <= 20) return 'difficile'
  return 'exploit'
}

/**
 * Formule CO entre crochets qui dépend du NC (« [NC×5] », « [2d6+NC] ») :
 * calculée pour ce monstre, puis ramenée à l'échelle d6 (PV et dégâts ÷ 2).
 */
function evalNcFormula(expr: string, nc: number): number | null {
  const math = expr
    .replace(/×/g, '*')
    .replace(/(\d+)d(\d+)/g, (_m, n: string, f: string) => String((Number(n) * (Number(f) + 1)) / 2))
    .replace(/\bNC\b/g, String(nc))
  if (!/^[\d+\-*/(). ]+$/.test(math)) return null
  const value = Function(`return (${math})`)() as number
  return Number.isFinite(value) ? Math.max(1, Math.round(value / 2)) : null
}

/** « 5/magie » → « +3 d'armure, sauf contre : magie » (la part fixe est déjà dans l'armure). */
export function conditionalResistance(rd: string): string {
  return [...rd.matchAll(/(\d+)\s*\/\s*([^)]+)/g)]
    .map((m) => `+${Math.round(Number(m[1]) / 2)} d'armure, sauf contre : ${m[2].trim()}`)
    .join(' ; ')
}

/** Traduit les tournures d20 courantes ; signale celles qui restent. `nc` sert aux formules en NC. */
export function convertAbilityText(text: string, nc = 0): { text: string; review: boolean } {
  const out = text
    .replace(/\[([^\]]*\bNC\b[^\]]*)\]/g, (m, expr: string) => {
      const v = evalNcFormula(expr, nc)
      return v === null ? m : String(v)
    })
    .replace(/(de )?difficulté \[10 ?\+ ?Mod\. de FOR[^\]]*\]/gi, 'palier difficile')
    .replace(/\bNC\b/g, 'rang de menace')
    .replace(/\bDEX\b/g, 'AGI')
    .replace(/\bCON\b/g, 'END')
    .replace(/(s)ur un résultat de \d+ à 20( sur un jet de d20)?( en attaque)?/gi, (_m, s: string, _d20, atk = '') => `${s}ur un critique${atk}`)
    .replace(/un résultat (de|compris entre) \d+ (à|et) 20( sur un jet de d20| au test d'attaque)?/gi, 'un critique')
    .replace(/(en )?lan[cç]\w* deux d20 et gard\w* le meilleur( résultat)?/gi, 'avec avantage (+1d6)')
    .replace(/à 2d20( \(garde le meilleur\))?/gi, 'avec avantage (+1d6)')
    .replace(/(s)ur 15-20( au d20)?/gi, (_m, s: string) => `${s}ur un critique`)
    .replace(/([+-])\s?(\d+) DEF\b/g, (_m, sign: string, n: string) => `${sign}${plusDice(Number(n))}d6 en défense`)
    .replace(/la DEF\b/g, 'la défense')
    .replace(/([+-])\s?(\d+) (en|à l'|à la|aux?) ?(attaque|DEF|initiative|tous les tests|tests?)/gi,
      (_m, sign: string, n: string, prep: string, what: string) => {
        const target = /DEF/i.test(what) ? 'défense' : what
        return `${sign}${plusDice(Number(n))}d6 ${prep} ${target}`.replace(/\s+/g, ' ')
      })
    .replace(/\+\s?(\d+d\d+(?:\s*\+\s*\d+)?) (aux )?(DM|dégâts)/gi,
      (_m, expr: string) => `+${convertDamage(expr)} aux dégâts`)
    .replace(/difficulté (\d+)/gi, (_m, n: string) => `palier ${tier(Number(n))}`)
  return { text: out, review: /d20|\bDEF\b|\bNC\b|Mod\./.test(out) }
}

export function convertMonster(m: CoMonster): Monster {
  const threat = threatRank(m.nc)
  const s = m.stats
  const stats: Record<StatId, number> = {
    str: convertStat(s.for),
    agi: convertStat(s.dex),
    end: convertStat(s.con),
    int: convertStat(s.int),
    wis: convertStat(s.sag),
    cha: convertStat(s.cha),
  }
  const fighting = Math.max(stats.str, stats.agi) + threat
  const kind = armorKind(m.name)

  const abilities: MonsterAbility[] = m.abilities.map((a) => {
    const { text, review } = convertAbilityText(a.description, m.nc)
    return review ? { name: a.name, description: text, review } : { name: a.name, description: text }
  })
  // La part conditionnelle d'une RD (« 5/magie ») n'entre pas dans l'armure : elle reste lisible ici
  if (m.rd?.includes('/')) abilities.unshift({ name: 'Résistance', description: `${conditionalResistance(m.rd)}.` })

  return {
    name: m.name,
    size: m.size,
    threat,
    stats,
    hp: Math.max(1, Math.round(m.pv / 2)),
    armor: convertArmor(kind, threat, m.rd),
    armorKind: kind,
    defense: fighting,
    initiative: stats.agi + stats.wis + threat,
    attacks: m.attacks.map((a) => {
      const note = damageNote(a.damage)
      return {
        name: a.name,
        pool: fighting,
        damage: convertDamage(a.damage),
        ...(a.range ? { range: a.range } : {}),
        ...(note ? { note } : {}),
      }
    }),
    abilities,
    ...(m.description ? { description: m.description } : {}),
  }
}
