"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "flexeykinDev";
const FALLBACK_NAME = "yiksnele";

interface GitHubAuthor {
  name: string;
  avatarUrl: string;
}

export function Footer() {
  const [author, setAuthor] = useState<GitHubAuthor>({
    name: FALLBACK_NAME,
    avatarUrl: `https://github.com/${GITHUB_USERNAME}.png`,
  });

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { name?: string; login?: string; avatar_url?: string } | null) => {
        if (cancelled || !data) return;
        setAuthor({
          name: data.name || data.login || FALLBACK_NAME,
          avatarUrl: data.avatar_url ?? `https://github.com/${GITHUB_USERNAME}.png`,
        });
      })
      .catch(() => {
        // Keep the fallback — no GitHub access, no big deal.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- external GitHub avatar, unoptimized static export */}
        <img
          src={author.avatarUrl}
          alt="Аватар автора"
          width={36}
          height={36}
          className="rounded-full"
        />
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground transition-colors hover:text-accent"
        >
          Автор сайта: {author.name}
        </a>
      </div>
    </footer>
  );
}
