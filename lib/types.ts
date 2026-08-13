export type PerkRole = "survivor" | "killer";

export interface Perk {
  slug: string;
  role: PerkRole;
  name: {
    en: string;
    ru: string;
  };
  description: string;
  character: string;
  icon: string;
}

export interface PerksMeta {
  scrapedAt: string;
  sourceUrl: string;
  survivorCount: number;
  killerCount: number;
}
