import { describe, it, expect } from 'vitest'
import { MONSTERS } from './monsters'
import { D20_LEFTOVERS } from '../../utils/sindragosa/bestiary'

const byName = (name: string) => MONSTERS.find((m) => m.name === name)!

describe('bestiaire converti', () => {
  it('garde les 211 monstres', () => {
    expect(MONSTERS).toHaveLength(211)
  })

  it('toutes les valeurs sont dans les bornes du système d6', () => {
    for (const m of MONSTERS) {
      expect(m.threat, m.name).toBeGreaterThanOrEqual(0)
      expect(m.threat, m.name).toBeLessThanOrEqual(5)
      for (const v of Object.values(m.stats)) expect(v, m.name).toBeGreaterThanOrEqual(1)
      expect(m.hp, m.name).toBeGreaterThanOrEqual(1)
      expect(m.defense, m.name).toBeGreaterThanOrEqual(2)
      for (const a of m.attacks) {
        expect(a.pool, `${m.name} ${a.name}`).toBeGreaterThanOrEqual(2)
        expect(a.damage, `${m.name} ${a.name}`).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it('classe l’armure comme prévu', () => {
    expect(byName('Golem de pierre')).toMatchObject({ armorKind: 'lourde', threat: 4 })
    expect(byName('Ours brun').armorKind).toBe('cuir')
    expect(byName('Loup').armor).toBe(0)
  })

  it('il ne reste plus de vocabulaire d20', () => {
    const texts = MONSTERS.flatMap((m) => [
      ...m.abilities.map((a) => ({ where: `${m.name} : ${a.name}`, text: `${a.name} ${a.description}` })),
      { where: m.name, text: m.description ?? '' },
    ])
    expect(texts.filter((t) => D20_LEFTOVERS.test(t.text)).map((t) => t.where)).toEqual([])
  })

  it('l’hallali part d’une attaque ratée, sans plage d20', () => {
    const hallali = MONSTERS.flatMap((m) => m.abilities.filter((a) => a.name === 'L\'hallali'))
    expect(hallali).toHaveLength(4)
    for (const a of hallali) expect(a.description).toMatch(/rate une attaque/)
  })
})
