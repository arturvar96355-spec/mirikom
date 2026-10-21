// Ищет долгие кадры при скролле: Long Animation Frames + позиция скролла + что выполнялось
import { chromium } from "playwright";
const width = +(process.argv[2] ?? 1440);
const cpu = +(process.argv[3] ?? 4);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await b.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, hasTouch: width < 600 });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(5000);
await page.evaluate(() => {
  window.__loaf = [];
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push({ y: Math.round(scrollY), d: Math.round(e.duration), block: Math.round(e.blockingDuration), render: Math.round(e.startTime + e.duration - e.renderStart), style: Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0), scripts: e.scripts.map((s) => `${Math.round(s.duration)}ms ${s.invoker || ""} ${s.sourceFunctionName || ""} ${(s.sourceURL || "").split("/").pop()}`) }); }).observe({ type: "long-animation-frame", buffered: false });
});
await page.mouse.move(700, 450);
const H = await page.evaluate(() => document.documentElement.scrollHeight);
for (let i = 0; i < Math.ceil(H / 140); i++) { await page.mouse.wheel(0, 140); await page.waitForTimeout(22); }
await page.waitForTimeout(800);
const r = await page.evaluate(() => window.__loaf);
console.log("page height", H, "long frames:", r.length);
for (const e of r.sort((a, c) => c.d - a.d).slice(0, 14)) console.log(`y=${e.y} total=${e.d}ms blocking=${e.block} renderTail=${e.render}`, e.scripts.slice(0, 3).join(" | "));
await b.close();
