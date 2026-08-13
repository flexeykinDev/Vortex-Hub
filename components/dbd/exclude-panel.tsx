"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import type { PerkRole } from "@/lib/types";
import { getPerksByRole } from "@/lib/perks";
import { withBasePath } from "@/lib/asset-path";
import { cn } from "@/lib/cn";
import { ROLE_COLOR } from "@/lib/role-color";

export function ExcludePanel({
  open,
  role,
  language,
  excludedSlugs,
  onToggle,
  onReset,
  onClose,
}: {
  open: boolean;
  role: PerkRole;
  language: "en" | "ru";
  excludedSlugs: Set<string>;
  onToggle: (slug: string) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const perksForRole = getPerksByRole(role);
  const roleColor = ROLE_COLOR[role];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border p-4">
              <div className="text-left">
                <p className="font-semibold text-foreground">Настроить пул перков</p>
                <p className="text-xs text-muted">
                  Выключенные перки не попадут в случайный билд
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={onReset}
                  className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" />
                  Сбросить
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Закрыть"
                  className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 overflow-y-auto p-4 sm:grid-cols-4">
              {perksForRole.map((perk) => {
                const excluded = excludedSlugs.has(perk.slug);
                return (
                  <button
                    key={perk.slug}
                    type="button"
                    onClick={() => onToggle(perk.slug)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border p-2 text-center transition-all",
                      excluded
                        ? "border-border/40 opacity-35 grayscale"
                        : cn("border-border", roleColor.hoverBorder),
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- next/image ignores basePath for unoptimized runtime src, see lib/asset-path.ts */}
                    <img
                      src={withBasePath(perk.icon)}
                      alt={perk.name[language]}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    <span className="text-[10px] leading-tight text-foreground">
                      {perk.name[language]}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
