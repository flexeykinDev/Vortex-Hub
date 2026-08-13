import perksData from "@/data/perks.json";
import metaData from "@/data/meta.json";
import type { Perk, PerkRole, PerksMeta } from "./types";

export const perks: Perk[] = perksData as Perk[];
export const perksMeta: PerksMeta = metaData as PerksMeta;

const perksBySlug = new Map(perks.map((perk) => [perk.slug, perk]));

const NEW_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

export function getPerksByRole(role: PerkRole): Perk[] {
  return perks.filter((perk) => perk.role === role);
}

export function getPerkBySlug(slug: string): Perk | undefined {
  return perksBySlug.get(slug);
}

export function isNewPerk(perk: Perk): boolean {
  return Date.now() - new Date(perk.addedAt).getTime() < NEW_WINDOW_MS;
}

export function getRandomPerks(
  role: PerkRole,
  count: number,
  excludedSlugs?: ReadonlySet<string>,
): Perk[] {
  const fullPool = getPerksByRole(role);
  const pool =
    excludedSlugs && excludedSlugs.size > 0
      ? fullPool.filter((perk) => !excludedSlugs.has(perk.slug))
      : fullPool;
  // If exclusions leave too few perks to fill a build, fall back to the
  // full pool rather than showing a broken/short grid.
  const source = pool.length >= count ? pool : fullPool;

  const shuffled = [...source];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
