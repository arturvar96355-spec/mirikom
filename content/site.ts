export const site = {
  name: "Mirikom",
  nameRu: "Мириком",
  tagline: "BMW service · since 2000",
  since: 2000,
  address: "Москва, Молодогвардейская ул., 61с17",
  district: "Кунцево, ЗАО",
  phone: "+7 (980) 888-71-03",
  phoneHref: "tel:+79808887103",
  // Источник: часть А ТЗ. На старом сайте: t.me/+79808887103 — расхождение, см. DECISIONS.md
  telegramHref: "https://t.me/9268778833",
  telegramHandle: "9268778833",
  whatsappNumber: "", // [номер WhatsApp — от клиента]
  whatsappPlaceholder: "[номер WhatsApp — от клиента]",
  hours: "Ежедневно [10:00–20:00]",
  hoursNote: "[режим — уточнить]",
  warranty: "[срок гарантии — уточнить]",
  legalEntity: "[юрлицо — от клиента]",
  logoNote: "[настоящий логотип — от клиента]",
  yandexMapsHref: "https://yandex.ru/maps/-/CLtFmBOo",
  yandexNavHref: "https://yandex.ru/navi/?whatshere%5Bpoint%5D=37.394449%2C55.73292&whatshere%5Bzoom%5D=17",
  rating: { value: 4.6, count: 262, badge: "Хорошее место 2026" },
  diagnosticsPrice: 6000,
  alsoServe: ["Mercedes-Benz", "Porsche", "Lexus", "Maybach"],
  disclaimer:
    "BMW — зарегистрированный товарный знак BMW AG. Mirikom — независимый сервис, не является официальным дилером.",
  conceptMark:
    "Концепт сайта, подготовлен для Mirikom студией Kovagor. Не является официальным сайтом компании.",
} as const;

export const nav = [
  { label: "Услуги", href: "/#services" },
  { label: "Серии", href: "/#series" },
  { label: "Как работаем", href: "/#process" },
  { label: "Отзывы", href: "/#reviews" },
  { label: "Как найти", href: "/#route" },
] as const;
