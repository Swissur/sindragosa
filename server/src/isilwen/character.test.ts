import { describe, expect, it } from "vitest";
import { rowToPayload } from "./character.js";
import type { CharacterRow } from "../db/schema.js";

/** Une ligne `character` minimale mais complète côté champs lus par le rendu. */
function makeRow(over: Partial<CharacterRow> = {}): CharacterRow {
  return {
    id: 7,
    userId: 3,
    isActive: true,
    name: "Nym",
    profile: "Voleur",
    histoire: "",
    people: "Halfelin",
    level: 4,
    hpMax: 22,
    hpCurrent: 18,
    mpMax: 0,
    mpCurrent: 0,
    defense: 15,
    initiativeBonus: 14,
    str: 8,
    dex: 17,
    con: 12,
    int: 13,
    wis: 10,
    cha: 14,
    skills: [],
    weapons: [],
    martialFormations: [],
    paths: [],
    mysticTalent: null,
    armorId: null,
    shieldId: null,
    defenseBonus: 0,
    attackContactBonus: 0,
    attackDistanceBonus: 0,
    attackMagiqueBonus: 0,
    hpLevelGains: [],
    hpBonus: 0,
    items: [{ id: "a", name: "Corde", quantity: 1 }],
    goldCoins: 12,
    silverCoins: 3,
    copperCoins: 7,
    pcCurrent: 2,
    prCurrent: 5,
    states: [],
    competences: [],
    portraitImageId: null,
    createdAt: new Date(0),
    updatedAt: new Date(0),
    ...over,
  } as CharacterRow;
}

describe("rowToPayload", () => {
  it("traduit les colonnes str/dex/... en abilities nommées", () => {
    const p = rowToPayload(makeRow());
    expect(p.abilities).toEqual({
      strength: 8,
      dexterity: 17,
      constitution: 12,
      intelligence: 13,
      wisdom: 10,
      charisma: 14,
    });
  });

  it("garde inventaire et argent pour sa propre fiche", () => {
    const p = rowToPayload(makeRow());
    expect(p.items).toHaveLength(1);
    expect(p.goldCoins).toBe(12);
    expect(p.silverCoins).toBe(3);
    expect(p.copperCoins).toBe(7);
  });

  it("vide inventaire et argent pour un compagnon", () => {
    const p = rowToPayload(makeRow(), false);
    expect(p.items).toEqual([]);
    expect(p.goldCoins).toBe(0);
    expect(p.silverCoins).toBe(0);
    expect(p.copperCoins).toBe(0);
  });

  it("recopie les autres champs de la ligne tels quels", () => {
    const p = rowToPayload(makeRow({ name: "Bracco", level: 2 }));
    expect(p.name).toBe("Bracco");
    expect(p.level).toBe(2);
    expect(p.hpCurrent).toBe(18);
    expect(p.defense).toBe(15);
    // les colonnes brutes restent disponibles (edit_character les lit)
    expect(p.dex).toBe(17);
  });
});
