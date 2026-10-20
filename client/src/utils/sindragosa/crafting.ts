/**
 * Artisanat : fabriquer = réunir les composants + un jet du domaine du métier.
 * Métier de base : le domaine se lit dans sa base (« Artisanat lourd - Force »).
 * Métier hybride : c'est un artisanat avancé, le jet lance ce domaine avancé
 * lui-même (décidé le 2026-10-18). Le joueur peut changer de domaine dans la feuille de jet.
 */
import type { Craft, Recipe } from '../../data/sindragosa/types'
import { CRAFTS, RECIPES } from '../../data/sindragosa/crafts'
import { ADVANCED_DOMAINS, DOMAINS } from '../../data/sindragosa/domains'
import { HARVEST } from '../../data/sindragosa/harvest'
import type { ItemRow } from '../../types/character'
import { normalizeName } from './prerequisites'

const BASIS_DOMAIN: [RegExp, string][] = [
  [/^artisanat lourd/i, 'artisanat-lourd'],
  [/^artisanat de pr[ée]cision/i, 'artisanat-delicat'],
  [/^ing[ée]nierie/i, 'explosifs-ingenierie'],
  [/^alchimie/i, 'alchimie-herboristerie'],
]

export function craftDomainId(craft: Pick<Craft, 'id' | 'kind' | 'basis'>): string | null {
  if (craft.kind === 'hybrid') return craft.id
  return BASIS_DOMAIN.find(([re]) => re.test(craft.basis))?.[1] ?? null
}

/**
 * Recettes accessibles : jusqu'au rang connu. Les 5 patrons d'un métier hybride
 * n'ont pas de rang : ils s'ouvrent un par rang, dans l'ordre du catalogue
 * (décidé le 2026-10-18 : rang 2 → les 2 premiers).
 * Le MJ passe outre, patron par patron (`grants` : true = appris en bonus, false = oublié).
 */
export function recipesFor(craftId: string, rank: number, grants: Record<string, boolean> = {}, catalog: Recipe[] = RECIPES): Recipe[] {
  return catalog.filter((r) => r.craft === craftId).filter((r, i) => grants[r.id] ?? (r.rank ?? i + 1) <= rank)
}

/** Rang qui ouvre le patron : celui écrit, ou sa place dans son métier hybride (cf. recipesFor). */
export function recipeRank(recipe: Recipe, catalog: Recipe[] = RECIPES): number {
  return recipe.rank ?? catalog.filter((r) => r.craft === recipe.craft).indexOf(recipe) + 1
}

/**
 * Métiers maîtrisés : ceux appris, plus
 * - le métier de base de chaque domaine d'artisanat où le perso a un rang
 *   (Artisanat lourd 4 → Forge rang 4, 5 au plus) ;
 * - chaque artisanat avancé (métier hybride) au rang 1 ou plus.
 * Le meilleur des rangs l'emporte.
 */
export function effectiveCrafts(
  learned: Record<string, number>,
  domains: Record<string, { rank: number }>,
  advancedDomains: Record<string, { rank: number }>,
  crafts: Craft[] = CRAFTS,
): Record<string, number> {
  const out = { ...learned }
  for (const craft of crafts) {
    const domainId = craft.kind === 'base' ? craftDomainId(craft) : null
    const rank = craft.kind === 'base'
      ? Math.min(domainId ? domains[domainId]?.rank ?? 0 : 0, 5)
      : advancedDomains[craft.id]?.rank ?? 0
    if (rank > (out[craft.id] ?? 0)) out[craft.id] = rank
  }
  return out
}

export interface DomainRecipes {
  domainId: string
  recipes: { recipe: Recipe; craft: Craft }[]
}

/**
 * Les patrons accessibles avec les métiers connus, rangés par domaine lié :
 * les domaines de base dans l'ordre de la fiche, puis chaque artisanat avancé.
 */
