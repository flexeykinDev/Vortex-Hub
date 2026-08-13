import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const basePath = process.env.NEXT_BASE_PATH || "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vortex Info",
    short_name: "Vortex Info",
    description: "Полезные утилиты и рандомайзер перков Dead by Daylight",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#0b0c0f",
    theme_color: "#0b0c0f",
    icons: [
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
