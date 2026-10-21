import { Accessibility, Banknote, CalendarCheck, Dog, Gift, ParkingCircle, Wifi } from "lucide-react";
import { amenities, payments } from "@/content/amenities";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Rich } from "@/components/ui/Rich";

const icons = { parking: ParkingCircle, access: Accessibility, wifi: Wifi, dog: Dog, calendar: CalendarCheck, gift: Gift } as const;

export function Amenities() {
  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow="Удобства и оплата" title="Приезжайте как удобно" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a, i) => {
            const Icon = icons[a.icon];
            return (
              <Reveal key={a.title} delay={(i % 3) * 0.08} blur={false}>
                <article className="chrome-edge flex h-full gap-4 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-line text-volt"><Icon size={22} strokeWidth={1.5} /></span>
                  <div><h3 className="font-display text-lg uppercase tracking-wide">{a.title}</h3><p className="mt-1 text-sm text-chrome/70"><Rich>{a.text}</Rich></p></div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1} blur={false}>
          <div className="mt-6 flex flex-wrap items-center gap-3 border border-line bg-graphite/60 p-5">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-mute"><Banknote size={16} className="text-volt" />Оплата</span>
            {payments.map((p) => <span key={p} className="border border-line px-3 py-1.5 text-sm text-chrome">{p}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
