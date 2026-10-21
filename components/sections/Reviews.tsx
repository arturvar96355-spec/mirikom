import { ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { reviewQuotes } from "@/content/copy";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { Rich } from "@/components/ui/Rich";
import { Button } from "@/components/ui/Button";

export function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="container-x">
        <SectionHead n="07" eyebrow="Отзывы" title="Что пишут на Яндекс Картах" />
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4" blur={false}>
            <div className="chrome-edge relative p-8">
              <div className="font-display text-[6.5rem] leading-none text-chrome"><CountUp to={site.rating.value} decimals={1} /><span className="text-volt">★</span></div>
              <p className="mt-2 font-mono text-sm text-mute"><CountUp to={site.rating.count} /> оценки · {site.rating.reviews} отзыва · Яндекс Карты</p>
              <span className="mt-5 inline-flex items-center gap-2 border border-volt/60 bg-volt/10 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-white">{site.rating.badge}</span>
              <div className="mt-6"><Button variant="ghost" href={site.yandexMapsHref} external><ExternalLink size={15} /> Читать на Картах</Button></div>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {reviewQuotes.map((q, i) => (
              <Reveal key={i} delay={(i % 2) * 0.1}>
                <figure className="chrome-edge h-full p-6">
                  <div className="mb-3 text-volt" aria-hidden>★★★★★</div>
                  <blockquote className="text-chrome/85"><Rich>{`«${q.text}»`}</Rich></blockquote>
                  <figcaption className="mt-4 font-mono text-[11px] text-mute">{q.author}{q.car ? ` · ${q.car}` : ""} — отзыв на Яндекс Картах</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
