import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { KNOWLEDGE_DIR, PLUGIN_DIR, REPO_ROOT } from "../paths.js";
import { MCP_INSTRUCTIONS } from "../isilwen/persona.js";

/** Meme fichier que scripts/sync-plugin-rules.mjs : { isilwen: topics } (un "*" final = prefixe). */
const MAP: Record<string, string[]> = JSON.parse(
  readFileSync(join(REPO_ROOT, "scripts", "plugin-rules-map.json"), "utf8")
);
const SKILL = "isilwen";

const TOPICS_DIR = join(KNOWLEDGE_DIR, "topics");
const SKILLS_DIR = join(PLUGIN_DIR, "skills");
const MCP_URL = "https://arran-dnd.fly.dev/mcp";

/** Ce qui ne doit jamais partir dans le plugin. */
const EXCLUDED = ["bestiaire", "00-index"];

const topics = readdirSync(TOPICS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.slice(0, -3))
  .filter((t) => !EXCLUDED.includes(t));

const expand = (pattern: string) =>
  pattern.endsWith("*") ? topics.filter((t) => t.startsWith(pattern.slice(0, -1))) : [pattern];

/** Les topics que le mapping envoie dans le skill. */
const mapped = MAP[SKILL].flatMap(expand);
const REFS_DIR = join(SKILLS_DIR, SKILL, "references");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

describe("plugin/ : references/ synchronisees avec knowledge/topics", () => {
  it("le mapping n'a que le skill isilwen", () => {
    expect(Object.keys(MAP)).toEqual([SKILL]);
  });

  it("chaque topic (hors exclus) est dans le mapping", () => {
    expect(topics.filter((t) => !mapped.includes(t))).toEqual([]);
  });

  it.each(topics)("%s a une copie identique dans references/", (topic) => {
    const copy = join(REFS_DIR, `${topic}.md`);
    expect(readFileSync(copy)).toEqual(readFileSync(join(TOPICS_DIR, `${topic}.md`)));
  });

  it("references/ ne contient rien en trop", () => {
    const wanted = mapped.map((t) => `${t}.md`).sort();
    expect(readdirSync(REFS_DIR).sort()).toEqual(wanted);
  });

  it("isilwen est le seul skill", () => {
    expect(readdirSync(SKILLS_DIR)).toEqual([SKILL]);
  });

  it("aucun chemin ni contenu sous plugin/ ne mentionne bestiaire", () => {
    const files = walk(PLUGIN_DIR).filter((f) => !relative(PLUGIN_DIR, f).startsWith("assets"));
    const leaks = files.filter(
      (f) => relative(PLUGIN_DIR, f).includes("bestiaire") || readFileSync(f, "utf8").includes("bestiaire")
    );
    expect(leaks.map((f) => relative(PLUGIN_DIR, f))).toEqual([]);
  });
});

describe("plugin/skills/isilwen/SKILL.md", () => {
  it("contient MCP_INSTRUCTIONS tel quel", () => {
    const skill = readFileSync(join(SKILLS_DIR, "isilwen", "SKILL.md"), "utf8");
    expect(skill).toContain(MCP_INSTRUCTIONS);
  });
});

describe("plugin/ : manifestes", () => {
  const manifest = (name: string) => JSON.parse(readFileSync(join(PLUGIN_DIR, name), "utf8"));

  it.each(["plugin.json", ".claude-plugin/plugin.json", ".codex-plugin/plugin.json"])(
    "%s s'appelle isilwen",
    (name) => {
      expect(manifest(name).name).toBe("isilwen");
    }
  );

  it.each(["mcp.json", ".mcp.json"])("%s pointe sur le MCP de prod", (name) => {
    expect(manifest(name).mcpServers.isilwen.url).toBe(MCP_URL);
  });

  it(".mcp.json n'a pas de $schema (Codex le refuse)", () => {
    expect(manifest(".mcp.json")).not.toHaveProperty("$schema");
    expect(manifest("mcp.json")).toHaveProperty("$schema");
  });
});
