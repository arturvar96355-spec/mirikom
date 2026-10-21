import { useId } from "react";

/** Эмблема-roundel (товарный знак BMW AG; используется по решению заказчика концепта). */
export function Roundel({ className, text = true }: { className?: string; text?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="BMW">
      <defs><path id={`${id}a`} d="M 50 50 m -37 0 a 37 37 0 1 1 74 0" /></defs>
      <circle cx="50" cy="50" r="49" fill="#0a0a0a" stroke="#cfd6df" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="47.2" fill="none" stroke="#3a3f47" strokeWidth=".6" />
      <circle cx="50" cy="50" r="31" fill="#fff" />
      <path d="M50 19 A31 31 0 0 0 19 50 L50 50 Z" fill="#1c69d4" />
      <path d="M50 81 A31 31 0 0 0 81 50 L50 50 Z" fill="#1c69d4" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#0a0a0a" strokeWidth="1.2" />
      <path d="M50 19 L50 81 M19 50 L81 50" stroke="#0a0a0a" strokeWidth=".9" />
      {text && (
        <text fill="#fff" style={{ font: "600 14px var(--font-plex), Arial, sans-serif", letterSpacing: "3px" }}>
          <textPath href={`#${id}a`} startOffset="50%" textAnchor="middle">BMW</textPath>
        </text>
      )}
    </svg>
  );
}
