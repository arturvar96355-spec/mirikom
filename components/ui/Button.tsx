"use client";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "signal";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};

export function Button({ children, href, onClick, variant = "primary", size = "md", className, external, magnetic = true, type = "button", disabled, ...rest }: Props) {
  const cls = cn(
    "cut group relative inline-flex min-h-12 items-center justify-center gap-2 px-6 font-display text-[13px] font-semibold uppercase tracking-[0.12em] transition-[background,color,transform] duration-300 select-none",
    size === "lg" && "min-h-14 px-8 text-sm",
    variant === "primary" && "bg-volt text-graphite hover:bg-white",
    variant === "ghost" && "bg-white/[0.04] text-chrome ring-1 ring-inset ring-line hover:bg-chrome hover:text-graphite",
    variant === "signal" && "bg-signal text-graphite hover:bg-white",
    disabled && "pointer-events-none opacity-50",
    className,
  );
  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </>
  );
  const el = href ? (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>{inner}</a>
  ) : (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} {...rest}>{inner}</button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
