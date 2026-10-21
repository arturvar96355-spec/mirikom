"use client";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { series } from "@/content/series";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Roundel } from "@/components/art/Roundel";
import { typograph } from "@/lib/typograph";

const ticks = Array.from({ length: 72 }, (_, i) => i);

export function BrandBand() {
  return (
    <section id="bmw" className="relative scroll-mt-20 overflow-hidden border-b border-line py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none [transform:translate3d(0,-50%,0)] font-display text-[clamp(10rem,30vw,28rem)] leading-none text-transparent" style={{ WebkitTextStroke: "1px rgba(217,222,229,0.06)" }}>BMW</div>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_20%_50%,rgba(61,139,255,0.16),transparent_70%)]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        {/* эмблема в технической «линейке» */}
        <div className="mx-auto w-full max-w-[420px] lg:col-span-5">
          <motion.div className="relative aspect-square" initial={{ opacity: 0, scale: 0.85, rotate: -25 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
            <svg aria-hidden viewBox="-100 -100 200 200" className="absolute inset-0 h-full w-full" fill="none">
              <circle r="97" stroke="#2a313b" /><circle r="72" stroke="#2a313b" strokeDasharray="2 5" />
              {ticks.map((i) => {
                const a = (i * 5 * Math.PI) / 180, long = i % 6 === 0;
                const r1 = 97, r2 = long ? 88 : 92;
                return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} stroke={long ? "#d9dee5" : "#8a94a3"} strokeOpacity={long ? 0.9 : 0.5} strokeWidth={long ? 1.2 : 0.6} />;
              })}
              <path d="M0 -97 A97 97 0 0 1 97 0" stroke="#3d8bff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 5px #3d8bff)" }} />
            </svg>
            <div className="absolute inset-[19%] drop-shadow-[0_0_40px_rgba(61,139,255,0.35)]"><Roundel className="h-full w-full" /></div>
          </motion.div>
        </div>
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow mb-4 flex items-center gap-3"><span className="text-volt">00</span><span className="h-px w-8 bg-line" />Специализация</p></Reveal>
          <h2 className="h-display text-[clamp(2.4rem,6vw,5.4rem)] text-chrome">
            <SplitText as="span" inView text={typograph("BMW — наша работа с 2000 года")} accent="BMW" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg text-chrome/75">{typograph("Независимый сервис на Молодогвардейской. Диагностика, ТО, двигатель, КПП, ходовая, рулевое, электрика, кузов — для BMW всех серий.")}</p>
          </Reveal>
          <Reveal delay={0.25} blur={false}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Серии BMW">
              {series.map((s) => (
                <li key={s.slug}>
                  <a href={`/series/${s.slug}/`} className="group inline-flex min-h-11 items-center gap-1.5 border border-line bg-steel/60 px-3.5 font-display text-sm uppercase tracking-wider text-chrome transition-colors hover:border-volt hover:bg-volt/10">
                    <span className="text-mute transition-colors group-hover:text-volt">BMW</span>{s.label}
                    <ArrowUpRight size={13} className="-mr-0.5 text-mute opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
