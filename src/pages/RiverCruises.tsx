import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HeroSection } from "@/components/landing/HeroSection";
import { RiverFilterBar, type RiverFilterState } from "@/components/river/RiverFilterBar";
import { TripCard, type TripVariant } from "@/components/landing/TripCard";
import { FaqSection } from "@/components/landing/FaqSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { StickyHeader } from "@/components/landing/StickyHeader";
import { CityIntroSection } from "@/components/salute/CityIntroSection";
import { RIVER_CITIES, RIVER_CITY_NAMES, RIVER_SLUG_TO_CITY_NAME } from "@/data/river-landings";
import { Shield, MapPin, Anchor } from "lucide-react";

// ─── MOCK DATA ──────────────────────────────────────────────

interface RiverVariant extends TripVariant {
  city: string;
  timeCategory: "morning" | "day" | "evening" | "night";
}

const MOCK: RiverVariant[] = [
  // Москва
  { id: "r1", title: "Обзорная прогулка: Кремль — Москва-Сити", startsAt: "2026-06-15T12:00:00+03:00", durationMinutes: 120, pier: "Причал «Большой Устьинский мост»", price: 990, rating: 4.8, reviewCount: 1240, availableTickets: 20, shipName: "Ривер Палас", amenities: ["food", "deck"], city: "Москва", timeCategory: "day" },
  { id: "r2", title: "Ночная Москва-река: огни столицы", startsAt: "2026-06-15T21:30:00+03:00", durationMinutes: 150, pier: "Причал «Парк Горького»", price: 1990, rating: 4.9, reviewCount: 876, availableTickets: 8, shipName: "Нео", amenities: ["food", "music", "deck"], city: "Москва", timeCategory: "night" },
  { id: "r3", title: "Ужин-круиз с живой музыкой", startsAt: "2026-06-15T19:00:00+03:00", durationMinutes: 180, pier: "Причал «Киевский вокзал»", price: 3490, rating: 4.7, reviewCount: 432, availableTickets: 4, shipName: "Риверсайд", amenities: ["food", "music", "guide"], city: "Москва", timeCategory: "evening" },
  { id: "r4", title: "Утренний кофе-круиз", startsAt: "2026-06-15T09:00:00+03:00", durationMinutes: 90, pier: "Причал «Новоспасский мост»", price: 690, rating: 4.5, reviewCount: 213, availableTickets: 25, amenities: ["food", "deck"], city: "Москва", timeCategory: "morning" },
  // СПб
  { id: "r5", title: "Разводные мосты — ночной рейс", startsAt: "2026-06-15T23:30:00+03:00", durationMinutes: 120, pier: "Дворцовая наб.", price: 1490, rating: 4.9, reviewCount: 2100, availableTickets: 6, shipName: "Нева Стар", amenities: ["food", "deck", "audioguide"], city: "Санкт-Петербург", timeCategory: "night" },
  { id: "r6", title: "Каналы Петербурга: Мойка + Фонтанка", startsAt: "2026-06-15T14:00:00+03:00", durationMinutes: 90, pier: "наб. Фонтанки", price: 890, rating: 4.7, reviewCount: 965, availableTickets: 15, amenities: ["audioguide"], city: "Санкт-Петербург", timeCategory: "day" },
  { id: "r7", title: "Большая Нева — панорамный круиз", startsAt: "2026-06-15T18:00:00+03:00", durationMinutes: 120, pier: "Английская наб.", price: 1290, rating: 4.8, reviewCount: 543, availableTickets: 10, shipName: "Царица Невы", amenities: ["food", "music", "deck"], city: "Санкт-Петербург", timeCategory: "evening" },
  // Казань
  { id: "r8", title: "Казанка: вид на Кремль", startsAt: "2026-06-15T15:00:00+03:00", durationMinutes: 60, pier: "Причал «Кремлёвская»", price: 590, rating: 4.6, reviewCount: 387, availableTickets: 20, shipName: "Волга Стар", amenities: ["deck"], city: "Казань", timeCategory: "day" },
  { id: "r9", title: "Круиз до Свияжска", startsAt: "2026-06-15T10:00:00+03:00", durationMinutes: 300, pier: "Речной порт", price: 1890, rating: 4.8, reviewCount: 278, availableTickets: 12, amenities: ["food", "guide", "deck"], city: "Казань", timeCategory: "morning" },
  // Н. Новгород
  { id: "r10", title: "Стрелка: слияние Оки и Волги", startsAt: "2026-06-15T16:00:00+03:00", durationMinutes: 90, pier: "Причал «Стрелка»", price: 790, rating: 4.7, reviewCount: 456, availableTickets: 15, shipName: "Нижегородец", amenities: ["food", "deck"], city: "Нижний Новгород", timeCategory: "day" },
  { id: "r11", title: "Вечерняя Волга: закат с воды", startsAt: "2026-06-15T19:30:00+03:00", durationMinutes: 120, pier: "Речной вокзал", price: 1190, rating: 4.6, reviewCount: 198, availableTickets: 8, amenities: ["food", "music"], city: "Нижний Новгород", timeCategory: "evening" },
  // Самара
  { id: "r12", title: "Волга и Жигулёвские горы", startsAt: "2026-06-15T11:00:00+03:00", durationMinutes: 180, pier: "Речной вокзал", price: 1290, rating: 4.8, reviewCount: 312, availableTickets: 10, shipName: "Самара", amenities: ["food", "guide", "deck"], city: "Самара", timeCategory: "morning" },
  { id: "r13", title: "Закат на Волге — вечерний круиз", startsAt: "2026-06-15T19:00:00+03:00", durationMinutes: 120, pier: "Причал «Полевой спуск»", price: 890, rating: 4.5, reviewCount: 176, availableTickets: 18, amenities: ["food", "music"], city: "Самара", timeCategory: "evening" },
  // Волгоград
  { id: "r14", title: "Волга: набережная и Мамаев курган", startsAt: "2026-06-15T14:00:00+03:00", durationMinutes: 90, pier: "Центральная набережная", price: 690, rating: 4.6, reviewCount: 234, availableTickets: 20, amenities: ["audioguide", "deck"], city: "Волгоград", timeCategory: "day" },
  // Ярославль
  { id: "r15", title: "Стрелка Волги и Которосли", startsAt: "2026-06-15T13:00:00+03:00", durationMinutes: 75, pier: "Стрелка", price: 590, rating: 4.7, reviewCount: 198, availableTickets: 15, amenities: ["audioguide", "deck"], city: "Ярославль", timeCategory: "day" },
  // Красноярск
  { id: "r16", title: "Енисей: мосты и панорама", startsAt: "2026-07-01T14:00:00+07:00", durationMinutes: 90, pier: "Речной вокзал", price: 790, rating: 4.6, reviewCount: 145, availableTickets: 12, amenities: ["deck"], city: "Красноярск", timeCategory: "day" },
  // Пермь
  { id: "r17", title: "Кама: обзорный рейс", startsAt: "2026-06-20T15:00:00+05:00", durationMinutes: 90, pier: "Речной вокзал", price: 590, rating: 4.4, reviewCount: 98, availableTickets: 20, amenities: ["deck"], city: "Пермь", timeCategory: "day" },
  // Ростов-на-Дону
  { id: "r18", title: "Дон: обзорная прогулка", startsAt: "2026-06-15T16:00:00+03:00", durationMinutes: 90, pier: "Набережная Дона", price: 690, rating: 4.5, reviewCount: 187, availableTickets: 18, amenities: ["food", "deck"], city: "Ростов-на-Дону", timeCategory: "day" },
  { id: "r19", title: "До Старочеркасской — казачий круиз", startsAt: "2026-06-15T10:00:00+03:00", durationMinutes: 300, pier: "Речной вокзал", price: 1690, rating: 4.7, reviewCount: 134, availableTickets: 8, amenities: ["food", "guide", "music"], city: "Ростов-на-Дону", timeCategory: "morning" },
  // Новосибирск
  { id: "r20", title: "Обь: панорама Новосибирска", startsAt: "2026-07-01T14:00:00+07:00", durationMinutes: 90, pier: "Речной вокзал", price: 690, rating: 4.4, reviewCount: 112, availableTickets: 15, amenities: ["deck"], city: "Новосибирск", timeCategory: "day" },
  // Тверь
  { id: "r21", title: "Волга: исторический центр Твери", startsAt: "2026-06-15T13:00:00+03:00", durationMinutes: 60, pier: "Речной вокзал", price: 490, rating: 4.5, reviewCount: 87, availableTickets: 20, amenities: ["audioguide"], city: "Тверь", timeCategory: "day" },
];

