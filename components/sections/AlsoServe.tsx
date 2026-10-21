"use client";
import { useRef } from "react";
import { site } from "@/content/site";
import { Marquee } from "@/components/motion/Marquee";
import { usePauseOffscreen } from "@/components/motion/usePauseOffscreen";

export function AlsoServe() {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  return (
    <section ref={ref} aria-label="Также обслуживаем" className="relative border-y border-line py-10 md:py-14">
      <p className="eyebrow container-x mb-6">Также обслуживаем: {site.alsoServe.join(", ")}</p>
      <Marquee items={site.alsoServe} />
    </section>
  );
}
