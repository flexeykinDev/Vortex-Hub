import type { Metadata } from "next";
import { VideoEmbed } from "@/components/video-embed";
import { RandomizerBoard } from "@/components/dbd/randomizer-board";
import { EasterEgg } from "@/components/dbd/easter-egg";
import { perksMeta } from "@/lib/perks";
import trailer from "@/data/trailer.json";

export const metadata: Metadata = {
  title: "DBD Randomizer — Vortex Info",
  description:
    "Рандомайзер перков Dead by Daylight с актуальным списком прямо с официальной wiki — без хардкода и без устаревших перков.",
};

export default function DbdRandomizerPage() {
  const updatedAt = new Date(perksMeta.scrapedAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <EasterEgg />
      <div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Dead by Daylight — Рандомайзер Перков
        </h1>
        <p className="mt-3 text-sm text-muted">
          {perksMeta.survivorCount} перков выживших · {perksMeta.killerCount} перков
          убийц · обновлено {updatedAt} с{" "}
          <a
            href={perksMeta.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-4 hover:text-accent"
          >
            официальной wiki
          </a>
        </p>
      </div>

      <VideoEmbed src={trailer.embedUrl} title={trailer.title} />

      <RandomizerBoard />
    </div>
  );
}
