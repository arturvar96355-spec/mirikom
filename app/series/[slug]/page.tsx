import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeries, series } from "@/content/series";
import { PageShell } from "@/components/sections/PageShell";
import { Roundel } from "@/components/art/Roundel";
import { SeriesPanel } from "@/components/widgets/SeriesPanel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CarBlueprint } from "@/components/art/CarBlueprint";

export function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSeries((await params).slug);
  return { title: s ? `ТО BMW ${s.title} — Mirikom` : "Mirikom" };
}

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSeries((await params).slug);
  if (!s) notFound();
  return (
    <PageShell>
      <section className="relative overflow-hidden pb-20 pt-36 md:pt-44">
        <div aria-hidden className="bg-mm absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000,transparent)]" />
        <div className="container-x relative">
          <a href="/#series" className="eyebrow hover:text-white">← Все серии</a>
          <h1 className="h-display mt-4 flex items-center gap-5 text-[clamp(3rem,9vw,8rem)]"><Roundel className="hidden h-[0.9em] w-[0.9em] shrink-0 md:block" /><span><span className="text-volt">BMW</span> {s.title}<span className="mt-2 block font-mono text-sm tracking-[0.2em] text-mute">ПЛАНОВОЕ ТО И РЕМОНТ</span></span></h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="chrome-edge p-6 md:p-8 lg:col-span-6"><SeriesPanel s={s} /></div>
            <div className="hidden text-chrome/40 lg:col-span-6 lg:block"><CarBlueprint uid="ser" xray={0.8} className="mt-10 h-auto w-full" /></div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </PageShell>
  );
}
