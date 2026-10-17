import { computed, ref, watch, type Ref } from 'vue'
import type { Character } from '../types/character'
import { defaultPins, togglePin, type Pin } from '../utils/sindragosa/pins'

/**
 * Épingles de « Mes actions », gardées dans le navigateur, par personnage.
 * Tant que le joueur n'a rien épinglé : les 3 domaines les plus hauts.
 */
const key = (id: string) => `sindragosa-pins-${id}`

function read(id: string): Pin[] | null {
  try {
    const raw = localStorage.getItem(key(id))
    return raw ? (JSON.parse(raw) as Pin[]) : null
  } catch {
    return null
  }
}

export function usePins(character: Ref<Character>) {
  const stored = ref<Pin[] | null>(null)

  watch(() => character.value.id, (id) => { stored.value = id ? read(id) : null }, { immediate: true })

  const pins = computed(() => stored.value ?? defaultPins(character.value))

  function toggle(pin: Pin) {
    stored.value = togglePin(pins.value, pin)
    try {
      localStorage.setItem(key(character.value.id), JSON.stringify(stored.value))
    } catch { /* quota ou navigation privée : l'épingle reste pour la session */ }
  }

  return { pins, toggle, isPinned: (pin: Pin) => pins.value.includes(pin) }
}
