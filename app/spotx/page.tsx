import type { Metadata } from "next";
import { VideoEmbed } from "@/components/video-embed";
import { ContentCard } from "@/components/content-card";
import { DownloadLink } from "@/components/download-link";

export const metadata: Metadata = {
  title: "SpotX — Vortex Info",
  description:
    "SpotX — бесплатный модифицированный клиент Spotify для Windows: блокирует рекламу, снимает лимит скипов, убирает подкасты. Инструкция по установке.",
};

export default function SpotXPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <VideoEmbed
        src="https://www.youtube.com/embed/8pnleVNH7vk"
        title="SpotX"
      />
      <ContentCard>
        <h1 className="text-2xl font-semibold sm:text-3xl">
          SpotX — Бесплатный модифицированный клиент Spotify для Windows
        </h1>
        <p className="mt-4 text-muted">
          SpotX — это модифицированная версия клиента Spotify, которая
          блокирует рекламу и активирует дополнительные функции. Совместима с
          Windows 7-11.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Системные требования</h2>
        <ul className="mt-3 space-y-1.5 text-left text-muted">
          <li>
            <span className="text-accent">ОС:</span> Windows 7-11
          </li>
          <li>
            <span className="text-accent">Spotify:</span> Последняя
            официальная версия
          </li>
          <li>
            <span className="text-accent">PowerShell:</span> Версия 5 и выше
            (рекомендуется)
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-semibold">Основные особенности</h2>
        <ul className="mt-3 space-y-1.5 text-left text-muted">
          <li>
            <span className="text-accent">Блокировка:</span> всех видов
            рекламы
          </li>
          <li>
            <span className="text-accent">Скрытие:</span> подкастов и
            аудиокниг (опционально)
          </li>
          <li>
            <span className="text-accent">Блокировка:</span> автоматических
            обновлений
          </li>
          <li>
            <span className="text-accent">Экспериментальные функции:</span>{" "}
            активированы
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-semibold">Установка</h2>
        <ul className="mt-3 space-y-2 text-left text-muted">
          <li>
            <span className="text-accent">Для установки с новой темой:</span>{" "}
            запустите{" "}
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
            <span className="text-accent">Для установки с обычной темой:</span>{" "}
            запустите{" "}
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

        <h2 className="mt-8 text-lg font-semibold">Удаление</h2>
        <p className="mt-2 text-muted">
          <span className="text-accent">Для удаления:</span> просто запустите{" "}
          <a
            href="https://raw.githack.com/amd64fox/SpotX/main/Uninstall.bat"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            Uninstall.bat
          </a>{" "}
          или переустановите Spotify.
        </p>

        <div className="mt-6">
          <DownloadLink href="https://github.com/SpotX-Official/SpotX">
            Скачать с GitHub
          </DownloadLink>
        </div>
      </ContentCard>
    </div>
  );
}
