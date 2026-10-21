"use client";
import { memo, useEffect, useState } from "react";
import { motion, type MotionValue } from "motion/react";
import {
  BODY, GLASS_FRONT, GLASS_REAR, MIRROR, PANEL_LINES, SWAGE, HANDLES, HEADLIGHT, TAILLIGHT, NOSE_GRILLE, BUMPER_VENT, EXHAUST_TIP,
  CABIN, XRAY, WHEELS, WHEEL_SCALE, GROUND, VB,
} from "./carGeometry";

type Props = {
  uid: string;
  className?: string;
  /** анимация построения (hero) */
  drawn?: boolean;
  /** световой проход по контуру */
  beam?: boolean;
  /** вращение спиц отдельным слоем */
  spin?: boolean;
  /** прозрачность «рентгена»: число или MotionValue */
  xray?: number | MotionValue<number>;
  /** подсвеченная зона */
  active?: string | null;
  dims?: boolean;
};

const rad = (d: number) => (d * Math.PI) / 180;
const S = WHEEL_SCALE;

function spokePaths() {
  // двойные спицы: 5 пар тонких конических спиц, локальные координаты колеса (центр 0,0)
  return Array.from({ length: 10 }, (_, i) => {
    const a = Math.floor(i / 2) * 72 - 90 + (i % 2 ? 9 : -9);
    const p = (r: number, da: number) => `${(Math.cos(rad(a + da)) * r).toFixed(1)} ${(Math.sin(rad(a + da)) * r).toFixed(1)}`;
    return `M${p(15, -4)} L${p(39, -2.2)} L${p(39, 2.2)} L${p(15, 4)} Z`;
  });
}
const SPOKES = spokePaths();

/** Слой со спицами: вращается отдельно на композиторе, не перерисовывая схему. */
function SpinLayer({ cx, cy }: { cx: number; cy: number }) {
  const r = 60 * S;
  return (
    <svg aria-hidden viewBox="-60 -60 120 120" className="wheel-layer pointer-events-none absolute" fill="none" stroke="#d9dee5" strokeOpacity=".9" strokeWidth="1.1" strokeLinejoin="round"
      style={{ left: `${((cx - r) / VB.w) * 100}%`, top: `${((cy - r) / VB.h) * 100}%`, width: `${((2 * r) / VB.w) * 100}%`, height: `${((2 * r) / VB.h) * 100}%` }}>
      {SPOKES.map((d, i) => <path key={i} d={d} fill="rgba(217,222,229,0.05)" />)}
    </svg>
  );
}

/** Колпак ступицы с эмблемой (не вращается, как «плавающие» колпаки). */
function HubCap({ cx, cy }: { cx: number; cy: number }) {
  const r = 11 * S;
  return (
    <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute" style={{ left: `${((cx - r) / VB.w) * 100}%`, top: `${((cy - r) / VB.h) * 100}%`, width: `${((2 * r) / VB.w) * 100}%`, height: `${((2 * r) / VB.h) * 100}%` }}>
      <circle cx="50" cy="50" r="48" fill="#0a0a0a" stroke="#cfd6df" strokeWidth="4" />
      <circle cx="50" cy="50" r="33" fill="#fff" />
      <path d="M50 17 A33 33 0 0 0 17 50 L50 50 Z M50 83 A33 33 0 0 0 83 50 L50 50 Z" fill="#1c69d4" />
    </svg>
  );
}

