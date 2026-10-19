import bcrypt from 'bcryptjs'
import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import {
  users, characters, campaigns, campaignMembers, encounterTemplates, encounterMonsters,
} from '../db/schema.js'
import { DEV_BESTIARY } from './bestiary.js'
import type { EtatEntry } from '../combats/etats.js'

export const SEED_CAMPAIGN_NAME = 'Bac à sable'
export const SEED_PASSWORD = 'dev'

/** Le MJ du bac à sable. Les autres comptes sont ses joueurs. */
export const SEED_GM = 'mj-dev'

/**
 * Fiches volontairement variées : c'est là qu'on attrape les bugs.
 * - Bracco, armure lourde et peu agile → initiative basse (4)
 * - Orlane à 2 PV → teste l'agonie et les seuils de couleur
 * - Nym et Kaeliss à 6 d'initiative → teste les égalités
 * - Valère au rang 3 dans tous les domaines → teste les spécialités et les compétences
 *
 * hpMax suit la formule du moteur (client/src/utils/sindragosa/combat.ts) :
 * 20 + 2 par rang en Force/Endurance (5 en Résistance physique) + 8 par point
 * d'Endurance gagné depuis la création. Sinon la fiche recalcule d'autres PV.
 */
/** Les 30 domaines de base (miroir de `DOMAINS`, client/src/data/sindragosa/domains.ts). */
const ALL_DOMAIN_IDS = [
  'athletisme', 'melee-bourrine', 'armures-boucliers', 'intimidation-physique', 'artisanat-lourd',
  'acrobatie-furtivite', 'combat-precision', 'tir-lancer', 'escamotage-crochetage', 'artisanat-delicat',
  'resistance-physique', 'volonte-recuperation', 'survie-milieu-hostile', 'tolerance-toxines', 'energie-souffle',
  'magie-profane-arcanes', 'explosifs-ingenierie', 'histoire-geographie', 'tactique-analyse', 'medecine-soins',
  'perception-sens', 'magie-divine-sacree', 'communion-naturelle-chamanisme', 'alchimie-herboristerie', 'volonte-spirituelle',
  'persuasion-diplomatie', 'commandement-inspiration', 'magie-ombre-fel', 'negociation-commerce', 'tromperie-comedie',
]

export const SEED_PLAYERS = [
  {
    username: 'bracco',
    character: {
      name: 'Bracco Pouce-Cassé', race: 'nain',
      str: 2, agi: 2, end: 3, int: 2, wis: 2, cha: 2, armor: 4,
      items: [
        { id: 'i-cuirasse', name: 'Cuirasse de plaques', quantity: 1, type: 'armure', armor: 4, equipped: true },
        { id: 'i-hache', name: "Hache d'armes", quantity: 1, type: 'arme', size: 'une-main', damageBonus: 0, domainId: 'melee-bourrine', equipped: true },
      ],
      // 20 + Mêlée 3×2 + Armures 2×2 + Athlétisme 1×2 + Résistance 2×5 = 42
      hpMax: 42, hpCurrent: 42,
      domains: {
        'melee-bourrine': { rank: 3, ticks: 1 },
        'armures-boucliers': { rank: 2, ticks: 0 },
        athletisme: { rank: 1, ticks: 0 },
        'resistance-physique': { rank: 2, ticks: 2 },
      },
      specialties: [
        { id: 's-haches', domainId: 'melee-bourrine', name: 'Haches', level: 2, ticks: 0 },
        { id: 's-boucliers', domainId: 'melee-bourrine', name: 'Boucliers', level: 1, ticks: 1 },
      ],
      // Deux états posés d'entrée : de quoi voir les pastilles sans cliquer.
      states: [{ id: 'renverse' }, { id: 'desarme', turns: 2 }] as EtatEntry[],
    },
  },
  {
    username: 'nym',
    character: {
      name: 'Nym la Vive', race: 'elfe-nuit',
      str: 2, agi: 3, end: 2, int: 2, wis: 2, cha: 2, armor: 1,
      items: [
        { id: 'i-cuir', name: 'Cuir souple', quantity: 1, type: 'armure', armor: 1, equipped: true },
        { id: 'i-dagues', name: 'Dagues jumelles', quantity: 1, type: 'arme', size: 'legere', damageBonus: 0, domainId: 'combat-precision', equipped: true },
      ],
      hpMax: 20, hpCurrent: 20,
      domains: {
        'acrobatie-furtivite': { rank: 3, ticks: 2 },
        'combat-precision': { rank: 3, ticks: 0 },
        'escamotage-crochetage': { rank: 2, ticks: 0 },
        'perception-sens': { rank: 1, ticks: 0 },
      },
      // Spécialité Maître : critiques sur 5 et 6.
      specialties: [
        { id: 's-dagues', domainId: 'combat-precision', name: 'Dagues', level: 3, ticks: 0 },
        { id: 's-ombre', domainId: 'acrobatie-furtivite', name: "Discrétion dans l'ombre", level: 2, ticks: 1 },
      ],
    },
  },
  {
    username: 'orlane',
    character: {
      // À 2 PV : teste l'agonie, les seuils de couleur et le tri des mourants.
      name: 'Orlane du Vent', race: 'gnome',
      str: 2, agi: 2, end: 2, int: 3, wis: 2, cha: 2, armor: 0,
      // 20 + Volonté & Récupération 1×2 = 22
      hpMax: 22, hpCurrent: 2,
      domains: {
        'magie-profane-arcanes': { rank: 3, ticks: 3 },
        'histoire-geographie': { rank: 1, ticks: 1 },
        'volonte-recuperation': { rank: 1, ticks: 0 },
      },
      advancedDomains: { pyromancie: { rank: 1, ticks: 0 } },
      specialties: [
        { id: 's-arcane', domainId: 'magie-profane-arcanes', name: "Sorts d'Arcane", level: 1, ticks: 1 },
      ],
      // Mana max = INT 3 + Profane 3 + Pyromancie 1 = 7 (plans/40) ; entamée pour tester le repos.
      manaMax: 7, manaCurrent: 3,
      states: [{ id: 'affaibli' }] as EtatEntry[],
    },
  },
  {
    username: 'kaeliss',
    character: {
      // Même initiative que Nym (6) : teste les égalités.
      name: 'Kaeliss Feuille-Grise', race: 'troll',
      str: 2, agi: 3, end: 2, int: 2, wis: 2, cha: 2, armor: 2,
      items: [
        { id: 'i-clous', name: 'Cuir clouté', quantity: 1, type: 'armure', armor: 2, equipped: true },
        { id: 'i-arc', name: 'Arc long', quantity: 1, type: 'arme', size: 'deux-mains', damageBonus: 0, domainId: 'tir-lancer', equipped: true },
      ],
      // 20 + Survie 2×2 = 24
      hpMax: 24, hpCurrent: 24,
      domains: {
        'tir-lancer': { rank: 3, ticks: 0 },
        'survie-milieu-hostile': { rank: 2, ticks: 1 },
        'acrobatie-furtivite': { rank: 1, ticks: 0 },
        'perception-sens': { rank: 1, ticks: 1 },
      },
      specialties: [
        { id: 's-arcs', domainId: 'tir-lancer', name: 'Arcs', level: 2, ticks: 0 },
      ],
      titles: [] as string[],
    },
  },
  {
    username: 'touche-a-tout',
    character: {
      // Rang 3 partout : 3 spécialités possibles dans chaque domaine, pour les explorer.
      name: 'Valère Touche-à-tout', race: 'humain',
      str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 3, armor: 0,
      // 20 + 9 domaines de Force/Endurance × 3×2 + Résistance physique 3×5 = 89
      hpMax: 89, hpCurrent: 89,
      domains: Object.fromEntries(ALL_DOMAIN_IDS.map((id) => [id, { rank: 3, ticks: 0 }])),
    },
  },
] as const

