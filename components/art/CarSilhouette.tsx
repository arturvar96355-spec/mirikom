import { cn } from "@/lib/utils";

/** Собственный обобщённый силуэт (профиль, нос справа). Без решётки и без фирменных линий любого бренда. */
export const BODY =
  "M104 336 L100 290 C100 270 108 258 128 254 L188 246 C250 214 306 176 366 156 C392 148 420 146 452 146 L556 146 C606 148 646 176 704 222 L792 234 C852 240 902 248 928 260 C946 270 952 290 950 336 L868 336 A68 68 0 0 0 732 336 L318 336 A68 68 0 0 0 182 336 Z";
export const WINDOWS =
  "M226 240 C290 198 332 174 374 166 L470 162 L470 232 Z M490 162 L552 160 C592 162 628 184 676 226 L490 232 Z";
export const DETAILS =
  "M470 162 L470 330 M490 162 L490 330 M352 264 L430 264 M530 264 L608 264 M906 256 L936 266 L906 272 Z M108 266 L126 266 M706 224 L708 238";

export function Wheel({ cx, cy = 318, spin }: { cx: number; cy?: number; spin?: boolean }) {
  const spokes = Array.from({ length: 5 }, (_, i) => (i * 72 * Math.PI) / 180);
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r="54" pathLength={1} />
      <circle r="36" />
      <g className={spin ? "origin-center [transform-box:fill-box] animate-[spin_14s_linear_infinite] motion-reduce:animate-none" : ""}>
        {spokes.map((a, i) => (
          <line key={i} x1={Math.cos(a) * 10} y1={Math.sin(a) * 10} x2={Math.cos(a) * 34} y2={Math.sin(a) * 34} />
        ))}
        <circle r="9" />
      </g>
    </g>
  );
}

export function CarSilhouette({ className, drawn = false, glow = false, spin = false }: { className?: string; drawn?: boolean; glow?: boolean; spin?: boolean }) {
  return (
    <svg viewBox="0 0 1000 400" fill="none" strokeLinejoin="round" strokeLinecap="round" className={cn("h-auto w-full", className)} role="img" aria-label="Силуэт автомобиля">
      <g stroke="currentColor" strokeWidth={glow ? 2.2 : 1.6} className={drawn ? "car-draw" : ""}>
        <path d={BODY} pathLength={1} />
        <path d={WINDOWS} pathLength={1} opacity=".75" />
        <path d={DETAILS} pathLength={1} opacity=".5" />
        <Wheel cx={250} spin={spin} />
        <Wheel cx={800} spin={spin} />
      </g>
    </svg>
  );
}