function Wheel({ cx, cy, spin }: { cx: number; cy: number; spin?: boolean }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${S})`}>
      <circle r="60" pathLength={1} className="w-draw" strokeWidth="2" />
      <circle r="57" strokeDasharray="1.5 3" opacity=".35" />
      <circle r="49" opacity=".6" />
      <circle r="43" strokeWidth="1.6" />
      <circle r="40" opacity=".5" />
      {!spin && SPOKES.map((d, i) => <path key={i} d={d} fill="rgba(217,222,229,0.05)" />)}
      <circle r="12" />
    </g>
  );
}

function Spring({ x, top, bot }: { x: number; top: number; bot: number }) {
  const mid = top + (bot - top) * 0.28;
  const n = 7;
  const step = (bot - 14 - mid) / n;
  let d = `M${x} ${mid}`;
  for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -12 : 12)} ${mid + step * (i + 0.5)} L${x} ${mid + step * (i + 1)}`;
  return (
    <g>
      <path d={`M${x} ${top} L${x} ${mid} M${x} ${bot - 14} L${x} ${bot}`} />
      <rect x={x - 3} y={top} width="6" height="14" rx="2" />
      <path d={d} />
      <circle cx={x} cy={bot} r="4" />
    </g>
  );
}

/** Неизменяемые слои под «рентгеном»: тень, земля, оси, фара, заливка кузова, салон. */
const Under = memo(function Under({ id, drawn }: { id: (s: string) => string; drawn?: boolean }) {
  return (
    <>
      <ellipse cx="620" cy={GROUND + 2} rx="600" ry="22" fill={`url(#${id("shadow")})`} />
      <line x1="40" y1={GROUND} x2="1300" y2={GROUND} stroke={`url(#${id("ground")})`} strokeWidth="1.2" className={drawn ? "g-draw" : ""} />
      <g stroke="#3d8bff" strokeOpacity=".45" strokeWidth=".8" strokeDasharray="14 4 2 4" className={drawn ? "late" : ""}>
        {WHEELS.map((w) => <path key={w.cx} d={`M${w.cx} ${w.cy - 100} L${w.cx} ${GROUND + 14}`} />)}
        <path d={`M${WHEELS[0].cx - 100} ${WHEELS[0].cy} L${WHEELS[1].cx + 100} ${WHEELS[1].cy}`} />
      </g>
      {/* свет фар: ближний свет с чёткой верхней границей (как у настоящего ближнего), блик линзы и пятно на асфальте */}
      <g className={drawn ? "lamp" : ""}>
        <path d="M1104 276 L1300 290 L1300 446 Z" fill={`url(#${id("cone")})`} />
        <path d="M1104 276 L1300 293 L1300 408 Z" fill={`url(#${id("cone")})`} />
        <path d="M1104 276 L1300 297 L1300 380 Z" fill={`url(#${id("cone")})`} />
        <path d="M1104 276 L1300 300 L1300 355 Z" fill={`url(#${id("cone")})`} />
        <path d="M1104 276 L1300 304 L1300 332 Z" fill={`url(#${id("cone")})`} />
        <path d="M1106 277 L1300 290" stroke={`url(#${id("cone")})`} strokeWidth="1.4" />
        <ellipse cx="1262" cy={GROUND - 1} rx="54" ry="6" fill={`url(#${id("pool")})`} />
        <circle cx="1100" cy="276" r="26" fill={`url(#${id("lamp")})`} />
        <path d="M1068 276 L1134 276" stroke={`url(#${id("streak")})`} strokeWidth="1.2" />
      </g>
      <path d={BODY} fill={`url(#${id("body")})`} stroke="none" className={drawn ? "fill-in" : ""} />
      <path d={GLASS_REAR} fill={`url(#${id("glass")})`} stroke="none" className={drawn ? "fill-in" : ""} />
      <path d={GLASS_FRONT} fill={`url(#${id("glass")})`} stroke="none" className={drawn ? "fill-in" : ""} />
      <g stroke="#d9dee5" strokeOpacity=".28" strokeWidth="1" className={drawn ? "late" : ""}>
        {CABIN.map((d, i) => <path key={i} d={d} />)}
      </g>
    </>
  );
});

