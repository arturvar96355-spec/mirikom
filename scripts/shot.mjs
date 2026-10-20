// node scripts/shot.mjs <path> <width> <outfile> [scrollY] [fullpage]
import { chromium } from "playwright";
const [, , path = "/", w = "1440", out = "shots/a.png", sy = "0", full = ""] = process.argv;
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const width = +w;
const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, deviceScaleFactor: 1, hasTouch: width < 600 });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await page.goto("http://localhost:4173" + path, { waitUntil: "networkidle" });
await page.waitForTimeout(+sy > 0 ? 500 : 6500);
if (+sy > 0) { await page.evaluate((y) => window.scrollTo(0, y), +sy); await page.waitForTimeout(1800); }
if (full) { await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0,0); }); await page.waitForTimeout(800); }
await page.screenshot({ path: out, fullPage: !!full });
const ov = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
console.log("hscroll:", ov, "errors:", errs.slice(0, 5));
await browser.close();
