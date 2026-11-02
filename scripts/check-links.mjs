// Verifies every internal link and asset reference in dist/ resolves to a built file.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
const root = new URL("../dist/", import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const html = walk(root).filter((f) => f.endsWith(".html"));
let broken = 0;
for (const f of html) {
  const src = readFileSync(f, "utf8");
  for (const m of src.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(u)) continue;
    const path = u.split("#")[0].split("?")[0];
    if (!path) continue;
    const target = join(root, path.startsWith("/") ? path : join(f.replace(root, "").replace(/[^/]*$/, ""), path));
    const ok = existsSync(target) && (!statSync(target).isDirectory() || existsSync(join(target, "index.html")));
    if (!ok) { console.error(`${f.replace(root, "")}: broken ${u}`); broken++; }
  }
}
console.log(`${html.length} pages checked, ${broken} broken internal links`);
process.exit(broken ? 1 : 0);