/** Неизменяемые слои над «рентгеном»: контур, линии кузова, фонари, колёса, размер. */
const Over = memo(function Over({ id, drawn, spin, dims }: { id: (s: string) => string; drawn?: boolean; spin?: boolean; dims?: boolean }) {
  return (
    <>
      <g stroke={`url(#${id("edge")})`} strokeWidth="1.7" className={drawn ? "draw" : ""}>
        <path d={BODY} pathLength={1} />
        <path d={GLASS_REAR} pathLength={1} strokeWidth="1.2" />
        <path d={GLASS_FRONT} pathLength={1} strokeWidth="1.2" />
      </g>
      <g stroke="#d9dee5" strokeOpacity=".5" strokeWidth="1" className={drawn ? "late" : ""}>
        {PANEL_LINES.map((d, i) => <path key={i} d={d} />)}
        {HANDLES.map((d, i) => <path key={i} d={d} strokeWidth="3" strokeOpacity=".7" />)}
        <path d={MIRROR} fill="#1a1f26" />
        <path d={BUMPER_VENT} strokeOpacity=".7" /><path d={EXHAUST_TIP} /><path d={NOSE_GRILLE} stroke="#5aa0ff" strokeOpacity=".9" />
        {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${1064 + i * 5.5} 360 L${1064 + i * 5.5} 369`} strokeOpacity=".5" />)}
      </g>
      <path d={HEADLIGHT} fill="#cfe3ff" fillOpacity=".2" stroke="#e6f1ff" strokeWidth="1.4" className={drawn ? "late" : ""} style={{ filter: "drop-shadow(0 0 3px rgba(190,215,255,.9))" }} />
      <path d={TAILLIGHT} fill="#ff5a1f" fillOpacity=".25" stroke="#ff5a1f" strokeOpacity=".9" strokeWidth="1.2" className={drawn ? "late" : ""} />
      <path d={SWAGE} stroke={`url(#${id("spec")})`} strokeWidth="1.6" className={drawn ? "late" : ""} />
      <g stroke="#d9dee5" strokeOpacity=".9" strokeWidth="1.2" className={drawn ? "wheels" : ""}>
        {WHEELS.map((w) => <Wheel key={w.cx} cx={w.cx} cy={w.cy} spin={spin} />)}
      </g>
      {dims && (
        <g stroke="#8a94a3" strokeWidth=".9" className={drawn ? "late" : ""} fill="#8a94a3">
          <path d={`M${WHEELS[0].cx} ${GROUND + 20} L${WHEELS[1].cx} ${GROUND + 20} M${WHEELS[0].cx} ${GROUND + 14} L${WHEELS[0].cx} ${GROUND + 26} M${WHEELS[1].cx} ${GROUND + 14} L${WHEELS[1].cx} ${GROUND + 26}`} />
          <text x={(WHEELS[0].cx + WHEELS[1].cx) / 2} y={GROUND + 16} textAnchor="middle" stroke="none" style={{ font: "400 9px var(--font-plex-mono)", letterSpacing: ".2em" }}>КОЛЁСНАЯ БАЗА</text>
        </g>
      )}
    </>
  );
});

const Defs = memo(function Defs({ id }: { id: (s: string) => string }) {
  return (
    <defs>
      <linearGradient id={id("body")} x1="0" y1="118" x2="0" y2="396" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1f2630" /><stop offset=".55" stopColor="#12161c" /><stop offset="1" stopColor="#0b0d10" /></linearGradient>
      <linearGradient id={id("edge")} x1="80" y1="0" x2="1114" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#8a94a3" /><stop offset=".45" stopColor="#f1f5fa" /><stop offset="1" stopColor="#9fb4d0" /></linearGradient>
      <linearGradient id={id("glass")} x1="0" y1="130" x2="0" y2="214" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3d8bff" stopOpacity=".3" /><stop offset="1" stopColor="#3d8bff" stopOpacity=".03" /></linearGradient>
      <linearGradient id={id("spec")} x1="128" y1="0" x2="1066" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <linearGradient id={id("ground")} x1="40" y1="0" x2="1300" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3d8bff" stopOpacity="0" /><stop offset=".5" stopColor="#8fb8ff" stopOpacity=".7" /><stop offset="1" stopColor="#3d8bff" stopOpacity="0" /></linearGradient>
      <radialGradient id={id("lamp")} cx="1100" cy="276" r="26" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff" stopOpacity="1" /><stop offset=".3" stopColor="#d6e8ff" stopOpacity=".7" /><stop offset="1" stopColor="#9fc4ff" stopOpacity="0" /></radialGradient>
      <linearGradient id={id("cone")} x1="1104" y1="0" x2="1300" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f1f7ff" stopOpacity=".26" /><stop offset=".45" stopColor="#b5d3ff" stopOpacity=".08" /><stop offset="1" stopColor="#9fc4ff" stopOpacity="0" /></linearGradient>
      <radialGradient id={id("plume")} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#e3efff" stopOpacity=".5" /><stop offset=".5" stopColor="#9fc4ff" stopOpacity=".16" /><stop offset="1" stopColor="#9fc4ff" stopOpacity="0" /></radialGradient>
      <radialGradient id={id("pool")} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#cfe3ff" stopOpacity=".55" /><stop offset="1" stopColor="#cfe3ff" stopOpacity="0" /></radialGradient>
      <linearGradient id={id("streak")} x1="1072" y1="0" x2="1128" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".9" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <radialGradient id={id("shadow")} cx="620" cy={GROUND} r="600" gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${GROUND}) scale(1 .05) translate(0 ${-GROUND})`}><stop offset="0" stopColor="#000" stopOpacity=".75" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      <linearGradient id={id("sweep")} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <mask id={id("beamMask")} maskUnits="userSpaceOnUse" x="0" y="0" width={VB.w} height={VB.h}><rect className="beam-rect" x="-360" y="0" width="360" height={VB.h} fill={`url(#${id("sweep")})`} /></mask>
      <g id={id("outline")}><path d={BODY} /><path d={GLASS_REAR} /><path d={GLASS_FRONT} /></g>
    </defs>
  );
});

export function CarBlueprint({ uid, className, drawn, beam, spin, xray = 1, active = null, dims }: Props) {
  const id = (s: string) => `${uid}-${s}`;
  const [beamOn, setBeamOn] = useState(!!beam);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setBeamOn(false);
  }, []);
  const svgProps = { viewBox: `0 0 ${VB.w} ${VB.h}`, fill: "none", strokeLinejoin: "round", strokeLinecap: "round" } as const;
  const layer = "absolute inset-0 block h-full w-full overflow-visible";
  return (
    <div className={`relative ${className ?? ""}`} data-drawn={drawn ? "1" : "0"} style={{ contain: "layout paint style" }}>
      {/* нижний слой задаёт размер; три слоя — три отдельные композитные текстуры: прозрачность «рентгена» не перерисовывает весь рисунок */}
      <svg {...svgProps} className="block h-auto w-full overflow-visible" role="img" aria-label="Схема автомобиля BMW">
        <Defs id={id} />
        <Under id={id} drawn={drawn} />
      </svg>
      <div className={`absolute inset-0 ${drawn ? "late" : ""}`} style={{ willChange: "opacity" }}>
        <motion.svg {...svgProps} aria-hidden className={layer} style={{ opacity: xray }}>
          <XrayLayer active={active} />
        </motion.svg>
      </div>
      <svg {...svgProps} aria-hidden className={layer}>
        <Over id={id} drawn={drawn} spin={spin} dims={dims} />
        {beamOn && (
          <g mask={`url(#${id("beamMask")})`} stroke="#fff" strokeWidth="2.4" style={{ filter: "drop-shadow(0 0 6px #7fb2ff)" }} onAnimationEnd={() => setBeamOn(false)}>
            <use href={`#${id("outline")}`} />
          </g>
        )}
      </svg>
      {spin && WHEELS.map((w) => <SpinLayer key={`s${w.cx}`} cx={w.cx} cy={w.cy} />)}
      {WHEELS.map((w) => <HubCap key={`h${w.cx}`} cx={w.cx} cy={w.cy} />)}
    </div>
  );
}

