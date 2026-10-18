import { describe, it, expect, beforeEach } from 'vitest'
import type express from 'express'
import { broadcastCampaignRoll, criticalOutcome, getClientsForCampaign, onlineUserIds, sendToUser, type SseClient } from './sseStore.js'

const CAMPAIGN = 9001
const GM = 1
const PLAYER = 2

function fakeClient(userId: number) {
  const written: string[] = []
  const res = { write: (chunk: string) => { written.push(chunk); return true } } as unknown as express.Response
  const client: SseClient = { res, userId }
  return { client, written }
}

function roll(over: Record<string, unknown> = {}) {
  return {
    visibility: 'gm', actorName: 'Dragon rouge', kind: 'weapon',
    die: 20, sides: 20, total: 27, ...over,
  }
}

describe('criticalOutcome', () => {
  it('note le d20 et le d12 d’attaque, pas les autres dés', () => {
    expect(criticalOutcome({ kind: 'weapon', die: 20, sides: 20 })).toBe('critical')
    expect(criticalOutcome({ kind: 'weapon', die: 1, sides: 20 })).toBe('fumble')
    expect(criticalOutcome({ kind: 'weapon', die: 12, sides: 12 })).toBe('critical')
    expect(criticalOutcome({ kind: 'libre', die: 12, sides: 12 })).toBeNull()
    expect(criticalOutcome({ kind: 'weapon', die: 6, sides: 6 })).toBeNull()
    expect(criticalOutcome({ kind: 'weapon', die: 14, sides: 20 })).toBeNull()
  })

  it('une réserve de d6 : exploit ou échec critique', () => {
    expect(criticalOutcome({ kind: 'domaine', die: 0, sides: 6, pool: { reached: 'exploit', critFail: false } })).toBe('critical')
    expect(criticalOutcome({ kind: 'domaine', die: 0, sides: 6, pool: { reached: 'echec', critFail: true } })).toBe('fumble')
    expect(criticalOutcome({ kind: 'domaine', die: 6, sides: 6, pool: { reached: 'difficile', critFail: false } })).toBeNull()
  })

  it('respecte le drapeau explicite des dégâts', () => {
    expect(criticalOutcome({ kind: 'weapon', die: 5, sides: 20, damage: { critical: true } })).toBe('critical')
  })
})

describe('broadcastCampaignRoll', () => {
  beforeEach(() => {
    getClientsForCampaign(CAMPAIGN).clear()
  })

  it('sends public rolls to everyone, gm rolls only to the GM', () => {
    const gm = fakeClient(GM)
    const p = fakeClient(PLAYER)
    const clients = getClientsForCampaign(CAMPAIGN)
    clients.add(gm.client)
    clients.add(p.client)

    broadcastCampaignRoll(CAMPAIGN, GM, { visibility: 'public', actorName: 'Thorin' })
    broadcastCampaignRoll(CAMPAIGN, GM, { visibility: 'gm', actorName: 'Gobelin' })

    const gmData = gm.written.join('')
    const playerData = p.written.join('')
    expect(gmData).toContain('Thorin')
    expect(gmData).toContain('Gobelin')
    expect(playerData).toContain('Thorin')
    expect(playerData).not.toContain('Gobelin')
  })

  it('does nothing when nobody is connected', () => {
    expect(() => broadcastCampaignRoll(4242, GM, { visibility: 'public' })).not.toThrow()
  })

  it('envoie le jet complet au MJ et rien au joueur pour un jet banal', () => {
    const gm = fakeClient(GM)
    const player = fakeClient(PLAYER)
    const clients = getClientsForCampaign(CAMPAIGN)
    clients.add(gm.client); clients.add(player.client)

    broadcastCampaignRoll(CAMPAIGN, GM, roll({ die: 14, total: 21 }))

    expect(gm.written.join('')).toContain('event: roll')
    expect(player.written).toEqual([])
  })

  // Le cœur de la feature : la table vibre, mais le chiffre reste secret.
  it('envoie un `critical` allégé au joueur sur un 20 caché', () => {
    const player = fakeClient(PLAYER)
    getClientsForCampaign(CAMPAIGN).add(player.client)

    broadcastCampaignRoll(CAMPAIGN, GM, roll())

    const payload = player.written.join('')
    expect(payload).toContain('event: critical')
    expect(payload).toContain('Dragon rouge')
    expect(payload).not.toContain('event: roll')
    expect(payload).not.toContain('27')
    expect(payload).not.toContain('"die"')
  })

  it('envoie le jet complet à tout le monde quand il est public', () => {
    const player = fakeClient(PLAYER)
    getClientsForCampaign(CAMPAIGN).add(player.client)

    broadcastCampaignRoll(CAMPAIGN, GM, roll({ visibility: 'public', actorName: 'Théos' }))

    expect(player.written.join('')).toContain('event: roll')
  })
})

describe('mode table (viewer)', () => {
  beforeEach(() => {
    getClientsForCampaign(CAMPAIGN).clear()
  })

  it('le MJ en mode table ne reçoit pas les jets cachés, seulement le frisson', () => {
    const tablet = fakeClient(GM)
    tablet.client.viewer = true
    getClientsForCampaign(CAMPAIGN).add(tablet.client)

    broadcastCampaignRoll(CAMPAIGN, GM, roll({ die: 20 }))
    broadcastCampaignRoll(CAMPAIGN, GM, roll({ die: 14, actorName: 'Gobelin' }))
    broadcastCampaignRoll(CAMPAIGN, GM, { visibility: 'public', actorName: 'Thorin' })

    const data = tablet.written.join('')
    expect(data).toContain('event: critical')
    expect(data).not.toContain('27')
    expect(data).not.toContain('Gobelin')
    expect(data).toContain('Thorin')
  })
})

describe('présence et envoi ciblé', () => {
  const ID = 9002
  beforeEach(() => getClientsForCampaign(ID).clear())

  it('compte chaque joueur une fois, sans le mode table', () => {
    const a = fakeClient(GM)
    const b = fakeClient(PLAYER)
    const b2 = fakeClient(PLAYER)
    const table = fakeClient(3)
    table.client.viewer = true
    for (const c of [a, b, b2, table]) getClientsForCampaign(ID).add(c.client)
    expect(onlineUserIds(ID).sort()).toEqual([GM, PLAYER])
  })

  it('personne en ligne dans une campagne sans flux', () => {
    expect(onlineUserIds(424242)).toEqual([])
  })

  it('n’envoie qu’au joueur visé, sur tous ses onglets', () => {
    const gm = fakeClient(GM)
    const p1 = fakeClient(PLAYER)
    const p2 = fakeClient(PLAYER)
    for (const c of [gm, p1, p2]) getClientsForCampaign(ID).add(c.client)
    sendToUser(ID, PLAYER, 'gm-message', { body: 'Salut' })
    expect(gm.written).toEqual([])
    expect(p1.written[0]).toBe('event: gm-message\n')
    expect(p2.written[1]).toContain('Salut')
  })
})
