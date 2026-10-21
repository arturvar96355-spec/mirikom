"use client";
import { useEffect } from "react";

/** Lenis + GSAP подгружаются после первой отрисовки, чтобы не раздувать стартовый бандл. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    let cancelled = false;
    const start = async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      cleanup = () => { gsap.ticker.remove(tick); lenis.destroy(); };
    };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = ric ? ric(start) : window.setTimeout(start, 200);
    return () => { cancelled = true; if (!ric) clearTimeout(id); cleanup(); };
  }, []);
  return <>{children}</>;
}
