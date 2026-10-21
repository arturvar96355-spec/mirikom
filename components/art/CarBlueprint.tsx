"use client";
import { useEffect, useState } from "react";
import { motion, type MotionValue } from "motion/react";
import {
  BODY, GLASS_FRONT, GLASS_REAR, MIRROR, PANEL_LINES, SWAGE, HANDLES, HEADLIGHT, TAILLIGHT, BUMPER_VENT, EXHAUST_TIP,
  CABIN, XRAY, WHEELS, GROUND, VB,
} from "./carGeometry";

type Props = {
  uid: string;
  className?: string;
  /** анимация построения (hero) */
  drawn?: boolean;
  /** световой проход по контуру */
  beam?: boolean;
  spin?: boolean;
  /** прозрачность «рентгена»: число или MotionValue */
  xray?: number | MotionValue<number>;
  /** подсвеченная зона */
  active?: string | null;
  /** лёгкая подпись «колёсной базы» */
  dims?: boolean;
};

const rad = (d: number) => (d * Math.PI) / 180;

function spokePaths(cx: number, cy: number) {
  // двойные спицы (стиль «Doppelspeiche»): 5 пар тонких конических спиц
  return Array.from({ length: 10 }, (_, i) => {
    const a = Math.floor(i / 2) * 72 - 90 + (i % 2 ? 9 : -9);
    const p = (r: number, da: number) => `${(cx + Math.cos(rad(a + da)) * r).toFixed(1)} ${(cy + Math.sin(rad(a + da)) * r).toFixed(1)}`;
    return `M${p(15, -4)} L${p(39, -2.2)} L${p(39, 2.2)} L${p(15, 4)} Z`;
  });
}
function Bolts({ cx, cy }: { cx: number; cy: number }) {
  return <>{Array.from({ length: 5 }, (_, i) => {
    const a = i * 72 - 54;
    return <circle key={i} cx={cx + Math.cos(rad(a)) * 9} cy={cy + Math.sin(rad(a)) * 9} r="1.6" fill="currentColor" stroke="none" />;
  })}</>;
}

/** Вращающиеся спицы — отдельный слой поверх схемы: анимация идёт на композиторе и не перерисовывает весь SVG. */
function SpinLayer({ cx, cy }: { cx: number; cy: number }) {
  return (
    <svg aria-hidden viewBox="-60 -60 120 120" className="wheel-layer pointer-events-none absolute" fill="none" stroke="#d9dee5" strokeOpacity=".9" strokeWidth="1.2" strokeLinejoin="round" color="#d9dee5"
      style={{ left: `${((cx - 60) / VB.w) * 100}%`, top: `${((cy - 60) / VB.h) * 100}%`, width: `${(120 / VB.w) * 100}%`, height: `${(120 / VB.h) * 100}%` }}>
      {spokePaths(0, 0).map((d, i) => <path key={i} d={d} fill="rgba(217,222,229,0.05)" />)}
      <Bolts cx={0} cy={0} />
    </svg>
  );
}

function Wheel({ cx, cy, spin }: { cx: number; cy: number; spin?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="60" pathLength={1} className="w-draw" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="57" strokeDasharray="1.5 3" opacity=".35" />
      <circle cx={cx} cy={cy} r="49" opacity=".6" />
      <circle cx={cx} cy={cy} r="43" strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r="40" opacity=".5" />
      {!spin && (
        <g>
          {spokePaths(cx, cy).map((d, i) => <path key={i} d={d} fill="rgba(217,222,229,0.05)" />)}
          <Bolts cx={cx} cy={cy} />
        </g>
      )}
      <circle cx={cx} cy={cy} r="12" />
      <circle cx={cx} cy={cy} r="5" fill="currentColor" stroke="none" opacity=".7" />
    </g>
  );
}

