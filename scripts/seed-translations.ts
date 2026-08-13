// One-off migration: pulls the ~250 hand-written EN/RU perk name pairs out of
// the old Vue component and turns them into data/translations.ru.json, keyed
// by the same slug the wiki scraper produces. Not part of the recurring
// scrape pipeline — the old source file goes away once this has run once.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { slugify } from "../lib/slugify";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OLD_VUE_FILE = join(
  __dirname,
  "../../Vortex-Info-main/src/components/randomizerDBD.vue",
);
const OUTPUT_FILE = join(__dirname, "../data/translations.ru.json");

const NAME_PAIR_PATTERN =
  /name:\s*{\s*eng:\s*"([^"]+)",\s*ru:\s*"([^"]+)"\s*}/g;

function main() {
  const source = readFileSync(OLD_VUE_FILE, "utf8");
  const translations: Record<string, string> = {};

  for (const match of source.matchAll(NAME_PAIR_PATTERN)) {
    const [, eng, ru] = match;
    const slug = slugify(eng);
    if (slug) translations[slug] = ru;
  }

  const count = Object.keys(translations).length;
  if (count === 0) {
    throw new Error("No name/ru pairs matched — check the source file format.");
  }

  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(translations, Object.keys(translations).sort(), 2) + "\n",
  );
  console.log(`Seeded ${count} Russian translations -> ${OUTPUT_FILE}`);
}

main();
