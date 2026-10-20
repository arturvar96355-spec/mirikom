"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { zones } from "@/content/symptoms";
import { site } from "@/content/site";
import { BODY, WINDOWS, Wheel } from "@/components/art/CarSilhouette";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { formatRub } from "@/lib/typograph";
import { useBooking } from "@/lib/booking-context";

export function Symptoms() {
  const [id, setId] = useState("engine");
  const zone = zones.find((z) => z.id === id)!;
  const { openBooking } = useBooking();
  return (
    <section className="relative border-y border-line bg-[#0e1115] py-24 md:py-36">
      <div aria-hidden className="bg-mm absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent)]" />
      <div className="container-x relative">
        <SectionHead n="02" eyebrow="Диагностика" title="Что беспокоит?" lead="Нажмите на узел, который шумит, стучит или горит на панели. Покажем типичные симптомы и запишем на диагностику." />
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative mx-auto w-full" style={{ aspectRatio: "1000 / 400" }}>
              <svg viewBox="0 0 1000 400" fill="none" className="absolute inset-0 h-full w-full text-chrome/70" strokeLinejoin="round" aria-hidden>
                <g stroke="currentColor" strokeWidth="1.5"><path d={BODY} /><path d={WINDOWS} opacity=".6" /><Wheel cx={250} spin /><Wheel cx={800} spin /></g>
                {/* схема узлов */}
                <g stroke="currentColor" strokeWidth="1.2" opacity=".55" strokeDasharray="5 5">
                  <rect x="690" y="222" width="150" height="60" rx="8" /><rect x="520" y="256" width="130" height="44" rx="8" /><path d="M250 318 L800 318" /><path d="M650 200 L700 150" />
                </g>
                <motion.circle key={zone.id} cx={zone.x} cy={zone.y} r="60" fill="rgba(61,139,255,0.18)" stroke="#3d8bff" strokeWidth="1.5" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: `${zone.x}px ${zone.y}px` }} />
              </svg>
              {zones.map((z) => {
                const on = z.id === id;
                return (
                  <button key={z.id} aria-label={z.name} aria-pressed={on} onClick={() => setId(z.id)} onMouseEnter={() => setId(z.id)} onFocus={() => setId(z.id)}
                    className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center" style={{ left: `${z.x / 10}%`, top: `${z.y / 4}%` }}>
                    <span aria-hidden className="absolute h-5 w-5 rounded-full border border-volt" style={{ animation: "pulse-ring 1.6s ease-out infinite" }} />
                    <span aria-hidden className={`relative h-3.5 w-3.5 rounded-full transition-colors ${on ? "bg-volt shadow-[0_0_14px_#3d8bff]" : "bg-chrome"}`} />
                    <span className={`pointer-events-none absolute left-1/2 top-full mt-0 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest md:block ${on ? "text-volt" : "text-mute"}`}>{z.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 md:hidden">
              {zones.map((z) => (<button key={z.id} onClick={() => setId(z.id)} className={`min-h-11 rounded-md border px-3 text-sm ${z.id === id ? "border-volt bg-volt/15" : "border-line"}`}>{z.name}</button>))}
            </div>
          </div>
          <div className="chrome-edge p-6 md:p-8 lg:col-span-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={zone.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} aria-live="polite">
                <p className="eyebrow text-volt">Узел</p>
                <h3 className="h-display mt-2 text-3xl">{zone.name}</h3>
                <p className="mt-5 text-sm text-mute">Типичные симптомы</p>
                <ul className="mt-3 space-y-2">
                  {zone.symptoms.map((s) => (
                    <li key={s}><button onClick={() => openBooking({ zone: zone.name, symptom: s })} className="flex w-full items-center gap-3 rounded-md border border-line px-4 py-3 text-left text-chrome transition-colors hover:border-volt hover:bg-volt/10">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{s}</button></li>
                  ))}
                </ul>
                <div className="mt-6"><Button onClick={() => openBooking({ zone: zone.name })}>Записаться на диагностику — {formatRub(site.diagnosticsPrice)}</Button></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
