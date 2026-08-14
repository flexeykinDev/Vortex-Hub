import type { Metadata } from "next";
import { SpotXContent } from "./spotx-content";

export const metadata: Metadata = {
  title: "SpotX — Vortex Hub",
  description:
    "SpotX — бесплатный модифицированный клиент Spotify для Windows: блокирует рекламу, снимает лимит скипов, убирает подкасты. Инструкция по установке.",
};

export default function SpotXPage() {
  return <SpotXContent />;
}
