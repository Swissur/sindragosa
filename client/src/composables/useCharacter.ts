import { ref, watch, computed } from 'vue'
import type { Character } from '../types/character'
import { normalizeEtats, type EtatEntry } from '../data/etats'
import { isFormId } from '../data/sindragosa/forms'
import {
  fetchCharacters,
  fetchCharacter,
  updateCharacter,
  type ServerCharacter,
} from '../api/characters'
import { computeMaxHp, progressState, domainRanks } from '../utils/sindragosa/sheet'
import { initiative } from '../utils/sindragosa/combat'
import { armorPenalties } from '../utils/sindragosa/armorNature'
import { maxMana } from '../utils/sindragosa/mana'
import { effectiveArmor } from '../utils/sindragosa/equipment'
import { unlockedAbilities } from '../utils/sindragosa/prerequisites'
import { unlockedAdvancedDomains } from '../utils/sindragosa/advanced'
import { specialtyGrants } from '../utils/sindragosa/specialtyGrants'
import { knightDerived, normalizeKnightSheet } from '../utils/knight/sheet'
import { isGameSystem } from '../data/systems'
import { showToast } from './useToast'
import { createCharacterHere } from './useNewCharacter'

/** Points de chance rendus à chaque séance. */
export const LUCK_PER_SESSION = 2

const obj = <T>(v: unknown, fallback: T): T => (v && typeof v === 'object' ? (v as T) : fallback)
const arr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

export function toCharacter(s: ServerCharacter): Character {
  const system = isGameSystem(s.system) ? s.system : 'wow-forever'
  return {
    id: String(s.id),
    system,
    knight: system === 'knight' ? normalizeKnightSheet(s.sheet) : null,
    name: s.name,
    histoire: s.histoire ?? '',
    race: s.race ?? '',
    portraitImageId: s.portraitImageId ?? null,
    stats: { str: s.str, agi: s.agi, end: s.end, int: s.int, wis: s.wis, cha: s.cha },
    hpCurrent: Math.max(0, Math.min(s.hpCurrent, s.hpMax)),
    hpMax: s.hpMax,
    hpBonus: s.hpBonus ?? 0,
    armor: s.armor ?? 0,
    armorBonus: s.armorBonus ?? 0,
    domains: obj(s.domains, {}),
    specialties: arr(s.specialties),
    advancedDomains: obj(s.advancedDomains, {}),
    titles: arr(s.titles),
    abilityUses: obj(s.abilityUses, {}),
    sessionTicks: obj(s.sessionTicks, { success: 0, critFail: 0 }),
    resources: arr(s.resources),
    crafts: obj(s.crafts, {}),
    recipeGrants: obj(s.recipeGrants, {}),
    items: arr(s.items),
    goldCoins: s.goldCoins ?? 0,
    silverCoins: s.silverCoins ?? 0,
    copperCoins: s.copperCoins ?? 0,
    pcCurrent: s.pcCurrent ?? LUCK_PER_SESSION,
    manaCurrent: Math.max(0, Math.min(s.manaCurrent ?? 0, s.manaMax ?? 0)),
    manaMax: s.manaMax ?? 0,
    states: normalizeEtats(s.states),
    form: isFormId(s.form) ? s.form : null,
  }
}

export function toServerPayload(c: Character): Omit<ServerCharacter, 'id' | 'userId' | 'isActive'> {
  return {
    name: c.name,
    histoire: c.histoire,
    race: c.race,
    portraitImageId: c.portraitImageId,
    hpMax: c.hpMax,
    hpCurrent: c.hpCurrent,
    hpBonus: Number(c.hpBonus) || 0,
    armor: Number(c.armor) || 0,
    armorBonus: Number(c.armorBonus) || 0,
    str: c.stats.str,
    agi: c.stats.agi,
    end: c.stats.end,
    int: c.stats.int,
    wis: c.stats.wis,
    cha: c.stats.cha,
    domains: c.domains,
    specialties: c.specialties,
    advancedDomains: c.advancedDomains,
    titles: c.titles,
    abilityUses: c.abilityUses,
    sessionTicks: c.sessionTicks,
    resources: c.resources,
    crafts: c.crafts,
    recipeGrants: c.recipeGrants,
    items: c.items,
    goldCoins: c.goldCoins,
    silverCoins: c.silverCoins,
    copperCoins: c.copperCoins,
    pcCurrent: c.pcCurrent,
    manaCurrent: c.manaCurrent,
    manaMax: c.manaMax,
    states: c.states,
    form: c.form,
    system: c.system,
    sheet: c.knight ?? {},
  }
}

