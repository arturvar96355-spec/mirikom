"use client";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { series } from "@/content/series";
import { SectionHead } from "@/components/ui/SectionHead";
import { SeriesPanel } from "@/components/widgets/SeriesPanel";
import { cn } from "@/lib/utils";

export function SeriesPicker() {
  const [slug, setSlug] = useState("3");
  const current = series.find((s) => s.slug === slug)!;
  return (
    <section id="series" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="container-x">
        <SectionHead n="01" eyebrow="Серия" title="Сколько стоит ТО на Вашу машину?" lead="Выберите серию — покажем состав планового обслуживания и цены «от»." />
        <LayoutGroup>
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div role="radiogroup" aria-label="Серия BMW" className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden" data-lenis-prevent-wheel>
                {series.map((s) => {
                  const on = s.slug === slug;
                  return (
                    <motion.button key={s.slug} role="radio" aria-checked={on} onClick={() => setSlug(s.slug)} animate={{ scale: on ? 0.97 : 1 }} whileHover={{ y: on ? 0 : -3 }} transition={{ type: "spring", stiffness: 400, damping: 26 }}
                      className={cn("chrome-edge glint relative grid aspect-[4/5] w-24 shrink-0 place-items-center overflow-hidden transition-colors md:w-auto", on ? "bg-[#10213d] shadow-[0_0_0_1px_var(--color-volt),0_0_28px_rgba(61,139,255,0.45),inset_0_2px_18px_rgba(0,0,0,0.6)]" : "hover:bg-[#222933]")}
                      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
                      <span className={cn("font-display text-4xl font-bold md:text-5xl", on ? "text-white" : "text-chrome/85")}>{s.label}</span>
                      <span className="absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{/^\d$/.test(s.label) ? "series" : s.slug === "m" || s.slug === "i" || s.slug === "z" ? "line" : "x"}</span>
                      {on && <span className="absolute inset-x-3 top-2 h-px bg-volt" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <motion.div layout className="chrome-edge relative p-6 md:p-8 lg:col-span-5" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                  <SeriesPanel s={current} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
