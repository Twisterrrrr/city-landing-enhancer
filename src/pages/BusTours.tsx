import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HeroSection } from "@/components/landing/HeroSection";
import { BusFilterBar, type BusFilterState } from "@/components/bus/BusFilterBar";
import { TripCard, type TripVariant } from "@/components/landing/TripCard";
import { FaqSection } from "@/components/landing/FaqSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { StickyHeader } from "@/components/landing/StickyHeader";
import { CityIntroSection } from "@/components/salute/CityIntroSection";
import { BUS_CITIES, BUS_CITY_NAMES, BUS_SLUG_TO_CITY_NAME } from "@/data/bus-landings";
import { Shield, MapPin, Bus } from "lucide-react";

// ─── MOCK DATA ──────────────────────────────────────────────

interface BusVariant extends TripVariant {
  city: string;
  timeCategory: "morning" | "day" | "evening" | "night";
}

const MOCK: BusVariant[] = [
  // Москва
  { id: "b1", title: "Обзорная: Кремль — Москва-Сити — Воробьёвы горы", startsAt: "2026-06-15T10:00:00+03:00", durationMinutes: 180, pier: "Площадь Революции", price: 1290, rating: 4.8, reviewCount: 1560, availableTickets: 20, shipName: "City Sightseeing", amenities: ["audioguide", "deck"], city: "Москва", timeCategory: "morning" },
  { id: "b2", title: "Ночная Москва — огни столицы", startsAt: "2026-06-15T21:00:00+03:00", durationMinutes: 150, pier: "Площадь Революции", price: 1690, rating: 4.9, reviewCount: 890, availableTickets: 10, amenities: ["audioguide"], city: "Москва", timeCategory: "night" },
  { id: "b3", title: "Hop-on/Hop-off — весь день", startsAt: "2026-06-15T09:00:00+03:00", durationMinutes: 480, pier: "Театральная площадь", price: 1990, rating: 4.7, reviewCount: 2340, availableTickets: 50, shipName: "City Sightseeing", amenities: ["audioguide", "deck"], city: "Москва", timeCategory: "morning" },
  // СПб
  { id: "b4", title: "Классический Петербург: Невский — Дворцовая — Исаакий", startsAt: "2026-06-15T11:00:00+03:00", durationMinutes: 180, pier: "Аничков мост", price: 1190, rating: 4.8, reviewCount: 1120, availableTickets: 15, amenities: ["audioguide"], city: "Санкт-Петербург", timeCategory: "morning" },
  { id: "b5", title: "Ночной Петербург + разводные мосты", startsAt: "2026-06-15T23:00:00+03:00", durationMinutes: 180, pier: "Невский проспект", price: 1790, rating: 4.9, reviewCount: 1890, availableTickets: 5, amenities: ["audioguide"], city: "Санкт-Петербург", timeCategory: "night" },
  { id: "b6", title: "Петергоф — автобусная экскурсия", startsAt: "2026-06-15T09:30:00+03:00", durationMinutes: 300, pier: "Московский вокзал", price: 2490, rating: 4.7, reviewCount: 678, availableTickets: 12, amenities: ["audioguide", "food"], city: "Санкт-Петербург", timeCategory: "morning" },
  // Казань
  { id: "b7", title: "Обзорная: Кремль — Баумана — Старо-Татарская слобода", startsAt: "2026-06-15T12:00:00+03:00", durationMinutes: 150, pier: "Площадь Тысячелетия", price: 890, rating: 4.7, reviewCount: 543, availableTickets: 20, amenities: ["audioguide"], city: "Казань", timeCategory: "day" },
  { id: "b8", title: "Вечерняя Казань с подсветкой", startsAt: "2026-06-15T20:00:00+03:00", durationMinutes: 120, pier: "Площадь Тысячелетия", price: 990, rating: 4.6, reviewCount: 234, availableTickets: 15, amenities: ["audioguide"], city: "Казань", timeCategory: "evening" },
  // Н. Новгород
  { id: "b9", title: "Верхний + Нижний город: Кремль, Стрелка, Покровка", startsAt: "2026-06-15T11:00:00+03:00", durationMinutes: 150, pier: "Площадь Минина", price: 790, rating: 4.7, reviewCount: 345, availableTickets: 20, amenities: ["audioguide"], city: "Нижний Новгород", timeCategory: "morning" },
  // Сочи
  { id: "b10", title: "Олимпийский парк + Красная Поляна", startsAt: "2026-06-15T09:00:00+03:00", durationMinutes: 360, pier: "Морской вокзал", price: 2990, rating: 4.8, reviewCount: 765, availableTickets: 8, amenities: ["audioguide", "food"], city: "Сочи", timeCategory: "morning" },
  { id: "b11", title: "Обзорная Сочи: центр и Дендрарий", startsAt: "2026-06-15T14:00:00+03:00", durationMinutes: 180, pier: "Морской вокзал", price: 1290, rating: 4.6, reviewCount: 432, availableTickets: 15, amenities: ["audioguide", "deck"], city: "Сочи", timeCategory: "day" },
  // Калининград
  { id: "b12", title: "Обзорная: Остров Канта — форты — ворота", startsAt: "2026-06-15T11:00:00+02:00", durationMinutes: 150, pier: "Рыбная деревня", price: 990, rating: 4.8, reviewCount: 567, availableTickets: 18, amenities: ["audioguide"], city: "Калининград", timeCategory: "morning" },
  { id: "b13", title: "Куршская коса — дюны и танцующий лес", startsAt: "2026-06-15T09:00:00+02:00", durationMinutes: 360, pier: "Площадь Победы", price: 2490, rating: 4.9, reviewCount: 890, availableTickets: 6, amenities: ["audioguide", "food"], city: "Калининград", timeCategory: "morning" },
  // Екатеринбург
  { id: "b14", title: "Обзорная + граница Европы и Азии", startsAt: "2026-06-15T10:00:00+05:00", durationMinutes: 180, pier: "Площадь 1905 года", price: 1190, rating: 4.7, reviewCount: 321, availableTickets: 15, amenities: ["audioguide"], city: "Екатеринбург", timeCategory: "morning" },
  // Самара
  { id: "b15", title: "Обзорная Самара: набережная и Бункер Сталина", startsAt: "2026-06-15T12:00:00+04:00", durationMinutes: 150, pier: "Площадь Куйбышева", price: 890, rating: 4.6, reviewCount: 198, availableTickets: 20, amenities: ["audioguide"], city: "Самара", timeCategory: "day" },
  // Волгоград
  { id: "b16", title: "Мамаев курган + панорама Сталинградской битвы", startsAt: "2026-06-15T10:00:00+03:00", durationMinutes: 240, pier: "Площадь Павших Борцов", price: 1490, rating: 4.9, reviewCount: 876, availableTickets: 10, amenities: ["audioguide"], city: "Волгоград", timeCategory: "morning" },
  // Ярославль
  { id: "b17", title: "Золотое кольцо: Стрелка и храмы", startsAt: "2026-06-15T11:00:00+03:00", durationMinutes: 150, pier: "Богоявленская площадь", price: 690, rating: 4.7, reviewCount: 234, availableTickets: 20, amenities: ["audioguide"], city: "Ярославль", timeCategory: "morning" },
  // Ростов-на-Дону
  { id: "b18", title: "Обзорная: набережная, модерн и казачий колорит", startsAt: "2026-06-15T12:00:00+03:00", durationMinutes: 150, pier: "Большая Садовая", price: 790, rating: 4.5, reviewCount: 176, availableTickets: 20, amenities: ["audioguide"], city: "Ростов-на-Дону", timeCategory: "day" },
];

