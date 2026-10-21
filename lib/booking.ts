import { site } from "@/content/site";
import { series } from "@/content/series";

export type BookingData = {
  series: string;
  year: string;
  mileage: string;
  problem: string;
  chips: string[];
  day: string;
  name: string;
  phone: string;
  zone?: string;
};

export const seriesLabel = (slug: string) => series.find((s) => s.slug === slug)?.title ?? "";

export function buildBookingText(d: BookingData): string {
  const lines = [
    "Заявка с сайта Mirikom",
    d.series && `Серия: BMW ${seriesLabel(d.series)}`,
    d.year && `Год: ${d.year}`,
    d.mileage && `Пробег: ${d.mileage} км`,
    d.zone && `Зона: ${d.zone}`,
    (d.chips.length || d.problem) && `Что случилось: ${[...d.chips, d.problem].filter(Boolean).join("; ")}`,
    d.day && `Удобный день: ${d.day}`,
    `Имя: ${d.name}`,
    `Телефон: ${d.phone}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch { return false; }
  }
}

export const whatsappLink = (text: string) =>
  site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}` : null;

export const formatMileage = (v: string) => v.replace(/\D/g, "").slice(0, 7).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
export const formatPhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  return `+7${p[0] ? ` (${p[0]}` : ""}${p[0]?.length === 3 ? ")" : ""}${p[1] ? ` ${p[1]}` : ""}${p[2] ? `-${p[2]}` : ""}${p[3] ? `-${p[3]}` : ""}`;
};
