import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { toasts, showToast, dismissToast } from './useToast'

describe('showToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    toasts.value = []
  })
  afterEach(() => vi.useRealTimers())

  it('disparaît seul après sa durée', () => {
    showToast('Bonjour', { duration: 1000 })
    expect(toasts.value).toHaveLength(1)
    vi.advanceTimersByTime(1000)
    expect(toasts.value).toHaveLength(0)
  })

  it('reste affiché tant qu’on ne le ferme pas quand il est persistant', () => {
    showToast('Bonjour', { persistent: true, details: [{ label: 'Vengeance', text: 'Rend le coup.' }] })
    vi.advanceTimersByTime(60_000)
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].details).toEqual([{ label: 'Vengeance', text: 'Rend le coup.' }])
    dismissToast(toasts.value[0].id)
    expect(toasts.value).toHaveLength(0)
  })
})
