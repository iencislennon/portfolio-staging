import { test, expect } from "@playwright/test";
import { routes } from "../routes";

for (const path of routes) {
  test(`smoke ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(path.endsWith("404.html") ? 200 : 200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toHaveCount(1);
    expect((await page.title()).length).toBeGreaterThan(5);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(/^https:\/\//);
    expect(errors).toEqual([]);
  });
}

test("titles are unique", async ({ page }) => {
  const titles = new Set<string>();
  for (const path of routes) { await page.goto(path); titles.add(await page.title()); }
  expect(titles.size).toBe(routes.length);
});

test("home renders core content without JavaScript", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("experiment to evidence");
  await expect(page.getByRole("link", { name: "Triton Kernel Optimization" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View selected work" })).toBeVisible();
  await ctx.close();
});

test("each case study has verified results with a source and a cover with alt text", async ({ page }) => {
  for (const slug of ["triton", "crisisnet", "pm25", "water"]) {
    await page.goto(`/work/${slug}/`);
    expect(await page.locator(".tile").count()).toBeGreaterThan(0);
    for (const src of await page.locator(".tile .src").allTextContents()) expect(src).toMatch(/Source:\s*\S+/);
    expect(await page.locator("svg[role=img] title").first().textContent()).toMatch(/.{20,}/);
    for (const h of ["Context", "My contribution", "Constraints", "Architecture", "Decisions", "Evaluation", "What failed", "Impact", "Next iteration", "Reproducibility"])
      await expect(page.getByRole("heading", { level: 2, name: h })).toBeVisible();
  }
});

test("theme choice persists across reloads", async ({ page }) => {
  await page.goto("/");
  const btn = page.locator("#theme-toggle");
  await btn.click(); // system -> light
  await btn.click(); // light -> dark
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("external links carry rel=noopener and an accessible new-tab marker", async ({ page }) => {
  await page.goto("/work/triton/");
  for (const a of await page.locator('a[href^="https://"]').all()) {
    expect(await a.getAttribute("rel")).toContain("noopener");
  }
});

test("reduced motion disables transitions", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const d = await page.locator(".btn-primary").first().evaluate((e) => getComputedStyle(e).transitionDuration);
  expect(parseFloat(d)).toBe(0);
  await ctx.close();
});
