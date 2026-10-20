"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Send } from "lucide-react";
import { site } from "@/content/site";
import { CarSilhouette } from "@/components/art/CarSilhouette";
import { Grain } from "@/components/art/Grain";
import { SplitText } from "@/components/motion/SplitText";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/lib/booking-context";
import { typograph, formatRub } from "@/lib/typograph";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { openBooking } = useBooking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const carY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-graphite">
      {/* миллиметровка + параллакс */}
      <motion.div aria-hidden style={{ y: gridY }} className="bg-mm absolute inset-[-10%_0_-10%_0] opacity-90 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_60%,#000,transparent)]" />
      {/* свет фар на полу */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_60%_55%_at_70%_100%,rgba(61,139,255,0.22),transparent_70%)]" />
      <div aria-hidden className="beam-glow absolute right-[-6%] top-[44%] h-[34%] w-[62%] opacity-0 blur-2xl [background:conic-gradient(from_90deg_at_0%_50%,transparent_0deg,rgba(170,210,255,0.55)_12deg,transparent_34deg)]" style={{ animation: "fadein 1.4s ease 3.6s forwards" }} />

      {/* HUD */}
      <div aria-hidden className="container-x pointer-events-none absolute inset-x-0 top-24 z-10 flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-mute md:top-28">
        <HudTag><span className="text-chrome">4.6 ★ · <CountUp to={262} /></span></HudTag>
        <HudTag align="right"><span className="text-chrome">с <CountUp to={2000} duration={1.8} format={(n) => Math.round(n).toString()} /></span></HudTag>
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pt-36 md:pt-40">
        <div className="eyebrow mb-5 flex items-center gap-3"><span className="inline-block h-px w-10 bg-volt" />Кунцево · Молодогвардейская, 61с17</div>
        <h1 className="h-display max-w-[16ch] text-[clamp(2.9rem,7.6vw,7.2rem)] text-chrome">
          <SplitText text={typograph("Сервис BMW с 2000 года")} delay={0.2} />
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="mt-6 max-w-xl text-lg text-chrome/80 md:text-xl">
          {typograph("Чиним то, что нужно, — и объясняем почему. Молодогвардейская, 61с17")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => openBooking()}>Записаться на диагностику</Button>
          <Button size="lg" variant="ghost" href={site.telegramHref} external><Send size={16} /> Telegram</Button>
        </motion.div>
      </div>

      {/* авто */}
      <motion.div style={{ y: carY }} className="relative z-0 mt-6 w-full md:absolute md:bottom-[6%] md:left-[36%] md:mt-0 md:w-[66%]">
        <div className="relative px-2 text-chrome/85 md:px-0">
          <CarSilhouette drawn className="relative drop-shadow-[0_0_24px_rgba(61,139,255,0.18)]" />
          <div aria-hidden className="beam-mask absolute inset-0 px-2 text-white md:px-0 [filter:drop-shadow(0_0_10px_#7fb2ff)_drop-shadow(0_0_26px_#3d8bff)]">
            <CarSilhouette glow />
          </div>
          <div aria-hidden className="absolute inset-x-[6%] bottom-[5%] h-px bg-gradient-to-r from-transparent via-volt/70 to-transparent" />
        </div>
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
