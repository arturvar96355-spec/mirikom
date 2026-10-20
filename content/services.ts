export type ServiceGroup = {
  id: string;
  title: string;
  lead: string;
  items: { name: string; price: string }[];
};

const TBD = "от [… ₽ — уточнить]";

export const serviceGroups: ServiceGroup[] = [
  { id: "maintenance", title: "ТО", lead: "Плановое обслуживание по Вашей серии.", items: [
    { name: "Комплексная диагностика", price: "от 6 000 ₽" },
    { name: "Замена масла и фильтров", price: TBD },
    { name: "Свечи, тормозная жидкость", price: TBD },
  ]},
  { id: "engine", title: "Двигатель", lead: "Ремонт двигателя.", items: [
    { name: "Диагностика двигателя", price: "от 6 000 ₽" },
    { name: "Ремонт двигателя", price: TBD },
  ]},
  { id: "gearbox", title: "КПП", lead: "Ремонт и обслуживание коробки.", items: [
    { name: "Замена фильтра КПП", price: "6 000 ₽" },
    { name: "Ремонт КПП", price: TBD },
  ]},
  { id: "suspension", title: "Ходовая", lead: "Подвеска и ходовая часть.", items: [
    { name: "Проверка ходовой", price: TBD },
    { name: "Ремонт подвески", price: TBD },
  ]},
  { id: "steering", title: "Рулевое", lead: "Рулевое управление.", items: [
    { name: "Диагностика рулевого", price: TBD },
    { name: "Ремонт рулевого", price: TBD },
  ]},
  { id: "electrics", title: "Электрика", lead: "Электрика и электроника.", items: [
    { name: "Электродиагностика", price: TBD },
    { name: "Ремонт электрики", price: TBD },
  ]},
  { id: "body", title: "Кузов", lead: "Кузовной ремонт.", items: [
    { name: "Кузовной ремонт", price: TBD },
  ]},
];
