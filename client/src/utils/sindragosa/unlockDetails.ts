import { STATS, type AdvancedDomain } from '../../data/sindragosa/domains'
import type { Ability } from '../../data/sindragosa/types'
import type { ToastDetail } from '../../composables/useToast'
import { ABILITIES } from '../../data/sindragosa/abilities'
import { advancedStats, openingAbilities } from './advanced'
import { USES_PER_LABELS } from './abilityUses'
import { prerequisiteLabel } from './prerequisites'

/** Fiche d'une compétence fraîchement débloquée, pour le toast. */
export function abilityDetail(a: Ability): ToastDetail {
  const meta = [
    a.actionLabel,
    a.cooldownTurns ? `recharge ${a.cooldownTurns} tours` : '',
    a.usesPer ? USES_PER_LABELS[a.usesPer] : '',
  ].filter(Boolean).join(' · ')
  const condition = a.condition && a.condition !== '—' ? `${a.condition}\n\n` : ''
  return { label: a.name, meta, text: condition + a.effect }
}

/** Fiche d'un domaine avancé qui vient de s'ouvrir, pour le toast. */
export function advancedDetail(d: AdvancedDomain): ToastDetail {
  const stats = advancedStats(d.id).map((s) => STATS.find((x) => x.id === s)!.abbr).join(' / ')
  const abilities = openingAbilities(d, ABILITIES)
  const by = abilities.length ? abilities.map((a) => a.name).join(' ou ') : d.prerequisites.map(prerequisiteLabel).join(', ')
  return { label: d.label, meta: stats, text: `Ouvert par : ${by}` }
}
