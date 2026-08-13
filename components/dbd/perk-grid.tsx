"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import type { Perk } from "@/lib/types";

export function PerkGrid({
  perks,
  language,
  onCopy,
}: {
  perks: Perk[];
  language: "en" | "ru";
  onCopy: (perk: Perk) => void;
}) {
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
    <div className="grid min-h-[220px] grid-cols-2 gap-4 sm:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {perks.map((perk, index) => (
          <motion.button
            key={perk.slug}
            type="button"
            onClick={() => onCopy(perk)}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            className="group flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-3 text-center transition-colors hover:border-accent/40 hover:bg-surface-hover"
          >
            <span className="relative">
              <Image
                src={perk.icon}
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
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
