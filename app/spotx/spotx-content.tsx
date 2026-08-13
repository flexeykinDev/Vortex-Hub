"use client";

import { VideoEmbed } from "@/components/video-embed";
import { ContentCard } from "@/components/content-card";
import { DownloadLink } from "@/components/download-link";
import { useT } from "@/lib/i18n";

export function SpotXContent() {
  const t = useT();

  return (
    <div className="flex flex-col items-center gap-8">
      <VideoEmbed src="https://www.youtube.com/embed/8pnleVNH7vk" title="SpotX" />
      <ContentCard>
        <h1 className="text-2xl font-semibold sm:text-3xl">
          {t({
            ru: "SpotX — Бесплатный модифицированный клиент Spotify для Windows",
            en: "SpotX — A Free Modified Spotify Client for Windows",
          })}
        </h1>
        <p className="mt-4 text-muted">
          {t({
            ru: "SpotX — это модифицированная версия клиента Spotify, которая блокирует рекламу и активирует дополнительные функции. Совместима с Windows 7-11.",
            en: "SpotX is a modified version of the Spotify client that blocks ads and unlocks extra features. Compatible with Windows 7-11.",
          })}
        </p>

        <h2 className="mt-8 text-lg font-semibold">
          {t({ ru: "Системные требования", en: "System requirements" })}
        </h2>
        <ul className="mt-3 space-y-1.5 text-left text-muted">
          <li>
            <span className="text-accent">{t({ ru: "ОС:", en: "OS:" })}</span> Windows
            7-11
          </li>
          <li>
            <span className="text-accent">Spotify:</span>{" "}
            {t({ ru: "Последняя официальная версия", en: "Latest official version" })}
          </li>
          <li>
            <span className="text-accent">PowerShell:</span>{" "}
            {t({
              ru: "Версия 5 и выше (рекомендуется)",
              en: "Version 5 or newer (recommended)",
            })}
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-semibold">
          {t({ ru: "Основные особенности", en: "Key features" })}
        </h2>
        <ul className="mt-3 space-y-1.5 text-left text-muted">
          <li>
            <span className="text-accent">{t({ ru: "Блокировка:", en: "Blocks:" })}</span>{" "}
            {t({ ru: "всех видов рекламы", en: "all kinds of ads" })}
          </li>
          <li>
            <span className="text-accent">{t({ ru: "Скрытие:", en: "Hides:" })}</span>{" "}
            {t({
              ru: "подкастов и аудиокниг (опционально)",
              en: "podcasts and audiobooks (optional)",
            })}
          </li>
          <li>
            <span className="text-accent">{t({ ru: "Блокировка:", en: "Blocks:" })}</span>{" "}
            {t({ ru: "автоматических обновлений", en: "automatic updates" })}
          </li>
          <li>
            <span className="text-accent">
              {t({ ru: "Экспериментальные функции:", en: "Experimental features:" })}
            </span>{" "}
            {t({ ru: "активированы", en: "enabled" })}
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-semibold">
          {t({ ru: "Установка", en: "Installation" })}
        </h2>
        <ul className="mt-3 space-y-2 text-left text-muted">
          <li>
            <span className="text-accent">
              {t({ ru: "Для установки с новой темой:", en: "For the new theme:" })}
            </span>{" "}
            {t({ ru: "запустите", en: "run" })}{" "}
            <a
              href="https://raw.githack.com/amd64fox/SpotX/main/scripts/Install_Auto.bat"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              Install_Auto.bat
            </a>
          </li>
          <li>
            <span className="text-accent">
              {t({ ru: "Для установки с обычной темой:", en: "For the classic theme:" })}
            </span>{" "}
            {t({ ru: "запустите", en: "run" })}{" "}
            <a
              href="https://raw.githack.com/amd64fox/SpotX/main/scripts/Install_Old_theme.bat"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              Install_Old_theme.bat
            </a>
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-semibold">
          {t({ ru: "Удаление", en: "Uninstalling" })}
        </h2>
        <p className="mt-2 text-muted">
          <span className="text-accent">{t({ ru: "Для удаления:", en: "To uninstall:" })}</span>{" "}
          {t({ ru: "просто запустите", en: "just run" })}{" "}
          <a
            href="https://raw.githack.com/amd64fox/SpotX/main/Uninstall.bat"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            Uninstall.bat
          </a>{" "}
          {t({ ru: "или переустановите Spotify.", en: "or reinstall Spotify." })}
        </p>

        <div className="mt-6">
          <DownloadLink href="https://github.com/SpotX-Official/SpotX">
            {t({ ru: "Скачать с GitHub", en: "Download from GitHub" })}
          </DownloadLink>
        </div>
      </ContentCard>
    </div>
  );
}
