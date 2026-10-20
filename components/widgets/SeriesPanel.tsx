"use client";
import { motion } from "motion/react";
import { Wrench } from "lucide-react";
import { maintenance, type Series } from "@/content/series";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { useBooking } from "@/lib/booking-context";

export function SeriesPanel({ s }: { s: Series }) {
  const { openBooking } = useBooking();
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Плановое ТО</p>
          <h3 className="h-display mt-2 text-4xl md:text-5xl">{s.title}</h3>
          <p className="mt-2 text-sm text-mute"><Rich>{s.body}</Rich></p>
        </div>
        <div className="font-display text-6xl leading-none text-volt/30 md:text-7xl" aria-hidden>{s.label}</div>
      </div>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {maintenance.map((m, i) => (
          <motion.li key={m.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex items-center justify-between gap-4 py-3">
            <span className="flex items-center gap-3"><Wrench size={14} className="shrink-0 text-volt" />{m.name}</span>
            <span className="shrink-0 font-mono text-sm text-chrome"><Rich>{m.price}</Rich></span>
          </motion.li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-mute">Цена до начала работ. Если в процессе нашли ещё что-то — сначала звоним Вам.</p>
      <div className="mt-6"><Button onClick={() => openBooking({ series: s.slug })}>Записать мою {s.label.length <= 2 && /^\d$/.test(s.label) ? `${s.label} серию` : s.title}</Button></div>
    </div>
  );
}
