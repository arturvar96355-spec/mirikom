"use client";
import { useEffect } from "react";

/**
 * Пока страница скроллится, отключаем pointer-events у контента: иначе элементы, проезжающие под неподвижным курсором,
 * запускают hover-переходы и тяжёлые перерисовки (схема, маршрут) прямо в кадрах прокрутки.
 */
export function ScrollIdle() {
  useEffect(() => {
    const root = document.documentElement;
    let t = 0, on = false;
    const onScroll = () => {
      if (!on) { on = true; root.classList.add("is-scrolling"); }
      clearTimeout(t);
      t = window.setTimeout(() => { on = false; root.classList.remove("is-scrolling"); }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); root.classList.remove("is-scrolling"); };
  }, []);
  // прозрачный щит: переключение display не инвалидирует стили потомков (в отличие от pointer-events на <main>)
  return <div id="scroll-shield" aria-hidden />;
}
