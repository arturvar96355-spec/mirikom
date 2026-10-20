import { why } from "@/content/copy";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Glint } from "@/components/ui/Glint";
import { Rich } from "@/components/ui/Rich";

export function Why() {
  return (
    <section className="relative border-y border-line bg-[#0e1115] py-24 md:py-36">
      <div className="container-x">
        <SectionHead n="05" eyebrow="Отзывы клиентов" title="Почему к нам едут годами" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.1}>
              <Glint className="chrome-edge h-full p-7 transition-transform duration-300 hover:-translate-y-1"><article>
                <span className="font-display text-6xl text-volt/40">0{i + 1}</span>
                <h3 className="h-display mt-4 text-2xl md:text-3xl">{w.title}</h3>
                {"note" in w && <p className="mt-3 text-sm text-chrome/70">{w.note}</p>}
                <blockquote className="mt-6 border-l-2 border-volt/60 pl-4 text-chrome/80"><Rich>{w.quote}</Rich><footer className="mt-2 font-mono text-[11px] text-mute">Отзыв на Яндекс Картах</footer></blockquote>
              </article></Glint>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
