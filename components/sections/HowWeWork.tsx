"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, ClipboardCheck, ScanLine, ShieldCheck, Wrench } from "lucide-react";
import { steps } from "@/content/process";
import { Gauge, START, SWEEP } from "@/components/widgets/Speedometer";
import { Rich } from "@/components/ui/Rich";
import { cn } from "@/lib/utils";

const icons = { scan: ScanLine, camera: Camera, check: ClipboardCheck, wrench: Wrench, shield: ShieldCheck } as const;

export function HowWeWork() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const needle = useRef<SVGGElement>(null);
  const arc = useRef<SVGPathElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const apply = (p: number) => {
      gsap.set(needle.current, { rotation: START + SWEEP * p, svgOrigin: "110 110" });
      if (arc.current) arc.current.style.strokeDashoffset = String(1 - p);
      const s = Math.min(steps.length - 1, Math.floor(p * steps.length));
      setStep((o) => (o === s ? o : s));
    };
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => Math.max(0, (track.current?.scrollWidth ?? 0) - (viewport.current?.clientWidth ?? 0));
      gsap.to(track.current, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${Math.max(dist(), window.innerHeight * 3)}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: (self) => apply(self.progress) },
      });
    });
    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.create({ trigger: track.current, start: "top 70%", end: "bottom 60%", scrub: true, onUpdate: (self) => apply(self.progress) });
    });
    apply(0);
    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={section} className="relative overflow-clip bg-graphite py-16 md:flex md:min-h-screen md:items-center md:py-0">
      <div aria-hidden className="bg-mm absolute inset-0 opacity-70" />
      <div className="container-x relative flex w-full flex-col gap-6 md:grid md:grid-cols-12 md:items-center md:gap-10">
        <div className="max-md:contents md:col-span-4 md:self-center">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-3"><span className="text-volt">03</span><span className="h-px w-8 bg-line" />Как работаем</p>
            <h2 className="h-display text-[clamp(1.9rem,4vw,3.6rem)]">Пять шагов. Ничего <span className="text-volt">без Вашего «да»</span></h2>
          </div>
          <div className="max-md:sticky max-md:top-16 max-md:z-20 max-md:-mx-5 max-md:flex max-md:items-center max-md:gap-4 max-md:bg-graphite/90 max-md:px-5 max-md:py-2 max-md:backdrop-blur md:mt-6">
            <div className="max-md:w-24 md:mx-auto md:w-full"><Gauge step={step} total={steps.length} label={steps[step].title} needleRef={needle} arcRef={arc} /></div>
            <p className="font-mono text-xs uppercase tracking-widest text-mute md:hidden">Этап {step + 1} / {steps.length}<br /><span className="text-chrome">{steps[step].title}</span></p>
          </div>
        </div>
        <div ref={viewport} className="md:col-span-8 md:overflow-hidden md:[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] md:-mr-[calc((100vw-min(100vw,1360px))/2+40px)]">
          <div ref={track} className="flex flex-col gap-5 md:w-max md:flex-row md:gap-6 md:pr-[8vw]">
            {steps.map((s, i) => {
              const Icon = icons[s.icon];
              const on = i === step;
              return (
                <article key={s.n} className={cn("chrome-edge relative flex flex-col p-6 transition-[opacity,transform,box-shadow] duration-500 md:min-h-[26rem] md:w-[min(34vw,26rem)] md:shrink-0 md:p-8", on ? "shadow-[0_0_40px_rgba(61,139,255,0.18)] md:-translate-y-1" : "md:opacity-60")}>
                  <div className="flex items-start justify-between">
                    <span className="font-display text-6xl leading-none text-volt/80 md:text-7xl">{s.n}</span>
                    <Icon className="text-chrome" size={28} strokeWidth={1.4} />
                  </div>
                  <h3 className="h-display mt-6 text-3xl">{s.title}</h3>
                  <p className="mt-3 text-chrome/75"><Rich>{s.text}</Rich></p>
                  {s.n === "02" ? <PhoneMock /> : <Icon aria-hidden className="pointer-events-none absolute bottom-6 right-6 text-chrome/10" size={150} strokeWidth={0.5} />}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="mt-auto pt-6">
      <div className="mx-auto w-full max-w-[260px] rounded-[22px] border border-line bg-graphite p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="rounded-[16px] bg-[#10151c] p-3">
          <div className="mb-3 flex items-center gap-2 border-b border-line pb-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-volt font-display text-[10px]">M</span><span className="text-xs text-chrome">Mirikom</span><span className="ml-auto font-mono text-[9px] text-mute">онлайн</span></div>
          <div className="max-w-[92%] rounded-xl rounded-tl-sm bg-steel p-2">
            <div className="grid aspect-[4/3] place-items-center rounded-md border border-dashed border-mute/50 bg-graphite/60 font-mono text-[9px] text-mute">[снимок — из отчёта]</div>
            <p className="mt-2 text-xs text-chrome">Вот что нашли: <span className="placeholder-chip text-[10px]">[…]</span></p>
            <p className="mt-1 text-right font-mono text-[9px] text-mute">12:40</p>
          </div>
        </div>
      </div>
    </div>
  );
}
