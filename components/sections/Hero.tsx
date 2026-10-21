"use client";
import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { Send } from "lucide-react";
import { site } from "@/content/site";
import { CarBlueprint } from "@/components/art/CarBlueprint";
import { Grain } from "@/components/art/Grain";
import { SplitText } from "@/components/motion/SplitText";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "@/components/ui/Button";
import { usePauseOffscreen } from "@/components/motion/usePauseOffscreen";
import { useBooking } from "@/lib/booking-context";
import { typograph, formatRub } from "@/lib/typograph";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { openBooking } = useBooking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const carY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  // «рентген» проявляется плавным переходом по времени, а не покадрово от скролла — SVG не перерисовывается на каждом кадре прокрутки
  const xray = useMotionValue(0.18);
  const xrayTarget = useRef(0.18);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const t = v > 0.08 ? 1 : 0.18;
    if (xrayTarget.current === t) return;
    xrayTarget.current = t;
    animate(xray, t, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
  });
  usePauseOffscreen(ref);
  const mx = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const gx = useTransform(px, (v) => -v * 0.5);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = (e: MouseEvent) => mx.set((e.clientX / window.innerWidth - 0.5) * 26);
    window.addEventListener("mousemove", on, { passive: true });
    return () => window.removeEventListener("mousemove", on);
  }, [mx]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-graphite max-md:pb-16">
      {/* миллиметровка + параллакс */}
      <motion.div aria-hidden style={{ y: gridY, x: gx, willChange: "transform" }} className="bg-mm absolute inset-[-10%_0_-10%_0] opacity-90 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_60%,#000,transparent)]" />
      {/* свет фар на полу */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_60%_55%_at_70%_100%,rgba(61,139,255,0.22),transparent_70%)]" />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pt-36 md:pt-40">
        <div className="eyebrow mb-5 flex items-center gap-3"><span className="inline-block h-px w-10 bg-volt" />Кунцево · Молодогвардейская, 61с17</div>
        <h1 className="h-display max-w-[16ch] text-[clamp(2.9rem,7.6vw,7.2rem)] text-chrome">
          <SplitText text={typograph("Сервис BMW с 2000 года")} delay={0.05} accent="BMW" />
        </h1>
        <p style={{ animationDelay: ".35s" }} className="rise mt-6 max-w-xl text-lg text-chrome/80 md:text-xl">
          {typograph("Чиним то, что нужно, — и объясняем почему. Молодогвардейская, 61с17")}
        </p>
        <div style={{ animationDelay: ".5s" }} className="rise mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => openBooking()}>Записаться на диагностику</Button>
          <Button size="lg" variant="ghost" href={site.telegramHref} external><Send size={16} /> Telegram</Button>
        </div>
      </div>

      {/* авто */}
      <motion.div style={{ y: carY, x: px, willChange: "transform" }} className="relative z-0 -ml-[6%] mt-4 w-[112%] md:ml-0 md:absolute md:bottom-[5%] md:left-[25%] md:mt-0 md:w-[77%]">
        <CarBlueprint uid="hero" drawn beam spin xray={xray} dims className="relative h-auto w-full overflow-visible text-chrome" />
      </motion.div>

      <div aria-hidden className="container-x pointer-events-none relative z-10 flex items-end justify-between pb-6 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
        <HudTag><span className="text-chrome">{formatRub(site.diagnosticsPrice)} — диагностика</span></HudTag>
        <span className="hidden items-center gap-2 sm:flex"><span className="inline-block h-6 w-px bg-line" />scroll</span>
      </div>
      <Grain opacity={0.07} />
    </section>
  );
}

function HudTag({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <div className={`relative ${align === "right" ? "text-right" : ""}`}>
      <span className={`absolute -top-2 h-2 w-2 border-t border-volt ${align === "right" ? "right-0 border-r" : "left-0 border-l"}`} />
      <div className="px-3 py-1">{children}</div>
    </div>
  );
}
