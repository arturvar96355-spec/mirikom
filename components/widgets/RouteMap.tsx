"use client";
import { useEffect, useMemo, useRef } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";

export const WAYPOINTS = [
  { x: 366, y: 472 },
  { x: 366, y: 380 },
  { x: 452, y: 380 },
  { x: 452, y: 318 },
] as const;
const PATH = "M70 472 L366 472 L366 380 L452 380 L452 318";

/** Условная схема двора: улица, ограда, здание, маршрут и маркер. Реальная схема — от клиента. */
export function RouteMap({ step }: { step: number }) {
  const path = useRef<SVGPathElement>(null);
  const car = useRef<SVGGElement>(null);
  const progress = useMotionValue(0);
  const marks = useRef<number[]>([0.0, 0.5, 0.75, 1]);

  // доли длины маршрута для каждой вехи
  useEffect(() => {
    const p = path.current;
    if (!p) return;
    const len = p.getTotalLength();
    const seg = [296, 92, 86, 62]; // 70→366, затем участки
    const cum = [seg[0], seg[0] + seg[1], seg[0] + seg[1] + seg[2], seg[0] + seg[1] + seg[2] + seg[3]];
    marks.current = cum.map((c) => c / len);
  }, []);

  useEffect(() => {
    const target = marks.current[step] ?? 1;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = animate(progress, target, reduce ? { duration: 0 } : { duration: 1.3, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [step, progress]);

  useMotionValueEvent(progress, "change", (v) => {
    const p = path.current, g = car.current;
    if (!p || !g) return;
    const len = p.getTotalLength();
    const d = Math.min(len, Math.max(0, v * len));
    const a = p.getPointAtLength(d), b = p.getPointAtLength(Math.min(len, d + 2));
    const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    g.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${ang})`);
    p.style.strokeDashoffset = String(1 - v);
  });

  const hatch = useMemo(() => "rm-hatch", []);
  return (
    <svg viewBox="0 0 800 560" className="h-auto w-full" fill="none" strokeLinejoin="round" strokeLinecap="round" role="img" aria-label="Условная схема проезда во двор">
      <defs>
        <pattern id={hatch} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" stroke="#d9dee5" strokeOpacity=".09" strokeWidth="2" /></pattern>
        <linearGradient id="rm-road" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#1a1f26" /><stop offset="1" stopColor="#12161c" /></linearGradient>
        <radialGradient id="rm-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#3d8bff" stopOpacity=".5" /><stop offset="1" stopColor="#3d8bff" stopOpacity="0" /></radialGradient>
      </defs>
      {/* кварталы */}
      {[[40, 60, 200, 150], [280, 40, 230, 110], [650, 60, 120, 190], [40, 240, 170, 150], [650, 290, 120, 130]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill={`url(#${hatch})`} stroke="#2a313b" />
      ))}
      {/* улица */}
      <rect x="0" y="430" width="800" height="90" fill="url(#rm-road)" />
      <line x1="0" y1="430" x2="800" y2="430" stroke="#d9dee5" strokeOpacity=".35" />
      <line x1="0" y1="520" x2="800" y2="520" stroke="#d9dee5" strokeOpacity=".35" />
      <line x1="0" y1="475" x2="800" y2="475" stroke="#8a94a3" strokeOpacity=".5" strokeDasharray="18 14" />
      <text x="700" y="508" textAnchor="end" fill="#8a94a3" style={{ font: "500 15px var(--font-plex-mono)", letterSpacing: ".16em" }}>МОЛОДОГВАРДЕЙСКАЯ УЛ.</text>
      {/* территория */}
      <path d="M250 430 L250 190 L610 190 L610 430" stroke="#8a94a3" strokeOpacity=".7" strokeDasharray="6 5" />
      <path d="M250 430 L330 430 M402 430 L610 430" stroke="#8a94a3" strokeOpacity=".7" />
      <g stroke="#d9dee5" strokeWidth="3"><path d="M330 424 L330 436 M402 424 L402 436" /></g>
      {/* здания во дворе */}
      <rect x="270" y="215" width="130" height="90" rx="4" fill={`url(#${hatch})`} stroke="#2a313b" />
      <rect x="410" y="215" width="170" height="104" rx="4" fill="rgba(61,139,255,0.12)" stroke="#3d8bff" />
      <text x="495" y="258" textAnchor="middle" fill="#d9dee5" style={{ font: "500 26px var(--font-plex-mono)" }}>61с17</text>
      <text x="495" y="288" textAnchor="middle" fill="#8a94a3" style={{ font: "400 14px var(--font-plex-mono)", letterSpacing: ".18em" }}>MIRIKOM</text>
      <rect x="280" y="335" width="60" height="70" rx="3" fill={`url(#${hatch})`} stroke="#2a313b" />
      {/* ворота внутри */}
      <g stroke="#ff5a1f" strokeWidth="3"><path d="M428 372 L428 388 M476 372 L476 388" /></g>
      {/* вход в бокс */}
      <path d="M436 319 L468 319" stroke="#d9dee5" strokeWidth="4" />
      {/* маршрут */}
      <path d={PATH} stroke="#2a313b" strokeWidth="6" />
      <path d={PATH} stroke="#3d8bff" strokeOpacity=".25" strokeWidth="14" />
      <path ref={path} d={PATH} pathLength={1} stroke="#5aa0ff" strokeWidth="4" strokeDasharray="1" strokeDashoffset="1" style={{ filter: "drop-shadow(0 0 6px #3d8bff)" }} />
      {/* вехи */}
      {WAYPOINTS.map((w, i) => {
        const on = i <= step;
        return (
          <g key={i} style={{ transition: "opacity .4s" }} opacity={on ? 1 : 0.5}>
            {i === step && <circle cx={w.x} cy={w.y} r="34" fill="url(#rm-glow)" />}
            <circle cx={w.x} cy={w.y} r="19" fill={i === step ? "#3d8bff" : "#0b0d10"} stroke={on ? "#5aa0ff" : "#2a313b"} strokeWidth="2" />
            <text x={w.x} y={w.y + 7} textAnchor="middle" fill="#fff" style={{ font: "600 20px var(--font-plex-mono)" }}>{i + 1}</text>
          </g>
        );
      })}
      {/* машина-маркер */}
      <g ref={car} transform="translate(70 472)">
        <path d="M-16 -9 L10 -9 L18 0 L10 9 L-16 9 Z" fill="#d9dee5" stroke="#0b0d10" strokeWidth="2" />
        <path d="M-6 -5 L4 -5 L9 0 L4 5 L-6 5 Z" fill="#3d8bff" />
      </g>
      {/* компас */}
      <g transform="translate(740 40)" fill="#8a94a3"><circle r="16" stroke="#2a313b" /><path d="M0 -12 L4 2 L0 -1 L-4 2 Z" fill="#d9dee5" /><text y="30" textAnchor="middle" style={{ font: "400 12px var(--font-plex-mono)" }}>С</text></g>
    </svg>
  );
}
