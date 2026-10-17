import type { Component } from 'vue'
import { Swords, Zap, Shield, Feather, Infinity as InfinityIcon, Tent, MessageCircle } from 'lucide-vue-next'
import type { ActionType } from '../../data/sindragosa/types'

/** Icône et libellé de chaque type d'action (filtre et cartes de compétences). */
export const ACTION_TYPES: Record<ActionType, { label: string; icon: Component }> = {
  complete: { label: 'Action complète', icon: Swords },
  rapide: { label: 'Action rapide', icon: Zap },
  reaction: { label: 'Réaction', icon: Shield },
  gratuite: { label: 'Action gratuite', icon: Feather },
  passif: { label: 'Passif', icon: InfinityIcon },
  'hors-combat': { label: 'Hors combat', icon: Tent },
  dialogue: { label: 'Dialogue', icon: MessageCircle },
}

/** Types d'action qui servent en combat (onglet « Combat » de Mes actions). */
export const COMBAT_ACTION_TYPES: ActionType[] = ['complete', 'rapide', 'reaction', 'gratuite']
