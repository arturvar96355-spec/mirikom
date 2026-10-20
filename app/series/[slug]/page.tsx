import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeries, series } from "@/content/series";
import { PageShell } from "@/components/sections/PageShell";
import { SeriesPanel } from "@/components/widgets/SeriesPanel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CarSilhouette } from "@/components/art/CarSilhouette";

export function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSeries((await params).slug);
  return { title: s ? `ТО ${s.title} — Mirikom` : "Mirikom" };
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
          <h1 className="h-display mt-4 text-[clamp(3rem,9vw,8rem)]">ТО {s.title}</h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="chrome-edge p-6 md:p-8 lg:col-span-6"><SeriesPanel s={s} /></div>
            <div className="hidden text-chrome/40 lg:col-span-6 lg:block"><CarSilhouette className="mt-10" /></div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </PageShell>
  );
}