function Spring({ x, top, bot }: { x: number; top: number; bot: number }) {
  const mid = top + (bot - top) * 0.28;
  const n = 7;
  const step = (bot - 14 - mid) / n;
  let d = `M${x} ${mid}`;
  for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -11 : 11)} ${mid + step * (i + 0.5)} L${x} ${mid + step * (i + 1)}`;
  return (
    <g>
      <path d={`M${x} ${top} L${x} ${mid} M${x} ${bot - 14} L${x} ${bot}`} />
      <rect x={x - 3} y={top} width="6" height="14" rx="2" />
      <path d={d} />
      <circle cx={x} cy={bot} r="4" />
    </g>
  );
}

export function CarBlueprint({ uid, className, drawn, beam, spin, xray = 1, active = null, dims }: Props) {
  const on = (z: string) => (active === z ? "true" : active ? "dim" : "idle");
  const [beamOn, setBeamOn] = useState(!!beam);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setBeamOn(false);
  }, []);
  const id = (s: string) => `${uid}-${s}`;
  return (
    <div className={className} data-drawn={drawn ? "1" : "0"} style={{ contain: "layout paint style", transform: "translateZ(0)" }}>
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} fill="none" strokeLinejoin="round" strokeLinecap="round" className="block h-auto w-full overflow-visible" role="img" aria-label="Схема автомобиля">
      <defs>
        <linearGradient id={id("body")} x1="0" y1="140" x2="0" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1f2630" /><stop offset=".55" stopColor="#12161c" /><stop offset="1" stopColor="#0b0d10" />
        </linearGradient>
        <linearGradient id={id("edge")} x1="80" y1="0" x2="1130" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8a94a3" /><stop offset=".45" stopColor="#f1f5fa" /><stop offset="1" stopColor="#9fb4d0" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="150" x2="0" y2="245" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3d8bff" stopOpacity=".28" /><stop offset="1" stopColor="#3d8bff" stopOpacity=".03" />
        </linearGradient>
        <linearGradient id={id("spec")} x1="220" y1="0" x2="1060" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("ground")} x1="40" y1="0" x2="1160" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3d8bff" stopOpacity="0" /><stop offset=".5" stopColor="#8fb8ff" stopOpacity=".7" /><stop offset="1" stopColor="#3d8bff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("lamp")} cx="1106" cy="312" r="140" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#cfe3ff" stopOpacity=".9" /><stop offset=".25" stopColor="#6fa8ff" stopOpacity=".35" /><stop offset="1" stopColor="#3d8bff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("shadow")} cx="600" cy={GROUND} r="560" gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${GROUND}) scale(1 .055) translate(0 ${-GROUND})`}>
          <stop offset="0" stopColor="#000" stopOpacity=".75" /><stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("sweep")} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <mask id={id("beamMask")} maskUnits="userSpaceOnUse" x="0" y="0" width={VB.w} height={VB.h}>
          <rect className="beam-rect" onAnimationEnd={() => setBeamOn(false)} x="-360" y="0" width="360" height={VB.h} fill={`url(#${id("sweep")})`} />
        </mask>
        <g id={id("outline")}>
          <path d={BODY} /><path d={GLASS_REAR} /><path d={GLASS_FRONT} />
        </g>
      </defs>

      {/* тень и земля */}
      <ellipse cx="600" cy={GROUND + 2} rx="580" ry="22" fill={`url(#${id("shadow")})`} />
      <line x1="40" y1={GROUND} x2="1160" y2={GROUND} stroke={`url(#${id("ground")})`} strokeWidth="1.2" className={drawn ? "g-draw" : ""} />
      {/* осевые */}
      <g stroke="#3d8bff" strokeOpacity=".45" strokeWidth=".8" strokeDasharray="14 4 2 4" className={drawn ? "late" : ""}>
        {WHEELS.map((w) => <path key={w.cx} d={`M${w.cx} ${w.cy - 90} L${w.cx} ${GROUND + 14}`} />)}
        <path d={`M${WHEELS[0].cx - 90} ${WHEELS[0].cy} L${WHEELS[1].cx + 90} ${WHEELS[1].cy}`} />
      </g>

      {/* свет фар */}
      <ellipse cx="1112" cy="312" rx="110" ry="64" fill={`url(#${id("lamp")})`} className={drawn ? "lamp" : ""} />

      {/* кузов */}
      <path d={BODY} fill={`url(#${id("body")})`} stroke="none" className={drawn ? "fill-in" : ""} />
      <path d={GLASS_REAR} fill={`url(#${id("glass")})`} stroke="none" className={drawn ? "fill-in" : ""} />
      <path d={GLASS_FRONT} fill={`url(#${id("glass")})`} stroke="none" className={drawn ? "fill-in" : ""} />

      {/* салон */}
      <g stroke="#d9dee5" strokeOpacity=".28" strokeWidth="1" className={drawn ? "late" : ""}>
        {CABIN.map((d, i) => <path key={i} d={d} />)}
      </g>

      {/* рентген */}
      <XrayLayer id={id} on={on} opacity={xray} drawn={drawn} />

      {/* контур */}
      <g stroke={`url(#${id("edge")})`} strokeWidth="1.7" className={drawn ? "draw" : ""}>
        <path d={BODY} pathLength={1} />
        <path d={GLASS_REAR} pathLength={1} strokeWidth="1.2" />
        <path d={GLASS_FRONT} pathLength={1} strokeWidth="1.2" />
      </g>
      <g stroke="#d9dee5" strokeOpacity=".5" strokeWidth="1" className={drawn ? "late" : ""}>
        {PANEL_LINES.map((d, i) => <path key={i} d={d} />)}
        {HANDLES.map((d, i) => <path key={i} d={d} strokeWidth="3" strokeOpacity=".7" />)}
        <path d={MIRROR} fill="#1a1f26" />
        <path d={BUMPER_VENT} strokeOpacity=".7" /><path d={EXHAUST_TIP} />
        {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${1062 + i * 7} 352 L${1062 + i * 7} 360`} strokeOpacity=".5" />)}
      </g>
      <path d={HEADLIGHT} fill="#cfe3ff" fillOpacity=".12" stroke="#cfe3ff" strokeWidth="1.2" className={drawn ? "late" : ""} />
      <path d={TAILLIGHT} fill="#ff5a1f" fillOpacity=".25" stroke="#ff5a1f" strokeOpacity=".9" strokeWidth="1.2" className={drawn ? "late" : ""} />
      {/* блик на плече */}
      <path d={SWAGE} stroke={`url(#${id("spec")})`} strokeWidth="1.6" className={drawn ? "late" : ""} />

      {/* колёса */}
      <g stroke="#d9dee5" strokeOpacity=".9" strokeWidth="1.2" color="#d9dee5" className={drawn ? "wheels" : ""}>
        {WHEELS.map((w) => <Wheel key={w.cx} cx={w.cx} cy={w.cy} spin={spin} />)}
      </g>

      {/* световой проход */}
      {beamOn && (
        <g mask={`url(#${id("beamMask")})`} stroke="#fff" strokeWidth="2.4" style={{ filter: "drop-shadow(0 0 6px #7fb2ff)" }}>
          <use href={`#${id("outline")}`} />
        </g>
      )}

      {dims && (
        <g stroke="#8a94a3" strokeWidth=".9" className={drawn ? "late" : ""} fill="#8a94a3">
          <path d={`M${WHEELS[0].cx} ${GROUND + 20} L${WHEELS[1].cx} ${GROUND + 20} M${WHEELS[0].cx} ${GROUND + 14} L${WHEELS[0].cx} ${GROUND + 26} M${WHEELS[1].cx} ${GROUND + 14} L${WHEELS[1].cx} ${GROUND + 26}`} />
          <text x={(WHEELS[0].cx + WHEELS[1].cx) / 2} y={GROUND + 16} textAnchor="middle" stroke="none" style={{ font: "400 9px var(--font-plex-mono)", letterSpacing: ".2em" }}>КОЛЁСНАЯ БАЗА</text>
        </g>
      )}
    </svg>
    {spin && WHEELS.map((w) => <SpinLayer key={w.cx} cx={w.cx} cy={w.cy} />)}
    </div>
  );
}

