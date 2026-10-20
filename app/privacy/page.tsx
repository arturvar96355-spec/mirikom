import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { Rich } from "@/components/ui/Rich";

export const metadata: Metadata = { title: "Политика — Mirikom" };

export default function Privacy() {
  return (
    <PageShell>
      <section className="container-x pb-32 pt-40">
        <p className="eyebrow mb-4">Документ</p>
        <h1 className="h-display text-5xl md:text-7xl">Политика обработки данных</h1>
        <p className="mt-8 max-w-2xl text-lg text-chrome/80"><Rich>[политика — от клиента]</Rich></p>
      </section>
    </PageShell>
  );
}
