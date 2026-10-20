"use client";
import { Send, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { BookingForm } from "@/components/widgets/BookingForm";
import { SplitText } from "@/components/motion/SplitText";
import { Grain } from "@/components/art/Grain";
import { typograph } from "@/lib/typograph";

export function FinalCTA() {
  return (
    <section id="contact" className="relative isolate scroll-mt-20 overflow-hidden py-24 md:py-40">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(61,139,255,0.28),transparent_70%)]" />
      <div aria-hidden className="bg-mm absolute inset-0 -z-10 opacity-70" />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-4 flex items-center gap-3"><span className="text-volt">09</span><span className="h-px w-8 bg-line" />Связь</p>
          <h2 className="h-display text-[clamp(2.4rem,6.4vw,5.6rem)]"><SplitText as="span" inView text={typograph("Расскажите, что с машиной. Ответим в Telegram")} /></h2>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" href={site.telegramHref} external><Send size={16} /> Telegram</Button>
              <Button size="lg" variant="ghost" href={site.phoneHref}><Phone size={16} /> {site.phone}</Button>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6" delay={0.15}>
          <div className="chrome-edge p-6 md:p-8"><BookingForm /></div>
        </Reveal>
      </div>
      <Grain opacity={0.05} />
    </section>
  );
}
