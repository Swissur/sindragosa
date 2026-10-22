import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../api/characters', () => ({
  fetchCharacters: vi.fn(async () => []),
  fetchCharacter: vi.fn(),
  updateCharacter: vi.fn(),
}))
vi.mock('./useNewCharacter', () => ({ createCharacterHere: vi.fn() }))

import { loadCharacter, useCharacter } from './useCharacter'
import { createCharacterHere } from './useNewCharacter'

describe('loadCharacter sans fiche', () => {
  beforeEach(() => vi.mocked(createCharacterHere).mockClear())

  it('ne crée rien avec create: false (barre du bas avant le choix de campagne)', async () => {
    await loadCharacter(undefined, { create: false })
    expect(createCharacterHere).not.toHaveBeenCalled()
    expect(useCharacter().character.value.id).toBe('')
  })

  it('crée une fiche par défaut', async () => {
    await loadCharacter()
    expect(createCharacterHere).toHaveBeenCalledOnce()
  })
})
