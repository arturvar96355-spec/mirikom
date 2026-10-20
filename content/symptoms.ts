export type Zone = {
  id: string;
  name: string;
  symptoms: string[];
  // позиция хотспота в viewBox 0 0 1000 400
  x: number;
  y: number;
};

export const zones: Zone[] = [
  { id: "engine", name: "Двигатель", x: 770, y: 215, symptoms: ["Загорелся Check Engine", "Не заводится", "Троит на холодную"] },
  { id: "gearbox", name: "КПП", x: 560, y: 262, symptoms: ["Рывки при переключении", "Задержка при включении передачи"] },
  { id: "suspension", name: "Ходовая / подвеска", x: 250, y: 318, symptoms: ["Стук при проезде неровностей", "Гул на скорости"] },
  { id: "steering", name: "Рулевое", x: 650, y: 175, symptoms: ["Руль тянет в сторону", "Люфт руля"] },
  { id: "brakes", name: "Тормоза", x: 800, y: 318, symptoms: ["Скрип при торможении", "Вибрация на педали"] },
  { id: "electrics", name: "Электрика", x: 430, y: 180, symptoms: ["Горят ошибки на панели", "Садится аккумулятор"] },
];
