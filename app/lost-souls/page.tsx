import type { Metadata } from "next";
import { VideoEmbed } from "@/components/video-embed";
import { ContentCard } from "@/components/content-card";
import { DownloadLink } from "@/components/download-link";

export const metadata: Metadata = {
  title: "Lost Souls — Vortex Info",
};

const BUILD_URL =
  "https://drive.google.com/file/d/1c0FR7JfeTNj5io4DAuiLFEUe79gGiLBI/view?usp=sharing";

const STEPS = [
  {
    href: "https://eu1.llaun.ch/ru",
    label: "Скачать Legacy Launcher",
    note: "если пиратка",
  },
  {
    href: "https://prismlauncher.org/download/windows/",
    label: "Призм лаунчер",
    note: "если лицензия",
  },
  {
    href: "https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe",
    label: "Скачать Java 17",
    note: "если вы никогда не играли и не качали джаву",
  },
  {
    href: "https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.3.0/forge-1.20.1-47.3.0-installer.jar",
    label: "Скачать Forge для версии 1.20.1 (47.3.0)",
  },
  {
    href: BUILD_URL,
    label: "Скачать основную сборку (файлы с модами и настройками)",
  },
  {
    href: "https://www.radmin-vpn.com",
    label: "Скачать Radmin VPN",
    note: "если планируете играть с другом по радмину, отключите брандмауэр Windows на время игры",
  },
];

export default function LostSoulsPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <VideoEmbed
        src="https://www.youtube.com/embed/Gm8wXds6deI"
        title="Lost Souls"
      />
      <ContentCard>
        <h1 className="text-2xl font-semibold sm:text-3xl">Lost Souls</h1>
        <p className="mt-4 text-muted">
          Приватная сборка по майнкрафту версии 1.4.1 с инструкцией как
          установить. Скачайте последний релиз, разархивируйте в отдельную
          папку.
        </p>

        <h2 className="mt-8 text-lg font-semibold">
          Установка дополнительных компонентов
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-left text-muted marker:text-accent">
          {STEPS.map((step) => (
            <li key={step.href}>
              <a
                href={step.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline decoration-accent/40 underline-offset-2 hover:text-accent"
              >
                {step.label}
              </a>
              {step.note && <span> ({step.note})</span>}
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <DownloadLink href={BUILD_URL}>Скачать</DownloadLink>
        </div>
      </ContentCard>
    </div>
  );
}
