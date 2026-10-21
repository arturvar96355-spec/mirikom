export function Marquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <span className="sr-only">{items.join(", ")}</span>
      <div className="flex w-max items-center gap-12 whitespace-nowrap py-2 motion-reduce:animate-none" style={{ animation: "marquee 38s linear infinite" }} aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-12">
            {row.map((it, i) => (
              <span key={i} className="flex items-center gap-12 font-display text-4xl uppercase text-transparent md:text-6xl" style={{ WebkitTextStroke: "1px rgba(217,222,229,0.35)" }}>
                {it}<span className="text-volt" style={{ WebkitTextStroke: 0 }}>·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-graphite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-graphite to-transparent" />
    </div>
  );
}
