# Vortex Info

Личный сайт с полезными инструментами и рандомайзером перков Dead by
Daylight. TypeScript + React + Next.js (App Router) + Tailwind CSS.

**Живой сайт:** https://flexeykinDev.github.io/vortex-info/

## Что внутри

- **Главная, SpotX, Lost Souls** — статические страницы-инструкции.
- **DBD Randomizer** — генератор случайного билда из 4 перков
  выжившего/убийцы, с переключением языка EN/RU и копированием названия
  перка в буфер обмена по клику.

## Перки — без хардкода

В отличие от старой версии сайта (Vue), где ~250 перков были вручную
прописаны в коде компонента и требовали ручного обновления после каждой
главы игры, здесь перки живут в `data/perks.json` — файле, который
генерирует скрапер:

```bash
npm run scrape:perks
```

Скрипт (`scripts/scrape-perks.ts`) забирает актуальный список перков и их
описания с [официальной wiki Dead by Daylight](https://deadbydaylight.fandom.com/wiki/Perks)
через MediaWiki API, скачивает и конвертирует иконки в `public/perks/`, и
подмешивает русские названия из `data/translations.ru.json`.

Раз в неделю это происходит автоматически — GitHub Action
(`.github/workflows/update-perks.yml`) прогоняет скрапер и открывает PR с
изменениями, если что-то поменялось.

## Разработка

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint
npm run build      # статический экспорт в out/
```

## Деплой

Сайт собирается как статический экспорт (`output: 'export'`) и
публикуется на GitHub Pages через `.github/workflows/deploy.yml` при
каждом пуше в `main`.

## Стек

Next.js · TypeScript · React · Tailwind CSS · Framer Motion ·
lucide-react · cheerio + sharp (скрапер)
