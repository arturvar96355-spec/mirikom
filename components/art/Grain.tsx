/** Статичное зерно: готовая PNG-текстура, обычное наложение (без blend-режимов — они дорогие при движении под ним). */
export function Grain({ opacity = 0.06 }: { opacity?: number }) {
  return <div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: opacity * 1.1, backgroundImage: "url(/img/noise.png)", backgroundSize: "160px 160px" }} />;
}
