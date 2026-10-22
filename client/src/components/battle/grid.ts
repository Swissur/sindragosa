/**
 * Le centre de la case qui contient `v`, sur une grille de cases d'une unité
 * qui va de `-half` à `half`. Une valeur hors de la grille revient dans la
 * case du bord.
 */
export function snapToCell(v: number, half: number): number {
  const cells = Math.round(half * 2)
  const index = Math.min(Math.max(Math.floor(v + half), 0), cells - 1)
  return index - half + 0.5
}
