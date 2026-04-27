export type LocationType = "museum" | "theater" | "park" | "pier" | "art-space" | "zoo";

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  museum: "Музей",
  theater: "Театр",
  park: "Парк",
  pier: "Причал",
  "art-space": "Арт-пространство",
  zoo: "Зоопарк",
};

export interface TicketOption {
  title: string;
  price: number;
  description?: string;
  url?: string;
}

export interface WorkingHours {
  day: string;
  hours: string;
}

export interface RelatedPlace {
  slug: string;
  title: string;
  type: LocationType;
  image: string;
  city: string;
}

export interface RelatedArticle {
  title: string;
  description: string;
  url: string;
  image: string;
}

export interface LocationEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  price: number;
  image: string;
  duration?: string;
  rating?: number;
  badge?: string;
  spotsLeft?: number; // для срочности
  href?: string;
}

export interface LocationData {
  slug: string;
  title: string;
  type: LocationType;
  city: string;
  timezone: string;
  heroImage: string;
  gallery: string[];
  description: string;
  address: string;
  mapUrl?: string;
  howToGet: string;
  metro?: string;
  phone?: string;
  website?: string;
  visitRules: string[];
  workingHours: WorkingHours[];
  tickets: TicketOption[];
  events: LocationEvent[];
  relatedPlaces: RelatedPlace[];
  articles: RelatedArticle[];
  // New selling fields
  rating: number;
  reviewCount: number;
  priceFrom: number | null;
  introLead?: string;
  highlights: string[];
  features: string[];
  // Билет с открытой датой (для зоопарка/музея — посетить в любой день)
  openDateTicket?: {
    title: string;
    price: number;
    validity: string; // "Действует 6 месяцев"
    description?: string;
  };
}

export type LocationFeature =
  | "no_queue"
  | "audio_guide"
  | "kids_friendly"
  | "wheelchair"
  | "guided_tour"
  | "photo_allowed"
  | "cafe"
  | "gift_shop";

export const FEATURE_LABELS: Record<string, { label: string; icon: string }> = {
  no_queue: { label: "Без очереди", icon: "zap" },
  audio_guide: { label: "Аудиогид", icon: "headphones" },
  kids_friendly: { label: "Подходит детям", icon: "baby" },
  wheelchair: { label: "Доступная среда", icon: "accessibility" },
  guided_tour: { label: "С экскурсоводом", icon: "users" },
  photo_allowed: { label: "Можно фотографировать", icon: "check" },
  cafe: { label: "Есть кафе", icon: "check" },
  gift_shop: { label: "Сувенирный магазин", icon: "check" },
};

// ─── MOCK DATA ──────────────────────────────────────────────

