import type { ReactNode } from "react";
import { Download } from "lucide-react";

export function DownloadLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105 active:scale-95"
    >
      <Download className="size-4" />
      {children}
    </a>
  );
}
