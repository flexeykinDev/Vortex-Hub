import Link from "next/link";
import { ArrowRight, Code2, Dices, Ghost, Music } from "lucide-react";

const TOOLS = [
  {
    href: "/spotx",
    title: "SpotX",
    description: "Spotify без рекламы",
    icon: Music,
  },
  {
    href: "/lost-souls",
    title: "Lost Souls",
    description: "Приватная сборка по Майнкрафт",
    icon: Ghost,
  },
  {
    href: "/dbd-randomizer",
    title: "DBD Randomizer",
    description: "Рандомайзер перков для Dead by Daylight",
    icon: Dices,
  },
  {
    href: "/projects",
    title: "Мои проекты",
    description: "Что я пишу и поддерживаю",
    icon: Code2,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Полезные ресурсы
        </h1>
        <p className="mt-4 text-muted">
          Добро пожаловать! Выберите инструмент ниже.
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
              <span className="block font-medium text-foreground">{title}</span>
              <span className="block text-sm text-muted">{description}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
      </div>
    </div>
  );
}