export function createDefaultCharacter(): Character {
  return {
    id: '',
    system: 'wow-forever',
    knight: null,
    name: 'Nouveau héros',
    histoire: '',
    race: '',
    portraitImageId: null,
    stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20,
    hpMax: 20,
    hpBonus: 0,
    armor: 0,
    armorBonus: 0,
    domains: {},
    specialties: [],
    advancedDomains: {},
    titles: [],
    abilityUses: {},
    sessionTicks: { success: 0, critFail: 0 },
    resources: [],
    crafts: {},
    recipeGrants: {},
    items: [],
    goldCoins: 0,
    silverCoins: 0,
    copperCoins: 0,
    pcCurrent: LUCK_PER_SESSION,
    manaCurrent: 0,
    manaMax: 0,
    states: [],
    form: null,
  }
}

export const character = ref<Character>(createDefaultCharacter())
const serverId = ref<number | null>(null)

/** Valeurs dérivées Knight, `null` pour une fiche WoW Forever. */
export const knightValues = computed(() => (character.value.knight ? knightDerived(character.value.knight) : null))

/** PV max selon les règles du système : Sindragosa (+ bonus divers), ou la Santé de Knight. */
export const computedHp = computed(() => knightValues.value?.santeMax ?? computeMaxHp(character.value))

/** Initiative = AGI + SAG + rang en Perception & Sens − malus d'armure (Knight : carac de Masque + overdrive). */
export const computedInitiative = computed(() =>
  knightValues.value?.initiative
    ?? initiative(character.value.stats, domainRanks(character.value), armorPenalties(character.value).init))

/** Compétences dont tous les prérequis sont réunis. Knight n'en a pas. */
export const unlocked = computed(() => (character.value.knight ? [] : unlockedAbilities(progressState(character.value))))

/** Domaines avancés ouverts : prérequis réunis ou compétence homonyme débloquée. */
export const unlockedAdvanced = computed(() => unlockedAdvancedDomains(progressState(character.value), unlocked.value))

/** AP = armures équipées + bonus des compétences (plans/35-equipement.md). Knight : le champ de force. */
export const computedArmor = computed(() => character.value.knight?.armure.cdf ?? effectiveArmor(character.value))

// AP calculée → stockée sur la fiche : le combat la lit.
watch(computedArmor, (val) => { character.value.armor = val }, { immediate: true })

// PV max calculés → stockés sur la fiche (le serveur s'en sert en combat et au repos).
watch(computedHp, (val) => {
  character.value.hpMax = val
  if (character.value.hpCurrent > val) character.value.hpCurrent = val
}, { immediate: true })

/** Mana max : plus haute carac magique + rangs magiques (plans/40-mana.md). */
export const computedMana = computed(() => (character.value.knight ? 0 : maxMana(character.value)))

// Mana max calculée → stockée (le serveur s'en sert au repos). Un nouveau rang
// magique remplit d'autant la jauge : on compare à la valeur stockée, pas à
// l'ancienne valeur calculée, pour qu'un chargement de fiche ne compte pas comme un gain.
watch(computedMana, (val) => {
  const c = character.value
  const gain = val - c.manaMax
  c.manaMax = val
  c.manaCurrent = Math.max(0, Math.min(c.manaCurrent + Math.max(0, gain), val))
}, { immediate: true })

const loading = ref(false)

// Une compétence homonyme d'une spécialité exigée (« Analyse des failles ») donne
// cette spécialité, au niveau Apprenti. La sauvegarde auto l'enregistre.
watch(unlocked, (list) => {
  if (loading.value || !serverId.value) return
  const grants = specialtyGrants(character.value.specialties, list)
  if (!grants.length) return
  character.value.specialties.push(...grants)
  for (const g of grants) showToast(`Nouvelle spécialité : ${g.name} (Apprenti) !`)
})
const loadError = ref<string | null>(null)
const saveStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')

let debounceTimer: ReturnType<typeof setTimeout> | null = null

// Génération de chargement : si un loadCharacter plus récent démarre, les réponses
// des chargements précédents sont ignorées (évite qu'une réponse lente écrase la bonne).
let loadGen = 0
// Snapshot du dernier état connu du serveur : la sauvegarde auto ne part que si le
// personnage a réellement changé (bloque le PUT parasite déclenché par le load lui-même).
let lastSavedPayload = ''

