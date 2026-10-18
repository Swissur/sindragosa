/**
 * Convertit le bestiaire CO au système d6 (plans/33-bestiaire-sindragosa.md).
 * Usage : npx tsx scripts/convert-bestiary.ts
 * Écrit client/src/data/sindragosa/monsters.ts.
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { MONSTERS_CATALOG } from './sources/coMonstersCatalog'
import { convertMonster } from '../client/src/utils/sindragosa/bestiary'

const root = join(__dirname, '..')
const monsters = MONSTERS_CATALOG.map(convertMonster)

const out = [
  '// Généré par scripts/convert-bestiary.ts depuis le bestiaire CO — relancer le script plutôt que d’éditer à la main.',
  "import type { Monster } from '../../utils/sindragosa/bestiary'",
  '',
  `export const MONSTERS: Monster[] = ${JSON.stringify(monsters, null, 2)}`,
  '',
].join('\n')

writeFileSync(join(root, 'client/src/data/sindragosa/monsters.ts'), out)
const review = monsters.filter((m) => m.abilities.some((a) => a.review)).length
console.log(`${monsters.length} monstres convertis, ${review} avec des capacités à relire.`)
