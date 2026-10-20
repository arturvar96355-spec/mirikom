"use client";
import { motion } from "motion/react";

/** Заголовок по словам: маска снизу вверх, stagger 50 мс. */
export function SplitText({ text, className, delay = 0, as = "span", inView = false }: { text: string; className?: string; delay?: number; as?: "span" | "h1" | "h2" | "h3"; inView?: boolean }) {
  const words = text.split(" ");
  const M = motion[as] as typeof motion.span;
  return (
    <M className={className} aria-label={text.replace(/ /g, " ")}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            {...(inView ? { whileInView: { y: 0 }, viewport: { once: true, amount: 0.4 } } : { animate: { y: 0 } })}
            transition={{ duration: 0.9, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </M>
  );
}
