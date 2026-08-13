"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Languages,
  Link2,
  ListFilter,
  RefreshCw,
  Skull,
  BarChart3,
} from "lucide-react";
import { getAvailablePool, getPerkBySlug, getRandomPerks } from "@/lib/perks";
import type { Perk, PerkRole } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/use-mounted";
import { ROLE_COLOR } from "@/lib/role-color";
import { PerkGrid } from "./perk-grid";
import { CopyToast } from "./copy-toast";
import { ExcludePanel } from "./exclude-panel";

const MAX_PERK_COUNT = 4;
const DEFAULT_PERK_COUNT = 4;
const EXCLUDED_STORAGE_KEY = "vortex-info:dbd-excluded-perks";
const PERK_COUNT_STORAGE_KEY = "vortex-info:dbd-perk-count";
const BR_STORAGE_KEY = "vortex-info:dbd-battle-royale";
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

function loadPerkCount(): number {
  if (typeof window === "undefined") return DEFAULT_PERK_COUNT;
  const n = parseInt(window.localStorage.getItem(PERK_COUNT_STORAGE_KEY) ?? "", 10);
  return Number.isInteger(n) && n >= 0 && n <= MAX_PERK_COUNT ? n : DEFAULT_PERK_COUNT;
}

interface BattleRoyaleState {
  active: boolean;
  used: string[];
}

function loadBattleRoyale(): BattleRoyaleState {
  if (typeof window === "undefined") return { active: false, used: [] };
  try {
    const raw = window.sessionStorage.getItem(BR_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { active: false, used: [] };
  } catch {
    return { active: false, used: [] };
  }
}

function persistBattleRoyale(state: BattleRoyaleState) {
  window.sessionStorage.setItem(BR_STORAGE_KEY, JSON.stringify(state));
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

  return matched.length > 0 ? { role, perks: matched } : null;
}

function writeBuildToUrl(role: PerkRole, perks: Perk[]) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  params.set("role", role);
  if (perks.length > 0) params.set("perks", perks.map((p) => p.slug).join(","));
  window.history.replaceState(null, "", `${window.location.pathname}?${params}`);
}

