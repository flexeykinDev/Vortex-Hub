"use client";

import { VideoEmbed } from "@/components/video-embed";
import { ContentCard } from "@/components/content-card";
import { DownloadLink } from "@/components/download-link";
import { useT } from "@/lib/i18n";

const BUILD_URL =
  "https://drive.google.com/file/d/1c0FR7JfeTNj5io4DAuiLFEUe79gGiLBI/view?usp=sharing";

const STEPS = [
  {
    href: "https://eu1.llaun.ch/ru",
    label: { ru: "Скачать Legacy Launcher", en: "Download Legacy Launcher" },
    note: { ru: "если пиратка", en: "if pirated copy" },
  },
  {
    href: "https://prismlauncher.org/download/windows/",
    label: { ru: "Призм лаунчер", en: "Prism Launcher" },
    note: { ru: "если лицензия", en: "if licensed copy" },
  },
  {
    href: "https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe",
    label: { ru: "Скачать Java 17", en: "Download Java 17" },
    note: {
      ru: "если вы никогда не играли и не качали джаву",
      en: "if you've never installed Java before",
    },
  },
  {
    href: "https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.3.0/forge-1.20.1-47.3.0-installer.jar",
    label: {
      ru: "Скачать Forge для версии 1.20.1 (47.3.0)",
      en: "Download Forge for 1.20.1 (47.3.0)",
    },
  },
  {
    href: BUILD_URL,
    label: {
      ru: "Скачать основную сборку (файлы с модами и настройками)",
      en: "Download the modpack (mod and config files)",
    },
  },
  {
    href: "https://store.steampowered.com/app/4963920/Porthole__Local_Port_Sharing/",
    label: { ru: "Скачать Porthole (в Steam)", en: "Download Porthole (on Steam)" },
    note: {
      ru: "чтобы играть с другом онлайн без пробрасывания портов и без роутера",
      en: "to play online with a friend without port forwarding or router setup",
    },
  },
];

export function LostSoulsContent() {
  const t = useT();

  return (
    <div className="flex flex-col items-center gap-8">
      <VideoEmbed src="https://www.youtube.com/embed/Gm8wXds6deI" title="Lost Souls" />
      <ContentCard>
        <h1 className="text-2xl font-semibold sm:text-3xl">Lost Souls</h1>
        <p className="mt-4 text-muted">
          {t({
            ru: "Приватная сборка по майнкрафту версии 1.4.1 с инструкцией как установить. Скачайте последний релиз, разархивируйте в отдельную папку.",
            en: "A private Minecraft modpack (version 1.4.1) with install instructions. Download the latest release and extract it into its own folder.",
          })}
        </p>

        <h2 className="mt-8 text-lg font-semibold">
          {t({
            ru: "Установка дополнительных компонентов",
            en: "Installing the required components",
          })}
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
                {t(step.label)}
              </a>
              {step.note && <span> ({t(step.note)})</span>}
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-xl border border-border bg-black/20 p-4 text-left text-sm text-muted">
          <p className="font-medium text-foreground">
            {t({ ru: "Что такое Porthole?", en: "What is Porthole?" })}
          </p>
          <p className="mt-1.5">
            {t({
              ru: "Бесплатная замена Hamachi/Radmin VPN, распространяется через Steam. Открывает друг другу доступ только к одному нужному порту (например, порту Minecraft-сервера) через сеть Steam — без пробрасывания портов, публичного IP и настройки роутера. Достаточно создать лобби, выбрать порт и пригласить друга через Steam или коротким кодом-приглашением.",
              en: "A free Hamachi/Radmin VPN alternative distributed via Steam. It shares just one port (e.g. your Minecraft server's port) over Steam's own network — no port forwarding, no public IP, no router setup. Just create a lobby, pick a port, and invite a friend via Steam or a short invite code.",
            })}
          </p>
        </div>

        <div className="mt-6">
          <DownloadLink href={BUILD_URL}>
            {t({ ru: "Скачать", en: "Download" })}
          </DownloadLink>
        </div>
      </ContentCard>
    </div>
  );
}
