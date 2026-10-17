import { showToast } from './useToast'

/**
 * Supprime une ligne de la fiche et propose « Annuler » dans un toast
 * (plans/32 : pas de modale de confirmation pour les petites corrections).
 */
export function removeWithUndo<T>(list: T[], index: number, label: string): void {
  const [removed] = list.splice(index, 1)
  if (removed === undefined) return
  showToast(`${label} supprimé`, {
    actionLabel: 'Annuler',
    onAction: () => list.splice(Math.min(index, list.length), 0, removed),
  })
}
