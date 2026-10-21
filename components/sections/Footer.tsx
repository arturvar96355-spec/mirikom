import { site } from "@/content/site";
import { Rich } from "@/components/ui/Rich";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-[#080a0c] pb-28 pt-16 md:pb-12">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-display text-3xl font-bold tracking-[0.14em]">MIRI<span className="text-volt">KOM</span></div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{site.tagline}</p>
          <p className="mt-6 max-w-sm text-sm text-mute">{site.disclaimer}</p>
        </div>
        <div className="space-y-2 text-sm md:col-span-4">
          <p className="eyebrow mb-3">Контакты</p>
          <a href={site.yandexMapsHref} target="_blank" rel="noopener noreferrer" className="block hover:text-white">{site.address}</a>
          <a href={site.phoneHref} className="block font-mono hover:text-white">{site.phone}</a>
          <a href={site.telegramHref} target="_blank" rel="noopener noreferrer" className="block hover:text-white">Telegram</a>
          <p className="text-mute"><Rich>{site.hours}</Rich></p>
        </div>
        <div className="space-y-2 text-sm md:col-span-3">
          <p className="eyebrow mb-3">Разделы</p>
          <a href="/service/" className="block hover:text-white">Услуги и цены</a>
          <a href="/how-to-find/" className="block hover:text-white">Как нас найти</a>
          <a href="/privacy/" className="block hover:text-white">Политика</a>
          <p className="pt-2 text-mute"><Rich>{site.legalEntity}</Rich></p>
        </div>
      </div>
      <div aria-hidden className="container-x mt-14 select-none overflow-hidden">
        <div className="h-display whitespace-nowrap text-[clamp(3.2rem,21.5vw,19.5rem)] leading-[.85] text-transparent" style={{ WebkitTextStroke: "1px rgba(217,222,229,0.22)", backgroundImage: "linear-gradient(180deg, rgba(61,139,255,.5), transparent 75%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>MIRIKOM</div>
      </div>
      <div className="container-x mt-8 border-t border-line pt-6 text-xs text-mute">{site.conceptMark}</div>
    </footer>
  );
}
