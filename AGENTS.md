# Sindragosa — compagnon de table

## Purpose

**Sindragosa** is a web app for **Sindragosa**, a French homebrew tabletop RPG set in World of Warcraft's Azeroth. It uses a d6 dice pool (stat + domain rank) and progression by ticks. The goal is to reduce bookkeeping (math, reference lookup, character tracking) so players and GMs spend more time playing. The app has no AI feature.

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

- The rules are the PDFs in **`docs/regles/`**, summarised in **`knowledge/topics/`**; decisions are in `plans/31-refonte-regles-sindragosa.md`. Do not invent scores or tables: if something is missing, say so and add it to the TODO in `ROADMAP.md`.
- Homebrew or house rules must be labeled explicitly.

## Copyright

The rules PDFs are the table's own work. World of Warcraft and its lore belong to Blizzard: keep lore to paraphrased summaries and treat `knowledge/` as a **private reference** for the table. The bestiary was converted from Chroniques Oubliées; its sources (`scripts/sources/`) stay private too.

## Running locally

1. **Config**: Copy `server/.env.example` to `server/.env` (set `DATABASE_URL` and `JWT_SECRET`), then `docker compose up -d` for PostgreSQL.
2. **Install**: From repo root, `npm install` (workspaces install `client` and `server`).
3. **Dev**: `npm run dev` — runs the API on port 3566 and Vite on 5173 with proxy to the API.
