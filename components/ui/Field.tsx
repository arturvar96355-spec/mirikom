import { cn } from "@/lib/utils";

export function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-sm text-signal">{error}</span>}
    </label>
  );
}

export const inputCls =
  "min-h-12 w-full rounded-md border border-line bg-graphite/70 px-4 text-base text-chrome outline-none transition-colors placeholder:text-mute/70 focus:border-volt focus:bg-graphite [color-scheme:dark]";
