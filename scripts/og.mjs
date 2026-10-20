import { chromium } from "playwright";
const body = "M104 336 L100 290 C100 270 108 258 128 254 L188 246 C250 214 306 176 366 156 C392 148 420 146 452 146 L556 146 C606 148 646 176 704 222 L792 234 C852 240 902 248 928 260 C946 270 952 290 950 336 L868 336 A68 68 0 0 0 732 336 L318 336 A68 68 0 0 0 182 336 Z";
const html = `<html><body style="margin:0;width:1200px;height:630px;background:#0B0D10;position:relative;overflow:hidden;font-family:sans-serif;color:#D9DEE5">
<div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 75% 100%,rgba(61,139,255,.35),transparent 70%),linear-gradient(rgba(217,222,229,.04) 1px,transparent 1px) 0 0/60px 60px,linear-gradient(90deg,rgba(217,222,229,.04) 1px,transparent 1px) 0 0/60px 60px"></div>
<svg viewBox="0 0 1000 400" style="position:absolute;right:-60px;bottom:30px;width:900px" fill="none" stroke="#D9DEE5" stroke-width="2.2"><path d="${body}"/><circle cx="250" cy="318" r="54"/><circle cx="250" cy="318" r="36"/><circle cx="800" cy="318" r="54"/><circle cx="800" cy="318" r="36"/></svg>
<div style="position:absolute;left:70px;top:70px;font:700 54px 'DejaVu Sans Mono',monospace;letter-spacing:.14em">MIRI<span style="color:#3D8BFF">KOM</span></div>
<div style="position:absolute;left:72px;top:140px;font:20px monospace;letter-spacing:.2em;color:#8A94A3">BMW SERVICE · SINCE 2000</div>
<div style="position:absolute;left:70px;top:230px;font:800 84px 'DejaVu Sans',sans-serif;line-height:1;text-transform:uppercase;width:700px">Сервис BMW<br>с 2000 года</div>
<div style="position:absolute;left:72px;bottom:60px;font:26px sans-serif;color:#D9DEE5">Чиним то, что нужно, — и объясняем почему</div>
</body></html>`;
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.screenshot({ path: "public/og.jpg", type: "jpeg", quality: 88 });
await b.close();
