"use client";
import { useRef } from "react";

export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <span
      ref={ref}
      className="inline-block transition-transform duration-300 ease-out will-change-transform"
      onMouseMove={(e) => {
        if (!fine() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}
    >
      {children}
    </span>
  );
}
