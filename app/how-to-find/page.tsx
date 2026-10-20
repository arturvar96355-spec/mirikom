import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { HowToFind } from "@/components/sections/HowToFind";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = { title: "Как нас найти — Mirikom" };

export default function Page() {
  return (
    <PageShell>
      <HowToFind standalone />
      <FinalCTA />
    </PageShell>
  );
}
