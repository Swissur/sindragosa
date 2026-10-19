import type { Character } from '../types/character'

const BASE = '/api/characters'

/** Une ligne de la table `character`, telle que l'API la renvoie. */
export interface ServerCharacter {
  id: number
  userId: number
  isActive: boolean
  name: string
  histoire: string
  race: string
  portraitImageId: number | null
  hpMax: number
  hpCurrent: number
  hpBonus: number
  armor: number
  armorBonus: number
  str: number
  agi: number
  end: number
  int: number
  wis: number
  cha: number
  domains: Character['domains']
  specialties: Character['specialties']
  advancedDomains: Character['advancedDomains']
  titles: string[]
  abilityUses: Character['abilityUses']
  sessionTicks: Character['sessionTicks']
  resources: Character['resources']
  crafts: Character['crafts']
  items: Character['items']
  goldCoins: number
  silverCoins: number
  copperCoins: number
  pcCurrent: number
  manaCurrent: number
  manaMax: number
  states: Character['states']
  form: Character['form']
}

export async function fetchCharacter(id: number): Promise<ServerCharacter> {
  const res = await fetch(`${BASE}/${id}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Personnage introuvable')
  return res.json()
}

export async function fetchCharacters(): Promise<ServerCharacter[]> {
  const res = await fetch(BASE, { credentials: 'include' })
  if (!res.ok) throw new Error('Erreur lors du chargement des personnages')
  return res.json()
}

export async function createCharacter(data: Partial<ServerCharacter>): Promise<ServerCharacter> {
  const res = await fetch(BASE, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Erreur lors de la création du personnage')
  return res.json()
}

export async function updateCharacter(id: number, data: Partial<ServerCharacter>): Promise<ServerCharacter> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Erreur lors de la sauvegarde')
  return res.json()
}

export async function patchCharacterHp(id: number, hpCurrent: number): Promise<ServerCharacter> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hpCurrent }),
  })
  if (!res.ok) throw new Error('Erreur lors de la mise à jour des PV')
  return res.json()
}

export async function deleteCharacter(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE', credentials: 'include' })
  if (!res.ok) throw new Error('Erreur lors de la suppression')
}

export async function activateCharacter(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}/activate`, { method: 'POST', credentials: 'include' })
  if (!res.ok) throw new Error('Erreur lors de l\'activation')
}
