"use client";

import Link from "next/link";
import { ArrowRight, Code2, Dices, Ghost, Music } from "lucide-react";
import { useT } from "@/lib/i18n";

const TOOLS = [
  {
    href: "/spotx",
    title: { ru: "SpotX", en: "SpotX" },
    description: { ru: "Spotify без рекламы", en: "Ad-free Spotify" },
    icon: Music,
  },
  {
    href: "/lost-souls",
    title: { ru: "Lost Souls", en: "Lost Souls" },
    description: {
      ru: "Приватная сборка по Майнкрафт",
      en: "Private Minecraft modpack",
    },
    icon: Ghost,
  },
  {
    href: "/dbd-randomizer",
    title: { ru: "DBD Randomizer", en: "DBD Randomizer" },
    description: {
      ru: "Рандомайзер перков для Dead by Daylight",
      en: "Dead by Daylight perk randomizer",
    },
    icon: Dices,
  },
  {
    href: "/projects",
    title: { ru: "Мои проекты", en: "My Projects" },
    description: {
      ru: "Что я пишу и поддерживаю",
      en: "What I build and maintain",
    },
    icon: Code2,
  },
];

export default function Home() {
  const t = useT();

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t({ ru: "Полезные ресурсы", en: "Useful Resources" })}
        </h1>
        <p className="mt-4 text-muted">
          {t({
            ru: "Добро пожаловать! Выберите инструмент ниже.",
            en: "Welcome! Pick a tool below.",
          })}
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-1">
        {TOOLS.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 text-left transition-colors hover:border-accent/40 hover:bg-surface-hover"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block font-medium text-foreground">{t(title)}</span>
              <span className="block text-sm text-muted">{t(description)}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
      </div>
    </div>
  );
}
