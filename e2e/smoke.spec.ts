import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("home page lists all tools and links work", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Полезные ресурсы" })).toBeVisible();

    for (const [label, heading] of [
      ["SpotX", "SpotX"],
      ["Lost Souls", "Lost Souls"],
      ["Мои проекты", "Мои проекты"],
    ] as const) {
      await page.getByRole("link", { name: label, exact: true }).first().click();
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
      await page.goBack();
    }
  });

  test("DBD Randomizer card links out to the standalone site", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: /DBD Randomizer/ });
    await expect(link).toHaveAttribute(
      "href",
      "https://flexeykindev.github.io/dbd-perk-randomizer/",
    );
    await expect(link).toHaveAttribute("target", "_blank");
  });
});

test.describe("projects page", () => {
  test("renders both project cards with a working GitHub link", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: "The Counter Web" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Roflo Pinterest Wallpaper" }),
    ).toBeVisible();

    const githubLinks = page.getByRole("link", { name: "GitHub" });
    await expect(githubLinks).toHaveCount(2);
    await expect(githubLinks.first()).toHaveAttribute("href", /github\.com/);
  });
});

test.describe("theme toggle", () => {
  test("switches theme and persists across navigation", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Переключить тему" });
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await page.getByRole("link", { name: "Мои проекты", exact: true }).first().click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});
