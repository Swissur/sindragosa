import type express from "express";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { requireMcpAuth } from "../oauth/bearer.js";
import { createIsilwenServer } from "./server.js";

/**
 * Monte `/mcp` en Streamable HTTP stateless, derrière le jeton Bearer OAuth.
 *
 * `requireMcpAuth` pose `req.auth` (dont `extra.userId`) ou répond 401 avec le
 * `WWW-Authenticate` qui déclenche le flow côté connecteur. `toNodeHandler`
 * transmet `req.auth` au handler, qui le repasse à la fabrique : une instance
 * de serveur par requête, construite pour ce joueur-là.
 *
 * À monter après `cookieParser()` et avant le catch-all SPA.
 */
export function mountMcp(app: express.Express): void {
  const handler = createMcpHandler(
    (ctx) => {
      const userId = ctx.authInfo?.extra?.userId;
      if (typeof userId !== "number") {
        // `requireMcpAuth` garantit un jeton valide : on n'arrive ici qu'en cas de bug.
        throw new Error("Jeton MCP sans utilisateur");
      }
      return createIsilwenServer(userId);
    },
    { onerror: (err) => console.error("[mcp]", err) }
  );

  const node = toNodeHandler(handler);
  // `/mcp.` : l'URL collée depuis une phrase qui finit par un point. Vu en vrai
  // le jour du lancement, le connecteur restait en 404. Même serveur, même jeton.
  app.all(["/mcp", "/mcp."], requireMcpAuth, (req, res) => {
    void node(req, res, req.body);
  });
}
