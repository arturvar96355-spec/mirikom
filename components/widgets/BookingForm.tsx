"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { z } from "zod";
import { Check, ClipboardCheck, Phone, Send } from "lucide-react";
import { site } from "@/content/site";
import { series } from "@/content/series";
import { zones } from "@/content/symptoms";
import { Button } from "@/components/ui/Button";
import { Field, inputCls } from "@/components/ui/Field";
import { Rich } from "@/components/ui/Rich";
import { useBooking } from "@/lib/booking-context";
import { buildBookingText, copyText, formatMileage, formatPhone, whatsappLink, type BookingData } from "@/lib/booking";

const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя"),
  phone: z.string().refine((v) => v.replace(/\D/g, "").length === 11, "Введите телефон полностью"),
  year: z.string().refine((v) => v === "" || (+v >= 1985 && +v <= 2027), "Проверьте год"),
});

const chips = Array.from(new Set(zones.flatMap((z) => z.symptoms.slice(0, 1)).concat(["Плановое ТО"])));
const empty: BookingData = { series: "", year: "", mileage: "", problem: "", chips: [], day: "", name: "", phone: "+7", zone: "" };

export function BookingForm({ onDone }: { onDone?: () => void }) {
  const { draft } = useBooking();
  const [d, setD] = useState<BookingData>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<{ text: string; copied: boolean } | null>(null);

  useEffect(() => {
    setD((p) => ({
      ...p,
      series: draft.series ?? p.series,
      zone: draft.zone ?? p.zone,
      chips: draft.symptom && !p.chips.includes(draft.symptom) ? [...p.chips, draft.symptom] : p.chips,
    }));
  }, [draft]);

  const set = <K extends keyof BookingData>(k: K, v: BookingData[K]) => setD((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(d);
    if (!r.success) {
      const m: Record<string, string> = {};
      r.error.issues.forEach((i) => (m[String(i.path[0])] = i.message));
      setErrors(m);
      return;
    }
    setErrors({});
    const text = buildBookingText(d);
    const copied = await copyText(text);
    setSent({ text, copied });
    window.open(site.telegramHref, "_blank", "noopener,noreferrer");
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6 text-center" role="status">
          <motion.div initial={{ scale: 0.4, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-volt text-white">
            <Check size={30} />
          </motion.div>
          <h3 className="h-display text-3xl">Заявка собрана</h3>
          <p className="mx-auto mt-3 flex max-w-sm items-start justify-center gap-2 text-chrome/80">
            <ClipboardCheck className="mt-1 shrink-0 text-volt" size={18} />
            {sent.copied ? "Текст заявки скопирован — вставьте в чат." : "Скопируйте текст заявки ниже и вставьте в чат."}
          </p>
          <pre className="mx-auto mt-4 max-w-md whitespace-pre-wrap rounded-md border border-line bg-graphite/70 p-4 text-left font-mono text-xs text-mute">{sent.text}</pre>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.telegramHref} external><Send size={16} /> Открыть Telegram</Button>
            {whatsappLink(sent.text) ? (
              <Button variant="ghost" href={whatsappLink(sent.text)!} external>WhatsApp</Button>
            ) : (
              <Button variant="ghost" href={site.phoneHref}><Phone size={16} /> Позвонить</Button>
            )}
          </div>
          {onDone && <button onClick={onDone} className="mt-5 text-sm text-mute underline-offset-4 hover:underline">Закрыть</button>}
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
          <Field label="Серия BMW">
            <select className={inputCls} value={d.series} onChange={(e) => set("series", e.target.value)}>
              <option value="">Выберите серию BMW</option>
              {series.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Год" error={errors.year}><input className={inputCls} inputMode="numeric" maxLength={4} placeholder="2015" value={d.year} onChange={(e) => set("year", e.target.value.replace(/\D/g, ""))} /></Field>
            <Field label="Пробег, км"><input className={inputCls} inputMode="numeric" placeholder="120 000" value={d.mileage} onChange={(e) => set("mileage", formatMileage(e.target.value))} /></Field>
          </div>
          <div className="sm:col-span-2">
            <span className="eyebrow mb-2 block">Что случилось</span>
            <div className="mb-3 flex flex-wrap gap-2">
              {[...new Set([...chips, ...d.chips])].map((c) => {
                const on = d.chips.includes(c);
                return (
                  <button key={c} type="button" aria-pressed={on} onClick={() => set("chips", on ? d.chips.filter((x) => x !== c) : [...d.chips, c])}
                    className={`min-h-11 rounded-md border px-3 text-sm transition-colors ${on ? "border-volt bg-volt/15 text-white" : "border-line text-chrome/80 hover:border-chrome/50"}`}>{c}</button>
                );
              })}
            </div>
            <textarea className={`${inputCls} min-h-24 py-3`} placeholder="Опишите своими словами — стук, ошибка на панели, что угодно" value={d.problem} onChange={(e) => set("problem", e.target.value)} />
          </div>
          <Field label="Удобный день"><input type="date" className={inputCls} value={d.day} onChange={(e) => set("day", e.target.value)} /></Field>
          <Field label="Имя" error={errors.name}><input className={inputCls} autoComplete="name" placeholder="Как к Вам обращаться" value={d.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Телефон" error={errors.phone} className="sm:col-span-2"><input className={inputCls} type="tel" autoComplete="tel" inputMode="tel" value={d.phone} onChange={(e) => set("phone", formatPhone(e.target.value))} /></Field>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full sm:w-auto"><Send size={16} /> Отправить в Telegram</Button>
            <p className="mt-3 text-xs text-mute">
              <Rich>Нажимая кнопку, Вы соглашаетесь на обработку персональных данных.</Rich>{" "}
              <a href="/privacy/" className="underline underline-offset-4 hover:text-chrome">Политика</a>
            </p>
            <p className="mt-1 text-xs text-mute">Откроется чат в Telegram, текст заявки будет скопирован. WhatsApp: <Rich>{site.whatsappPlaceholder}</Rich></p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
