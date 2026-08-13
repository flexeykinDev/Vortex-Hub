import type { Metadata } from "next";
import { DbdRandomizerContent } from "./dbd-randomizer-content";

export const metadata: Metadata = {
  title: "DBD Randomizer — Vortex Info",
  description:
    "Рандомайзер перков Dead by Daylight с актуальным списком прямо с официальной wiki — без хардкода и без устаревших перков.",
};

export default function DbdRandomizerPage() {
  return <DbdRandomizerContent />;
}
