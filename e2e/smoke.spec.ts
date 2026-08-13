import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("home page lists all tools and links work", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Полезные ресурсы" })).toBeVisible();

    for (const [label, heading] of [
      ["SpotX", "SpotX"],
      ["Lost Souls", "Lost Souls"],
      ["DBD Randomizer", "Dead by Daylight"],
      ["Мои проекты", "Мои проекты"],
    ] as const) {
      await page.getByRole("link", { name: label, exact: true }).first().click();
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
      await page.goBack();
    }
  });
});

test.describe("DBD randomizer", () => {
  test("generates a build, toggles role, and updates the share URL", async ({ page }) => {
    await page.goto("/dbd-randomizer");

    const perkGrid = page.locator("main");
    await expect(perkGrid.locator("img[alt]").first()).toBeVisible();

    // Role toggle switches the pool.
    await page.getByRole("button", { name: "Убийца" }).click();
    await expect(page.getByText("Случайный билд для убийцы")).toBeVisible();

    // Regenerating updates the shareable URL query string.
    await page.getByRole("button", { name: "Сгенерировать новый билд" }).click();
    await expect(page).toHaveURL(/[?&]role=killer&perks=/);
  });

  test("exclude panel toggles a perk and persists to localStorage", async ({ page }) => {
    await page.goto("/dbd-randomizer");
    await page.getByRole("button", { name: /Настроить пул/ }).click();

    const panel = page.getByText("Настроить пул перков");
    await expect(panel).toBeVisible();

    // Perk toggle buttons (unlike "Сбросить"/"Закрыть") contain a perk icon.
    const firstPerkButton = page
      .locator("div.fixed.inset-0")
      .locator("button:has(img)")
      .first();
    await firstPerkButton.click();

    const excludedSlugs = await page.evaluate(() =>
      window.localStorage.getItem("vortex-info:dbd-excluded-perks"),
    );
    expect(excludedSlugs).not.toBeNull();
    expect(JSON.parse(excludedSlugs ?? "[]").length).toBeGreaterThan(0);
  });

  test("opening a shared build URL loads that exact build", async ({ page }) => {
    await page.goto(
      "/dbd-randomizer?role=killer&perks=agitation,bamboozle,brutal-strength,corrupt-intervention",
    );
    await expect(page.getByText("Нетерпимость")).toBeVisible();
    await expect(page.getByText("Розыгрыш")).toBeVisible();
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

    await page.getByRole("link", { name: "DBD Randomizer", exact: true }).first().click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});
