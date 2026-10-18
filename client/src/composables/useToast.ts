import { ref } from 'vue'

/** Un élément détaillable : son nom dans la liste, sa fiche à droite. */
export interface ToastDetail {
  label: string
  meta?: string
  text: string
  /** Étoile de favori sur la fiche. Absent = pas d'étoile. */
  pin?: { isPinned: () => boolean; toggle: () => void }
}

export interface Toast {
  id: number
  message: string
  actionLabel?: string
  onAction?: () => void
  details?: ToastDetail[]
}

export const toasts = ref<Toast[]>([])

let nextId = 1

export function showToast(
  message: string,
  options?: {
    actionLabel?: string
    onAction?: () => void
    duration?: number
    /** Reste affiché jusqu'au clic sur la croix. */
    persistent?: boolean
    /** Liste cliquable sous le message, avec la fiche de l'élément choisi à droite. */
    details?: ToastDetail[]
  },
): void {
  const id = nextId++
  toasts.value.push({ id, message, actionLabel: options?.actionLabel, onAction: options?.onAction, details: options?.details })
  if (!options?.persistent) setTimeout(() => dismissToast(id), options?.duration ?? 6000)
}

export function dismissToast(id: number): void {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}
