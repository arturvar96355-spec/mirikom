"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { zones } from "@/content/symptoms";
import { site } from "@/content/site";
import { CarBlueprint } from "@/components/art/CarBlueprint";
import { ZONE_ANCHORS } from "@/components/art/carGeometry";
import { usePauseOffscreen } from "@/components/motion/usePauseOffscreen";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { formatRub } from "@/lib/typograph";
import { useBooking } from "@/lib/booking-context";

const pct = (v: number, max: number) => `${(v / max) * 100}%`;

export function Symptoms() {
  const [id, setId] = useState("engine");
  const zone = zones.find((z) => z.id === id)!;
  const { openBooking } = useBooking();
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const hover = (z: string) => { clearTimeout(timer.current); timer.current = window.setTimeout(() => setId(z), 110); };
  const cancel = () => clearTimeout(timer.current);
  const sec = useRef<HTMLElement>(null);
  usePauseOffscreen(sec);
  useEffect(() => { const el = scroller.current; if (el && window.innerWidth < 768) el.scrollLeft = el.scrollWidth; }, []);
  return (
    <section ref={sec} className="relative border-y border-line bg-[#0e1115] py-24 md:py-36">
      <div aria-hidden className="bg-mm absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent)]" />
      <div className="container-x relative">
        <SectionHead n="02" eyebrow="Диагностика" title="Что беспокоит в Вашей BMW?" lead="Нажмите на узел, который шумит, стучит или горит на панели. Покажем типичные симптомы и запишем на диагностику." />

        <Reveal className="mt-12" blur={false}>
          <div className="relative border border-line bg-graphite/60">
            {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-b border-l", "right-0 bottom-0 border-b border-r"].map((c) => (
              <span key={c} aria-hidden className={`absolute h-3 w-3 border-volt ${c}`} />
            ))}
            <div aria-hidden className="absolute left-4 top-3 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-mute md:block">X-RAY · вид сбоку</div>
            <div ref={scroller} className="overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-lenis-prevent-wheel>
            <div className="relative mx-auto w-full min-w-[760px] md:min-w-0" style={{ aspectRatio: "1320 / 460" }}>
              <CarBlueprint uid="sym" xray={1} active={id} dims className="absolute inset-0 h-full w-full text-chrome" />
              {/* выносные линии */}
              <svg aria-hidden viewBox="0 0 1320 460" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" fill="none">
                {zones.map((z) => {
                  const a = ZONE_ANCHORS[z.id];
                  const on = z.id === id;
                  const ly = z.label.y + (z.label.y < 200 ? 14 : -4);
                  return (
                    <polyline key={z.id} points={`${a.x},${a.y} ${z.label.x},${ly + (z.label.y < 200 ? 0 : 0)}${z.id === "brakes" ? ` ${z.label.x - 8},${ly}` : ""}`}
                      stroke={on ? "#5aa0ff" : "#8a94a3"} strokeOpacity={on ? 1 : 0.35} strokeWidth={on ? 1.4 : 0.8} style={{ transition: "all .4s" }} />
                  );
                })}
              </svg>
              {zones.map((z) => {
                const a = ZONE_ANCHORS[z.id];
                const on = z.id === id;
                return (
                  <div key={z.id}>
                    <button aria-label={z.name} aria-pressed={on} onClick={() => setId(z.id)} onMouseEnter={() => hover(z.id)} onMouseLeave={cancel} onFocus={() => setId(z.id)}
                      className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center" style={{ left: pct(a.x, 1320), top: pct(a.y, 460) }}>
                      <span aria-hidden className="absolute h-5 w-5 rounded-full border border-volt" style={{ animation: "pulse-ring 1.6s ease-out infinite" }} />
                      <span aria-hidden className={`relative h-3 w-3 rounded-full border border-graphite transition-all ${on ? "scale-125 bg-volt shadow-[0_0_14px_#3d8bff]" : "bg-chrome"}`} />
                    </button>
                    <button tabIndex={-1} aria-hidden onClick={() => setId(z.id)} onMouseEnter={() => hover(z.id)} onMouseLeave={cancel}
                      className={`absolute hidden -translate-y-1/2 whitespace-nowrap border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors md:block ${z.label.align === "start" ? "" : "-translate-x-1/2"} ${on ? "border-volt bg-volt/15 text-white" : "border-line bg-graphite/80 text-mute hover:text-chrome"}`}
                      style={{ left: pct(z.label.x, 1320), top: pct(z.label.y, 460) }}>{z.name}</button>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2 md:hidden">
          {zones.map((z) => (<button key={z.id} onClick={() => setId(z.id)} className={`min-h-11 rounded-md border px-3 text-sm ${z.id === id ? "border-volt bg-volt/15" : "border-line"}`}>{z.name}</button>))}
        </div>

        <div className="chrome-edge mt-6 grid gap-6 p-6 md:p-8 lg:grid-cols-12 lg:items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={zone.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} aria-live="polite" className="contents">
              <div className="lg:col-span-3">
                <p className="eyebrow text-volt">Узел</p>
                <h3 className="h-display mt-2 text-3xl md:text-4xl">{zone.name}</h3>
                <p className="mt-2 text-sm text-mute">Типичные симптомы</p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-6">
                {zone.symptoms.map((s) => (
                  <li key={s}><button onClick={() => openBooking({ zone: zone.name, symptom: s })} className="flex min-h-12 w-full items-center gap-3 rounded-md border border-line px-4 py-3 text-left text-chrome transition-colors hover:border-volt hover:bg-volt/10">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{s}</button></li>
                ))}
              </ul>
              <div className="lg:col-span-3 lg:text-right"><Button onClick={() => openBooking({ zone: zone.name })}>Записаться на диагностику — {formatRub(site.diagnosticsPrice)}</Button></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
