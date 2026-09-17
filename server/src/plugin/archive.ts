import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, posix } from 'node:path'
import JSZip from 'jszip'
import { publicUrl } from '../oauth/config.js'
import { PLUGIN_DIR, REPO_ROOT } from '../paths.js'

/** Nom du dossier du plugin dans le zip, et du plugin lui-meme (`isilwen@arran-dnd`). */
const PLUGIN_NAME = 'isilwen'

/**
 * Date figee pour toutes les entrees : les memes fichiers donnent les memes
 * octets, donc l'ETag ne bouge que quand le contenu change.
 */
const EPOCH = new Date('2026-01-01T00:00:00Z')

/** Pas d'entrees de dossier : jszip les daterait d'aujourd'hui, ce qui casserait l'ETag. */
const ENTRY = { date: EPOCH, createFolders: false }

/** Les deux fichiers qui portent l'URL du serveur MCP (Agent Plugins 1.0 et Claude). */
const MCP_FILES = ['mcp.json', '.mcp.json']

/** Ce qu'on ne livre pas : bruit macOS, et les prompts/logs de generation dans assets/. */
function excluded(relative: string): boolean {
  const base = posix.basename(relative)
  if (base === '.DS_Store') return true
  return relative.startsWith('assets/') && /\.(txt|log)$/.test(base)
}

/** Tous les fichiers sous `relative` (chemin posix depuis PLUGIN_DIR), tries pour un ordre stable. */
function collect(relative = ''): string[] {
  const absolute = join(PLUGIN_DIR, relative)
  if (!statSync(absolute).isDirectory()) return excluded(relative) ? [] : [relative]
  return readdirSync(absolute)
    .sort()
    .flatMap((child) => collect(relative ? posix.join(relative, child) : child))
}

/** Le contenu d'un fichier du plugin, avec l'URL MCP reecrite vers ce serveur. */
function fileContent(relative: string): Buffer {
  const raw = readFileSync(join(PLUGIN_DIR, relative))
  if (!MCP_FILES.includes(relative)) return raw
  const json = JSON.parse(raw.toString('utf8'))
  json.mcpServers[PLUGIN_NAME].url = `${publicUrl()}/mcp`
  return Buffer.from(`${JSON.stringify(json, null, 2)}\n`)
}

/**
 * Les deux marketplaces, copies de ceux committes a la racine du depot, sauf
 * le chemin du plugin : dans le zip il est dans `isilwen/`, pas dans `plugin/`.
 */
function marketplaces(): Record<string, string> {
  const read = (relative: string) => JSON.parse(readFileSync(join(REPO_ROOT, relative), 'utf8'))
  const claude = read('.claude-plugin/marketplace.json')
  claude.plugins[0].source = `./${PLUGIN_NAME}`
  const codex = read('.agents/plugins/marketplace.json')
  codex.plugins[0].source.path = `./${PLUGIN_NAME}`
  return {
    '.claude-plugin/marketplace.json': `${JSON.stringify(claude, null, 2)}\n`,
    '.agents/plugins/marketplace.json': `${JSON.stringify(codex, null, 2)}\n`,
  }
}

/**
 * Le zip = un marketplace qui contient le plugin. Dezippe, il s'installe tel
 * quel avec `claude plugin marketplace add <dossier>` ou l'equivalent Codex.
 */
export async function buildPluginArchive(): Promise<Buffer> {
  const zip = new JSZip()
  for (const [path, content] of Object.entries(marketplaces())) {
    zip.file(path, content, ENTRY)
  }
  for (const relative of collect()) {
    zip.file(posix.join(PLUGIN_NAME, relative), fileContent(relative), ENTRY)
  }
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
}

export function etagOf(buffer: Buffer): string {
  return `"${createHash('sha256').update(buffer).digest('hex')}"`
}
