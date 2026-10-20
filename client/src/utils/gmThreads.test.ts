import { describe, it, expect } from 'vitest'
import type { GmMessage } from '../api/campaigns'
import { hasUnreadFrom, lastMessageWith, threadWith } from './gmThreads'

const GM = 1
const ORLANE = 2
const NYM = 3

function msg(id: number, fromUserId: number, toUserId: number, readAt: string | null = 'lu'): GmMessage {
  return { id, fromUserId, fromUsername: '', toUserId, toUsername: '', body: `m${id}`, readAt, createdAt: '' }
}

const messages = [msg(1, GM, ORLANE), msg(2, NYM, GM), msg(3, ORLANE, GM), msg(4, GM, NYM)]

describe('threadWith', () => {
  it('garde les messages dans les deux sens avec ce joueur, dans l’ordre', () => {
    expect(threadWith(messages, ORLANE).map((m) => m.id)).toEqual([1, 3])
    expect(threadWith(messages, NYM).map((m) => m.id)).toEqual([2, 4])
  })
})

describe('lastMessageWith', () => {
  it('rend le plus récent, ou null sans échange', () => {
    expect(lastMessageWith(messages, ORLANE)?.id).toBe(3)
    expect(lastMessageWith(messages, 99)).toBeNull()
  })
})

describe('hasUnreadFrom', () => {
  it('ne compte que les messages du joueur au MJ pas encore lus', () => {
    const list = [msg(1, ORLANE, GM), msg(2, GM, NYM, null), msg(3, NYM, GM, null)]
    expect(hasUnreadFrom(list, NYM, GM)).toBe(true)
    // Le message du MJ non lu par Nym ne compte pas pour Orlane ni pour le MJ.
    expect(hasUnreadFrom(list, ORLANE, GM)).toBe(false)
  })
})
