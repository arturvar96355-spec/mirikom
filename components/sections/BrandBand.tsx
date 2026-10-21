"use client";
import { ArrowUpRight } from "lucide-react";
import { series } from "@/content/series";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { CarFront } from "@/components/art/CarFront";
import { typograph } from "@/lib/typograph";

export function BrandBand() {
  return (
    <section id="bmw" className="relative scroll-mt-20 overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute -left-4 top-6 select-none font-display text-[clamp(9rem,28vw,26rem)] leading-none text-transparent" style={{ WebkitTextStroke: "1px rgba(217,222,229,0.07)" }}>BMW</div>
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow mb-4 flex items-center gap-3"><span className="text-volt">00</span><span className="h-px w-8 bg-line" />Специализация</p></Reveal>
          <h2 className="h-display text-[clamp(2.4rem,6.4vw,5.8rem)] text-chrome">
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
        <Reveal className="lg:col-span-6" blur={false}>
          <div className="relative border border-line bg-graphite/60 p-4 md:p-6">
            {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-b border-l", "right-0 bottom-0 border-b border-r"].map((c) => (<span key={c} aria-hidden className={`absolute h-3 w-3 border-volt ${c}`} />))}
            <p className="eyebrow absolute left-4 top-3">Вид спереди</p>
            <CarFront className="mt-4 h-auto w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
