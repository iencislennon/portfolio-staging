import type { APIRoute } from "astro";
import { u } from "../lib/url";
export const GET: APIRoute = ({ site }) => {
  const noindex = process.env.NOINDEX === "1";
  const body = noindex
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(u("/sitemap-index.xml"), site).href}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