const XrayLayer = memo(function XrayLayer({ active }: { active: string | null }) {
  const on = (z: string) => (active === z ? "true" : active ? "dim" : "idle");
  const E = XRAY.engine, G = XRAY.gearbox, S_ = XRAY.suspension, T = XRAY.steering, L = XRAY.electrics;
  return (
    <g>
      <g className="xr" data-state={on("engine")}>
        <path d={E.head} /><path d={E.block} /><path d={E.radiator} /><path d={E.intake} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} d={`M1070 ${272 + i * 11} L1084 ${272 + i * 11}`} strokeOpacity=".6" />)}
        {E.cylinders.map((x) => (
          <g key={x}><rect x={x} y="284" width="14" height="46" rx="2" strokeDasharray="3 3" /><rect x={x + 2} y="302" width="10" height="9" rx="1" /><path d={`M${x + 7} 311 L${x + 7} 334`} /></g>
        ))}
        <circle cx={E.pulley.cx} cy={E.pulley.cy} r={E.pulley.r} /><circle cx={E.pulley.cx} cy={E.pulley.cy} r="4" />
      </g>
      <g className="xr" data-state={on("gearbox")}>
        <path d={G.bell} /><path d={G.main} /><path d={G.tail} />
        <path d="M798 304 L798 348 M820 302 L820 348 M844 300 L844 348" strokeOpacity=".5" />
        <path d={G.shaft} strokeWidth="2.4" /><path d={G.diff} /><path d="M232 364 L374 364" strokeOpacity=".7" />
        <circle cx="560" cy="338" r="5" /><circle cx="440" cy="345" r="5" /><circle cx="330" cy="351" r="6" />
        <path d="M430 388 L560 388 L566 398 L424 398 Z M108 392 L424 392 M108 397 L424 397" strokeOpacity=".7" />
      </g>
      <g className="xr" data-state={on("suspension")}>
        {S_.struts.map((s) => <Spring key={s.x} {...s} />)}
        <path d={S_.arms} strokeOpacity=".8" />
      </g>
      <g className="xr" data-state={on("steering")}>
        <ellipse cx={T.wheel.cx} cy={T.wheel.cy} rx={T.wheel.rx} ry={T.wheel.ry} transform={`rotate(${T.wheel.rot} ${T.wheel.cx} ${T.wheel.cy})`} strokeWidth="2.4" />
        <path d={T.column} /><path d={T.rack} strokeWidth="3" /><circle cx="880" cy="350" r="4" /><circle cx="986" cy="350" r="4" />
        <path d="M986 350 L933 364 M880 350 L933 364" strokeOpacity=".7" />
      </g>
      <g className="xr" data-state={on("brakes")}>
        {WHEELS.map((w) => (
          <g key={w.cx} transform={`translate(${w.cx} ${w.cy}) scale(${S})`}>
            <circle r="35" strokeWidth="2" />
            <circle r="28" strokeDasharray="2 4" />
            <path d="M6 -38 A38 38 0 0 1 36 -12 L26 -8 A28 28 0 0 0 4 -28 Z" fill="currentColor" fillOpacity=".25" />
          </g>
        ))}
      </g>
      <g className="xr" data-state={on("electrics")}>
        <path d={L.battery} /><path d="M158 264 L158 258 L170 258 L170 264 M194 264 L194 258 L206 258 L206 264" /><path d="M162 282 L174 282 M168 276 L168 288 M190 282 L202 282" />
        <path d={L.ecu} /><path d="M748 258 L748 252 M760 258 L760 252 M772 258 L772 252 M784 258 L784 252" /><path d={L.harness} strokeDasharray="6 3" />
      </g>
    </g>
  );
});
