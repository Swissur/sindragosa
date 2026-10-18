import { computed, type Ref } from 'vue'
import { usePins } from './usePins'
import { DOMAINS, type AdvancedDomain } from '../data/sindragosa/domains'
import { raceAbility, raceById } from '../data/sindragosa/races'
import { recipesByDomain, type DomainRecipes } from '../utils/sindragosa/crafting'
import { pinnedOf } from '../utils/sindragosa/pins'
import type { Ability } from '../data/sindragosa/types'
import type { Character, SpecialtyRow } from '../types/character'

export interface Favorites {
  /** Domaines et domaines avancés ouverts. */
  domains: { id: string; label: string }[]
  specialties: SpecialtyRow[]
  /** Le pouvoir racial et les compétences débloquées. */
  abilities: Ability[]
  recipes: DomainRecipes['recipes']
}

/** Ce que le joueur a mis en favori, et qu'il peut encore lancer. */
export function useFavorites(
  character: Ref<Character>,
  unlocked: Ref<Ability[]>,
  unlockedAdvanced: Ref<AdvancedDomain[]>,
  crafts: Ref<Record<string, number>>,
) {
  const { pins } = usePins(character)

  const favorites = computed<Favorites>(() => {
    const race = raceById(character.value.race)
    const abilities = race ? [raceAbility(race), ...unlocked.value] : unlocked.value
    return {
      domains: pinnedOf(pins.value, [...DOMAINS, ...unlockedAdvanced.value], (d) => `domain:${d.id}`),
      specialties: pinnedOf(pins.value, character.value.specialties, (s) => `specialty:${s.id}`),
      abilities: pinnedOf(pins.value, abilities, (a) => `ability:${a.id}`),
      recipes: pinnedOf(pins.value, recipesByDomain(crafts.value).flatMap((g) => g.recipes), (r) => `recipe:${r.recipe.id}`),
    }
  })

  const hasFavorites = computed(() => Object.values(favorites.value).some((list) => list.length > 0))

  return { favorites, hasFavorites }
}