function markSynced(): void {
  lastSavedPayload = JSON.stringify(toServerPayload(character.value))
}

function applyLoaded(row: ServerCharacter): void {
  serverId.value = row.id
  character.value = toCharacter(row)
  markSynced()
}

/**
 * Applique des PV qui viennent DÉJÀ du serveur (flux SSE du combat) sans
 * déclencher la sauvegarde auto : une fiche locale périmée écraserait le reste.
 */
export function applyServerHp(hpCurrent: number): void {
  if (character.value.hpCurrent === hpCurrent) return
  character.value.hpCurrent = hpCurrent
  markSynced()
}

/** Applique des états posés par le MJ depuis le combat, sans sauvegarde auto. */
export function applyServerStates(states: EtatEntry[]): void {
  if (JSON.stringify(character.value.states) === JSON.stringify(states)) return
  character.value.states = [...states]
  markSynced()
}

/** Applique un repos que le serveur a DÉJÀ écrit en base, sans sauvegarde auto. */
export function applyServerRest(state: {
  hpCurrent: number
  pcCurrent: number
  manaCurrent: number
  states: EtatEntry[]
  abilityUses: Character['abilityUses']
  sessionTicks: Character['sessionTicks']
}): void {
  const c = character.value
  c.hpCurrent = state.hpCurrent
  c.pcCurrent = state.pcCurrent
  c.manaCurrent = state.manaCurrent
  c.states = state.states
  c.abilityUses = state.abilityUses
  c.sessionTicks = state.sessionTicks
  markSynced()
}

/**
 * Applique un réglage du MJ (caracs, rangs, titres…) que le serveur a DÉJÀ écrit,
 * sans sauvegarde auto : sinon la fiche locale, périmée, l'écraserait.
 */
export function applyServerPatch(characterId: number, patch: Partial<ServerCharacter>): void {
  if (character.value.id !== String(characterId)) return
  const merged = toCharacter({
    ...toServerPayload(character.value),
    ...patch,
    id: characterId,
    userId: 0,
    isActive: true,
  } as ServerCharacter)
  const c = character.value
  // La mana max reste la locale : le recalcul qui suit remplit la jauge du rang gagné.
  character.value = { ...merged, hpMax: c.hpMax, hpCurrent: c.hpCurrent, manaMax: c.manaMax, manaCurrent: c.manaCurrent }
  markSynced()
}

/**
 * Charge la fiche `id`, sinon la fiche active du joueur.
 * Sans fiche, en crée une — sauf `create: false` : un chargement de fond (barre du bas)
 * ne doit pas fabriquer de personnage avant que le joueur ait choisi sa campagne.
 */
export async function loadCharacter(id?: number, { create = true } = {}): Promise<void> {
  if (debounceTimer) { clearTimeout(debounceTimer); debounceTimer = null }
  const gen = ++loadGen
  loading.value = true
  loadError.value = null
  character.value = createDefaultCharacter()
  serverId.value = null
  try {
    if (id) {
      const row = await fetchCharacter(id)
      if (gen !== loadGen) return
      applyLoaded(row)
    } else {
      const list = await fetchCharacters()
      if (gen !== loadGen) return
      const active = list.find((c) => c.isActive) ?? list[0] ?? null
      if (active) {
        applyLoaded(active)
      } else if (create) {
        const created = await createCharacterHere()
        if (gen !== loadGen) return
        applyLoaded(created)
      }
    }
  } catch {
    if (gen !== loadGen) return
    loadError.value =
      "Impossible de charger le personnage (API arrêtée, erreur serveur ou base non à jour). Relance l’API et exécute npm run db:migrate si besoin."
  } finally {
    if (gen === loadGen) loading.value = false
  }
}

watch(
  character,
  () => {
    if (loading.value || !serverId.value) return
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      if (!serverId.value) return
      const payload = toServerPayload(character.value)
      const json = JSON.stringify(payload)
      if (json === lastSavedPayload) return
      saveStatus.value = 'saving'
      try {
        await updateCharacter(serverId.value, payload)
        lastSavedPayload = json
        saveStatus.value = 'saved'
        setTimeout(() => { saveStatus.value = 'idle' }, 2000)
      } catch {
        saveStatus.value = 'error'
      }
    }, 800)
  },
  { deep: true },
)

export function useCharacter() {
  return {
    character,
    loading,
    loadError,
    saveStatus,
    computedHp,
    computedInitiative,
    unlocked,
    unlockedAdvanced,
  }
}
