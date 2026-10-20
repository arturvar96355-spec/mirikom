export function Grain({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay" style={{ opacity }}>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0" /></filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
