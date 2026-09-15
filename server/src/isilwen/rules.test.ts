import { describe, expect, it } from "vitest";
import { listRulesIndex, readRulesTopic, TOPIC_NAMES } from "./rules.js";

describe("listRulesIndex", () => {
  it("rend l'index des sujets, non vide", () => {
    const index = listRulesIndex();
    expect(index.length).toBeGreaterThan(100);
    expect(index).toContain("combat");
  });
});

describe("readRulesTopic", () => {
  it("rend le contenu d'un sujet connu", () => {
    const combat = readRulesTopic("combat");
    expect(combat).not.toBeNull();
    expect(combat!.length).toBeGreaterThan(100);
  });

  it("rend null pour un sujet inconnu", () => {
    expect(readRulesTopic("dragons-roses")).toBeNull();
    expect(readRulesTopic("")).toBeNull();
    // pas de traversée de chemin
    expect(readRulesTopic("../.env")).toBeNull();
  });

  it("refuse le bestiaire", () => {
    expect(TOPIC_NAMES).toContain("bestiaire");
    expect(readRulesTopic("bestiaire")).toBeNull();
  });
});
