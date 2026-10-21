import { chromium } from "playwright";
const patches = {
  base: "",
  noReveal: "[style*=\"opacity\"]{filter:none!important}",
  noPin: "",
  noChromeEdge: ".chrome-edge::before{display:none!important}",
  noBackdrop: "*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}",
  noMm: ".bg-mm{display:none!important}",
  noSvg: "svg{visibility:hidden!important}",
  noMask: "*{mask-image:none!important;-webkit-mask-image:none!important}",
  noGlint: ".glint::after{display:none!important}",
  noAnim: "*{animation:none!important}",
};
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const [name, css] of Object.entries(patches)) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  if (css) await page.addStyleTag({ content: css });
  await page.waitForTimeout(3500);
  await page.evaluate(() => { window.__f = []; let l = performance.now(); const t = (n) => { window.__f.push(n - l); l = n; window.__r = requestAnimationFrame(t); }; window.__r = requestAnimationFrame(t); });
  await page.mouse.move(700, 450);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i < Math.ceil(H / 160); i++) { await page.mouse.wheel(0, 160); await page.waitForTimeout(24); }
  const f = await page.evaluate(() => { cancelAnimationFrame(window.__r); return window.__f.slice(1); });
  const s = [...f].sort((a, c) => a - c);
  console.log(name.padEnd(14), "fps", (f.length / (f.reduce((a, c) => a + c, 0) / 1000)).toFixed(1), "p95", s[Math.floor(f.length * 0.95)].toFixed(0), ">25ms", (100 * f.filter((x) => x > 25).length / f.length).toFixed(0) + "%");
  await ctx.close();
}
await b.close();
