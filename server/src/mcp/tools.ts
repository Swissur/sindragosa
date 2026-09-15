import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";
import {
  buildCharacterSection,
  loadActiveCharacter,
  loadCompanion,
} from "../isilwen/character.js";
import { fetchCombatContext } from "../isilwen/combat.js";
import { fetchJournalContext, readPage } from "../isilwen/journal.js";
import type { PartyContext } from "../isilwen/party.js";
import { renderCodex, renderNote } from "../chat/campaignContext.js";
import {
  listRulesIndex,
  loadBestiaire,
  loadMonster,
  readRulesTopic,
  TOPIC_NAMES,
} from "../isilwen/rules.js";

/** Ce que sait le serveur MCP du joueur qui parle, pour la durée d'une requête. */
export type IsilwenContext = {
  userId: number;
  isGm: boolean;
  /** Campagne active, déjà chargée par `createIsilwenServer`. */
  party: PartyContext | null;
};

/** Lecture seule, sans effet de bord, sans accès au monde extérieur. */
const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  openWorldHint: false,
} as const;

/** Les sujets de règles proposés à l'outil : tout sauf le bestiaire. */
const RULES_TOPICS = TOPIC_NAMES.filter((n) => n !== "bestiaire") as unknown as [string, ...string[]];

const NO_CAMPAIGN = "Aucune campagne active : choisis-en une dans l'app.";

function text(body: string) {
  return { content: [{ type: "text" as const, text: body }] };
}

// ── Rendu local ──────────────────────────────────────────────────────────────
// Fiche, combat, page, codex et notes viennent d'`isilwen/*` et de
// `chat/campaignContext.ts`. Seuls les compagnons ont leur rendu ici : le chat
// exclut le personnage actif et renvoie vers un autre nom d'outil.

function renderCompanions(party: PartyContext): string {
  if (party.members.length === 0) return "Aucun compagnon.";
  return party.members
    .map((m) => {
      const parts = [m.name];
      if (m.people) parts.push(m.people);
      if (m.profile) parts.push(`profil ${m.profile}`);
      if (m.culturalPath) parts.push(`voie culturelle : ${m.culturalPath}`);
      return `- ${parts.join(", ")}`;
    })
    .join("\n");
}

// ── Enregistrement ───────────────────────────────────────────────────────────

/**
 * Les 12 outils de lecture d'Isilwen. `get_monster` n'est enregistré que pour
 * le meneur de jeu ; son handler revérifie quand même le rôle (double verrou,
 * comme `get_monstre` dans le chat de l'app).
 */
