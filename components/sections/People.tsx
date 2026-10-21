import { people } from "@/content/copy";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Rich } from "@/components/ui/Rich";

export function People() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHead n="06" eyebrow="Люди" title="Те, о ком пишут в отзывах" lead="Клиенты в отзывах называют по именам Алексея и мастера Виталия." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
          {people.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12}>
              <article className="chrome-edge group relative overflow-hidden">
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br from-[#202733] to-[#12161c]">
                  <div aria-hidden className="bg-mm absolute inset-0 opacity-70" />
                  <svg aria-hidden viewBox="0 0 120 120" className="absolute bottom-0 h-[80%] text-chrome/10"><circle cx="60" cy="40" r="22" fill="currentColor" /><path d="M10 120 C14 80 40 70 60 70 C80 70 106 80 110 120 Z" fill="currentColor" /></svg>
                  <span className="relative font-display text-8xl text-chrome/90 transition-transform duration-500 group-hover:scale-110">{p.initials}</span>
                  <span className="absolute bottom-3 left-3 placeholder-chip text-[11px]">[фото — от клиента]</span>
                </div>
                <div className="p-6"><h3 className="h-display text-3xl">{p.name}</h3><p className="mt-1 text-mute"><Rich>{p.role}</Rich></p><p className="mt-3 text-sm text-chrome/70">{p.note}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
