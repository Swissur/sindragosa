/**
 * Catalogues d'identité Knight, repris de l'ébauche (plans/43 § 2).
 * ⚠ Non vérifiés contre le livre : l'ébauche a été écrite par une IA.
 */

export interface Archetype {
  id: string
  label: string
  /** Bonus de caractéristiques suggéré, appliqué à la main. */
  bonus: string
}

export const ARCHETYPES: Archetype[] = [
  { id: 'rebut', label: 'Rebut', bonus: 'Déplacement +1, Endurance +1' },
  { id: 'citoyen', label: 'Citoyen', bonus: 'Technique +1, Discrétion +1' },
  { id: 'territoires_libres', label: 'Habitant des territoires libres', bonus: 'Savoir +1, Parole +1' },
  { id: 'celebrite', label: 'Célébrité', bonus: 'Aura +1, Parole +1' },
  { id: 'survivant', label: 'Survivant', bonus: 'Endurance +1, Hargne +1' },
  { id: 'societe_secrete', label: "Membre d'une société secrète", bonus: 'Savoir +1, Combat ou Tir +1' },
  { id: 'nodachi', label: 'Agent du Nodachi', bonus: 'Combat ou Tir +1, Dextérité +1' },
  { id: 'service_secret', label: "Membre d'un service secret", bonus: 'Combat ou Tir +1, Discrétion +1' },
  { id: 'genie', label: 'Génie', bonus: 'Savoir +1, Technique +1' },
  { id: 'artiste', label: 'Artiste', bonus: 'Hargne +1, Aura +1' },
  { id: 'independant', label: 'Indépendant', bonus: 'Perception +1, Instinct +1' },
  { id: 'religieux', label: 'Religieux', bonus: 'Sang-Froid +1, Hargne +1' },
  { id: 'leader', label: 'Leader', bonus: 'Aura +1, Instinct +1' },
  { id: 'horslaloi', label: 'Hors-la-loi', bonus: 'Sang-Froid +1, Discrétion +1' },
  { id: 'voyageur', label: 'Voyageur', bonus: 'Déplacement +1, Perception +1' },
  { id: 'combattant', label: 'Combattant', bonus: 'Combat +1, Tir +1' },
  { id: 'force_nature', label: 'Force de la nature', bonus: 'Force +1, Endurance +1' },
  { id: 'libre', label: 'Archétype libre', bonus: 'À définir avec le MJ' },
]

export const SECTIONS: string[] = [
  'Kay — section Ogre', 'Gauvain — section Giant', 'Lamorak — section Gargoyle',
  'Lancelot — section Dragon', 'Palomydès — section Korrigan', 'Dagonnet — section Cyclope',
  'Bohort — section Griffon', 'Sagramor — section Tarasque', 'Bédivère — section Kraken',
]

export interface Blason {
  id: string
  label: string
  voeu: string
}

export const BLASONS: Blason[] = [
  { id: 'corbeau', label: 'Le Corbeau', voeu: "Participer à la résolution d'un crime, d'un enlèvement ou d'un meurtre." },
  { id: 'cerf', label: 'Le Cerf', voeu: "Obéir à la lettre aux ordres des chevaliers et d'Arthur." },
  { id: 'taureau', label: 'Le Taureau', voeu: "Respecter, à chaque mission, le code d'honneur du Knight." },
  { id: 'aigle', label: "L'Aigle", voeu: "Faire respecter le code d'honneur du Knight lorsqu'il semble bafoué." },
  { id: 'lion', label: 'Le Lion', voeu: "Ne jamais fuir devant un ennemi s'il met des innocents en danger." },
  { id: 'sanglier', label: 'Le Sanglier', voeu: 'Accomplir le ou les objectifs actuellement fixés, coûte que coûte.' },
  { id: 'dragon', label: 'Le Dragon', voeu: 'Respecter la loi locale et ne jamais mentir.' },
  { id: 'serpent', label: 'Le Serpent', voeu: "Découvrir les secrets de l'Anathème." },
  { id: 'ours', label: "L'Ours", voeu: "Empêcher la mort d'un être humain." },
  { id: 'loup', label: 'Le Loup', voeu: "Protéger un chevalier alors qu'il est en danger." },
]

export const ARMURES: string[] = [
  'Warrior (1re génération)', 'Priest (1re génération)', 'Paladin (1re génération)', 'Warmaster (1re génération)',
  'Rogue (2e génération)', 'Bard (2e génération)', 'Ranger (2e génération)',
  'Wizard (3e génération)', 'Barbarian (3e génération)', 'Psion (3e génération)', 'Monk (3e génération)',
  'Sorcerer (4e génération)', 'Necromancer (méta-armure spéciale)',
]

export const archetypeById = (id: string) => ARCHETYPES.find((a) => a.id === id)
export const blasonById = (id: string) => BLASONS.find((b) => b.id === id)
