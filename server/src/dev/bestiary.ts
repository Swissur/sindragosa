/**
 * Petit bestiaire de dev, autonome, au format Sindragosa (plans/33). Le vrai
 * catalogue vit côté client (`client/src/data/sindragosa/monsters.ts`) ; le
 * dupliquer ici n'aurait aucun intérêt — on veut juste de quoi remplir un combat
 * bidon. Valeurs obtenues avec le convertisseur du plan 33.
 */
export interface DevMonster {
  name: string
  /** Rang de menace R. */
  threat: number
  armor: number
  /** Réserve de défense, en d6. */
  defense: number
  pv: number
  init: number
  statFor: number
  statAgi: number
  statEnd: number
  statInt: number
  statSag: number
  statCha: number
  attacks: { name: string; pool: number; damage: number; range?: number }[]
  abilities: { name: string; description: string }[]
  description: string
}

export const DEV_BESTIARY: DevMonster[] = [
  {
    name: 'Gobelin fouisseur', threat: 1, armor: 0, defense: 4, pv: 4, init: 6,
    statFor: 2, statAgi: 3, statEnd: 2, statInt: 2, statSag: 2, statCha: 2,
    attacks: [{ name: 'Dague rouillée', pool: 4, damage: 2 }],
    abilities: [{ name: 'Lâche', description: 'Fuit dès que la moitié du groupe est tombée.' }],
    description: 'Petit, sale, et beaucoup trop confiant.',
  },
  {
    name: 'Loup des landes', threat: 1, armor: 0, defense: 5, pv: 7, init: 8,
    statFor: 3, statAgi: 4, statEnd: 3, statInt: 1, statSag: 3, statCha: 1,
    attacks: [{ name: 'Morsure', pool: 5, damage: 3 }],
    abilities: [{ name: 'Meute', description: '+1d6 en attaque si un allié est au contact de la même cible.' }],
    description: 'Maigre, gris, et il n\'est jamais seul.',
  },
  {
    name: 'Archer squelette', threat: 1, armor: 0, defense: 4, pv: 5, init: 6,
    statFor: 2, statAgi: 3, statEnd: 2, statInt: 1, statSag: 2, statCha: 1,
    attacks: [{ name: 'Arc court', pool: 4, damage: 2, range: 30 }],
    abilities: [{ name: 'Os secs', description: 'Immunisé au poison, vulnérable aux dégâts contondants.' }],
    description: 'Il visait déjà mal de son vivant.',
  },
  {
    name: 'Ogre bilieux', threat: 1, armor: 1, defense: 5, pv: 17, init: 5,
    statFor: 4, statAgi: 2, statEnd: 4, statInt: 1, statSag: 2, statCha: 1,
    attacks: [{ name: 'Gourdin clouté', pool: 5, damage: 6 }],
    abilities: [{ name: 'Coup ample', description: 'Touche deux cibles adjacentes sur un jet d\'au moins 2 succès.' }],
    description: 'Lent, mais on ne le rate pas deux fois.',
  },
  {
    name: 'Sorcière des tourbes', threat: 2, armor: 0, defense: 5, pv: 13, init: 8,
    statFor: 2, statAgi: 3, statEnd: 3, statInt: 4, statSag: 3, statCha: 3,
    attacks: [{ name: 'Trait putride', pool: 5, damage: 4, range: 20 }],
    abilities: [{ name: 'Brume', description: 'Une fois par combat : −1d6 aux attaques à distance visant ses alliés.' }],
    description: 'Elle parle à la boue, et la boue répond.',
  },
  {
    name: 'Chef de guerre orque', threat: 2, armor: 1, defense: 6, pv: 23, init: 8,
    statFor: 4, statAgi: 3, statEnd: 4, statInt: 2, statSag: 3, statCha: 3,
    attacks: [
      { name: 'Hache à deux mains', pool: 6, damage: 5 },
      { name: 'Javelot', pool: 6, damage: 4, range: 15 },
    ],
    abilities: [{ name: 'Cri de guerre', description: 'Ses alliés gagnent +1d6 en attaque pendant un round.' }],
    description: 'Il porte les dents de ses prédécesseurs en collier.',
  },
]
