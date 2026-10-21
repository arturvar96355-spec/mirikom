// node scripts/perf.mjs [width=1440] [cpu=4]  — частота кадров при покое, движении мыши и скролле всей страницы
import { chromium } from "playwright";
const width = +(process.argv[2] ?? 1440);
const cpu = +(process.argv[3] ?? 4);
const mobile = width < 600;
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--enable-gpu-rasterization"] });
const ctx = await b.newContext({ viewport: { width, height: mobile ? 844 : 900 }, hasTouch: mobile, isMobile: mobile });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
await cdp.send("Performance.enable");
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(5000); // дать отыграть вступлению

const start = () => page.evaluate(() => { window.__f = []; window.__y = []; let l = performance.now(); const t = (n) => { window.__f.push(n - l); window.__y = window.__y || []; window.__y.push(scrollY); l = n; window.__r = requestAnimationFrame(t); }; window.__r = requestAnimationFrame(t); });
const stop = async () => {
  const f = await page.evaluate(() => { cancelAnimationFrame(window.__r); return window.__f; });
  const yy = await page.evaluate(() => window.__y || []);
  raw = { f: [...f], y: yy };
  f.shift();
  const s = [...f].sort((a, c) => a - c);
  const n = f.length;
  const sum = f.reduce((a, c) => a + c, 0);
  return { frames: n, fps: +(n / (sum / 1000)).toFixed(1), p95: +s[Math.floor(n * 0.95)]?.toFixed(1), worst: +s[n - 1]?.toFixed(0), over25: +(100 * f.filter((x) => x > 25).length / n).toFixed(1), over50: +(100 * f.filter((x) => x > 50).length / n).toFixed(1) };
};
const metrics = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.filter((m) => /Duration$/.test(m.name)).map((m) => [m.name, m.value]));
const out = {};
let raw = null;
const run = async (name, fn) => {
  const m0 = await metrics();
  await start(); const t0 = Date.now(); await fn(); const ms = Date.now() - t0;
  const r = await stop();
  const m1 = await metrics();
  const d = (k) => +(((m1[k] - m0[k]) / (ms / 1000)) * 100).toFixed(0); // % времени
  out[name] = { ...r, script: d("ScriptDuration") + "%", layout: d("LayoutDuration") + "%", style: d("RecalcStyleDuration") + "%", task: d("TaskDuration") + "%" };
};

await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(500);
await run("hero-idle", () => page.waitForTimeout(4000));
if (!mobile) await run("hero-mouse", async () => { for (let i = 0; i < 120; i++) { await page.mouse.move(200 + i * 9, 300 + Math.sin(i / 6) * 200); await page.waitForTimeout(16); } });
await run("scroll-all", async () => {
  await page.mouse.move(700, 450);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const steps = Math.ceil(H / 160);
  for (let i = 0; i < steps; i++) { if (mobile) await page.evaluate((y) => scrollBy(0, 160), i); else await page.mouse.wheel(0, 160); await page.waitForTimeout(24); }
});
{
  const buckets = {};
  raw.f.forEach((d, i) => { if (i === 0) return; const k = Math.floor((raw.y[i] ?? 0) / 700) * 700; (buckets[k] ??= []).push(d); });
  const rows = Object.entries(buckets).map(([k, a]) => { const s = [...a].sort((x, y) => x - y); return { y: +k, frames: a.length, p95: +s[Math.floor(a.length * 0.95)].toFixed(0), max: +s[a.length - 1].toFixed(0), over25: +(100 * a.filter((x) => x > 25).length / a.length).toFixed(0) }; });
  console.log("worst scroll zones:"); console.table(rows.sort((a, b) => b.p95 - a.p95 || b.over25 - a.over25).slice(0, 8));
}
console.table(out);
await b.close();
