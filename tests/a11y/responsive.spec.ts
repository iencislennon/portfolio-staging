import { test, expect } from "@playwright/test";
import { routes } from "../routes";

const widths = [320, 375, 390, 768, 1024, 1280, 1440, 1920];

for (const w of widths) {
  test(`no horizontal overflow at ${w}px`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
    const page = await ctx.newPage();
    for (const path of routes) {
      await page.goto(path);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(sw, `${path} at ${w}`).toBeLessThanOrEqual(w);
    }
    await ctx.close();
  });
}

// WCAG 1.4.4 / 1.4.10: 200% zoom on a 1280px window is a 640 CSS px viewport; 400% is 320.
for (const [label, w] of [["200%", 640], ["400%", 320]] as const) {
  test(`reflows at ${label} zoom`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: w, height: 512 } });
    const page = await ctx.newPage();
    for (const path of routes) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBeLessThanOrEqual(w);
    }
    await ctx.close();
  });
}
