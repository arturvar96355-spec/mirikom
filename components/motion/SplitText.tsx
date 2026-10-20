"use client";
import { motion, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const word: Variants = {
  hidden: { y: "110%" },
  show: (c: { i: number; d: number }) => ({ y: 0, transition: { duration: 0.9, delay: c.d + c.i * 0.05, ease } }),
};

/** Заголовок по словам: маска снизу вверх, stagger 50 мс. Триггер — на контейнере (дочерние слова обрезаны маской). */
export function SplitText({ text, className, delay = 0, as = "span", inView = false }: { text: string; className?: string; delay?: number; as?: "span" | "h1" | "h2" | "h3"; inView?: boolean }) {
  const words = text.split(" ");
  const M = motion[as] as typeof motion.span;
  const trigger = inView ? { whileInView: "show", viewport: { once: true, amount: 0.3 } } : { animate: "show" };
  return (
    <M className={className} aria-label={text.replace(/ /g, " ")} initial="hidden" {...trigger}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span className="inline-block" variants={word} custom={{ i, d: delay }}>{w}</motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </M>
  );
}
