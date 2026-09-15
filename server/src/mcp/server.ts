import { McpServer } from "@modelcontextprotocol/server";
import { MCP_INSTRUCTIONS } from "../isilwen/persona.js";
import { fetchPartyContext } from "../isilwen/party.js";
import { registerIsilwenTools } from "./tools.js";

const SERVER_NAME = "isilwen";
// `server/package.json` n'a pas de champ `version` : la version du serveur MCP
// est tenue ici, à la main.
const SERVER_VERSION = "1.0.0";

/**
 * Le serveur MCP d'Isilwen pour un joueur donné. Stateless : une instance par
 * requête HTTP, ce qui rend la liste d'outils dépendante du rôle sans effort —
 * `get_monster` n'existe tout simplement pas pour un joueur.
 *
 * La campagne active est chargée ici, une fois : elle donne le rôle (meneur ou
 * joueur) et sert ensuite aux outils.
 */
export async function createIsilwenServer(userId: number): Promise<McpServer> {
  const party = await fetchPartyContext(userId);
  const isGm = party?.gmUserId === userId;

  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    { instructions: MCP_INSTRUCTIONS }
  );
  registerIsilwenTools(server, { userId, isGm, party });
  return server;
}
