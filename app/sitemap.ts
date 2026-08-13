import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const basePath = process.env.NEXT_BASE_PATH || "";
const baseUrl = `https://flexeykindev.github.io${basePath}`;

const ROUTES = ["", "/spotx", "/lost-souls", "/dbd-randomizer", "/projects"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}
