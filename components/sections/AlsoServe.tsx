import { site } from "@/content/site";
import { Marquee } from "@/components/motion/Marquee";

export function AlsoServe() {
  return (
    <section aria-label="Также обслуживаем" className="relative border-y border-line py-10 md:py-14">
      <p className="eyebrow container-x mb-6">Также обслуживаем: {site.alsoServe.join(", ")}</p>
      <Marquee items={site.alsoServe} />
    </section>
  );
}
