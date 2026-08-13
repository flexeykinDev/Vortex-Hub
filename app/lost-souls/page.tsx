import type { Metadata } from "next";
import { LostSoulsContent } from "./lost-souls-content";

export const metadata: Metadata = {
  title: "Lost Souls — Vortex Info",
  description:
    "Приватная сборка Minecraft 1.20.1 с модами — пошаговая инструкция по установке лаунчера, Forge и подключению по сети через Porthole.",
};

export default function LostSoulsPage() {
  return <LostSoulsContent />;
}
