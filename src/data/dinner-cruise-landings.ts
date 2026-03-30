// ─── Dinner Cruise Landing Data ─────────────────────────────

export interface DinnerCruiseVariant {
  id: string;
  shipName: string;
  title: string;
  startsAt: string;
  durationMinutes: number;
  pier: string;
  price: number;
  rating: number;
  reviewCount: number;
  availableTickets: number;
  menuType: "set" | "buffet";
  format: "romantic" | "panoramic" | "vip" | "classic";
  timeCategory: "sunset" | "night";
  description: string;
  menuHighlights: string[];
}

export interface DinnerCruiseLanding {
  slug: string;
  cityName: string;
  cityNameDative: string;
  riverName: string;
  riverNameDative: string;
  seoTitle: string;
  seoDescription: string;
  heroSubtitle: string;
  introTitle: string;
  introText: string;
  forWhom: { icon: string; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  parentLink: { label: string; href: string };
}

// ─── Moscow Landing ─────────────────────────────────────────

export const DINNER_CRUISE_CITIES: Record<string, DinnerCruiseLanding> = {
  moscow: {
    slug: "moscow",
    cityName: "Москва",
    cityNameDative: "Москве",
    riverName: "Москва-река",
    riverNameDative: "Москве-реке",
    seoTitle: "Ужин на теплоходе по Москве-реке — цены и расписание 2026",
    seoDescription:
      "Ужин на теплоходе по Москве-реке: сравните рестораны на воде, меню, цены и расписание вечерних круизов. Романтические ужины, панорамные столы, VIP-форматы.",
    heroSubtitle:
      "Сравните рестораны на воде и выберите лучший вечерний круиз по Москве-реке.",
    introTitle: "Ужин на теплоходе — ресторан с видом на Кремль",
    introText:
      "Москва-река — идеальная декорация для вечернего ужина. Вы проплываете мимо Кремля, Храма Христа Спасителя и Москва-Сити, пока шеф-повар готовит блюда на борту. Это не просто прогулка — это полноценный ресторанный опыт на воде: от сет-меню из 5 блюд до фуршетов с живой музыкой.",
    forWhom: [
      {
        icon: "heart",
        title: "Романтическое свидание",
        description:
          "Столик у панорамного окна, закат над Кремлём и живая музыка — идеальный вечер для двоих.",
      },
      {
        icon: "cake",
        title: "День рождения",
        description:
          "Многие теплоходы предлагают праздничные пакеты: торт, декор, персональное поздравление от капитана.",
      },
      {
        icon: "users",
        title: "Туристы и гости столицы",
        description:
          "Главные достопримечательности Москвы за одну вечернюю прогулку + ужин из русской кухни.",
      },
      {
        icon: "briefcase",
        title: "Корпоратив и деловой ужин",
        description:
          "VIP-зоны, отдельные палубы и персональное обслуживание для бизнес-мероприятий.",
      },
    ],
    faq: [
      {
        question: "Ужин включён в стоимость билета?",
        answer:
          "Да, в большинстве рейсов ужин (сет-меню или фуршет) включён. Точный состав меню указан в описании каждого теплохода.",
      },
      {
        question: "Можно ли принести свой алкоголь?",
        answer:
          "На большинстве теплоходов действует бар на борту. Свой алкоголь, как правило, запрещён. Уточняйте правила конкретного рейса.",
      },
      {
        question: "Где посадка на теплоход?",
        answer:
          "Причал указан в билете. Чаще всего это причалы у Парка Горького, Киевского вокзала или Устьинского моста. Приходите за 15–20 минут.",
      },
      {
        question: "Что если плохая погода?",
        answer:
          "Ужин проходит в закрытом зале с панорамными окнами, поэтому рейсы не отменяются из-за дождя. В тёплую погоду доступна открытая палуба.",
      },
      {
        question: "Нужно ли бронировать заранее?",
        answer:
          "Рекомендуем бронировать за 2–3 дня, особенно на выходные и праздники. Популярные теплоходы раскупаются быстро.",
      },
      {
        question: "Есть ли дресс-код?",
        answer:
          "Строгого дресс-кода нет, но рекомендуется smart-casual. На VIP-рейсах приветствуется вечерний стиль.",
      },
    ],
    parentLink: {
      label: "Все речные прогулки по Москве",
      href: "/river-cruises/moscow",
    },
  },
};

// ─── Mock Variants (Moscow) ─────────────────────────────────

export const DINNER_CRUISE_MOCK: DinnerCruiseVariant[] = [
  {
    id: "dc1",
    shipName: "Ривер Палас",
    title: "Панорамный ужин-круиз «Огни Москвы»",
    startsAt: "2026-06-15T19:00:00+03:00",
    durationMinutes: 180,
    pier: "Причал «Парк Горького»",
    price: 4990,
    rating: 4.9,
    reviewCount: 876,
    availableTickets: 6,
    menuType: "set",
    format: "panoramic",
    timeCategory: "sunset",
    description:
      "5-блюдное сет-меню от шеф-повара, панорамный зал, живой джаз. Маршрут: Парк Горького → Кремль → Москва-Сити.",
    menuHighlights: ["Тартар из лосося", "Утиная грудка су-вид", "Тирамису"],
  },
  {
    id: "dc2",
    shipName: "Нео",
    title: "Ночной фуршет: DJ + огни столицы",
    startsAt: "2026-06-15T21:30:00+03:00",
    durationMinutes: 150,
    pier: "Причал «Устьинский мост»",
    price: 3490,
    rating: 4.7,
    reviewCount: 543,
    availableTickets: 12,
    menuType: "buffet",
    format: "classic",
    timeCategory: "night",
    description:
      "Фуршет с горячими и холодными закусками, DJ-сет, 2 палубы. Ночной маршрут мимо подсвеченного Кремля.",
    menuHighlights: [
      "Мини-бургеры",
      "Сырная тарелка",
      "Брускетты",
      "Мини-десерты",
    ],
  },
  {
    id: "dc3",
    shipName: "Риверсайд",
    title: "Романтический ужин «Закат над Кремлём»",
    startsAt: "2026-06-15T18:30:00+03:00",
    durationMinutes: 180,
    pier: "Причал «Киевский вокзал»",
    price: 5990,
    rating: 4.9,
    reviewCount: 312,
    availableTickets: 4,
    menuType: "set",
    format: "romantic",
    timeCategory: "sunset",
    description:
      "Столики на двоих у панорамных окон, 4-блюдное меню, бокал просекко в подарок. Идеально для свидания.",
    menuHighlights: [
      "Карпаччо из говядины",
      "Ризотто с трюфелем",
      "Шоколадный фондан",
    ],
  },
  {
    id: "dc4",
    shipName: "Монарх",
    title: "VIP-ужин: верхняя палуба с видом 360°",
    startsAt: "2026-06-15T20:00:00+03:00",
    durationMinutes: 210,
    pier: "Причал «Парк Горького»",
    price: 8900,
    rating: 4.8,
    reviewCount: 156,
    availableTickets: 2,
    menuType: "set",
    format: "vip",
    timeCategory: "night",
    description:
      "Эксклюзивная верхняя палуба, 7-блюдный дегустационный сет, персональный сомелье, live-саксофон.",
    menuHighlights: [
      "Фуа-гра",
      "Стейк Рибай",
      "Дегустация сыров",
      "Авторский десерт",
    ],
  },
  {
    id: "dc5",
    shipName: "Москва",
    title: "Классический ужин «Столичный»",
    startsAt: "2026-06-15T19:30:00+03:00",
    durationMinutes: 150,
    pier: "Причал «Новоспасский мост»",
    price: 2990,
    rating: 4.6,
    reviewCount: 689,
    availableTickets: 18,
    menuType: "set",
    format: "classic",
    timeCategory: "sunset",
    description:
      "Комплексный ужин из 3 блюд, фоновая музыка, классический маршрут по центру. Отличное соотношение цена/качество.",
    menuHighlights: ["Салат Цезарь", "Стейк из сёмги", "Чизкейк"],
  },
  {
    id: "dc6",
    shipName: "Флотилия Рэдиссон",
    title: "Премиум-круиз с дегустационным сетом",
    startsAt: "2026-06-15T20:00:00+03:00",
    durationMinutes: 180,
    pier: "Причал «Гостиница Украина»",
    price: 6490,
    rating: 4.8,
    reviewCount: 423,
    availableTickets: 8,
    menuType: "set",
    format: "panoramic",
    timeCategory: "night",
    description:
      "Яхта-ресторан, панорамное остекление, 6-блюдный сет от бренд-шефа, винная карта.",
    menuHighlights: [
      "Гребешки",
      "Медальоны из телятины",
      "Крем-брюле",
      "Сорбет",
    ],
  },
  {
    id: "dc7",
    shipName: "Ласточка",
    title: "Фуршет-круиз «Москва вечерняя»",
    startsAt: "2026-06-15T18:00:00+03:00",
    durationMinutes: 120,
    pier: "Причал «Парк Горького»",
    price: 2490,
    rating: 4.5,
    reviewCount: 234,
    availableTickets: 22,
    menuType: "buffet",
    format: "classic",
    timeCategory: "sunset",
    description:
      "Лёгкий фуршет, открытая палуба, расслабленная атмосфера. Бюджетный вариант ужина на воде.",
    menuHighlights: ["Канапе", "Мини-пицца", "Фрукты", "Пирожные"],
  },
];

// ─── Lookup Helpers ─────────────────────────────────────────

export const DINNER_CRUISE_CITY_NAMES = Object.values(DINNER_CRUISE_CITIES).map(
  (l) => l.cityName
);

export const DINNER_CRUISE_SLUG_TO_CITY: Record<string, string> = Object.fromEntries(
  Object.values(DINNER_CRUISE_CITIES).map((l) => [l.slug, l.cityName])
);
