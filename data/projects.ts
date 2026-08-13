export interface Project {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  gif: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "dota-counter-web",
    title: "The Counter Web",
    description:
      "Интерактивный force-directed граф контрпиков Dota 2 — 127 героев и 253 связи между ними. Клик по герою показывает, кто его контрит (саппорт-контра — синим, кор-контра — красным) и какой предмет для этого нужен. Живой фаззи-поиск по всей странице, зум, перетаскивание узлов. Полностью статический сайт — ни бэкенда, ни сборки, один index.html.",
    stack: ["D3.js", "Vanilla JS/CSS", "без сборки"],
    githubUrl: "https://github.com/flexeykinDev/dota-counter-web",
    liveUrl: "https://flexeykindev.github.io/dota-counter-web/",
    gif: "/projects/dota-counter-web.gif",
  },
  {
    slug: "roflo-pinterest",
    title: "Roflo Pinterest Wallpaper",
    description:
      "Трей-приложение для Windows, которое тихо ставит на рабочий стол случайную ещё не показанную картинку из ленты или досок Pinterest — без повторов, пока пул не исчерпается. Есть готовый .exe без Python, авторизация через браузер прямо из трея и регистрация задач в Планировщике Windows для автообновления пула по расписанию.",
    stack: ["Python", "Playwright", "pystray", "PyInstaller"],
    githubUrl: "https://github.com/flexeykinDev/roflo-pinterest",
    gif: "/projects/roflo-pinterest.gif",
  },
];
