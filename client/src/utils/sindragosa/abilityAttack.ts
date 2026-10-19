/**
 * Le jet d'attaque d'une compétence (plans/39) : avec l'arme (ou l'arme naturelle)
 * qu'elle demande, ou comme un jet de domaine pour un sort.
 */
import { ABILITY_ATTACKS } from '../../data/sindragosa/abilityAttacks'
import type { Ability } from '../../data/sindragosa/types'
import type { Character, ItemRow } from '../../types/character'
import { weaponDomainId, weaponFor } from './equipment'

export interface AttackRoll {
  domainId: string
  label: string
  /** Absente pour un sort : pas de rappel des dégâts d'arme. */
  weapon?: ItemRow
}

export const isAttack = (ability: Ability): boolean => ability.id in ABILITY_ATTACKS

/** Null si la compétence n'attaque pas, ou s'il lui faut une arme et qu'aucune n'est équipée. */
export function abilityAttackRoll(c: Character, ability: Ability): AttackRoll | null {
  const attack = ABILITY_ATTACKS[ability.id]
  if (!attack) return null
  if ('domainId' in attack) return { domainId: attack.domainId, label: ability.name }
  const weapon = weaponFor(c, attack.weapon)
  return weapon ? { domainId: weaponDomainId(weapon), label: `${ability.name} · ${weapon.name}`, weapon } : null
}
