"use client";
import { useId } from "react";

/** Вид спереди: двойные «ноздри», «ангельские глазки», силовые рёбра капота. Собственный чертёж. */
export function CarFront({ className, glow = true }: { className?: string; glow?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const kidney = (side: 1 | -1) => {
    const x = (v: number) => 260 + side * v;
    // «ноздря»: трапеция, расширяющаяся вниз, со скруглённым верхом
    const d = `M${x(4)} 196 L${x(4)} 224 L${x(60)} 224 C${x(66)} 224 ${x(68)} 220 ${x(66)} 214 L${x(58)} 192 C${x(56)} 188 ${x(52)} 186 ${x(46)} 186 L${x(10)} 186 C${x(6)} 186 ${x(4)} 190 ${x(4)} 196 Z`;
    return (
      <g key={side}>
        <path d={d} fill={`url(#${uid}k)`} />
        <path d={d} className="kid-edge" />
        {Array.from({ length: 9 }, (_, i) => <line key={i} x1={x(10 + i * 6)} y1="190" x2={x(10 + i * 6)} y2="224" strokeOpacity=".55" />)}
      </g>
    );
  };
  const head = (side: 1 | -1) => {
    const x = (v: number) => 260 + side * v;
    return (
      <g key={side}>
        <path d={`M${x(86)} 196 C${x(110)} 186 ${x(150)} 182 ${x(176)} 186 L${x(188)} 204 C${x(160)} 212 ${x(120)} 214 ${x(96)} 214 Z`} fill="rgba(207,227,255,0.08)" />
        <circle cx={x(124)} cy="200" r="11" className="eye" /><circle cx={x(158)} cy="198" r="10" className="eye" />
        <path d={`M${x(96)} 214 C${x(130)} 216 ${x(160)} 212 ${x(186)} 204`} strokeOpacity=".7" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 520 300" fill="none" strokeLinejoin="round" strokeLinecap="round" className={className} role="img" aria-label="Схема автомобиля, вид спереди" stroke="#d9dee5" strokeWidth="1.4">
      <defs>
        <linearGradient id={`${uid}k`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3d8bff" stopOpacity=".28" /><stop offset="1" stopColor="#3d8bff" stopOpacity=".06" /></linearGradient>
        <linearGradient id={`${uid}b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f2630" /><stop offset="1" stopColor="#0b0d10" /></linearGradient>
        <radialGradient id={`${uid}g`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#3d8bff" stopOpacity=".45" /><stop offset="1" stopColor="#3d8bff" stopOpacity="0" /></radialGradient>
      </defs>
      {glow && <ellipse cx="260" cy="215" rx="255" ry="100" fill={`url(#${uid}g)`} stroke="none" />}
      <ellipse cx="260" cy="272" rx="230" ry="9" fill="#000" fillOpacity=".5" stroke="none" />
      {/* колёса сбоку */}
      {[-1, 1].map((s) => <rect key={s} x={s < 0 ? 62 : 418} y="214" width="40" height="56" rx="8" fill="#0b0d10" strokeOpacity=".7" />)}
      {/* кузов */}
      <path d="M84 244 L80 212 C80 184 96 170 120 164 L148 118 C158 100 176 92 196 90 L324 90 C344 92 362 100 372 118 L400 164 C424 170 440 184 440 212 L436 244 C434 258 424 264 410 264 L110 264 C96 264 86 258 84 244 Z" fill={`url(#${uid}b)`} />
      {/* крыша и лобовое */}
      <path d="M150 124 C160 104 176 96 198 94 L322 94 C344 96 360 104 370 124 L388 160 L132 160 Z" fill="rgba(61,139,255,0.10)" />
      <path d="M170 124 L350 124 M160 144 L360 144" strokeOpacity=".35" />
      {/* зеркала */}
      {[-1, 1].map((s) => <path key={s} d={`M${260 + s * 138} 150 L${260 + s * 160} 146 L${260 + s * 164} 160 L${260 + s * 140} 166 Z`} fill="#1a1f26" />)}
      {/* капот: силовые рёбра */}
      <path d="M132 160 L388 160" />
      <path d="M170 160 C174 172 180 182 188 186 M350 160 C346 172 340 182 332 186 M232 162 L236 184 M288 162 L284 184" strokeOpacity=".55" />
      {/* фары */}
      {head(-1)}{head(1)}
      {/* «ноздри» */}
      <g className="kid">{kidney(-1)}{kidney(1)}</g>
      {/* нижние воздухозаборники */}
      <path d="M130 236 L390 236 L378 258 L142 258 Z" fill="#0b0d10" strokeOpacity=".8" />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={172 + i * 15} y1="240" x2={174 + i * 15} y2="254" strokeOpacity=".4" />)}
      <path d="M96 228 L124 228 L128 250 L100 250 Z M424 228 L396 228 L392 250 L420 250 Z" strokeOpacity=".7" />
      <path d="M236 228 L284 228" strokeOpacity=".6" />
    </svg>
  );
}
