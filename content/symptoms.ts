export type Zone = {
  id: string;
  name: string;
  symptoms: string[];
  /** точка выноски-подписи в координатах схемы (viewBox 1200×460) */
  label: { x: number; y: number; align?: "start" | "middle" | "end" };
};

export const zones: Zone[] = [
  { id: "engine", name: "Двигатель", label: { x: 1040, y: 66, align: "middle" }, symptoms: ["Загорелся Check Engine", "Не заводится", "Троит на холодную"] },
  { id: "gearbox", name: "КПП", label: { x: 800, y: 66, align: "middle" }, symptoms: ["Рывки при переключении", "Задержка при включении передачи"] },
  { id: "suspension", name: "Ходовая / подвеска", label: { x: 925, y: 108, align: "middle" }, symptoms: ["Стук при проезде неровностей", "Гул на скорости"] },
  { id: "steering", name: "Рулевое", label: { x: 660, y: 108, align: "middle" }, symptoms: ["Руль тянет в сторону", "Люфт руля"] },
  { id: "brakes", name: "Тормоза", label: { x: 1066, y: 424, align: "start" }, symptoms: ["Скрип при торможении", "Вибрация на педали"] },
  { id: "electrics", name: "Электрика", label: { x: 120, y: 190, align: "middle" }, symptoms: ["Горят ошибки на панели", "Садится аккумулятор"] },
];
