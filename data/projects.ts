interface Localized {
  ru: string;
  en: string;
}

export interface Project {
  slug: string;
  title: string;
  description: Localized;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  gif: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "dota-counter-web",
    title: "The Counter Web",
    description: {
      ru: "Интерактивный force-directed граф контрпиков Dota 2 — 127 героев и 253 связи между ними. Клик по герою показывает, кто его контрит (саппорт-контра — синим, кор-контра — красным) и какой предмет для этого нужен. Живой фаззи-поиск по всей странице, зум, перетаскивание узлов. Полностью статический сайт — ни бэкенда, ни сборки, один index.html.",
      en: "An interactive force-directed graph of Dota 2 hero counter-picks — 127 heroes and 253 relationships between them. Click any hero to see who counters it (support counter in blue, core counter in red) and the item needed. Live fuzzy search across the whole page, pan/zoom, draggable nodes. Fully static — no backend, no build step, a single index.html.",
    },
    stack: ["D3.js", "Vanilla JS/CSS", "no build step"],
    githubUrl: "https://github.com/flexeykinDev/dota-counter-web",
    liveUrl: "https://flexeykindev.github.io/dota-counter-web/",
    gif: "/projects/dota-counter-web.gif",
  },
  {
    slug: "roflo-pinterest",
    title: "Roflo Pinterest Wallpaper",
    description: {
      ru: "Трей-приложение для Windows, которое тихо ставит на рабочий стол случайную ещё не показанную картинку из ленты или досок Pinterest — без повторов, пока пул не исчерпается. Есть готовый .exe без Python, авторизация через браузер прямо из трея и регистрация задач в Планировщике Windows для автообновления пула по расписанию.",
      en: "A Windows tray app that quietly sets a random, not-yet-shown picture from your Pinterest feed or boards as your desktop wallpaper — no repeats until the pool runs out. Ships as a standalone .exe (no Python needed), with browser login right from the tray icon and Windows Task Scheduler registration for automatic pool refreshes.",
    },
    stack: ["Python", "Playwright", "pystray", "PyInstaller"],
    githubUrl: "https://github.com/flexeykinDev/roflo-pinterest",
    gif: "/projects/roflo-pinterest.gif",
  },
];
