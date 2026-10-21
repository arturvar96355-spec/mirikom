"use client";
import { Phone, Send, CalendarCheck } from "lucide-react";
import { site } from "@/content/site";
import { useBooking } from "@/lib/booking-context";

export function MobileBar() {
  const { openBooking } = useBooking();
  const cls = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-chrome active:bg-white/5";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-graphite/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <a href={site.phoneHref} className={cls}><Phone size={18} className="text-volt" />Позвонить</a>
      <a href={site.telegramHref} target="_blank" rel="noopener noreferrer" className={cls}><Send size={18} className="text-volt" />Telegram</a>
      <button onClick={() => openBooking()} className={`${cls} bg-volt text-graphite`}><CalendarCheck size={18} />Записаться</button>
    </div>
  );
}
