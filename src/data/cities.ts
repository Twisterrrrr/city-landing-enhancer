export interface CitySight {
  title: string;
  description: string;
  image: string;
  locationSlug?: string; // ссылка на хаб локации
}

export interface CityCategory {
  key: string;
  label: string;
  emoji: string;
  count: number;
  href: string;
}

export interface CityVenue {
  slug: string;
  title: string;
  type: string; // "Музей", "Парк", ...
  address: string;
  metro?: string;
  image: string;
}

export interface CityEventCard {
  id: string;
  title: string;
  duration: string;
  priceFrom: number;
  rating: number;
  image: string;
  href: string;
  badge?: string;
}

export interface CityArticle {
  title: string;
  excerpt: string;
  image: string;
  url: string;
}

export interface CityData {
  slug: string;
  name: string;
  nameLocative: string; // в Санкт-Петербурге
  intro: string;
  heroImage: string;
  eventsCount: number;
  categories: CityCategory[];
  sights: CitySight[]; // что обязательно посетить
  venues: CityVenue[]; // площадки
  popularTags: { label: string; count?: number }[];
  recommended: CityEventCard[]; // топ по рейтингу
  more: CityEventCard[]; // ещё события
  articles: CityArticle[];
  faq?: { q: string; a: string }[];
}

