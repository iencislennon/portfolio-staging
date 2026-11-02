import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "../routes";

for (const scheme of ["light", "dark"] as const) {
  for (const path of routes) {
    test(`axe ${scheme} ${path}`, async ({ browser }) => {
      const ctx = await browser.newContext({ colorScheme: scheme, reducedMotion: "reduce" });
      const page = await ctx.newPage();
      await page.goto(path);
      const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
      await ctx.close();
    });
  }
}
