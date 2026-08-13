"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dices, Ghost, Home, Music } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/spotx", label: "SpotX", icon: Music },
  { href: "/lost-souls", label: "Lost Souls", icon: Ghost },
  { href: "/dbd-randomizer", label: "DBD Randomizer", icon: Dices },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border/60">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4 py-5">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-transparent text-muted hover:border-border hover:bg-surface hover:text-foreground",
              )}
            >
              <Icon className="size-4" strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
