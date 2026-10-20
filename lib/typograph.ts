const NBSP = " ";

/** Русская типографика: неразрывные пробелы, «ёлочки», тире, ₽ после числа. */
export function typograph(input: string): string {
  let s = input;
  // прямые кавычки → ёлочки (вложенные пары не нужны для наших текстов)
  s = s.replace(/"([^"]*)"/g, "«$1»");
  // дефис между пробелами → длинное тире
  s = s.replace(/\s[-–]\s/g, `${NBSP}— `);
  s = s.replace(/\s—\s/g, `${NBSP}— `);
  // предлоги/союзы из 1–2 букв: не оставляем в конце строки
  s = s.replace(
    /(^|[\s(«])([А-Яа-яЁёA-Za-z]{1,2})\s+(?=\S)/g,
    (_, pre, w) => `${pre}${w}${NBSP}`,
  );
  // число + единица
  s = s.replace(/(\d)\s+(₽|руб\.?|км|ч|мин|лет|года?|с)(?![А-Яа-яA-Za-z])/g, `$1${NBSP}$2`);
  // группы разрядов: 6 000 → 6 000 неразрывно
  s = s.replace(/(\d)\s(\d{3})(?!\d)/g, `$1${NBSP}$2`);
  return s;
}

export function formatRub(n: number): string {
  return typograph(`${n.toLocaleString("ru-RU").replace(/ | /g, " ")} ₽`);
}
