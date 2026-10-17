/**
 * Artisanat : fabriquer = réunir les composants + un jet du domaine du métier.
 * Le domaine se lit dans la base du métier (« Artisanat lourd + Arcanes ») :
 * c'est le premier domaine cité. Pour un métier hybride, le joueur peut en
 * choisir un autre dans la feuille de jet.
 */
import type { Craft, Recipe } from '../../data/sindragosa/types'
import { RECIPES } from '../../data/sindragosa/crafts'

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