export const CITIES: Record<string, CityData> = {
  "saint-petersburg": {
    slug: "saint-petersburg",
    name: "Санкт-Петербург",
    nameLocative: "Санкт-Петербурге",
    intro:
      "Культурная столица России с более чем 300 музеями, величественными дворцами, каналами и белыми ночами. Петербург — обязательный пункт для любого путешественника.",
    heroImage:
      "https://images.unsplash.com/photo-1556610961-2fecc5927173?w=1600&q=80",
    eventsCount: 58,
    categories: [
      { key: "tours", label: "Экскурсии", emoji: "🎭", count: 17, href: "#recommended" },
      { key: "museums", label: "Музеи и Арт", emoji: "🏛️", count: 1, href: "#venues" },
      { key: "events", label: "Мероприятия", emoji: "🎟️", count: 41, href: "#more" },
    ],
    sights: [
      {
        title: "Эрмитаж",
        description: "Один из крупнейших музеев мира — 3 млн экспонатов",
        image: "https://images.unsplash.com/photo-1548834925-e48f8a27ae58?w=800&q=80",
        locationSlug: "hermitage",
      },
      {
        title: "Петропавловская крепость",
        description: "Историческое сердце города на Заячьем острове",
        image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80",
      },
      {
        title: "Дворцовая площадь",
        description: "Главная площадь с Зимним дворцом и Александровской колонной",
        image: "https://images.unsplash.com/photo-1556610961-2fecc5927173?w=800&q=80",
      },
      {
        title: "Исаакиевский собор",
        description: "Шедевр архитектуры с панорамной колоннадой",
        image: "https://images.unsplash.com/photo-1578774204375-d9d8b4f4e4ad?w=800&q=80",
      },
      {
        title: "Спас на Крови",
        description: "Храм-памятник с 7000 кв.м мозаики",
        image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80",
      },
      {
        title: "Петергоф",
        description: "Дворцово-парковый ансамбль с легендарными фонтанами",
        image: "https://images.unsplash.com/photo-1571974599782-87624638275a?w=800&q=80",
      },
    ],
    venues: [
      {
        slug: "hermitage",
        title: "Государственный Эрмитаж",
        type: "Музей",
        address: "Дворцовая наб., 38",
        metro: "Адмиралтейская",
        image: "https://images.unsplash.com/photo-1548834925-e48f8a27ae58?w=600&q=80",
      },
      {
        slug: "summer-garden",
        title: "Летний сад",
        type: "Парк",
        address: "наб. Кутузова, 2",
        metro: "Гостиный двор",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80",
      },
      {
        slug: "palace-pier",
        title: "Дворцовая пристань",
        type: "Причал",
        address: "Адмиралтейская наб., 2",
        metro: "Адмиралтейская",
        image: "https://images.unsplash.com/photo-1555963153-11ff60182d08?w=600&q=80",
      },
    ],
    popularTags: [
      { label: "Можно с детской коляской", count: 35 },
      { label: "Кафе-бар", count: 17 },
      { label: "Есть на сегодня", count: 10 },
      { label: "Живая музыка" },
      { label: "На воде" },
      { label: "Панорамный теплоход" },
      { label: "Дискотека" },
      { label: "Ночная" },
      { label: "В любую погоду" },
      { label: "Для первого визита" },
      { label: "Интерактив" },
      { label: "Белые ночи" },
    ],
    recommended: [
      {
        id: "r1",
        title: 'Музыкальная комедия "Новая Помада"',
        duration: "2 ч 30 мин",
        priceFrom: 2100,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80",
        href: "#",
        badge: "Топ продаж",
      },
      {
        id: "r2",
        title: "Сердце Петербурга. Экскурсия по доходным домам",
        duration: "2 ч",
        priceFrom: 1000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&q=80",
        href: "#",
      },
      {
        id: "r3",
        title: "Обзорная экскурсия по Петербургу",
        duration: "2 ч",
        priceFrom: 2000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1556610961-2fecc5927173?w=600&q=80",
        href: "#",
      },
      {
        id: "r4",
        title: "Большая экскурсия по улице Рубинштейна",
        duration: "2 ч",
        priceFrom: 1200,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=80",
        href: "#",
      },
    ],
    more: [
      { id: "m1", title: "По дворам и парадным Петербурга", duration: "2 ч", priceFrom: 1790, rating: 4.6, image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&q=80", href: "#" },
      { id: "m2", title: "Особняк Брусницыных", duration: "1 ч", priceFrom: 1000, rating: 4.9, image: "https://images.unsplash.com/photo-1578774204375-d9d8b4f4e4ad?w=600&q=80", href: "#" },
      { id: "m3", title: "Вечерняя экскурсия по Петербургу", duration: "2 ч", priceFrom: 1000, rating: 4.9, image: "https://images.unsplash.com/photo-1556610961-2fecc5927173?w=600&q=80", href: "#" },
      { id: "m4", title: "Пять разводных мостов", duration: "2 ч 16 мин", priceFrom: 1200, rating: 5.0, image: "https://images.unsplash.com/photo-1571974599782-87624638275a?w=600&q=80", href: "#", badge: "Хит" },
      { id: "m5", title: "Экскурсия в Дом ученых (Владимирский дворец)", duration: "1 ч", priceFrom: 1400, rating: 4.8, image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=80", href: "#" },
      { id: "m6", title: "🎭PRO standup концерт МЕДИЙНЫХ комиков", duration: "2 ч", priceFrom: 390, rating: 4.6, image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80", href: "#" },
    ],
    articles: [
      {
        title: "10 шедевров Эрмитажа, которые нельзя пропустить",
        excerpt: "Путеводитель по главным произведениям коллекции",
        image: "https://images.unsplash.com/photo-1564399579-0145267d0c4e?w=600&q=80",
        url: "#",
      },
      {
        title: "Белые ночи: куда пойти в Петербурге",
        excerpt: "Программа на самую романтичную неделю года",
        image: "https://images.unsplash.com/photo-1556610961-2fecc5927173?w=600&q=80",
        url: "#",
      },
    ],
    faq: [
      { q: "Сколько дней нужно на Петербург?", a: "Для первого знакомства — минимум 3-4 дня: один на Эрмитаж, один на пригороды (Петергоф/Пушкин), остальное — пешие прогулки и экскурсии." },
      { q: "Когда лучше ехать?", a: "С мая по июль — белые ночи и разводные мосты. Декабрь — Новый год и катки. Музеи открыты круглый год." },
      { q: "Можно ли купить билеты на сегодня?", a: "Да, у многих экскурсий есть слоты на сегодня — фильтр «Есть на сегодня» в каталоге." },
    ],
  },

  moscow: {
    slug: "moscow",
    name: "Москва",
    nameLocative: "Москве",
    intro:
      "Столица России — Кремль, Красная площадь, Третьяковка, набережные Москвы-реки и десятки парков с круглогодичной программой.",
    heroImage: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1600&q=80",
    eventsCount: 124,
    categories: [
      { key: "tours", label: "Экскурсии", emoji: "🎭", count: 42, href: "#recommended" },
      { key: "museums", label: "Музеи и Арт", emoji: "🏛️", count: 28, href: "#venues" },
      { key: "events", label: "Мероприятия", emoji: "🎟️", count: 54, href: "#more" },
    ],
    sights: [
      { title: "Красная площадь", description: "Главная площадь страны", image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80" },
      { title: "Третьяковская галерея", description: "Главное собрание русской живописи", image: "https://images.unsplash.com/photo-1564399579-0145267d0c4e?w=800&q=80" },
      { title: "Парк Горького", description: "Главный парк Москвы — фестивали и набережная", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80", locationSlug: "gorky-park" },
      { title: "ВДНХ", description: "Огромный парк-выставка с павильонами и фонтанами", image: "https://images.unsplash.com/photo-1571974599782-87624638275a?w=800&q=80" },
    ],
    venues: [
      { slug: "gorky-park", title: "Парк Горького", type: "Парк", address: "ул. Крымский Вал, 9", metro: "Парк Культуры", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80" },
      { slug: "moscow-zoo", title: "Московский зоопарк", type: "Зоопарк", address: "Б. Грузинская, 1", metro: "Баррикадная", image: "https://images.unsplash.com/photo-1474314243412-cd4a79f02c6a?w=600&q=80" },
    ],
    popularTags: [
      { label: "Для семьи", count: 48 },
      { label: "Можно с коляской", count: 22 },
      { label: "Бесплатно", count: 15 },
      { label: "Речные прогулки" },
      { label: "Ночная" },
      { label: "Для первого визита" },
    ],
    recommended: [
      { id: "mr1", title: "Речная прогулка по Москве-реке", duration: "1 ч 30 мин", priceFrom: 900, rating: 4.8, image: "https://images.unsplash.com/photo-1571974599782-87624638275a?w=600&q=80", href: "/river-cruises/moscow", badge: "Топ продаж" },
      { id: "mr2", title: "Экскурсия по Кремлю", duration: "2 ч", priceFrom: 1500, rating: 4.7, image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80", href: "#" },
      { id: "mr3", title: "Москва ночная — обзорная", duration: "3 ч", priceFrom: 2200, rating: 4.9, image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&q=80", href: "/bus-tours/moscow" },
    ],
    more: [
      { id: "mm1", title: "Ужин на теплоходе", duration: "2 ч", priceFrom: 3500, rating: 4.8, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80", href: "/dinner-cruise" },
      { id: "mm2", title: "Третьяковская галерея — без очереди", duration: "1 ч 30 мин", priceFrom: 800, rating: 4.6, image: "https://images.unsplash.com/photo-1564399579-0145267d0c4e?w=600&q=80", href: "#" },
    ],
    articles: [
      { title: "Куда пойти в Москве с детьми", excerpt: "Зоопарк, парки и музеи без скуки", image: "https://images.unsplash.com/photo-1474314243412-cd4a79f02c6a?w=600&q=80", url: "#" },
    ],
    faq: [
      { q: "Сколько стоит вход в Кремль?", a: "От 700 ₽ за обзорный билет, 500 ₽ — Оружейная палата отдельно." },
      { q: "Можно ли гулять по Красной площади ночью?", a: "Да, площадь открыта круглосуточно, кроме дней мероприятий." },
    ],
  },
};
