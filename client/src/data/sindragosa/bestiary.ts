import type { Monster } from '../../utils/sindragosa/bestiary'
import { MONSTERS } from './monsters'
import { DUNGEONS } from './dungeons'

/** Tout le bestiaire : le catalogue converti de CO, puis les monstres des donjons. */
export const BESTIARY: Monster[] = [...MONSTERS, ...DUNGEONS.flatMap((d) => d.monsters)]