const DEFAULT_FAQ = [
  { question: "Сколько длится обзорная экскурсия?", answer: "Обычно 2–3 часа. Загородные маршруты (Петергоф, Куршская коса, Красная Поляна) — 4–6 часов." },
  { question: "Есть ли аудиогид?", answer: "Да, большинство автобусов оборудованы аудиогидами на нескольких языках." },
  { question: "Можно ли с детьми?", answer: "Да, дети до 7 лет обычно бесплатно. Автобусные экскурсии подходят для всех возрастов." },
  { question: "Чем автобусная экскурсия лучше пешей?", answer: "Вы увидите больше за меньше времени и не устанете. Особенно актуально для городов с большими расстояниями." },
];

const REVIEWS = [
  { text: "Hop-on/hop-off в Москве — идеальный первый день. Увидели всё за одну поездку!", author: "Анна К.", rating: 5 },
  { text: "Ночной Петербург с мостами — атмосферно. Гид рассказывал так, что мурашки.", author: "Дмитрий С.", rating: 5 },
  { text: "Куршская коса из Калининграда — лучшая экскурсия в жизни. Дюны нереальные!", author: "Ольга М.", rating: 5 },
  { text: "Мамаев курган — до слёз. Обязательно берите экскурсию, без гида половину не поймёте.", author: "Игорь Л.", rating: 5 },
  { text: "Граница Европы и Азии — забавное фото, но экскурсия по конструктивизму в Екатеринбурге — вот настоящее открытие!", author: "Марина П.", rating: 5 },
  { text: "Красная Поляна из Сочи — от моря до гор за час. Дети в восторге!", author: "Павел Н.", rating: 5 },
];

