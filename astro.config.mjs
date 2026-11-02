import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// SITE_URL is the canonical origin of the deployed site. Staging builds set
// NOINDEX=1 so they are never indexed.
const site = process.env.SITE_URL ?? "https://iencislennon.github.io";

export default defineConfig({
  site,
  base: process.env.BASE_PATH || "/",
  integrations: [mdx(), sitemap()],
  build: { inlineStylesheets: "auto" },
  prefetch: false,
});
