import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import JSZip from 'jszip'
import { buildPluginArchive, etagOf } from './archive.js'

const PUBLIC_URL = 'https://example.test'

describe('buildPluginArchive', () => {
  let previous: string | undefined
  let zip: JSZip
  let names: string[]
  let buffer: Buffer

  beforeAll(async () => {
    previous = process.env.PUBLIC_URL
    process.env.PUBLIC_URL = PUBLIC_URL
    buffer = await buildPluginArchive()
    zip = await JSZip.loadAsync(buffer)
    names = Object.keys(zip.files).filter((name) => !zip.files[name].dir)
  })

  afterAll(() => {
    if (previous === undefined) delete process.env.PUBLIC_URL
    else process.env.PUBLIC_URL = previous
  })

  const readJson = async (name: string) => JSON.parse(await zip.file(name)!.async('string'))

  it('contient les deux marketplaces, pointant sur ./isilwen', async () => {
    const claude = await readJson('.claude-plugin/marketplace.json')
    expect(claude.name).toBe('arran-dnd')
    expect(claude.plugins[0].name).toBe('isilwen')
    expect(claude.plugins[0].source).toBe('./isilwen')

    const codex = await readJson('.agents/plugins/marketplace.json')
    expect(codex.name).toBe('arran-dnd')
    expect(codex.plugins[0].name).toBe('isilwen')
    expect(codex.plugins[0].source).toEqual({ source: 'local', path: './isilwen' })
  })

  it('contient les 5 manifestes et le seul SKILL.md', () => {
    for (const name of [
      'isilwen/plugin.json',
      'isilwen/.claude-plugin/plugin.json',
      'isilwen/.codex-plugin/plugin.json',
      'isilwen/mcp.json',
      'isilwen/.mcp.json',
      'isilwen/skills/isilwen/SKILL.md',
    ]) {
      expect(names).toContain(name)
    }
    expect(names.filter((n) => n.endsWith('/SKILL.md'))).toEqual(['isilwen/skills/isilwen/SKILL.md'])
  })

  it('contient les 12 references sous isilwen/skills/isilwen/references/', () => {
    const refs = names.filter((n) => n.startsWith('isilwen/skills/isilwen/references/'))
    expect(refs).toHaveLength(12)
    expect(refs.every((n) => n.endsWith('.md'))).toBe(true)
  })

  it("livre l'icone mais pas les .txt de assets/", () => {
    expect(names).toContain('isilwen/assets/icon.png')
    expect(names.filter((n) => n.startsWith('isilwen/assets/') && n.endsWith('.txt'))).toEqual([])
  })

  it("reecrit l'URL MCP vers PUBLIC_URL dans les deux fichiers mcp", async () => {
    const mcp = await readJson('isilwen/mcp.json')
    expect(mcp.mcpServers.isilwen.url).toBe(`${PUBLIC_URL}/mcp`)
    expect(mcp.$schema).toBeDefined()

    const dotMcp = await readJson('isilwen/.mcp.json')
    expect(dotMcp.mcpServers.isilwen.url).toBe(`${PUBLIC_URL}/mcp`)
    expect(dotMcp.$schema).toBeUndefined()
  })

  it('ne contient rien du bestiaire', () => {
    expect(names.filter((n) => n.includes('bestiaire'))).toEqual([])
  })

  it('est reproductible : deux builds donnent le meme sha256', async () => {
    const again = await buildPluginArchive()
    expect(etagOf(again)).toBe(etagOf(buffer))
  })
})
