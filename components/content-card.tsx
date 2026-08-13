import type { ReactNode } from "react";

export function ContentCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:p-10">
      {children}
    </div>
  );
}