const DEFAULT_FAQ = [
  { question: "Когда начинается навигация?", answer: "В большинстве городов — с апреля–мая по октябрь. В Сибири сезон короче: июнь–сентябрь." },
  { question: "Что взять с собой?", answer: "Ветровку (на воде прохладнее), солнцезащитные очки, фотоаппарат. На вечерние рейсы — тёплую одежду." },
  { question: "Можно ли с детьми?", answer: "Да, большинство дневных рейсов подходят для семей. На борту есть крытые зоны и туалеты." },
  { question: "Как купить билет?", answer: "Выберите рейс и нажмите «Купить билет». Покупка оформляется через систему организатора." },
];

const REVIEWS = [
  { text: "Прогулка по Москве-реке — обязательный пункт для гостей столицы! Кремль с воды — совсем другое впечатление.", author: "Анна К.", rating: 5 },
  { text: "Разводные мосты с теплохода — магия Петербурга. Бронируйте заранее, места разлетаются!", author: "Дмитрий С.", rating: 5 },
  { text: "Круиз до Свияжска из Казани — целое приключение на день. Рекомендую!", author: "Марина П.", rating: 5 },
  { text: "Жигулёвские горы с воды — потрясающе. Самара недооценена туристами!", author: "Игорь Л.", rating: 5 },
  { text: "Енисей впечатляет масштабом. Совсем другие реки в Сибири — мощные, широкие.", author: "Елена Б.", rating: 4 },
  { text: "Казачий круиз по Дону — вкусная кухня, живая музыка, южный колорит!", author: "Павел Н.", rating: 5 },
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

function EventJsonLd({ variants, cityName }: { variants: RiverVariant[]; cityName?: string }) {
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
    description: `Речная прогулка${cityName ? ` в ${cityName}` : ""} — ${v.title}`,
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
  const others = Object.values(RIVER_CITIES).filter((l) => l.cityName !== currentCity);
  if (others.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Речные прогулки в других городах</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {others.map((l) => (
          <Link key={l.slug} to={`/river-cruises/${l.slug}`}
            className="flex items-center gap-2 rounded-lg border border-border p-3 hover:border-primary/40 transition-colors">
            <Anchor className="w-4 h-4 text-primary shrink-0" />
            <div>
              <span className="text-sm font-medium text-foreground">{l.cityName}</span>
              <span className="text-xs text-muted-foreground ml-1.5">{l.riverName}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ───────────────────────────────────────────────────

const RiverCruises = () => {
  const { city: citySlug } = useParams<{ city?: string }>();
  const cityName = citySlug ? RIVER_SLUG_TO_CITY_NAME[citySlug] : undefined;
  const landing = citySlug ? RIVER_CITIES[citySlug] : undefined;

  const [filters, setFilters] = useState<RiverFilterState>({
    city: cityName || "",
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

  const seoTitle = landing?.seoTitle || "Речные прогулки по России — расписание и цены 2026";
  const seoDesc = landing?.seoDescription || "Речные прогулки в 12+ городах России: Москва, Петербург, Казань и другие. Сравните расписание, цены и отзывы.";
  const heroTitle = landing
    ? `Речные прогулки по ${landing.cityName} сегодня — цены, расписание и сравнение теплоходов`
    : "Речные прогулки по России — цены, расписание и сравнение теплоходов";
  const heroSubtitle = landing?.heroSubtitle || "От Невы до Енисея — сравните предложения речных прогулок в 12 городах России.";
  const faqItems = landing?.faq || DEFAULT_FAQ;
  const isLowResults = sorted.filter((v) => v.availableTickets > 0).length < 3;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title={seoTitle} description={seoDesc} />
      <EventJsonLd variants={sorted as RiverVariant[]} cityName={landing?.cityName} />
      <StickyHeader />

      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        totalTrips={MOCK.length}
        totalSold={24600}
        avgRating={4.7}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Речные прогулки", href: "/river-cruises" },
          ...(landing ? [{ label: landing.cityName }] : []),
        ]}
      />

      {landing && <CityIntroSection landing={landing} />}

      <section id="variants" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Расписание{landing ? ` — ${landing.cityName}` : ""}
        </h2>

        <RiverFilterBar cities={RIVER_CITY_NAMES} filters={filters} onChange={setFilters} />

        <div className="flex items-center gap-3 mt-6 mb-4">
          <span className="text-sm text-muted-foreground">
            {sorted.length > 0
              ? `${sorted.length} ${sorted.length === 1 ? "прогулка" : sorted.length < 5 ? "прогулки" : "прогулок"}`
              : "Нет прогулок по выбранным фильтрам"}
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
              <h3 className="text-lg font-semibold text-foreground">Речные прогулки по городам</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.values(RIVER_CITIES).map((l) => (
                  <Link key={l.slug} to={`/river-cruises/${l.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-border p-3 hover:border-primary/40 transition-colors">
                    <Anchor className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{l.cityName}</span>
                      <span className="text-xs text-muted-foreground ml-1.5">{l.riverName}</span>
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

export default RiverCruises;
