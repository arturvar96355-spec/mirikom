/** Статичное зерно: готовая PNG-текстура вместо дорогого SVG-фильтра. */
export function Grain({ opacity = 0.06 }: { opacity?: number }) {
  return <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ opacity, backgroundImage: "url(/img/noise.png)", backgroundSize: "160px 160px" }} />;
}