export const LOCATIONS: Record<string, LocationData> = {
  hermitage: {
    slug: "hermitage",
    title: "Государственный Эрмитаж",
    type: "museum",
    city: "Санкт-Петербург",
    timezone: "Europe/Moscow",
    heroImage: "https://images.unsplash.com/photo-1548834925-e48f8a27ae58?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548834925-e48f8a27ae58?w=600&q=80",
      "https://images.unsplash.com/photo-1555861496-0666c8981751?w=600&q=80",
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80",
      "https://images.unsplash.com/photo-1564399579-0145267d0c4e?w=600&q=80",
    ],
    description:
      "Один из крупнейших и наиболее значимых художественных и культурно-исторических музеев мира. Коллекция насчитывает около трёх миллионов произведений искусства и памятников мировой культуры, начиная с каменного века и до нашего столетия.",
    introLead: "Крупнейший музей мира — 3 миллиона экспонатов, от Рембрандта до Матисса, в роскошных залах Зимнего дворца.",
    address: "Дворцовая наб., 38, Санкт-Петербург, 190000",
    mapUrl: "https://yandex.ru/maps/-/CDxgZ4Ks",
    metro: "Адмиралтейская",
    phone: "+7 (812) 710-90-79",
    website: "https://hermitagemuseum.org",
    howToGet:
      "Метро «Адмиралтейская» — 5 минут пешком. Автобусы 7, 10, 24 до остановки «Дворцовая площадь». Ближайшая парковка на Миллионной улице.",
    visitRules: [
      "Фото без вспышки разрешено",
      "Крупные сумки сдавать в гардероб",
      "Запрещено трогать экспонаты",
      "Дети до 14 лет — бесплатно",
    ],
    highlights: [
      "Более 3 миллионов экспонатов",
      "Залы импрессионистов и Рембрандта",
      "Аудиогид на 12 языках",
      "Бесплатно для детей до 14 лет",
    ],
    features: ["audio_guide", "kids_friendly", "wheelchair", "photo_allowed", "cafe", "gift_shop"],
    rating: 4.8,
    reviewCount: 12450,
    priceFrom: 500,
    workingHours: [
      { day: "Вт", hours: "10:30–18:00" },
      { day: "Ср", hours: "10:30–21:00" },
      { day: "Чт", hours: "10:30–18:00" },
      { day: "Пт", hours: "10:30–21:00" },
      { day: "Сб", hours: "10:30–18:00" },
      { day: "Вс", hours: "10:30–18:00" },
      { day: "Пн", hours: "Выходной" },
    ],
    openDateTicket: {
      title: "Билет в Эрмитаж — открытая дата",
      price: 500,
      validity: "Действует 30 дней с момента покупки",
      description: "Основная экспозиция. Используйте в любой удобный день в течение месяца — без привязки к расписанию.",
    },
    tickets: [
      { title: "Основная экспозиция", price: 500, description: "Главный музейный комплекс" },
      { title: "Главный штаб", price: 500, description: "Импрессионисты, современное искусство" },
      { title: "Комплексный билет", price: 800, description: "Все здания Эрмитажа" },
      { title: "Льготный", price: 0, description: "Дети, студенты, пенсионеры РФ" },
    ],
    events: [
      { id: "e1", title: "Ночь музеев 2025", date: "17 мая", time: "18:00–06:00", price: 0, image: "https://images.unsplash.com/photo-1564399579-0145267d0c4e?w=400&q=80", duration: "12 ч", rating: 4.9, badge: "Хит", spotsLeft: 12, href: "#" },
      { id: "e2", title: "Лекция: Рембрандт и его время", date: "10 июня", time: "19:00", price: 300, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80", duration: "1 ч 30 мин", rating: 4.7, href: "#" },
      { id: "e3", title: "Концерт в Эрмитажном театре", date: "5 июля", time: "20:00", price: 1500, image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80", duration: "2 ч", rating: 4.8, badge: "Премьера", href: "#" },
    ],
    relatedPlaces: [
      { slug: "russian-museum", title: "Русский музей", type: "museum", image: "https://images.unsplash.com/photo-1555861496-0666c8981751?w=400&q=80", city: "Санкт-Петербург" },
      { slug: "summer-garden", title: "Летний сад", type: "park", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80", city: "Санкт-Петербург" },
      { slug: "palace-pier", title: "Дворцовая пристань", type: "pier", image: "https://images.unsplash.com/photo-1555963153-11ff60182d08?w=400&q=80", city: "Санкт-Петербург" },
    ],
    articles: [
      { title: "10 шедевров Эрмитажа, которые нельзя пропустить", description: "Путеводитель по главным произведениям коллекции", url: "#", image: "https://images.unsplash.com/photo-1564399579-0145267d0c4e?w=400&q=80" },
      { title: "Ночные прогулки у Дворцовой набережной", description: "Как совместить музей и речную прогулку", url: "#", image: "https://images.unsplash.com/photo-1555963153-11ff60182d08?w=400&q=80" },
    ],
  },

  "gorky-park": {
    slug: "gorky-park",
    title: "Парк Горького",
    type: "park",
    city: "Москва",
    timezone: "Europe/Moscow",
    heroImage: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80",
      "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=600&q=80",
    ],
    description:
      "Центральный парк культуры и отдыха имени Горького — главный парк Москвы с набережной, спортивными площадками, кафе, музеем современного искусства «Гараж» и зимним катком.",
    introLead: "Главный парк Москвы — набережная, фестивали, «Гараж» и самый большой каток в Европе зимой.",
    address: "ул. Крымский Вал, 9, Москва, 119049",
    mapUrl: "https://yandex.ru/maps/-/CDxgZ0Ks",
    metro: "Парк Культуры",
    phone: "+7 (495) 995-00-20",
    website: "https://park-gorkogo.com",
    howToGet:
      "Метро «Парк Культуры» или «Октябрьская» — 10 минут пешком. Прокат велосипедов у входа. Парковка на Крымском Валу (платная).",
    visitRules: [
      "Вход свободный",
      "Собаки на поводке приветствуются",
      "Запрещено разводить костры",
      "Электросамокаты — по выделенным дорожкам",
    ],
    highlights: [
      "Вход свободный круглый год",
      "Набережная Москвы-реки",
      "Музей «Гараж» на территории",
      "Каток зимой и лодки летом",
    ],
    features: ["kids_friendly", "wheelchair", "cafe"],
    rating: 4.7,
    reviewCount: 8320,
    priceFrom: null,
    workingHours: [
      { day: "Ежедневно", hours: "Круглосуточно" },
    ],
    tickets: [
      { title: "Вход в парк", price: 0, description: "Свободный вход" },
      { title: "Каток (зима)", price: 500, description: "Аренда коньков включена" },
      { title: "Прокат лодки", price: 800, description: "30 минут, до 4 человек" },
    ],
    events: [
      { id: "e4", title: "Фестиваль уличной еды", date: "15 июня", time: "12:00–22:00", price: 0, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", duration: "10 ч", rating: 4.6, badge: "Бесплатно", href: "#" },
      { id: "e5", title: "Кино под открытым небом", date: "20 июля", time: "21:00", price: 200, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80", duration: "2 ч", rating: 4.8, spotsLeft: 8, href: "#" },
    ],
    relatedPlaces: [
      { slug: "muzeon", title: "Парк искусств «Музеон»", type: "art-space", image: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=400&q=80", city: "Москва" },
      { slug: "hermitage", title: "Государственный Эрмитаж", type: "museum", image: "https://images.unsplash.com/photo-1548834925-e48f8a27ae58?w=400&q=80", city: "Санкт-Петербург" },
    ],
    articles: [
      { title: "Чем заняться в Парке Горького летом", description: "Полный гид по активностям и фестивалям", url: "#", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400&q=80" },
    ],
  },

  "moscow-zoo": {
    slug: "moscow-zoo",
    title: "Московский зоопарк",
    type: "zoo",
    city: "Москва",
    timezone: "Europe/Moscow",
    heroImage: "https://images.unsplash.com/photo-1474314243412-cd4a79f02c6a?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474314243412-cd4a79f02c6a?w=600&q=80",
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&q=80",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
      "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=600&q=80",
    ],
    description:
      "Один из старейших зоопарков Европы — основан в 1864 году. Более 1200 видов животных, контактный зоопарк для детей, экзотариум и сезонные программы кормления.",
    introLead: "1200+ видов животных в центре Москвы. Билеты с открытой датой — приходите в любой день в течение 6 месяцев.",
    address: "Большая Грузинская ул., 1, Москва",
    mapUrl: "https://yandex.ru/maps/-/CDxgZ1Ks",
    metro: "Баррикадная",
    phone: "+7 (499) 252-29-51",
    website: "https://moscowzoo.ru",
    howToGet: "Метро «Баррикадная» или «Краснопресненская» — 5 минут пешком.",
    visitRules: [
      "Кормить животных запрещено",
      "Вход с домашними животными запрещён",
      "Дети до 17 лет — бесплатно",
      "Фото без вспышки разрешено",
    ],
    highlights: [
      "Более 1200 видов животных",
      "Дети до 17 лет — бесплатно",
      "Билет действует 6 месяцев",
      "Контактный зоопарк для малышей",
    ],
    features: ["kids_friendly", "wheelchair", "cafe", "gift_shop", "photo_allowed"],
    rating: 4.6,
    reviewCount: 24800,
    priceFrom: 800,
    workingHours: [
      { day: "Пн", hours: "10:00–18:00" },
      { day: "Вт", hours: "10:00–18:00" },
      { day: "Ср", hours: "10:00–18:00" },
      { day: "Чт", hours: "10:00–18:00" },
      { day: "Пт", hours: "10:00–18:00" },
      { day: "Сб", hours: "10:00–20:00" },
      { day: "Вс", hours: "10:00–20:00" },
    ],
    openDateTicket: {
      title: "Входной билет с открытой датой",
      price: 800,
      validity: "Действует 6 месяцев с момента покупки",
      description: "Один взрослый. Дети до 17 лет — бесплатно. Можно прийти в любой удобный день.",
    },
    tickets: [
      { title: "Взрослый — открытая дата", price: 800, description: "Действует 6 месяцев" },
      { title: "Льготный (студент, пенсионер РФ)", price: 400, description: "При предъявлении документа" },
      { title: "Дети до 17 лет", price: 0, description: "Бесплатно с сопровождающим" },
      { title: "Экзотариум", price: 300, description: "Доплата к основному билету" },
    ],
    events: [
      { id: "z1", title: "Кормление морских львов — экскурсия с биологом", date: "Ежедневно", time: "11:00 и 15:00", price: 600, image: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&q=80", duration: "45 мин", rating: 4.9, badge: "Семейный хит", href: "#" },
      { id: "z2", title: "Ночь в зоопарке", date: "15 августа", time: "20:00–23:00", price: 1200, image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&q=80", duration: "3 ч", rating: 4.8, spotsLeft: 6, badge: "Мало мест", href: "#" },
    ],
    relatedPlaces: [
      { slug: "gorky-park", title: "Парк Горького", type: "park", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400&q=80", city: "Москва" },
    ],
    articles: [
      { title: "Московский зоопарк с детьми: маршрут на день", description: "Что посмотреть, где поесть и как не устать", url: "#", image: "https://images.unsplash.com/photo-1474314243412-cd4a79f02c6a?w=400&q=80" },
    ],
  },
};