async function upsertUser(username: string, passwordHash: string): Promise<number> {
  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.username, username))
  if (existing) return existing.id
  const [created] = await db.insert(users).values({ username, passwordHash }).returning({ id: users.id })
  return created.id
}

export interface SeedResult {
  campaignId: number
  gmUserId: number
  playerUserIds: number[]
  encounterId: number
}

/**
 * (Re)construit le bac à sable de dev. Idempotent : les comptes sont réutilisés,
 * mais la campagne est **supprimée puis recréée** — c'est ce qui garantit qu'on
 * repart d'un état propre (la cascade emporte combats, journal, codex…).
 *
 * Ne touche jamais aux comptes ni aux campagnes qui ne sont pas du seed.
 */
export async function seedDev(): Promise<SeedResult> {
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 12)

  const gmUserId = await upsertUser(SEED_GM, passwordHash)
  const playerUserIds: number[] = []
  for (const p of SEED_PLAYERS) {
    playerUserIds.push(await upsertUser(p.username, passwordHash))
  }

  // Table rase : on ne garde pas l'ancien bac à sable.
  const stale = await db.select({ id: campaigns.id }).from(campaigns).where(eq(campaigns.gmUserId, gmUserId))
  if (stale.length > 0) {
    await db.delete(campaigns).where(inArray(campaigns.id, stale.map((c) => c.id)))
  }
  await db.delete(characters).where(inArray(characters.userId, playerUserIds))

  const [campaign] = await db.insert(campaigns)
    .values({ name: SEED_CAMPAIGN_NAME, gmUserId })
    .returning({ id: campaigns.id })

  for (const [i, p] of SEED_PLAYERS.entries()) {
    const userId = playerUserIds[i]
    const [char] = await db.insert(characters)
      .values({ userId, isActive: true, ...p.character })
      .returning({ id: characters.id })
    await db.insert(campaignMembers).values({ campaignId: campaign.id, userId, characterId: char.id })
  }

  // Campagne active pour tout le monde : sinon le premier « combat bidon »
  // échoue faute de campagne courante, juste après un seed.
  await db.update(users)
    .set({ activeCampaignId: campaign.id })
    .where(inArray(users.id, [gmUserId, ...playerUserIds]))

  // Une rencontre prête à lancer, avec la moitié du bestiaire.
  const [encounter] = await db.insert(encounterTemplates)
    .values({ campaignId: campaign.id, name: 'Embuscade sur la route', description: 'Rencontre de test.' })
    .returning({ id: encounterTemplates.id })

  for (const m of DEV_BESTIARY.slice(0, 3)) {
    await db.insert(encounterMonsters).values({ encounterId: encounter.id, ...m })
  }

  return { campaignId: campaign.id, gmUserId, playerUserIds, encounterId: encounter.id }
}