export function registerIsilwenTools(server: McpServer, ctx: IsilwenContext): void {
  const { userId, isGm, party } = ctx;

  server.registerTool(
    "get_me",
    {
      description:
        "Qui te parle : nom du personnage actif, peuple, profil, niveau, campagne active, et si c'est un joueur ou le meneur de jeu. " +
        "Appelle cet outil en premier, avant ta toute première réponse, pour savoir à qui tu t'adresses.",
      annotations: READ_ONLY,
    },
    async () => {
      const character = await loadActiveCharacter(userId);
      const role = isGm ? "meneur de jeu" : "joueur";
      const lines: string[] = [];
      if (character) {
        const name = String(character.name ?? "Inconnu");
        const people = String(character.people ?? "");
        const profile = String(character.profile ?? "");
        const level = character.level ?? 1;
        lines.push(
          `Tu parles à **${name}**${people ? `, ${people}` : ""}${profile ? `, profil ${profile}` : ""}, niveau ${level}.`
        );
      } else {
        lines.push("Aucun personnage actif : le joueur doit en choisir un dans l'app.");
      }
      lines.push(party ? `Campagne active : ${party.campaignName}.` : NO_CAMPAIGN);
      lines.push(`Rôle : ${role}.`);
      lines.push("Pour sa fiche complète : get_my_character. Pour une question de règles : list_rules puis get_rules.");
      return text(lines.join("\n"));
    }
  );

  server.registerTool(
    "get_my_character",
    {
      description:
        "La fiche complète du personnage actif : caractéristiques, PV/PM, défense, voies, compétences, armes, inventaire, argent et histoire. " +
        "Appelle cet outil dès qu'un calcul, une règle ou un conseil dépend des chiffres du personnage.",
      annotations: READ_ONLY,
    },
    async () => {
      const character = await loadActiveCharacter(userId);
      if (!character) return text("Aucun personnage actif : le joueur doit en choisir un dans l'app.");
      return text(buildCharacterSection(character, true));
    }
  );

  server.registerTool(
    "get_companion",
    {
      description:
        "La fiche d'un compagnon de la campagne (sans son inventaire ni son argent), cherchée par son prénom. " +
        "Appelle cet outil quand la question porte sur un autre personnage du groupe.",
      inputSchema: z.object({
        name: z.string().describe("Prénom du compagnon, tel qu'il apparaît dans la campagne."),
      }),
      annotations: READ_ONLY,
    },
    async ({ name }) => {
      const result = await loadCompanion(party, name);
      return text(result.text);
    }
  );

  server.registerTool(
    "get_campaign",
    {
      description:
        "La campagne active : son nom, la liste des compagnons du groupe, et le codex complet (PNJ, lieux, objets, événements connus). " +
        "Appelle cet outil dès qu'une question touche au groupe, à un PNJ ou à un lieu de la campagne.",
      annotations: READ_ONLY,
    },
    async () => {
      if (!party) return text(NO_CAMPAIGN);
      return text(
        `## Campagne : ${party.campaignName}\n\n### Compagnons\n\n${renderCompanions(party)}\n\n### Codex\n\n${renderCodex(party.codex)}`
      );
    }
  );

  server.registerTool(
    "get_journal",
    {
      description:
        "Le journal de bord de la compagnie en entier, avec son dernier éditeur. " +
        "Appelle cet outil dès qu'une question touche aux aventures passées ou aux événements vécus. Ne demande pas la permission.",
      annotations: READ_ONLY,
    },
    async () => {
      const journal = await fetchJournalContext(userId);
      const by = journal.editedBy ? `Dernière modification par : ${journal.editedBy}\n\n` : "";
      const body = journal.content.trim() === "" ? "Le journal de bord est vide." : journal.content;
      return text(`## Journal de bord\n\n${by}${body}`);
    }
  );

  server.registerTool(
    "list_pages",
    {
      description:
        "Les titres et les identifiants des pages partagées (notes de session, dossiers, aide-mémoire du groupe). " +
        "Appelle cet outil avant get_page pour trouver l'id de la page qui t'intéresse.",
      annotations: READ_ONLY,
    },
    async () => {
      const journal = await fetchJournalContext(userId);
      if (journal.pages.length === 0) return text("Aucune page partagée.");
      return text(
        `## Pages partagées\n\n${journal.pages.map((p) => `- (${p.id}) ${p.title}`).join("\n")}\n\nPour lire une page : get_page avec son id.`
      );
    }
  );

  server.registerTool(
    "get_page",
    {
      description:
        "Le contenu d'une page partagée, par son identifiant (tronqué à 8 000 caractères). " +
        "Appelle cet outil après list_pages, quand le titre d'une page répond à la question.",
      inputSchema: z.object({
        id: z.int().describe("Identifiant de la page, donné par list_pages."),
      }),
      annotations: READ_ONLY,
    },
    async ({ id }) => {
      const page = await readPage(id);
      if (!page) return text(`Aucune page nommée sous l'identifiant ${id}. Vérifie la liste avec list_pages.`);
      return text(page.text);
    }
  );

  server.registerTool(
    "get_my_notes",
    {
      description:
        "Les notes texte privées du joueur, de la plus ancienne à la plus récente. " +
        "Appelle cet outil quand la question renvoie à ce que le joueur a noté pour lui-même.",
      annotations: READ_ONLY,
    },
    async () => {
      const journal = await fetchJournalContext(userId);
      if (journal.notes.length === 0) return text("Aucune note.");
      return text(
        `## Notes privées\n\n${journal.notes.map(renderNote).join("\n\n")}`
      );
    }
  );

  server.registerTool(
    "get_combat",
    {
      description:
        "Le combat en cours dans la campagne : ordre d'initiative, tour actuel, participants, états, et les 20 derniers jets de dés. " +
        "Les monstres restent masqués pour un joueur. Appelle cet outil dès qu'une question porte sur la situation tactique du moment.",
      annotations: READ_ONLY,
    },
    async () => {
      if (!party) return text(NO_CAMPAIGN);
      const section = await fetchCombatContext(party.campaignId, userId, isGm);
      if (!section) return text("Pas de combat en cours.");
      return text(section);
    }
  );

  server.registerTool(
    "list_rules",
    {
      description:
        "L'index des sujets de règles et de lore des Terres d'Arran : quel sujet contient quoi. " +
        "Appelle cet outil avant get_rules pour choisir le bon sujet.",
      annotations: READ_ONLY,
    },
    async () => text(listRulesIndex())
  );

  server.registerTool(
    "get_rules",
    {
      description:
        "Un sujet de règles ou de lore en entier (création de personnage, combat, magie, équipement, races, voies, monde). " +
        "Appelle cet outil pour toute question de règles : ne donne jamais un chiffre qui n'en vient pas.",
      inputSchema: z.object({
        topic: z.enum(RULES_TOPICS).describe("Nom du sujet, tel qu'il apparaît dans list_rules."),
      }),
      annotations: READ_ONLY,
    },
    async ({ topic }) => {
      const body = readRulesTopic(topic);
      if (!body) return text(`Sujet de règles inconnu : "${topic}". Consulte list_rules pour la liste exacte.`);
      return text(body);
    }
  );

  if (isGm) {
    server.registerTool(
      "get_monster",
      {
        description:
          "RÉSERVÉ AU MENEUR DE JEU : la fiche complète d'une créature du bestiaire (PV, DEF, NC, attaques, capacités). " +
          "Ne partage jamais ces chiffres avec un joueur.",
        inputSchema: z.object({
          name: z.string().describe("Nom de la créature, insensible à la casse et aux accents."),
        }),
        annotations: READ_ONLY,
      },
      async ({ name }) => handleGetMonster(ctx, name)
    );
  }
}

/**
 * Le second verrou de `get_monster` : même appelé, il refuse si celui qui parle
 * n'est pas le meneur de jeu. Le premier verrou est l'absence d'enregistrement.
 */
export function handleGetMonster(ctx: IsilwenContext, name: string) {
  if (!ctx.isGm) {
    return text("Outil réservé au meneur de jeu. Les mystères de cette créature ne se révèlent qu'au combat…");
  }
  const sheet = loadMonster(loadBestiaire(), name);
  if (!sheet) return text(`Aucune créature nommée "${name}" dans le bestiaire. Vérifie l'orthographe.`);
  return text(sheet);
}