// ─── SCORING ────────────────────────────────────────────────

function pickOptimal(variants: TripVariant[]): number | null {
  const available = variants.filter((v) => v.availableTickets > 0);
  if (available.length === 0) return null;
  const prices = available.map((v) => v.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  let bestIdx = -1;
  let bestScore = -1;
  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    if (v.availableTickets <= 0) continue;
    const priceScore = maxP === minP ? 1 : 1 - (v.price - minP) / (maxP - minP);
    const ratingScore = v.rating / 5;
    const seatScore = Math.min(v.availableTickets / 20, 1);
    const score = 0.4 * priceScore + 0.4 * ratingScore + 0.2 * seatScore;
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  }
  return bestIdx >= 0 ? bestIdx : null;
}

// ─── JSON-LD ────────────────────────────────────────────────

function EventJsonLd({ variants, cityName }: { variants: BusVariant[]; cityName?: string }) {
  const events = variants.filter((v) => v.availableTickets > 0).slice(0, 5).map((v) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: v.title,
    startDate: v.startsAt,
    location: {
      "@type": "Place",
      name: v.pier,
      address: { "@type": "PostalAddress", addressLocality: v.city, addressCountry: "RU" },
    },
    offers: {
      "@type": "Offer",
      price: v.price,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
    description: `Автобусная экскурсия${cityName ? ` в ${cityName}` : ""} — ${v.title}`,
  }));
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(events.length === 1 ? events[0] : events) }} />
  );
}

function SeoHead({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", description);
    else {
      const el = document.createElement("meta");
      el.name = "description";
      el.content = description;
      document.head.appendChild(el);
    }
  }, [title, description]);
  return null;
}

