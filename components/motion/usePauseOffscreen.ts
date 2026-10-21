"use client";
import { useEffect, type RefObject } from "react";

/** Ставит data-paused="1" на элемент, когда он вне экрана: CSS останавливает бесконечные анимации внутри. */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => el.setAttribute("data-paused", e.isIntersecting ? "0" : "1"), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}
