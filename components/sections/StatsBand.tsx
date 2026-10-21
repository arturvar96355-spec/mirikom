"use client";
import { site } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { formatRub } from "@/lib/typograph";

export function StatsBand() {
  const cells = [
    { big: <><CountUp to={site.rating.value} decimals={1} /><span className="text-volt">★</span></>, cap: `${site.rating.count} оценки · ${site.rating.reviews} отзыва` },
    { big: <span>с <CountUp to={site.since} format={(n) => String(Math.round(n))} /></span>, cap: "Работаем с BMW" },
    { big: <CountUp to={site.diagnosticsPrice} format={(n) => formatRub(Math.round(n / 100) * 100)} />, cap: "Комплексная диагностика" },
    { big: <span className="block text-[0.5em] leading-[1.1]">{site.rating.badge}</span>, cap: "Знак на Яндекс Картах" },
  ];
  return (
    <section aria-label="Коротко о сервисе" className="relative border-y border-line bg-[#0c0f13]">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {cells.map((c, i) => (
          <Reveal key={i} delay={i * 0.08} className={`py-8 pr-4 md:py-10 ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${i % 2 ? "max-lg:border-l max-lg:border-line max-lg:pl-5" : ""} ${i > 1 ? "max-lg:border-t max-lg:border-line" : ""}`}>
            <div className="font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-none text-chrome">{c.big}</div>
            <p className="eyebrow mt-3">{c.cap}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
