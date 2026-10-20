"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { BookingForm } from "./BookingForm";
import { useBooking } from "@/lib/booking-context";

export function BookingModal() {
  const { open, closeBooking } = useBooking();
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && closeBooking();
    window.addEventListener("keydown", k);
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    lenis?.stop();
    return () => { window.removeEventListener("keydown", k); lenis?.start(); };
  }, [open, closeBooking]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeBooking}>
          <motion.div role="dialog" aria-modal="true" aria-label="Запись на диагностику" onClick={(e) => e.stopPropagation()} data-lenis-prevent
            className="chrome-edge relative max-h-[92svh] w-full max-w-2xl overflow-y-auto p-6 sm:p-10" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <button onClick={closeBooking} aria-label="Закрыть" className="absolute right-3 top-3 grid h-11 w-11 place-items-center text-mute hover:text-white"><X /></button>
            <p className="eyebrow">Запись</p>
            <h2 className="h-display mb-6 mt-2 text-3xl sm:text-4xl">Расскажите, что с машиной</h2>
            <BookingForm onDone={closeBooking} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
