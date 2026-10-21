import { chromium } from "playwright";
const variants = {
  base: "",
  noXrFilter: ".xr{filter:none!important}",
  noChromeEdge: ".chrome-edge::before{display:none!important}",
  noBigShadow: "[class*='shadow-[0_0_40px']{box-shadow:none!important}",
  noMm: ".bg-mm{background-image:none!important}",
  noSvgLayer: "svg{contain:none!important;transform:none!important}",
  noBlurBackdrop: "*{backdrop-filter:none!important}",
  noSvgAtAll: "svg{display:none!important}",
};
const only = process.argv[2] ? process.argv[2].split(",") : Object.keys(variants);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const name of only) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  if (variants[name]) await page.addStyleTag({ content: variants[name] });
  await page.waitForTimeout(4500);
  await page.evaluate(() => { window.__l = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__l.push(e.duration))).observe({ type: "long-animation-frame" }); });
  await page.mouse.move(700, 450);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i < Math.ceil(H / 140); i++) { await page.mouse.wheel(0, 140); await page.waitForTimeout(22); }
  await page.waitForTimeout(600);
  const l = await page.evaluate(() => window.__l);
  console.log(name.padEnd(15), "long frames", String(l.length).padStart(2), "sum", String(Math.round(l.reduce((a, c) => a + c, 0))).padStart(5) + "ms", "worst", Math.round(Math.max(0, ...l)) + "ms");
  await ctx.close();
}
await b.close();
