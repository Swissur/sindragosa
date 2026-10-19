import { describe, it, expect } from 'vitest'
import { DUNGEONS } from '.'
import { BESTIARY } from '../bestiary'
import { dungeonEncounters } from '../../../utils/sindragosa/dungeons'
import { DOMAINS } from '../domains'

describe('donjons', () => {
  it('chaque combat ne cite que des monstres de son donjon', () => {
    for (const d of DUNGEONS) expect(() => dungeonEncounters(d), d.name).not.toThrow()
  })

  it('les monstres restent dans les bornes du système d6', () => {
    for (const m of DUNGEONS.flatMap((d) => d.monsters)) {
      expect(m.threat, m.name).toBeGreaterThanOrEqual(1)
      expect(m.threat, m.name).toBeLessThanOrEqual(5)
      expect(m.hp, m.name).toBeGreaterThanOrEqual(1)
      expect(m.attacks.length, m.name).toBeGreaterThan(0)
      for (const a of m.attacks) expect(a.pool, `${m.name} ${a.name}`).toBeGreaterThanOrEqual(2)
    }
  })

  it('un nom ne désigne qu’un monstre dans tout le bestiaire', () => {
    const names = BESTIARY.map((m) => m.name)
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([])
  })

  it('les Mortemines finissent sur Edwin VanCleef', () => {
    const mortemines = DUNGEONS.find((d) => d.name === 'Les Mortemines')!
    expect(mortemines.encounters.at(-1)?.name).toBe('Edwin VanCleef')
  })

  it('chaque combat de boss des Mortemines a sa table de butin', () => {
    const mortemines = DUNGEONS.find((d) => d.name === 'Les Mortemines')!
    const withLoot = mortemines.encounters.filter((e) => e.loot?.length).map((e) => e.name)
    expect(withLoot).toEqual([
      "Rhahk'Zor", 'Mineur Johnson', 'Sneed et son déchiqueteur', 'Gilnid',
      'M. Châtiment', 'Macaron', 'Capitaine Vertepeau', 'Edwin VanCleef',
    ])
  })

  it('le butin est un objet d’inventaire valide : une arme a un gabarit et un domaine connu', () => {
    const domainIds = new Set(DOMAINS.map((d) => d.id))
    for (const item of DUNGEONS.flatMap((d) => d.encounters.flatMap((e) => e.loot ?? []))) {
      expect(item.chance, item.name).toBeGreaterThan(0)
      if (item.type === 'arme') {
        expect(item.size, item.name).toBeDefined()
        expect(domainIds.has(item.domainId!), `${item.name} : ${item.domainId}`).toBe(true)
      }
      if (item.type === 'armure') expect(item.armor, item.name).toBeGreaterThan(0)
    }
  })
})
