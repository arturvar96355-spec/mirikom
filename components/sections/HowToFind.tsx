import { ExternalLink, Navigation } from "lucide-react";
import { route } from "@/content/copy";
import { site } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Rich } from "@/components/ui/Rich";
import { Button } from "@/components/ui/Button";

export function HowToFind({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="route" className={`relative scroll-mt-20 border-t border-line bg-[#0e1115] py-24 md:py-36 ${standalone ? "pt-40" : ""}`}>
      <div className="container-x">
        <SectionHead n="08" eyebrow="Как нас найти" title="Четыре шага от улицы до бокса" lead={`${site.address}. Вход со двора — идите по шагам.`} />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {route.map((r, i) => (
            <Reveal key={r.n} as="li" delay={i * 0.08}>
              <div className="chrome-edge h-full p-4">
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-md border border-dashed border-mute/40 bg-graphite/60">
                  <div aria-hidden className="bg-mm absolute inset-0" />
                  <span className="relative placeholder-chip text-[11px]">{r.photo}</span>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <span className="font-display text-4xl leading-none text-volt">{r.n}</span>
                  <p className="pt-1 text-chrome"><Rich>{r.title}</Rich></p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={site.yandexMapsHref} external><ExternalLink size={16} /> Открыть в Яндекс Картах</Button>
          <Button variant="ghost" href={site.yandexNavHref} external><Navigation size={16} /> Яндекс Навигатор</Button>
        </div>
      </div>
    </section>
  );
}
