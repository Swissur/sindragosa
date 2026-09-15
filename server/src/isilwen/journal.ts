import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { characters, journalCompagnie, journalPages, notes } from "../db/schema.js";
import type { JournalContext } from "../chat/campaignContext.js";

export type { JournalContext } from "../chat/campaignContext.js";

// Journal de bord entier, titres des pages partagees et notes texte du joueur.
// Le journal et les pages ne sont pas scopes par campagne en base (voir plan 26, § 6).
export async function fetchJournalContext(userId: number): Promise<JournalContext> {
  const [row] = await db.select().from(journalCompagnie).where(eq(journalCompagnie.id, 1));
  const editedBy = await charNameByUserId(row?.updatedByUserId ?? null);
  const pages = await db
    .select({ id: journalPages.id, title: journalPages.title })
    .from(journalPages)
    .orderBy(journalPages.updatedAt);
  const userNotes = await db
    .select({ title: notes.title, content: notes.content })
    .from(notes)
    .where(and(eq(notes.ownerUserId, userId), eq(notes.type, "text")))
    .orderBy(notes.updatedAt);

  return { content: row?.content ?? "", editedBy, pages, notes: userNotes };
}

export async function charNameByUserId(userId: number | null): Promise<string | null> {
  if (userId == null) return null;
  const [char] = await db
    .select({ name: characters.name })
    .from(characters)
    .where(and(eq(characters.userId, userId), eq(characters.isActive, true)))
    .limit(1);
  return char?.name ?? null;
}

export type PageRead = { title: string; text: string };

/**
 * Le contenu d'une page partagée, tronqué à 8 000 caractères, précédé de son
 * titre et de son dernier éditeur. `null` si la page n'existe pas.
 * Rend du texte, jamais de SSE.
 */
export async function readPage(pageId: number): Promise<PageRead | null> {
  const [page] = await db.select().from(journalPages).where(eq(journalPages.id, pageId));
  if (!page) return null;
  const editedBy = await charNameByUserId(page.updatedByUserId);
  const content = page.content ?? "";
  const truncated = content.length > 8000 ? content.slice(0, 8000) + "\n\n[…contenu tronqué]" : content;
  const byLine = editedBy ? `\nDernière modification par : ${editedBy}\n` : "";
  console.log(`[journal] Loaded page ${pageId}`);
  return { title: page.title, text: `# ${page.title}${byLine}\n${truncated}` };
}
