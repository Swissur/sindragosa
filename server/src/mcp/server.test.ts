import { beforeEach, describe, expect, it, vi } from "vitest";
import { Client } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import type { CallToolResult } from "@modelcontextprotocol/server";

// Les handlers lisent la base : on remplace les briques `isilwen/*` qui la
// touchent. `rules.ts` reste réel (il ne lit que des fichiers Markdown), ce qui
// fait tester le vrai refus du bestiaire.
const state = {
  party: null as unknown,
  character: null as unknown,
  combat: null as string | null,
};

vi.mock("../isilwen/party.js", () => ({
  fetchPartyContext: vi.fn(async () => state.party),
}));

vi.mock("../isilwen/character.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../isilwen/character.js")>()),
  loadActiveCharacter: vi.fn(async () => state.character),
  loadCompanion: vi.fn(async () => ({ text: "Fiche du compagnon", name: "Nym", portraitImageId: null })),
}));

vi.mock("../isilwen/journal.js", () => ({
  fetchJournalContext: vi.fn(async () => ({ content: "", editedBy: null, pages: [], notes: [] })),
  readPage: vi.fn(async () => null),
}));

vi.mock("../isilwen/combat.js", () => ({
  fetchCombatContext: vi.fn(async () => state.combat),
}));

const { createIsilwenServer } = await import("./server.js");
const { handleGetMonster } = await import("./tools.js");

const GM_USER = 1;
const PLAYER_USER = 2;

const PARTY = {
  campaignId: 7,
  campaignName: "Bac à sable",
  gmUserId: GM_USER,
  members: [],
  codex: [],
};

/** Un client MCP branché en mémoire sur le serveur d'un utilisateur. */
async function connect(userId: number): Promise<Client> {
  const server = await createIsilwenServer(userId);
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test", version: "1.0.0" });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

function firstText(result: CallToolResult): string {
  const block = result.content?.[0];
  return block && block.type === "text" ? block.text : "";
}

beforeEach(() => {
  state.party = PARTY;
  state.character = { name: "Nym", people: "Elfe", profile: "Mage", level: 3 };
  state.combat = null;
});

describe("createIsilwenServer", () => {
  it("ne liste pas get_monster pour un joueur", async () => {
    const { tools } = await (await connect(PLAYER_USER)).listTools();
    expect(tools.map((t) => t.name)).not.toContain("get_monster");
    expect(tools).toHaveLength(11);
  });

  it("liste get_monster pour le meneur de jeu", async () => {
    const { tools } = await (await connect(GM_USER)).listTools();
    expect(tools.map((t) => t.name)).toContain("get_monster");
    expect(tools).toHaveLength(12);
  });

  it("refuse get_monster à un joueur qui l'appelle quand même", () => {
    const refusal = firstText(
      handleGetMonster({ userId: PLAYER_USER, isGm: false, party: null }, "Gobelin") as CallToolResult
    );
    expect(refusal).toContain("réservé au meneur de jeu");
    expect(refusal).not.toMatch(/PV|DEF|NC/);
  });

  it("annonce tous ses outils en lecture seule", async () => {
    const { tools } = await (await connect(GM_USER)).listTools();
    for (const tool of tools) {
      expect(tool.annotations?.readOnlyHint, tool.name).toBe(true);
      expect(tool.annotations?.destructiveHint, tool.name).toBe(false);
    }
  });

  it("expose la persona d'Isilwen dans les instructions", async () => {
    const client = await connect(PLAYER_USER);
    expect(client.getInstructions()).toContain("Isilwen");
  });
});

describe("get_me", () => {
  it("dit clairement qu'aucune campagne n'est active", async () => {
    state.party = null;
    const client = await connect(PLAYER_USER);
    const out = firstText(await client.callTool({ name: "get_me" }));
    expect(out).toContain("Aucune campagne active");
    expect(out).toContain("joueur");
  });

  it("nomme la campagne et le rôle de meneur", async () => {
    const client = await connect(GM_USER);
    const out = firstText(await client.callTool({ name: "get_me" }));
    expect(out).toContain("Bac à sable");
    expect(out).toContain("meneur de jeu");
  });
});

describe("get_combat", () => {
  it("dit qu'il n'y a pas de combat en cours", async () => {
    const client = await connect(PLAYER_USER);
    const out = firstText(await client.callTool({ name: "get_combat" }));
    expect(out).toBe("Pas de combat en cours.");
  });

  it("rend la section de combat quand il y en a un", async () => {
    state.combat = "## Combat en cours\nround 3";
    const client = await connect(PLAYER_USER);
    const out = firstText(await client.callTool({ name: "get_combat" }));
    expect(out).toContain("round 3");
  });
});

describe("get_rules", () => {
  it("ne propose pas le bestiaire dans son enum", async () => {
    const { tools } = await (await connect(GM_USER)).listTools();
    const schema = JSON.stringify(tools.find((t) => t.name === "get_rules")?.inputSchema);
    expect(schema).toContain("combat");
    expect(schema).not.toContain("bestiaire");
  });

  it("refuse le bestiaire", async () => {
    const client = await connect(PLAYER_USER);
    const result = await client.callTool({ name: "get_rules", arguments: { topic: "bestiaire" } });
    expect(result.isError).toBe(true);
    expect(firstText(result)).toContain("Invalid option");
  });
});
