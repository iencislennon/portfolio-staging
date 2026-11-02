// Pre-build content checks beyond the zod schema: banned words and required copy rules (spec §12).
import { readdirSync, readFileSync } from "node:fs";
const banned = /\b(passionate|cutting-edge|revolutionary|guru|ninja|10x)\b/i;
const dir = new URL("../src/content/projects/", import.meta.url);
let bad = 0;
for (const f of readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
  const text = readFileSync(new URL(f, dir), "utf8");
  const m = text.match(banned);
  if (m) { console.error(`${f}: banned word "${m[0]}"`); bad++; }
  const headings = [...text.matchAll(/^## (.+)$/gm)].map((x) => x[1]);
  for (const h of ["Context", "My contribution", "Constraints", "Architecture", "Decisions", "Evaluation", "What failed", "Impact", "Next iteration", "Reproducibility"]) {
    if (!headings.includes(h)) { console.error(`${f}: missing required block "${h}"`); bad++; }
  }
}
if (bad) process.exit(1);
console.log("content validation OK");
