import "./loadEnv.js";
import { getDatabaseUrl } from "./db/databaseUrl.js";
import { runMigrations } from "./db/runMigrations.js";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { existsSync } from "node:fs";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
// Express 4 ne rattrape pas les rejets des handlers async : sans ça, une erreur
// DB devient une unhandledRejection et tue le process. Doit être importé avant les routes.
import "express-async-errors";
import authRouter from "./routes/auth.js";
import charactersRouter from "./routes/characters.js";
import journalRouter from "./routes/journal.js";
import campaignsRouter from "./routes/campaigns.js";
import combatsRouter, { activeCombatRouter } from "./routes/combats.js";
import codexRouter from "./routes/codex.js";
import notesRouter from "./routes/notes.js";
import revisionsRouter from "./routes/revisions.js";
import devRouter from "./dev/routes.js";
import { devToolsEnabled } from "./dev/enabled.js";
import { requireAuth, type AuthRequest } from "./auth/middleware.js";
import { CLIENT_DIST } from "./paths.js";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "./db/index.js";
import { campaignMembers, characters, generatedImages, users } from "./db/schema.js";

const app = express();
// En prod le client est servi par ce même serveur (same-origin) ; en dev le proxy
// Vite rend aussi les requêtes same-origin. On ne whiteliste que CLIENT_URL + dev.
const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL ?? "http://localhost:5173",
  "http://localhost:5173",
];
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`[http] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/characters", charactersRouter);
app.use("/api/journal", journalRouter);
app.use("/api/campaigns", campaignsRouter);
app.use("/api/campaigns", combatsRouter);
app.use("/api/combats", activeCombatRouter);
app.use("/api/campaigns", codexRouter);
app.use("/api/notes", notesRouter);

// Outils de dev : seed, changement d'identité, combats bidon. Contournent
// l'authentification, donc jamais montés en prod (voir dev/enabled.ts).
if (devToolsEnabled()) {
  app.use("/api/dev", devRouter);
  console.log("[dev] outils de dev actifs sur /api/dev");
}
app.use("/api/revisions", revisionsRouter);

/**
 * Une image est visible par son propriétaire, ou si elle sert de portrait au
 * personnage d'un membre d'une campagne que le demandeur partage avec lui.
 */
async function canSeeImage(imageId: number, ownerId: number, userId: number) {
  if (ownerId === userId) return true;
  const mine = db
    .select({ campaignId: campaignMembers.campaignId })
    .from(campaignMembers)
    .where(eq(campaignMembers.userId, userId));
  const [shared] = await db
    .select({ id: campaignMembers.id })
    .from(campaignMembers)
    .innerJoin(characters, eq(characters.id, campaignMembers.characterId))
    .where(and(eq(characters.portraitImageId, imageId), inArray(campaignMembers.campaignId, mine)))
    .limit(1);
  return Boolean(shared);
}

// Serve generated images from database (owner, or campaign mate's portrait)
app.get("/api/images/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const userId = (req as AuthRequest).userId;
  if (!Number.isFinite(id) || id <= 0) {
    res.status(400).json({ error: "Invalid image ID" });
    return;
  }
  const [row] = await db
    .select({ data: generatedImages.data, mimeType: generatedImages.mimeType, userId: generatedImages.userId })
    .from(generatedImages)
    .where(eq(generatedImages.id, id));
  if (!row || !(await canSeeImage(id, row.userId, userId))) {
    res.status(404).json({ error: "Image not found" });
    return;
  }
  const buffer = Buffer.from(row.data, "base64");
  res.setHeader("Content-Type", row.mimeType);
  res.setHeader("Cache-Control", "private, max-age=604800, immutable");
  res.setHeader("Content-Length", buffer.length);
  res.end(buffer);
});

/**
 * Avatar d'un utilisateur, servi en binaire.
 * L'avatar peut changer sous la même URL : pas de cache "immutable", mais un
 * ETag revalidé à chaque fois (304 vide si inchangé, jamais de version périmée).
 */
app.get("/api/users/:id/avatar", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id) || id <= 0) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }
  const [row] = await db.select({ avatarUrl: users.avatarUrl }).from(users).where(eq(users.id, id));
  const parsed = row?.avatarUrl?.match(/^data:([^;]+);base64,(.+)$/s);
  if (!parsed) {
    res.status(404).json({ error: "Avatar not found" });
    return;
  }
  const [, mimeType, data] = parsed;
  const etag = `"${createHash("sha1").update(data).digest("base64url")}"`;
  res.setHeader("Cache-Control", "private, max-age=0, must-revalidate");
  res.setHeader("ETag", etag);
  if (req.headers["if-none-match"] === etag) {
    res.status(304).end();
    return;
  }
  const buffer = Buffer.from(data, "base64");
  res.setHeader("Content-Type", mimeType);
  res.setHeader("Content-Length", buffer.length);
  res.end(buffer);
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Production: Vite build + Vue Router (history) fallback — register after /api routes
if (existsSync(CLIENT_DIST)) {
  // Hashed assets (JS/CSS) — immutable, long cache
  app.use(
    "/assets",
    express.static(join(CLIENT_DIST, "assets"), {
      maxAge: "1y",
      immutable: true,
    })
  );
  // Everything else (index.html, sw.js, manifest) — always revalidate
  app.use(
    express.static(CLIENT_DIST, {
      maxAge: 0,
      setHeaders(res, filePath) {
        if (filePath.endsWith(".html") || filePath.endsWith("sw.js")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        }
      },
    })
  );
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) {
      next();
      return;
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(join(CLIENT_DIST, "index.html"), (err) => {
      if (err) next(err);
    });
  });
}

// Filet de sécurité : toute erreur non gérée d'un handler finit ici en 500 propre
// plutôt qu'en crash du process. Doit rester le dernier `app.use`.
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[error]", err);
  if (res.headersSent) return;
  res.status(500).json({ error: "Erreur serveur" });
});

const PORT = Number(process.env.PORT) || 3566;

async function main(): Promise<void> {
  const databaseUrl = getDatabaseUrl();
  if (process.env.FLY_APP_NAME) {
    // Sur Fly, les migrations tournent une seule fois via le release_command (fly.toml),
    // pas à chaque réveil de machine.
  } else if (databaseUrl) {
    await runMigrations(databaseUrl);
  } else {
    console.warn(
      "[migrate] No DATABASE_URL / POSTGRES_URL — skipping migrations (misconfiguration).",
    );
  }
  app.listen(PORT, () => {
    console.log("🌍✨ Hello World ! 🐉🎲");
    console.log(`Sindragosa API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
