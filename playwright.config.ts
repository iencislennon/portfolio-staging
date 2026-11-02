import { defineConfig } from "@playwright/test";

// Locally we reuse the installed Google Chrome; in CI set PW_CHANNEL="" after `npx playwright install chromium`.
const channel = process.env.PW_CHANNEL ?? "chrome";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4321", ...(channel ? { channel } : {}) },
  webServer: { command: "npx astro preview --port 4321", url: "http://localhost:4321", reuseExistingServer: true, timeout: 60_000 },
});
