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

/** Partagé entre la fiche et « Mes actions » : épingler d'un côté se voit de l'autre. */
const storedById = ref<Record<string, Pin[] | null>>({})

export function usePins(character: Ref<Character>) {
  watch(() => character.value.id, (id) => {
    if (id && !(id in storedById.value)) storedById.value[id] = read(id)
  }, { immediate: true })

  const pins = computed(() => storedById.value[character.value.id] ?? defaultPins(character.value))

  function toggle(pin: Pin) {
    const id = character.value.id
    const next = togglePin(pins.value, pin)
    storedById.value[id] = next
    try {
      localStorage.setItem(key(id), JSON.stringify(next))
    } catch { /* quota ou navigation privée : l'épingle reste pour la session */ }
  }

  return { pins, toggle, isPinned: (pin: Pin) => pins.value.includes(pin) }
}
