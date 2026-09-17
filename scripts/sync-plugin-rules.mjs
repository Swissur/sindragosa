// Copie les topics de knowledge/ dans references/ du skill isilwen du plugin.
// Le mapping (scripts/plugin-rules-map.json) est partage avec le test
// server/src/knowledge/pluginSync.test.ts, qui casse si une copie derive.
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOPICS_DIR = join(ROOT, "knowledge", "topics");
const SKILLS_DIR = join(ROOT, "plugin", "skills");
const MAP = JSON.parse(readFileSync(join(ROOT, "scripts", "plugin-rules-map.json"), "utf8"));

const topics = readdirSync(TOPICS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.slice(0, -3));

/** "monde-lore-*" -> tous les topics qui commencent par "monde-lore-". */
const expand = (pattern) =>
  pattern.endsWith("*") ? topics.filter((t) => t.startsWith(pattern.slice(0, -1))) : [pattern];

for (const [skill, patterns] of Object.entries(MAP)) {
  const wanted = patterns.flatMap(expand);
  const refs = join(SKILLS_DIR, skill, "references");
  mkdirSync(refs, { recursive: true });

  for (const existing of readdirSync(refs)) {
    if (existing.endsWith(".md") && !wanted.includes(existing.slice(0, -3))) {
      rmSync(join(refs, existing));
      console.log(`- ${skill}/references/${existing}`);
    }
  }
  for (const topic of wanted) {
    copyFileSync(join(TOPICS_DIR, `${topic}.md`), join(refs, `${topic}.md`));
    console.log(`= ${skill}/references/${topic}.md`);
  }
}
