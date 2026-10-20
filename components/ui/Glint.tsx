"use client";
export function Glint({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glint ${className}`} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
      {children}
    </div>
  );
}
