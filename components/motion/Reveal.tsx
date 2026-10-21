"use client";
import { motion } from "motion/react";

/**
 * Появление при входе во вьюпорт: opacity + сдвиг + лёгкий blur.
 * blur=false для крупных контейнеров — blur большой площади самый дорогой фильтр; визуально разница почти не видна.
 * После проигрыша filter снимается (transitionEnd), чтобы элемент не оставался в отдельном слое.
 */
export function Reveal({ children, delay = 0, y = 32, className, as = "div", blur = true }: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "p"; blur?: boolean }) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, ...(blur ? { filter: "blur(5px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)", transitionEnd: { filter: "none" } } : {}) }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
