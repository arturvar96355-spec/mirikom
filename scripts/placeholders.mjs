// Находит все заглушки [...] в /content и печатает список для README/согласования с клиентом.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../content", import.meta.url).pathname;
const found = new Map();
for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
  readFileSync(join(dir, f), "utf8").split("\n").forEach((line, i) => {
    if (line.trim().startsWith("//")) return;
    for (const m of line.matchAll(/\[[^\]\n]{2,}\]/g)) {
      if (/^\[(\s*"|\s*\{|\s*\.\.\.)/.test(m[0])) continue;
      const key = m[0];
      if (!found.has(key)) found.set(key, []);
      found.get(key).push(`${f}:${i + 1}`);
    }
  });
}
console.log(`Заглушки: ${found.size} уникальных\n`);
for (const [k, where] of [...found].sort()) console.log(`${k}  ×${where.length}  (${where.slice(0, 3).join(", ")}${where.length > 3 ? "…" : ""})`);
