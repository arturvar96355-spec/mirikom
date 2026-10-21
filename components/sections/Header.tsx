"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/lib/booking-context";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [menu]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || menu ? "bg-graphite/80 backdrop-blur-xl border-b border-line/70" : "bg-transparent border-b border-transparent"}`}>
        <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
          <a href="/" className="group flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-[0.14em] text-chrome md:text-2xl">MIRI<span className="text-volt">KOM</span></span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{site.tagline}</span>
          </a>
          <nav aria-label="Основное" className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-u relative py-2 text-sm text-chrome/80 transition-colors hover:text-white">
                {n.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-volt transition-transform duration-300 [a:hover>&]:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="hidden items-center gap-2 font-mono text-sm text-chrome xl:flex"><Phone size={14} className="text-volt" />{site.phone}</a>
            <div className="hidden md:block"><Button onClick={() => openBooking()}>Записаться</Button></div>
            <button className="grid h-11 w-11 place-items-center text-chrome lg:hidden" aria-label={menu ? "Закрыть меню" : "Открыть меню"} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-graphite bg-mm px-5 pb-8 pt-24"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Мобильное меню" className="flex flex-1 flex-col justify-center gap-1">
              {nav.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setMenu(false)}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl uppercase text-chrome">
                  <span className="font-mono text-xs text-volt">0{i + 1}</span>{n.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <a href={site.phoneHref} className="font-mono text-lg text-chrome">{site.phone}</a>
              <Button size="lg" onClick={() => { setMenu(false); openBooking(); }}>Записаться на диагностику</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