export function RandomizerBoard() {
  const [role, setRole] = useState<PerkRole>("survivor");
  const [language, setLanguage] = useState<"en" | "ru">("ru");
  const [toast, setToast] = useState<string | null>(null);
  const [excludePanelOpen, setExcludePanelOpen] = useState(false);
  const [excludedSlugs, setExcludedSlugs] = useState<Set<string>>(loadExcludedSlugs);
  const [perkCount, setPerkCount] = useState<number>(loadPerkCount);
  const [showStats, setShowStats] = useState(false);
  const [battleRoyale, setBattleRoyale] = useState(false);
  const [battleRoyaleUsed, setBattleRoyaleUsed] = useState<Set<string>>(new Set());
  // Perks are randomized, so they can only be computed after hydration —
  // otherwise the server-rendered HTML and the client's first render would
  // pick different perks and React would flag a hydration mismatch.
  const mounted = useMounted();
  const [nonce, setNonce] = useState(0);
  const [sharedBuild, setSharedBuild] = useState<Perk[] | null>(null);

  useEffect(() => {
    function applyInitialClientState() {
      const shared = readBuildFromUrl();
      if (shared) {
        setRole(shared.role);
        setSharedBuild(shared.perks);
        setPerkCount(shared.perks.length);
      }
      const br = loadBattleRoyale();
      if (br.active) {
        setBattleRoyale(true);
        setBattleRoyaleUsed(new Set(br.used));
      }
    }
    applyInitialClientState();
  }, []);

  const combinedExcluded = useMemo(() => {
    if (!battleRoyale || battleRoyaleUsed.size === 0) return excludedSlugs;
    const merged = new Set(excludedSlugs);
    for (const slug of battleRoyaleUsed) merged.add(slug);
    return merged;
  }, [excludedSlugs, battleRoyale, battleRoyaleUsed]);

  const availableCount = mounted ? getAvailablePool(role, combinedExcluded).length : 0;
  const poolExhausted = battleRoyale && mounted && perkCount > 0 && availableCount < perkCount;

  const perks = useMemo(() => {
    void nonce; // intentional cache-buster: forces a reshuffle on "regenerate"
    if (!mounted) return [];
    if (sharedBuild) return sharedBuild;
    if (perkCount === 0 || poolExhausted) return [];
    return getRandomPerks(role, perkCount, combinedExcluded);
  }, [mounted, role, nonce, sharedBuild, combinedExcluded, perkCount, poolExhausted]);

  useEffect(() => {
    function syncUrl() {
      writeBuildToUrl(role, perks);
    }
    if (mounted) syncUrl();
  }, [role, perks, mounted]);

  function regenerate() {
    setSharedBuild(null);
    setNonce((n) => n + 1);
  }

  function selectRole(next: PerkRole) {
    setSharedBuild(null);
    setRole(next);
  }

  function selectPerkCount(next: number) {
    setSharedBuild(null);
    setPerkCount(next);
    window.localStorage.setItem(PERK_COUNT_STORAGE_KEY, String(next));
    setNonce((n) => n + 1);
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

  function eliminateCurrentBuild() {
    if (perks.length === 0) return;
    setBattleRoyaleUsed((prev) => {
      const next = new Set(prev);
      perks.forEach((p) => next.add(p.slug));
      persistBattleRoyale({ active: true, used: [...next] });
      return next;
    });
  }

  function handleCopy(perk: Perk) {
    navigator.clipboard
      .writeText(perk.name[language])
      .then(() => showToast(`«${perk.name[language]}» скопировано в буфер обмена!`))
      .catch(() => showToast("Не удалось скопировать"));
    if (battleRoyale) eliminateCurrentBuild();
  }

  function handleCopyAll() {
    const text = perks.map((p) => p.name[language]).join(", ");
    navigator.clipboard
      .writeText(text)
      .then(() => showToast("Весь билд скопирован в буфер обмена!"))
      .catch(() => showToast("Не удалось скопировать"));
    if (battleRoyale) eliminateCurrentBuild();
  }

  function handleShare() {
    writeBuildToUrl(role, perks);
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => showToast("Ссылка на билд скопирована!"))
      .catch(() => showToast("Не удалось скопировать ссылку"));
  }

  function toggleBattleRoyale() {
    setBattleRoyale((prev) => {
      const next = !prev;
      const used = next ? new Set<string>() : battleRoyaleUsed;
      setBattleRoyaleUsed(used);
      persistBattleRoyale({ active: next, used: [...used] });
      setSharedBuild(null);
      setNonce((n) => n + 1);
      return next;
    });
  }

  function restartBattleRoyale() {
    setBattleRoyaleUsed(new Set());
    persistBattleRoyale({ active: true, used: [] });
    setSharedBuild(null);
    setNonce((n) => n + 1);
  }

  const roleColor = ROLE_COLOR[role];
  const totalInRole = mounted ? getAvailablePool(role).length : 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(Object.keys(ROLE_LABEL) as PerkRole[]).map((r) => {
          const c = ROLE_COLOR[r];
          return (
            <button
              key={r}
              type="button"
              onClick={() => selectRole(r)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium capitalize transition-colors",
                role === r
                  ? cn(c.border, c.bg, c.text)
                  : "border-border text-muted hover:bg-surface-hover hover:text-foreground",
              )}
            >
              {r === "survivor" ? "Выживший" : "Убийца"}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted">Перков в билде:</span>
        {Array.from({ length: MAX_PERK_COUNT + 1 }, (_, n) => n).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => selectPerkCount(n)}
            className={cn(
              "flex size-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
              perkCount === n
                ? cn(roleColor.border, roleColor.bg, roleColor.text)
                : "border-border text-muted hover:bg-surface-hover hover:text-foreground",
            )}
          >
            {n}
          </button>
        ))}
      </div>

      {perkCount === 0 ? (
        <p className="text-sm text-muted">
          Испытание без перков для {ROLE_LABEL[role]} — удачи!
        </p>
      ) : (
        <p className="text-sm text-muted">
          {battleRoyale ? "Battle Royale" : "Случайный билд"} для {ROLE_LABEL[role]} —
          нажмите на перк, чтобы скопировать название
        </p>
      )}

      {poolExhausted ? (
        <div
          className={cn(
            "flex min-h-[220px] w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border p-6 text-center",
            roleColor.border,
            roleColor.bg,
          )}
        >
          <Skull className={cn("size-8", roleColor.text)} />
          <p className="font-semibold text-foreground">Пул перков исчерпан!</p>
          <p className="text-sm text-muted">
            Вы скопировали билды из всех доступных перков {ROLE_LABEL[role]}.
          </p>
          <button
            type="button"
            onClick={restartBattleRoyale}
            className="mt-1 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Начать заново
          </button>
        </div>
      ) : (
        <PerkGrid
          perks={perks}
          language={language}
          loading={!mounted}
          emptyMessage={
            perkCount === 0 ? "Ноль перков — режим испытания" : undefined
          }
          onCopy={handleCopy}
        />
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={regenerate}
          disabled={perkCount === 0}
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        >
          <RefreshCw className="size-4" />
          Сгенерировать новый билд
        </button>
        <button
          type="button"
          onClick={handleCopyAll}
          disabled={perks.length === 0}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
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

      <button
        type="button"
        onClick={toggleBattleRoyale}
        className={cn(
          "flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
          battleRoyale
            ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
            : "border-border text-muted hover:bg-surface-hover hover:text-foreground",
        )}
      >
        <Skull className="size-4" />
        Battle Royale {battleRoyale ? "включён" : "выключен"}
      </button>
      {battleRoyale && (
        <p className="max-w-md text-center text-xs text-muted">
          Копирование билда навсегда убирает эти перки из пула — играйте, пока
          не закончатся все {ROLE_LABEL[role]}.
        </p>
      )}

      <button
        type="button"
        onClick={() => setShowStats((v) => !v)}
        className="flex items-center gap-1.5 text-xs text-muted/60 transition-colors hover:text-muted"
      >
        <BarChart3 className="size-3.5" />
        Статистика пула
      </button>
      {showStats && mounted && (
        <div className="rounded-xl border border-border bg-surface px-4 py-3 text-center text-xs text-muted">
          <p>
            Всего перков {ROLE_LABEL[role]}: <b className="text-foreground">{totalInRole}</b>
          </p>
          <p>
            Исключено вручную:{" "}
            <b className="text-foreground">{excludedSlugs.size}</b>
          </p>
          {battleRoyale && (
            <p>
              Использовано в Battle Royale:{" "}
              <b className="text-foreground">{battleRoyaleUsed.size}</b> · Осталось:{" "}
              <b className="text-foreground">{availableCount}</b>
            </p>
          )}
        </div>
      )}

      <ExcludePanel
        open={excludePanelOpen}
        role={role}
        language={language}
        excludedSlugs={excludedSlugs}
        alsoGrayedOut={battleRoyale ? battleRoyaleUsed : undefined}
        onToggle={toggleExcluded}
        onReset={resetExcluded}
        onClose={() => setExcludePanelOpen(false)}
      />

      <CopyToast message={toast} />
    </div>
  );
}
