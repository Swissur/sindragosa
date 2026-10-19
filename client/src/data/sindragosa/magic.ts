/**
 * Les domaines magiques (plans/40-mana.md) : un rang dans l'un d'eux débloque la
 * jauge de mana, et leurs rangs la font grandir. Les artisanats hybrides,
 * Élixirs arcaniques et Dressage sauvage s'appuient sur la magie sans en être.
 */
import type { StatId } from './domains'

export const MAGIC_DOMAINS = [
  'magie-profane-arcanes',
  'magie-divine-sacree',
  'communion-naturelle-chamanisme',
  'magie-ombre-fel',
]

export const MAGIC_ADVANCED_DOMAINS = [
  'necromancie-peste',
  'maitrise-arcanes',
  'magie-givre-alteration',
  'pyromancie',
  'chronomancie',
  'runes-anciennes',
  'maitrise-elements',
  'astral-celeste',
  'lumiere-vengeuse',
  'discipline-absolution',
  'demonologie-fel',
  'maledictions-affliction',
  'magie-vide',
  'magie-draconique',
]

/** Les caracs qui lancent la magie : la plus haute compte dans la mana max. */
export const MAGIC_STATS: StatId[] = ['int', 'wis', 'cha']
