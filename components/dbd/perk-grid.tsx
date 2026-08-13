"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Info, X } from "lucide-react";
import type { Perk } from "@/lib/types";
import { withBasePath } from "@/lib/asset-path";
import { isNewPerk } from "@/lib/perks";

export function PerkGrid({
  perks,
  language,
  onCopy,
}: {
  perks: Perk[];
  language: "en" | "ru";
  onCopy: (perk: Perk) => void;
}) {
  const [detailPerk, setDetailPerk] = useState<Perk | null>(null);

  if (perks.length === 0) {
    return (
      <div className="grid min-h-[220px] grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-2xl border border-border bg-surface"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid min-h-[220px] grid-cols-2 gap-4 sm:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.slug}
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="group relative flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-3 text-center transition-colors hover:border-accent/40 hover:bg-surface-hover"
            >
              {isNewPerk(perk) && (
                <span className="absolute -top-2 -left-2 z-10 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground shadow">
                  NEW
                </span>
              )}
              <button
                type="button"
                onClick={() => setDetailPerk(perk)}
                aria-label={`Описание: ${perk.name[language]}`}
                className="absolute top-1.5 right-1.5 z-10 flex size-6 items-center justify-center rounded-full bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/60 hover:text-white"
              >
                <Info className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onCopy(perk)}
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                <span className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element -- next/image ignores basePath for unoptimized runtime src, see lib/asset-path.ts */}
                  <img
                    src={withBasePath(perk.icon)}
                    alt={perk.name[language]}
                    width={96}
                    height={96}
                    className="rounded-xl transition-transform group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                    <Copy className="size-5 text-white" />
                  </span>
                </span>
                <span className="text-xs font-medium text-foreground">
                  {perk.name[language]}
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <PerkDetailModal
        perk={detailPerk}
        language={language}
        onClose={() => setDetailPerk(null)}
      />
    </>
  );
}

function PerkDetailModal({
  perk,
  language,
  onClose,
}: {
  perk: Perk | null;
  language: "en" | "ru";
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {perk && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-left shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- next/image ignores basePath for unoptimized runtime src, see lib/asset-path.ts */}
              <img
                src={withBasePath(perk.icon)}
                alt={perk.name[language]}
                width={56}
                height={56}
                className="rounded-xl"
              />
              <div>
                <p className="font-semibold text-foreground">
                  {perk.name[language]}
                </p>
                <p className="text-xs text-muted">{perk.character}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {perk.description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
