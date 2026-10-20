// node scripts/sections.mjs <width> -> shots/sec-<w>-<n>.png по каждой секции
import { chromium } from "playwright";
const w = +(process.argv[2] ?? 1440);
const only = process.argv[3];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, hasTouch: w < 600 });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const tops = await page.evaluate(() => [...document.querySelectorAll("main > section")].map((s, i) => ({ i, id: s.id, top: s.getBoundingClientRect().top + scrollY, h: s.offsetHeight })));
for (const t of tops) {
  if (only && String(t.i) !== only) continue;
  const steps = t.id === "process" && w >= 768 ? [0.15, 0.5, 0.9] : [0];
  for (const f of steps) {
    const y = t.id === "process" && w >= 768 ? t.top + f * 3 * 900 : t.top;
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `shots/sec-${w}-${t.i}${steps.length > 1 ? "-" + f : ""}.png` });
  }
}
console.log(tops.map((t) => `${t.i}:${t.id || "-"}:${Math.round(t.h)}`).join(" "), "errors", errs.slice(0, 5));
console.log("hscroll", await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth));
await browser.close();
