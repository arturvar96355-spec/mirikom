import { typograph } from "@/lib/typograph";

/** Текст с видимыми заглушками [..] и русской типографикой. */
export function Rich({ children, raw }: { children: string; raw?: boolean }) {
  const text = raw ? children : typograph(children);
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <span key={i} className="placeholder-chip">{p}</span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
