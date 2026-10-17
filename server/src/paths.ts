import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Repository root, from server/src/ */
export const REPO_ROOT = join(__dirname, "..", "..");

/** Vite production build (served by Express when present). */
export const CLIENT_DIST = join(REPO_ROOT, "client", "dist");
