"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ExternalLink, Navigation } from "lucide-react";
import { route } from "@/content/copy";
import { site } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Rich } from "@/components/ui/Rich";
import { Button } from "@/components/ui/Button";
import { RouteMap } from "@/components/widgets/RouteMap";
import { cn } from "@/lib/utils";

export function HowToFind({ standalone = false }: { standalone?: boolean }) {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.4 });

  useEffect(() => {
    if (!auto || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setStep((s) => (s + 1) % route.length), 4800);
    return () => clearInterval(t);
  }, [auto, inView]);

  const pick = (i: number) => { setAuto(false); setStep(i); };

  return (
    <section id="route" className={cn("relative scroll-mt-20 border-t border-line bg-[#0e1115] py-24 md:py-36", standalone && "pt-40")}>
      <div aria-hidden className="bg-mm absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_50%,#000,transparent)]" />
      <div className="container-x relative">
        <SectionHead n="08" eyebrow="Как нас найти" title="Четыре шага от улицы до бокса" lead={`${site.address}. Въезд со стороны улицы — дальше по шагам.`} />
        <div ref={box} className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative border border-line bg-graphite/70">
              {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-b border-l", "right-0 bottom-0 border-b border-r"].map((c) => (<span key={c} aria-hidden className={`absolute z-10 h-3 w-3 border-volt ${c}`} />))}
              <RouteMap step={step} />
              <p className="border-t border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Схема условная · <span className="placeholder-chip normal-case tracking-normal">[реальная схема двора — от клиента]</span></p>
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <div className="space-y-3" role="tablist" aria-label="Шаги маршрута">
              {route.map((r, i) => {
                const on = i === step;
                return (
                  <div key={r.n}>
                    <button role="tab" aria-selected={on} onClick={() => pick(i)} onMouseEnter={() => !on && pick(i)}
                      className={cn("chrome-edge relative flex w-full flex-col overflow-hidden p-4 text-left transition-colors", on ? "bg-[#10213d]" : "hover:bg-[#222933]")}>
                      <span className="flex items-center gap-4">
                        <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-lg transition-colors", on ? "border-volt bg-volt text-white" : "border-line text-chrome")}>{r.n}</span>
                        <span className="text-lg text-chrome"><Rich>{r.title}</Rich></span>
                      </span>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="block overflow-hidden">
                            <span className="relative mt-4 grid aspect-[4/3] place-items-center overflow-hidden rounded-md border border-dashed border-mute/40 bg-graphite/60">
                              <span aria-hidden className="bg-mm absolute inset-0" />
                              <span className="placeholder-chip relative text-[11px]">{r.photo}</span>
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {on && auto && <motion.span key={step} aria-hidden className="absolute bottom-0 left-0 h-0.5 bg-volt" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4.8, ease: "linear" }} />}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={site.yandexMapsHref} external><ExternalLink size={16} /> Открыть в Яндекс Картах</Button>
              <Button variant="ghost" href={site.yandexNavHref} external><Navigation size={16} /> Яндекс Навигатор</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