function XrayLayer({ id, on, opacity, drawn }: { id: (s: string) => string; on: (z: string) => string; opacity: number | MotionValue<number>; drawn?: boolean }) {
  const E = XRAY.engine, G = XRAY.gearbox, S = XRAY.suspension, T = XRAY.steering, L = XRAY.electrics;
  const sty = typeof opacity === "number" ? { opacity } : { opacity };
  return (
    <motion.g style={sty} className={drawn ? "late" : ""}>
      <g className="xr" data-state={on("engine")} transform="translate(-14 4)">
        <path d={E.head} /><path d={E.block} /><path d={E.radiator} /><path d={E.intake} />
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${1086} ${298 + i * 11} L1100 ${298 + i * 11}`} strokeOpacity=".6" />)}
        {E.cylinders.map((x) => (
          <g key={x}><rect x={x} y="298" width="14" height="40" rx="2" strokeDasharray="3 3" /><rect x={x + 2} y="314" width="10" height="8" rx="1" /><path d={`M${x + 7} 322 L${x + 7} 340`} /></g>
        ))}
        <circle cx={E.pulley.cx} cy={E.pulley.cy} r={E.pulley.r} /><circle cx={E.pulley.cx} cy={E.pulley.cy} r="4" />
      </g>
      <g className="xr" data-state={on("gearbox")}>
        <path d={G.bell} /><path d={G.main} /><path d={G.tail} />
        <path d="M790 308 L790 346 M812 306 L812 348 M836 304 L836 348" strokeOpacity=".5" />
        <path d={G.shaft} strokeWidth="2.4" /><path d="M254 350 L296 350 L302 368 L248 368 Z" /><path d="M206 376 L344 376" strokeOpacity=".7" /><circle cx="560" cy="333" r="5" /><circle cx="440" cy="335" r="5" /><circle cx="344" cy="336" r="6" />
        <path d="M410 366 L520 366 L526 372 L404 372 Z M100 372 L404 369" strokeOpacity=".7" />
      </g>
      <g className="xr" data-state={on("suspension")}>
        {S.struts.map((s) => <Spring key={s.x} {...s} />)}
        <path d="M800 372 L905 376 L986 368 M205 372 L275 376 L340 370" strokeOpacity=".8" />
      </g>
      <g className="xr" data-state={on("steering")}>
        <ellipse cx={T.wheel.cx} cy={T.wheel.cy} rx={T.wheel.rx} ry={T.wheel.ry} transform={`rotate(${T.wheel.rot} ${T.wheel.cx} ${T.wheel.cy})`} strokeWidth="2.4" />
        <path d={T.column} /><path d={T.rack} strokeWidth="3" /><circle cx="850" cy="352" r="4" /><circle cx="970" cy="352" r="4" />
        <path d="M970 352 L905 376 M850 352 L905 376" strokeOpacity=".7" />
      </g>
      <g className="xr" data-state={on("brakes")}>
        {WHEELS.map((w) => (
          <g key={w.cx}>
            <circle cx={w.cx} cy={w.cy} r="35" strokeWidth="2" />
            <circle cx={w.cx} cy={w.cy} r="28" strokeDasharray="2 4" />
            <path d={`M${w.cx + 6} ${w.cy - 38} A38 38 0 0 1 ${w.cx + 36} ${w.cy - 12} L${w.cx + 26} ${w.cy - 8} A28 28 0 0 0 ${w.cx + 4} ${w.cy - 28} Z`} fill="currentColor" fillOpacity=".25" />
          </g>
        ))}
      </g>
      <g className="xr" data-state={on("electrics")}>
        <path d={L.battery} /><path d="M158 298 L158 292 L170 292 L170 298 M188 298 L188 292 L200 292 L200 298" /><path d="M162 315 L172 315 M167 310 L167 320 M190 315 L200 315" />
        <path d={L.ecu} /><path d="M696 258 L696 252 M708 258 L708 252 M720 258 L720 252 M732 258 L732 252" /><path d={L.harness} strokeDasharray="6 3" />
      </g>
    </motion.g>
  );
}
