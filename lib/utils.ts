export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export const isPlaceholder = (s: string) => /\[[^\]]+\]/.test(s);
