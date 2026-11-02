import { test, expect } from "@playwright/test";
import { routes } from "../routes";

test("skip link is the first stop and moves focus to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

for (const path of routes) {
  test(`keyboard walkthrough ${path}: every stop shows a visible focus ring`, async ({ page }) => {
    await page.goto(path);
    const stops = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("a[href], button, [tabindex='0']")].length
    );
    expect(stops).toBeGreaterThan(3);
    for (let i = 0; i < Math.min(stops, 40); i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const e = document.activeElement as HTMLElement;
        if (!e || e === document.body) return null;
        const cs = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        return { outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2, w: r.width, h: r.height, tag: e.tagName, text: (e.textContent || "").trim().slice(0, 30) };
      });
      expect(info, `tab stop ${i}`).not.toBeNull();
      expect(info!.outline, `focus ring on ${info!.tag} "${info!.text}"`).toBe(true);
    }
  });
}

test("interactive targets are at least 44px tall in the header and footer", async ({ page }) => {
  await page.goto("/");
  for (const sel of ["header a", "header button", "footer a"]) {
    for (const el of await page.locator(sel).all()) {
      const box = await el.boundingBox();
      expect(box!.height, sel).toBeGreaterThanOrEqual(43.5);
    }
  }
});
