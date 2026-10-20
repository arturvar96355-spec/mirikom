import { Reveal } from "@/components/motion/Reveal";
import { Rich } from "./Rich";
import { SplitText } from "@/components/motion/SplitText";
import { typograph } from "@/lib/typograph";

export function SectionHead({ n, eyebrow, title, lead, align = "left" }: { n?: string; eyebrow: string; title: string; lead?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal><p className="eyebrow mb-4 flex items-center gap-3">{n && <span className="text-volt">{n}</span>}<span className="h-px w-8 bg-line" />{eyebrow}</p></Reveal>
      <h2 className="h-display text-[clamp(2.1rem,5.6vw,4.4rem)] text-chrome"><SplitText as="span" inView text={typograph(title)} /></h2>
      {lead && <Reveal delay={0.15}><p className="mt-5 text-lg text-chrome/75"><Rich>{lead}</Rich></p></Reveal>}
    </div>
  );
}
