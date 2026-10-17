import { test as base, expect } from '@playwright/test'

/** Point d'entrée unique des specs : on étend `test` ici quand un réglage commun est nécessaire. */
export const test = base

export { expect }