function OtherCitiesBlock({ currentCity }: { currentCity: string }) {
  const others = Object.values(BUS_CITIES).filter((l) => l.cityName !== currentCity);
  if (others.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Автобусные экскурсии в других городах</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {others.map((l) => (
          <Link key={l.slug} to={`/bus-tours/${l.slug}`}
            className="flex items-center gap-2 rounded-lg border border-border p-3 hover:border-primary/40 transition-colors">
            <Bus className="w-4 h-4 text-primary shrink-0" />
            <div>
              <span className="text-sm font-medium text-foreground">{l.cityName}</span>
              <span className="text-xs text-muted-foreground ml-1.5">{l.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ───────────────────────────────────────────────────

const BusTours = () => {
  const { city: citySlug } = useParams<{ city?: string }>();
  const cityName = citySlug ? BUS_SLUG_TO_CITY_NAME[citySlug] : undefined;
  const landing = citySlug ? BUS_CITIES[citySlug] : undefined;

  const [filters, setFilters] = useState<BusFilterState>({
    city: cityName || "",
    date: "",
    timeSlot: "",
    sort: "price",
    amenities: [],
  });

  useEffect(() => {
    setFilters((f) => ({ ...f, city: cityName || "" }));
  }, [cityName]);

  const filtered = useMemo(() => {
    return MOCK.filter((v) => {
      if (v.availableTickets <= 0) return true;
      if (filters.city && v.city !== filters.city) return false;
      if (filters.timeSlot && v.timeCategory !== filters.timeSlot) return false;
      if (filters.amenities.length > 0) {
        const va = v.amenities || [];
        if (!filters.amenities.every((a) => va.includes(a))) return false;
      }
      return true;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const out = [...filtered];
    if (filters.sort === "price") out.sort((a, b) => a.price - b.price);
    else if (filters.sort === "popular") out.sort((a, b) => b.rating - a.rating);
    else out.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
    return out;
  }, [filtered, filters.sort]);

  const bestIdx = useMemo(() => pickOptimal(sorted), [sorted]);

  const seoTitle = landing?.seoTitle || "Обзорные автобусные экскурсии по России — расписание и цены 2026";
  const seoDesc = landing?.seoDescription || "Автобусные экскурсии в 11+ городах России: Москва, Петербург, Сочи, Калининград и другие. Сравните расписание, цены и отзывы.";
  const heroTitle = landing
    ? `Обзорные автобусные экскурсии по ${landing.cityNameDative} сегодня — цены, расписание и маршруты`
    : "Обзорные автобусные экскурсии по России — цены, расписание и маршруты";
  const heroSubtitle = landing?.heroSubtitle || "От Калининграда до Сочи — сравните автобусные экскурсии в 11 городах России.";
  const faqItems = landing?.faq || DEFAULT_FAQ;
  const isLowResults = sorted.filter((v) => v.availableTickets > 0).length < 3;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title={seoTitle} description={seoDesc} />
      <EventJsonLd variants={sorted as BusVariant[]} cityName={landing?.cityName} />
      <StickyHeader />

      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        totalTrips={MOCK.length}
        totalSold={18400}
        avgRating={4.7}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Автобусные экскурсии", href: "/bus-tours" },
          ...(landing ? [{ label: landing.cityName }] : []),
        ]}
      />

      {landing && <CityIntroSection landing={landing} />}

      <section id="variants" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Расписание{landing ? ` — ${landing.cityName}` : ""}
        </h2>

        <BusFilterBar cities={BUS_CITY_NAMES} filters={filters} onChange={setFilters} />

        <div className="flex items-center gap-3 mt-6 mb-4">
          <span className="text-sm text-muted-foreground">
            {sorted.length > 0
              ? `${sorted.length} ${sorted.length === 1 ? "экскурсия" : sorted.length < 5 ? "экскурсии" : "экскурсий"}`
              : "Нет экскурсий по выбранным фильтрам"}
          </span>
          {bestIdx !== null && (
            <span className="text-xs text-primary font-medium">⭐ Оптимальный выбор выделен</span>
          )}
        </div>

        <div className="space-y-3">
          {sorted.map((v, i) => (
            <TripCard key={v.id} variant={v} isBest={i === bestIdx} index={i} />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Попробуйте изменить фильтры</p>
          </div>
        )}

        {isLowResults && landing && (
          <div className="mt-8 rounded-xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Бесплатные альтернативы — {landing.cityName}
            </h3>
            <ul className="space-y-2">
              {landing.viewpoints.filter((vp) => vp.isFree).map((vp) => (
                <li key={vp.name} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground text-sm">{vp.name}</span>
                    <span className="text-sm text-muted-foreground"> — {vp.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {landing && (
          <div className="mt-8">
            <OtherCitiesBlock currentCity={landing.cityName} />
          </div>
        )}
      </section>

      <div className="container mx-auto px-4">
        <FaqSection items={faqItems} />
        <ReviewsSection items={REVIEWS} />

        {!landing && (
          <div className="py-8">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Автобусные экскурсии по городам</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.values(BUS_CITIES).map((l) => (
                  <Link key={l.slug} to={`/bus-tours/${l.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-border p-3 hover:border-primary/40 transition-colors">
                    <Bus className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{l.cityName}</span>
                      <span className="text-xs text-muted-foreground ml-1.5">{l.duration}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="py-12 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Покупка оформляется через билетную систему организатора. Мы помогаем сравнить предложения.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusTours;
