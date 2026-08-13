"use client";

import { useEffect, useMemo, useState } from "react";
import { Languages, Link2, ListFilter, RefreshCw } from "lucide-react";
import { getPerkBySlug, getRandomPerks } from "@/lib/perks";
import type { Perk, PerkRole } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/use-mounted";
import { ROLE_COLOR } from "@/lib/role-color";
import { PerkGrid } from "./perk-grid";
import { CopyToast } from "./copy-toast";
import { ExcludePanel } from "./exclude-panel";

const PERKS_PER_BUILD = 4;
const EXCLUDED_STORAGE_KEY = "vortex-info:dbd-excluded-perks";
const ROLE_LABEL: Record<PerkRole, string> = {
  survivor: "выжившего",
  killer: "убийцы",
};

function loadExcludedSlugs(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(EXCLUDED_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function readBuildFromUrl(): { role: PerkRole; perks: Perk[] } | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  const slugsParam = params.get("perks");
  if ((role !== "survivor" && role !== "killer") || !slugsParam) return null;

  const matched = slugsParam
    .split(",")
    .map((slug) => getPerkBySlug(slug))
    .filter((perk): perk is Perk => !!perk && perk.role === role);

  return matched.length === PERKS_PER_BUILD ? { role, perks: matched } : null;
}

function writeBuildToUrl(role: PerkRole, perks: Perk[]) {
  if (typeof window === "undefined" || perks.length === 0) return;
  const params = new URLSearchParams();
  params.set("role", role);
  params.set("perks", perks.map((p) => p.slug).join(","));
  window.history.replaceState(null, "", `${window.location.pathname}?${params}`);
}

export function RandomizerBoard() {
  const [role, setRole] = useState<PerkRole>("survivor");
  const [language, setLanguage] = useState<"en" | "ru">("ru");
  const [toast, setToast] = useState<string | null>(null);
  const [excludePanelOpen, setExcludePanelOpen] = useState(false);
  const [excludedSlugs, setExcludedSlugs] = useState<Set<string>>(loadExcludedSlugs);
  // Perks are randomized, so they can only be computed after hydration —
  // otherwise the server-rendered HTML and the client's first render would
  // pick different perks and React would flag a hydration mismatch.
  const mounted = useMounted();
  const [nonce, setNonce] = useState(0);
  const [sharedBuild, setSharedBuild] = useState<Perk[] | null>(null);

  useEffect(() => {
    function applySharedBuildFromUrl() {
      const shared = readBuildFromUrl();
      if (!shared) return;
      setRole(shared.role);
      setSharedBuild(shared.perks);
    }
    applySharedBuildFromUrl();
  }, []);

  const perks = useMemo(() => {
    void nonce; // intentional cache-buster: forces a reshuffle on "regenerate"
    if (!mounted) return [];
    if (sharedBuild) return sharedBuild;
    return getRandomPerks(role, PERKS_PER_BUILD, excludedSlugs);
  }, [mounted, role, nonce, sharedBuild, excludedSlugs]);

  useEffect(() => {
    function syncUrl() {
      writeBuildToUrl(role, perks);
    }
    if (perks.length > 0) syncUrl();
  }, [role, perks]);

  function regenerate() {
    setSharedBuild(null);
    setNonce((n) => n + 1);
  }

  function selectRole(next: PerkRole) {
    setSharedBuild(null);
    setRole(next);
  }

  function toggleExcluded(slug: string) {
    setExcludedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      window.localStorage.setItem(EXCLUDED_STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  function resetExcluded() {
    setExcludedSlugs(new Set());
    window.localStorage.removeItem(EXCLUDED_STORAGE_KEY);
  }

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }

  function handleCopy(perk: Perk) {
    navigator.clipboard
      .writeText(perk.name[language])
      .then(() => showToast(`«${perk.name[language]}» скопировано в буфер обмена!`))
      .catch(() => showToast("Не удалось скопировать"));
  }

  function handleCopyAll() {
    const text = perks.map((p) => p.name[language]).join(", ");
    navigator.clipboard
      .writeText(text)
      .then(() => showToast("Весь билд скопирован в буфер обмена!"))
      .catch(() => showToast("Не удалось скопировать"));
  }

  function handleShare() {
    writeBuildToUrl(role, perks);
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => showToast("Ссылка на билд скопирована!"))
      .catch(() => showToast("Не удалось скопировать ссылку"));
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(Object.keys(ROLE_LABEL) as PerkRole[]).map((r) => {
          const roleColor = ROLE_COLOR[r];
          return (
            <button
              key={r}
              type="button"
              onClick={() => selectRole(r)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium capitalize transition-colors",
                role === r
                  ? cn(roleColor.border, roleColor.bg, roleColor.text)
                  : "border-border text-muted hover:bg-surface-hover hover:text-foreground",
              )}
            >
              {r === "survivor" ? "Выживший" : "Убийца"}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-muted">
        Случайный билд для {ROLE_LABEL[role]} — нажмите на перк, чтобы скопировать
        название
      </p>

      <PerkGrid perks={perks} language={language} onCopy={handleCopy} />

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={regenerate}
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105 active:scale-95"
        >
          <RefreshCw className="size-4" />
          Сгенерировать новый билд
        </button>
        <button
          type="button"
          onClick={handleCopyAll}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          Скопировать весь билд
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <Link2 className="size-4" />
          Поделиться
        </button>
        <button
          type="button"
          onClick={() => setExcludePanelOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <ListFilter className="size-4" />
          Настроить пул
          {excludedSlugs.size > 0 && (
            <span className="rounded-full bg-accent/15 px-1.5 text-xs text-accent">
              {excludedSlugs.size}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setLanguage((l) => (l === "en" ? "ru" : "en"))}
          className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <Languages className="size-4" />
          {language === "ru" ? "на Русском" : "on English"}
        </button>
      </div>

      <ExcludePanel
        open={excludePanelOpen}
        role={role}
        language={language}
        excludedSlugs={excludedSlugs}
        onToggle={toggleExcluded}
        onReset={resetExcluded}
        onClose={() => setExcludePanelOpen(false)}
      />

      <CopyToast message={toast} />
    </div>
  );
}
