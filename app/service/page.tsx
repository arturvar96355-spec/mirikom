import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { ServicesPrices } from "@/components/sections/ServicesPrices";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = { title: "Услуги и цены — Mirikom" };

export default function Service() {
  return (
    <PageShell>
      <ServicesPrices standalone />
      <FinalCTA />
    </PageShell>
  );
}
