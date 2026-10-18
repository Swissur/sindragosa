/**
 * Artisanat : fabriquer = réunir les composants + un jet du domaine du métier.
 * Le domaine se lit dans la base du métier (« Artisanat lourd + Arcanes ») :
 * c'est le premier domaine cité. Pour un métier hybride, le joueur peut en
 * choisir un autre dans la feuille de jet.
 */
import type { Craft, Recipe } from '../../data/sindragosa/types'
import { RECIPES } from '../../data/sindragosa/crafts'
import type { ItemRow } from '../../types/character'
import { normalizeName } from './prerequisites'

const BASIS_DOMAIN: [RegExp, string][] = [
  [/^artisanat lourd/i, 'artisanat-lourd'],
  [/^artisanat de pr[ée]cision/i, 'artisanat-delicat'],
  [/^ing[ée]nierie/i, 'explosifs-ingenierie'],
  [/^alchimie/i, 'alchimie-herboristerie'],
]

export function craftDomainId(craft: Pick<Craft, 'basis'>): string | null {
  return BASIS_DOMAIN.find(([re]) => re.test(craft.basis))?.[1] ?? null
}

/** Recettes accessibles : jusqu'au rang connu (les métiers hybrides n'ont pas de rang). */
export function recipesFor(craftId: string, rank: number, catalog: Recipe[] = RECIPES): Recipe[] {
  return catalog.filter((r) => r.craft === craftId && (r.rank === null || r.rank <= rank))
}

/**
 * Composants (décidé le 2026-10-18) : il faut les avoir pour lancer le jet, et
 * ils sont consommés que le jet réussisse ou non.
 * Les patrons écrivent le même composant au singulier ou au pluriel
 * (« Lingot de Fer brut », « Lingots de Fer brut ») : la comparaison l'ignore.
 */
export function componentKey(name: string): string {
  return normalizeName(name).split(' ').map((w) => (w.length > 3 ? w.replace(/[sx]$/, '') : w)).join(' ')
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
