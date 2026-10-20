export type Series = {
  slug: string;
  label: string; // подпись на табличке
  title: string; // «3 серия»
  body: string; // тип кузова
};

const BODY_DEFAULT = "седан / купе / кроссовер [уточнить для серии]";

const mk = (slug: string, label: string, title: string, body = BODY_DEFAULT): Series => ({
  slug,
  label,
  title,
  body,
});

export const series: Series[] = [
  mk("1", "1", "1 серия"),
  mk("2", "2", "2 серия"),
  mk("3", "3", "3 серия"),
  mk("4", "4", "4 серия"),
  mk("5", "5", "5 серия"),
  mk("6", "6", "6 серия"),
  mk("7", "7", "7 серия"),
  mk("8", "8", "8 серия"),
  mk("x1", "X1", "X1"),
  mk("x2", "X2", "X2"),
  mk("x3", "X3", "X3"),
  mk("x4", "X4", "X4"),
  mk("x5", "X5", "X5"),
  mk("x6", "X6", "X6"),
  mk("x7", "X7", "X7"),
  mk("m", "M", "Серия M"),
  mk("i", "i", "Серия i"),
  mk("z", "Z", "Серия Z"),
];

export const getSeries = (slug: string) => series.find((s) => s.slug === slug);

// Единый перечень планового ТО; цены — заглушки (прайс от клиента).
export const maintenance = [
  { name: "Замена масла и масляного фильтра", price: "от [… ₽ — уточнить]" },
  { name: "Воздушный и салонный фильтры", price: "от [… ₽ — уточнить]" },
  { name: "Свечи зажигания", price: "от [… ₽ — уточнить]" },
  { name: "Тормозная жидкость", price: "от [… ₽ — уточнить]" },
  { name: "Проверка ходовой", price: "от [… ₽ — уточнить]" },
];
