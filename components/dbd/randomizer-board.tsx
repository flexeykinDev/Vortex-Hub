"use client";

import { useMemo, useState } from "react";
import { Languages, RefreshCw } from "lucide-react";
import { getRandomPerks } from "@/lib/perks";
import type { Perk, PerkRole } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/use-mounted";
import { PerkGrid } from "./perk-grid";
import { CopyToast } from "./copy-toast";

const PERKS_PER_BUILD = 4;
const ROLE_LABEL: Record<PerkRole, string> = {
  survivor: "выжившего",
  killer: "убийцы",
};

export function RandomizerBoard() {
  const [role, setRole] = useState<PerkRole>("survivor");
  const [language, setLanguage] = useState<"en" | "ru">("ru");
  const [toast, setToast] = useState<string | null>(null);
  // Perks are randomized, so they can only be computed after hydration —
  // otherwise the server-rendered HTML and the client's first render would
  // pick different perks and React would flag a hydration mismatch.
  const mounted = useMounted();
  const [nonce, setNonce] = useState(0);

  const perks = useMemo(() => {
    void nonce; // intentional cache-buster: forces a reshuffle on "regenerate"
    return mounted ? getRandomPerks(role, PERKS_PER_BUILD) : [];
  }, [mounted, role, nonce]);

  function regenerate() {
    setNonce((n) => n + 1);
  }

  function handleCopy(perk: Perk) {
    const text = perk.name[language];
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setToast(`«${text}» скопировано в буфер обмена!`);
        setTimeout(() => setToast(null), 2500);
      })
      .catch(() => {
        setToast("Не удалось скопировать");
        setTimeout(() => setToast(null), 2500);
      });
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(Object.keys(ROLE_LABEL) as PerkRole[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium capitalize transition-colors",
              role === r
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border text-muted hover:bg-surface-hover hover:text-foreground",
            )}
          >
            {r === "survivor" ? "Выживший" : "Убийца"}
          </button>
        ))}
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
          onClick={() => setLanguage((l) => (l === "en" ? "ru" : "en"))}
          className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <Languages className="size-4" />
          {language === "ru" ? "на Русском" : "on English"}
        </button>
      </div>

      <CopyToast message={toast} />
    </div>
  );
}
