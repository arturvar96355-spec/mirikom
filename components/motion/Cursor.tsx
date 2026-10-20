"use client";
import { useEffect, useRef } from "react";

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shrink = false;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement | null;
      shrink = !!t?.closest("a,button,input,select,textarea,[role=button],[data-hover]");
    };
    const tick = () => {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 22}px, ${ry - 22}px, 0) scale(${shrink ? 0.55 : 1})`;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block">
      <div ref={ring} className="absolute left-0 top-0 h-11 w-11 rounded-full border border-chrome/60 transition-[scale] duration-200 will-change-transform">
        <span className="absolute left-1/2 top-[-5px] h-2 w-px -translate-x-1/2 bg-volt" /><span className="absolute bottom-[-5px] left-1/2 h-2 w-px -translate-x-1/2 bg-volt" />
        <span className="absolute left-[-5px] top-1/2 h-px w-2 -translate-y-1/2 bg-volt" /><span className="absolute right-[-5px] top-1/2 h-px w-2 -translate-y-1/2 bg-volt" />
      </div>
      <div ref={dot} className="absolute left-0 top-0 h-1 w-1 rounded-full bg-volt will-change-transform" />
    </div>
  );
}