export function recipesByDomain(
  known: Record<string, number>,
  grants: Record<string, boolean> = {},
  crafts: Craft[] = CRAFTS,
  catalog: Recipe[] = RECIPES,
): DomainRecipes[] {
  const groups = new Map<string, DomainRecipes['recipes']>()
  for (const craft of crafts) {
    const domainId = craftDomainId(craft)
    if (!domainId) continue
    const recipes = recipesFor(craft.id, known[craft.id] ?? 0, grants, catalog).map((recipe) => ({ recipe, craft }))
    groups.set(domainId, [...(groups.get(domainId) ?? []), ...recipes])
  }
  return [...DOMAINS, ...ADVANCED_DOMAINS]
    .filter((d) => groups.get(d.id)?.length)
    .map((d) => ({ domainId: d.id, recipes: groups.get(d.id)! }))
}

/**
 * Composants (décidé le 2026-10-18) : il faut les avoir pour lancer le jet, et
 * ils sont consommés que le jet réussisse ou non.
 * Les patrons écrivent le même composant au singulier ou au pluriel
 * (« Lingot de Fer », « Lingots de Fer ») : la comparaison l'ignore.
 * Le seul pluriel irrégulier des composants : « Cristaux ».
 */
const IRREGULAR_PLURALS: Record<string, string> = { cristaux: 'cristal' }

export function componentKey(name: string): string {
  return normalizeName(name).split(' ')
    .map((w) => IRREGULAR_PLURALS[w] ?? (w.length > 3 ? w.replace(/[sx]$/, '') : w))
    .join(' ')
}

/**
 * Tous les composants de l'artisanat (ceux des patrons et les matières premières),
 * une seule fois chacun, sous leur forme la plus courte (« Lingot de Fer »), triés.
 */
export function componentNames(catalog: Recipe[] = RECIPES, harvest: { name: string }[] = HARVEST): string[] {
  const byKey = new Map<string, string>()
  for (const name of [...harvest.map((h) => h.name), ...catalog.flatMap((r) => r.components.map((c) => c.name))]) {
    const key = componentKey(name)
    const known = byKey.get(key)
    if (!known || name.length < known.length) byKey.set(key, name)
  }
  return [...byKey.values()].sort((a, b) => a.localeCompare(b, 'fr'))
}

export const COMPONENT_NAMES = componentNames()

/** Le nom du catalogue qui correspond à ce nom (singulier ou pluriel), sinon null. */
export function findComponentName(name: string, names: string[] = COMPONENT_NAMES): string | null {
  const key = componentKey(name)
  return names.find((n) => componentKey(n) === key) ?? null
}

function owned(items: ItemRow[], name: string): number {
  const key = componentKey(name)
  return items.filter((i) => componentKey(i.name) === key).reduce((sum, i) => sum + i.quantity, 0)
}

export interface ComponentNeed {
  name: string
  qty: number
  have: number
}

/** Les composants du patron, avec ce que l'inventaire en contient. */
export function componentNeeds(items: ItemRow[], recipe: Recipe): ComponentNeed[] {
  return recipe.components.map((c) => ({ name: c.name, qty: c.qty, have: owned(items, c.name) }))
}

export function hasComponents(items: ItemRow[], recipe: Recipe): boolean {
  return componentNeeds(items, recipe).every((n) => n.have >= n.qty)
}

/** L'inventaire après avoir utilisé les composants du patron ; un objet épuisé disparaît. */
export function consumeComponents(items: ItemRow[], recipe: Recipe): ItemRow[] {
  const next = items.map((i) => ({ ...i }))
  for (const c of recipe.components) {
    let left = c.qty
    const key = componentKey(c.name)
    for (const item of next) {
      if (left === 0) break
      if (componentKey(item.name) !== key) continue
      const used = Math.min(item.quantity, left)
      item.quantity -= used
      left -= used
    }
  }
  return next.filter((i) => i.quantity > 0)
}
