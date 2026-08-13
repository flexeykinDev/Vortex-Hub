import type { Metadata } from "next";
import { ProjectsContent } from "./projects-content";

export const metadata: Metadata = {
  title: "Мои проекты — Vortex Info",
  description:
    "The Counter Web — интерактивный граф контрпиков Dota 2, и Roflo Pinterest Wallpaper — трей-приложение для смены обоев из Pinterest.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
