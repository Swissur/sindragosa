import { sql } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash'),
  googleId: text('google_id').unique(),
  email: text('email'),
  avatarUrl: text('avatar_url'),
  /** Notes personnelles du joueur (privées). */
  notesPerso: text('notes_perso').notNull().default(''),
  activeCampaignId: integer('active_campaign_id'),
  /** Couleur du dé 3D (`#rrggbb`). Remplacée par `diceStyle`, gardée le temps d'une version. */
  diceColor: varchar('dice_color', { length: 7 }),
  /** Style du dé 3D : fond (aplat ou dégradé) + encre. NULL = style du rang dans la campagne. */
  diceStyle: jsonb('dice_style'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const journalCompagnie = pgTable('journal_compagnie', {
  id: integer('id').primaryKey().default(1),
  content: text('content').notNull().default(''),
  /** Incrémentée à chaque écriture : détection de conflit + n° d'historique. */
  version: integer('version').notNull().default(1),
  updatedByUserId: integer('updated_by_user_id').references(() => users.id),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const characters = pgTable(
  'character',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    isActive: boolean('is_active').notNull().default(false),

    name: text('name').notNull().default('Nouveau héros'),
    /** Free-form character background / story (French UI: « Histoire »). */
    histoire: text('histoire').notNull().default(''),
    /** Race id (client `data/sindragosa/races.ts`), '' = pas encore choisie. */
    race: text('race').notNull().default(''),

    /** PV max calculés par le client (règles Sindragosa) et stockés pour le combat et le repos. */
    hpMax: integer('hp_max').notNull().default(20),
    hpCurrent: integer('hp_current').notNull().default(20),
    /** Bonus de PV max divers (objets, compétences passives). */
    hpBonus: integer('hp_bonus').notNull().default(0),
    /** Armure physique (AP), saisie à la main tant que l'équipement n'est pas défini. */
    armor: integer('armor').notNull().default(0),

    /** Caractéristiques : nombre de d6 de base, réglées par le MJ. */
    str: integer('str').notNull().default(2),
    agi: integer('agi').notNull().default(2),
    end: integer('end').notNull().default(2),
    int: integer('int').notNull().default(2),
    wis: integer('wis').notNull().default(2),
    cha: integer('cha').notNull().default(2),

    /** { [domainId]: { rank, ticks } } */
    domains: jsonb('domains').$type<Record<string, { rank: number; ticks: number }>>().notNull().default({}),
    /** [{ id, domainId, name, level, ticks }] */
    specialties: jsonb('specialties').notNull().default([]),
    /** { [advancedDomainId]: { rank, ticks } } */
    advancedDomains: jsonb('advanced_domains').$type<Record<string, { rank: number; ticks: number }>>().notNull().default({}),
    /** Titres (classes émergentes) accordés par le MJ. */
    titles: jsonb('titles').$type<string[]>().notNull().default([]),
    /** Usages consommés par période : { [période]: { [abilityId]: nombre } } (voir campaigns/rest.ts). */
    abilityUses: jsonb('ability_uses').$type<Record<string, Record<string, number>>>().notNull().default({}),
    /** Coches validées pendant la séance en cours. */
    sessionTicks: jsonb('session_ticks').$type<{ success: number; critFail: number }>().notNull().default({ success: 0, critFail: 0 }),
    /** Compteurs libres (Mana, Rage, Énergie…) : [{ id, name, current, max }] */
    resources: jsonb('resources').notNull().default([]),
    /** Métiers d'artisanat connus : { [craftId]: rang } */
    crafts: jsonb('crafts').$type<Record<string, number>>().notNull().default({}),
    /** Armes : [{ id, name, damage, domainId }] */
    weapons: jsonb('weapons').notNull().default([]),

    /** Inventory items: [{ id, name, description?, quantity }] */
    items: jsonb('items').notNull().default([]),
    /** Monnaie : 1 or = 10 argent = 100 cuivre. */
    goldCoins: integer('gold_coins').notNull().default(0),
    silverCoins: integer('silver_coins').notNull().default(0),
    copperCoins: integer('copper_coins').notNull().default(0),

    /** Points de chance : 2 par séance, chacun ajoute 1d6 à un jet. */
    pcCurrent: integer('pc_current').notNull().default(2),

    /** États préjudiciables courants : liste d'ids (voir combats/etats.ts). */
    states: jsonb('states').$type<string[]>().notNull().default([]),

    /** ID of the portrait image in generated_images table */
    portraitImageId: integer('portrait_image_id').references(() => generatedImages.id),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('one_active_per_user').on(table.userId).where(sql`${table.isActive} = true`),
  ],
)

export const journalPages = pgTable('journal_pages', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 20 }).notNull().default('text'),
  content: text('content').notNull().default(''),
  version: integer('version').notNull().default(1),
  createdByUserId: integer('created_by_user_id').notNull().references(() => users.id),
  updatedByUserId: integer('updated_by_user_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const generatedImages = pgTable('generated_images', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  data: text('data').notNull(),
  mimeType: text('mime_type').notNull(),
  prompt: text('prompt').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const campaigns = pgTable('campaign', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  gmUserId: integer('gm_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const campaignMembers = pgTable(
  'campaign_member',
  {
    id: serial('id').primaryKey(),
    campaignId: integer('campaign_id')
      .notNull()
      .references(() => campaigns.id, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    characterId: integer('character_id').references(() => characters.id, { onDelete: 'set null' }),
    joinedAt: timestamp('joined_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('unique_campaign_member').on(table.campaignId, table.userId)],
)

export const encounterTemplates = pgTable('encounter_template', {
  id: serial('id').primaryKey(),
  campaignId: integer('campaign_id')
    .notNull()
    .references(() => campaigns.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const encounterMonsters = pgTable('encounter_monster', {
  id: serial('id').primaryKey(),
  encounterId: integer('encounter_id')
    .notNull()
    .references(() => encounterTemplates.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  nc: real('nc').notNull().default(0),
  size: text('size').notNull().default('moyenne'),
  def: integer('def').notNull().default(10),
  pv: integer('pv').notNull().default(1),
  init: integer('init').notNull().default(0),
  rd: text('rd'),
  statFor: integer('stat_for').notNull().default(0),
  statDex: integer('stat_dex').notNull().default(0),
  statCon: integer('stat_con').notNull().default(0),
  statInt: integer('stat_int').notNull().default(0),
  statSag: integer('stat_sag').notNull().default(0),
  statCha: integer('stat_cha').notNull().default(0),
  attacks: jsonb('attacks').notNull().default([]),
  abilities: jsonb('abilities').notNull().default([]),
  description: text('description'),
  /** Démarre le combat en réserve (caché aux joueurs, hors initiative). */
  hidden: boolean('hidden').notNull().default(false),
})

export const combats = pgTable('combat', {
  id: serial('id').primaryKey(),
  campaignId: integer('campaign_id')
    .notNull()
    .references(() => campaigns.id, { onDelete: 'cascade' }),
  encounterId: integer('encounter_id').references(() => encounterTemplates.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 200 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  /** Participant dont c'est le tour. NULL = combat pas encore commencé / participant supprimé. */
  currentParticipantId: integer('current_participant_id'),
  roundNumber: integer('round_number').notNull().default(1),
  /** Décor du champ de bataille 3D (voir `client/src/components/battle/environments.ts`). */
  environment: varchar('environment', { length: 40 }).notNull().default('foret'),
  /** Murs tracés par le MJ sur la carte (voir `client/src/components/battle/walls.ts`). */
  obstacles: jsonb('obstacles').notNull().default([]),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  finishedAt: timestamp('finished_at', { withTimezone: true }),
})

export const combatParticipants = pgTable('combat_participant', {
  id: serial('id').primaryKey(),
  combatId: integer('combat_id')
    .notNull()
    .references(() => combats.id, { onDelete: 'cascade' }),
  kind: varchar('kind', { length: 10 }).notNull(), // 'player' | 'monster'
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull(),
  initiative: integer('initiative').notNull(),
  // Null for players: their HP lives on the character sheet (enrichParticipantHp)
  hpMax: integer('hp_max'),
  hpCurrent: integer('hp_current'),
  def: integer('def').notNull().default(10),
  // Monster-specific fields (nullable for players)
  nc: real('nc'),
  statFor: integer('stat_for'),
  statDex: integer('stat_dex'),
  statCon: integer('stat_con'),
  statInt: integer('stat_int'),
  statSag: integer('stat_sag'),
  statCha: integer('stat_cha'),
  attacks: jsonb('attacks'),
  abilities: jsonb('abilities'),
  monsterDescription: text('monster_description'),
  /** Position sur le champ de bataille, en cases (centre = 0,0). NULL = jamais placé. */
  posX: real('pos_x'),
  posY: real('pos_y'),
  /** PNJ en réserve : hors de l'ordre d'initiative, invisible pour les joueurs. */
  hidden: boolean('hidden').notNull().default(false),
  /** États préjudiciables d'un monstre. Pour un PJ, ils vivent sur sa fiche. */
  states: jsonb('states').$type<string[]>().notNull().default([]),
})

/**
 * Jets de dés loggés en temps réel. Portée = la campagne : un jet fait hors
 * combat est loggé lui aussi, le combat n'est qu'un tag (`combatId` nullable).
 */
export const rollEvents = pgTable('roll_event', {
  id: serial('id').primaryKey(),
  campaignId: integer('campaign_id')
    .notNull()
    .references(() => campaigns.id, { onDelete: 'cascade' }),
  /** Combat pendant lequel le jet a été fait, NULL si hors combat. */
  combatId: integer('combat_id').references(() => combats.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  actorName: text('actor_name').notNull(),
  /** 'player' | 'monster' — sert au filtre PJ/PNJ du log */
  actorKind: varchar('actor_kind', { length: 10 }).notNull().default('player'),
  /** 'public' | 'gm' — les jets monstres (gm) ne sont envoyés qu'au MJ */
  visibility: varchar('visibility', { length: 10 }).notNull().default('public'),
  kind: varchar('kind', { length: 20 }).notNull(),
  label: text('label').notNull(),
  /** D'où vient le jet : 'combat' | 'actions' | 'fiche' | 'agonie' | 'sandbox'… */
  context: varchar('context', { length: 30 }).notNull().default('combat'),
  die: integer('die').notNull(),
  sides: integer('sides').notNull(),
  bonus: integer('bonus').notNull().default(0),
  total: integer('total').notNull(),
  /** Les dés qui comptent, et qui s'additionnent (un 3d6 par exemple). */
  rolls: jsonb('rolls'),
  /** Les dés lancés puis écartés par un avantage ou une relance. */
  dropped: jsonb('dropped'),
  damage: jsonb('damage'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const codexEntries = pgTable('codex_entry', {
  id: serial('id').primaryKey(),
  campaignId: integer('campaign_id')
    .notNull()
    .references(() => campaigns.id, { onDelete: 'cascade' }),
  /** 'personnage' | 'lieu' | 'autre' */
  type: text('type').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  version: integer('version').notNull().default(1),
  createdByUserId: integer('created_by_user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

/** Notes privées d'un joueur (remplace le blob user.notes_perso). */
export const notes = pgTable('note', {
  id: serial('id').primaryKey(),
  ownerUserId: integer('owner_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull().default(''),
  /** 'text' | 'drawing' */
  type: text('type').notNull().default('text'),
  content: text('content').notNull().default(''),
  version: integer('version').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

/**
 * Historique de versions, commun à toutes les entités éditables du journal.
 * Une restauration n'efface rien : elle écrit une nouvelle révision `restore`.
 */
export const revisions = pgTable(
  'revision',
  {
    id: serial('id').primaryKey(),
    /** 'journal_compagnie' | 'journal_page' | 'note' | 'codex_entry' */
    entityType: varchar('entity_type', { length: 30 }).notNull(),
    entityId: integer('entity_id').notNull(),
    version: integer('version').notNull(),
    /** État complet des champs versionnés à cette version. */
    snapshot: jsonb('snapshot').notNull(),
    authorUserId: integer('author_user_id').references(() => users.id, { onDelete: 'set null' }),
    /** Dénormalisé : reste lisible même si le joueur change de perso. */
    authorName: text('author_name').notNull().default(''),
    /** 'edit' | 'restore' */
    kind: varchar('kind', { length: 10 }).notNull().default('edit'),
    /** Caractères gagnés/perdus vs la version précédente. */
    sizeDelta: integer('size_delta').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('revision_entity_version').on(table.entityType, table.entityId, table.version)],
)

export type UserRow = typeof users.$inferSelect
export type CharacterRow = typeof characters.$inferSelect
export type CharacterInsert = typeof characters.$inferInsert
export type CampaignRow = typeof campaigns.$inferSelect
export type CampaignMemberRow = typeof campaignMembers.$inferSelect
