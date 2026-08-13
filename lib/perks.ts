import perksData from "@/data/perks.json";
import metaData from "@/data/meta.json";
import type { Perk, PerkRole, PerksMeta } from "./types";

export const perks: Perk[] = perksData as Perk[];
export const perksMeta: PerksMeta = metaData as PerksMeta;

export function getPerksByRole(role: PerkRole): Perk[] {
  return perks.filter((perk) => perk.role === role);
}

export function getRandomPerks(role: PerkRole, count: number): Perk[] {
  const pool = getPerksByRole(role);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
