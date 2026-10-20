"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { serviceGroups } from "@/content/services";
import { SectionHead } from "@/components/ui/SectionHead";
import { Rich } from "@/components/ui/Rich";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/lib/booking-context";

export function ServicesPrices({ standalone = false }: { standalone?: boolean }) {
  const [open, setOpen] = useState<string>("maintenance");
  const { openBooking } = useBooking();
  return (
    <section id="services" className={`relative scroll-mt-20 py-24 md:py-36 ${standalone ? "pt-40" : ""}`}>
      <div className="container-x">
        <SectionHead n="04" eyebrow="Услуги и цены" title="Цена — до начала работ" lead="Если в процессе нашли ещё что-то — сначала звоним Вам." />
        <Reveal className="mt-12">
          <div className="border-t border-line">
            {serviceGroups.map((g, gi) => {
              const on = open === g.id;
              return (
                <div key={g.id} className="border-b border-line">
                  <button aria-expanded={on} onClick={() => setOpen(on ? "" : g.id)} className="group flex min-h-20 w-full items-center gap-4 py-5 text-left md:gap-8">
                    <span className="font-mono text-xs text-volt">0{gi + 1}</span>
                    <span className="h-display flex-1 text-2xl transition-colors group-hover:text-volt md:text-4xl">{g.title}</span>
                    <span className="hidden text-sm text-mute md:block">{g.lead}</span>
                    <motion.span animate={{ rotate: on ? 45 : 0 }} className="grid h-10 w-10 place-items-center rounded-full border border-line text-chrome"><Plus size={18} /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <ul className="pb-6 md:pl-14">
                          {g.items.map((it) => (
                            <li key={it.name} className="flex flex-col gap-3 border-t border-line/60 py-4 sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-lg">{it.name}</span>
                              <span className="flex items-center gap-5">
                                <span className="font-mono text-chrome"><Rich>{it.price}</Rich></span>
                                <Button variant="ghost" magnetic={false} onClick={() => openBooking({ zone: g.title })}>Записаться</Button>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
