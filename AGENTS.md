# Sindragosa — compagnon de table

## Purpose

**Sindragosa** is a web app to support **Les Terres d’Arran**, a French tabletop RPG using the **Chroniques Oubliées** engine, set in the world of the Arran comic series (*Elfes*, *Nains*, *Orcs & Gobelins*, *Mages*, etc.). The goal is to reduce bookkeeping (math, reference lookup, character tracking) so players and GMs spend more time playing. The app has no AI feature.

## Repository map

| Path | Role |
|------|------|
| `AGENTS.md` | This file — orientation for humans and agents |
| `docs/PLAN.md` | Product/technical plan (in-repo copy) |
| `knowledge/` | Curated rules reference (Markdown + optional JSON) |
| `server/` | Node API (Express + Drizzle + PostgreSQL) |
| `client/` | Vue 3 + Vite + TypeScript UI (character sheet, campaigns, combat) |

## Language

- **Player-facing UI**: French.
- **Code, comments, commit messages**: English.

## Rules integrity

- Canonical mechanics live in **`knowledge/topics/`** and **`knowledge/reference/`**. Do not invent scores, DCs, or tables: if something is missing, say so and point to the official book/PDF.
- Homebrew or house rules must be labeled explicitly.

## Copyright

The *Livre du joueur Terres d’Arran* PDF is copyrighted. Do **not** commit the PDF or large verbatim excerpts. Prefer paraphrase, mechanical summaries, and short quotes where appropriate. Treat `knowledge/` as **private reference** for your table; be careful what you publish publicly.

## Running locally

1. **Config**: Copy `server/.env.example` to `server/.env` (set `DATABASE_URL` and `JWT_SECRET`), then `docker compose up -d` for PostgreSQL.
2. **Install**: From repo root, `npm install` (workspaces install `client` and `server`).
3. **Dev**: `npm run dev` — runs the API on port 3566 and Vite on 5173 with proxy to the API.
