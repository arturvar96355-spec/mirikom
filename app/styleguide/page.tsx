import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { inputCls } from "@/components/ui/Field";

export const metadata: Metadata = { title: "Styleguide — Mirikom" };

const colors = [["graphite", "#0B0D10"], ["steel", "#1A1F26"], ["line", "#2A313B"], ["chrome", "#D9DEE5"], ["mute", "#8A94A3"], ["volt", "#3D8BFF"], ["signal", "#FF5A1F"]];

export default function Styleguide() {
  return (
    <div className="container-x space-y-16 py-16">
      <h1 className="h-display text-6xl">Styleguide</h1>
      <section><p className="eyebrow mb-4">Цвета</p><div className="grid grid-cols-2 gap-3 md:grid-cols-7">{colors.map(([n, c]) => (<div key={n} className="rounded-md border border-line p-3"><div className="h-16 rounded" style={{ background: c }} /><p className="mt-2 font-mono text-xs">{n}<br />{c}</p></div>))}</div></section>
      <section className="space-y-3"><p className="eyebrow">Типографика</p><p className="h-display text-6xl">Tektur — заголовок</p><p className="text-lg">IBM Plex Sans — основной текст для чтения с телефона.</p><p className="font-mono">IBM Plex Mono — 6 000 ₽ · 4.6 · 262</p></section>
      <section><p className="eyebrow mb-4">Кнопки</p><div className="flex flex-wrap gap-3"><Button>Primary</Button><Button variant="ghost">Ghost</Button><Button variant="signal">Срочно</Button></div></section>
      <section><p className="eyebrow mb-4">Карточка, поле, заглушка</p><div className="chrome-edge max-w-md space-y-4 p-6"><input className={inputCls} placeholder="Поле ввода" /><p><Rich>Цена от [… ₽ — уточнить]</Rich></p></div></section>
    </div>
  );
}
