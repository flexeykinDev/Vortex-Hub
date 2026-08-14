# Vortex Hub

Личный сайт с полезными инструментами и ссылками на мои проекты.
TypeScript + React + Next.js (App Router) + Tailwind CSS.

**Живой сайт:** https://flexeykindev.github.io/Vortex-Hub/

## Что внутри

- **Главная, SpotX, Lost Souls, Мои проекты** — статические страницы-инструкции.
- Ссылка на [DBD Perk Randomizer](https://github.com/flexeykinDev/dbd-perk-randomizer) —
  рандомайзер перков Dead by Daylight, вынесен в отдельный проект.

## Разработка

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint
npm run build      # статический экспорт в out/
npm run test:e2e   # Playwright smoke tests
```

## Деплой

Сайт собирается как статический экспорт (`output: 'export'`) и
публикуется на GitHub Pages через `.github/workflows/deploy.yml` при
каждом пуше в `main`.

## Стек

Next.js · TypeScript · React · Tailwind CSS · Framer Motion · lucide-react
