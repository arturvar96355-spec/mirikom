"use client";
import { motion, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const word: Variants = {
  hidden: { y: "110%" },
  show: (c: { i: number; d: number }) => ({ y: 0, transition: { duration: 0.9, delay: c.d + c.i * 0.05, ease } }),
};

/**
 * Заголовок по словам: маска снизу вверх, stagger 50 мс.
 * inView=false → чистый CSS (виден сразу после загрузки стилей, без ожидания JS — важно для LCP);
 * inView=true → Motion при входе во вьюпорт.
 */
export function SplitText({ text, className, delay = 0, as = "span", inView = false }: { text: string; className?: string; delay?: number; as?: "span" | "h1" | "h2" | "h3"; inView?: boolean }) {
  const words = text.split(" ");
  const plain = text.replace(/\u00A0/g, " ");
  if (!inView) {
    const Tag = as;
    return (
      <Tag className={className}>
        <span className="sr-only">{plain}</span>
        {words.map((w, i) => (
          <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <span className="word-up inline-block" style={{ animationDelay: `${delay + i * 0.05}s` }}>{w}</span>
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </Tag>
    );
  }
  const M = motion[as] as typeof motion.span;
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      <span className="sr-only">{plain}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span className="inline-block" variants={word} custom={{ i, d: delay }}>{w}</motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </M>
  );
}
