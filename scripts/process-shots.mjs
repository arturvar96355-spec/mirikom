import { chromium } from "playwright";
const w = +(process.argv[2] ?? 1440);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const p = await (await b.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, hasTouch: w < 600 })).newPage();
await p.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await p.waitForTimeout(1000);
const t = await p.evaluate(() => document.getElementById("process").getBoundingClientRect().top + scrollY);
const h = await p.evaluate(() => document.getElementById("process").offsetHeight);
console.log("top", t, "h", h);
const fr = w >= 768 ? [0.05, 0.5, 0.95] : [0, 0.5];
for (const f of fr) {
  await p.evaluate((y) => scrollTo(0, y), t + f * (w >= 768 ? 2700 : h));
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `shots/proc-${w}-${f}.png` });
}
await b.close();
