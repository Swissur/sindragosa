import { BESTIAIRE_TOPIC, readTopic } from "../knowledge/loadKnowledge.js";
import { TOPIC_NAMES, type TopicName } from "../knowledge/tools.js";

export { TOPIC_NAMES, type TopicName };
export { loadBestiaire, loadMonster, loadMonsterNames } from "../knowledge/loadKnowledge.js";

/** L'index des sujets de règles (`knowledge/topics/00-index.md`). */
export function listRulesIndex(): string {
  return readTopic("00-index");
}

/**
 * Un sujet de règles entier. `null` si le nom est inconnu.
 * Le bestiaire est refusé ici : il se lit fiche par fiche avec `loadMonster`,
 * et jamais par un joueur.
 */
export function readRulesTopic(name: string): string | null {
  if (name === BESTIAIRE_TOPIC) return null;
  if (!(TOPIC_NAMES as readonly string[]).includes(name)) return null;
  return readTopic(name);
}
