import { useMemo, useState } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { SaluteFilterBar, type SaluteFilterState } from "@/components/salute/SaluteFilterBar";
import { TripCard, type TripVariant } from "@/components/landing/TripCard";
import { FaqSection } from "@/components/landing/FaqSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { StickyHeader } from "@/components/landing/StickyHeader";
import { SaluteHowToChoose } from "@/components/salute/SaluteHowToChoose";
import { Shield } from "lucide-react";

// ─── MOCK DATA ──────────────────────────────────────────────

const CITIES = ["Москва", "Санкт-Петербург", "Казань", "Нижний Новгород"];

type TransportType = "river" | "bus" | "car" | "moto";

interface SaluteVariant extends TripVariant {
  city: string;
  transport: TransportType;
}

const MOCK_VARIANTS: SaluteVariant[] = [
  { id: "s1", title: "Салют с борта теплохода — панорама Кремля", startsAt: "2026-05-09T20:30:00+03:00", durationMinutes: 120, pier: "Причал «Большой Устьинский мост»", price: 2490, rating: 4.9, reviewCount: 542, availableTickets: 6, shipName: "Москва-река Люкс", amenities: ["food", "music", "deck"], city: "Москва", transport: "river" },
  { id: "s2", title: "Автобусная экскурсия + салют на Воробьёвых горах", startsAt: "2026-05-09T19:00:00+03:00", durationMinutes: 180, pier: "м. Парк Культуры", price: 1290, rating: 4.6, reviewCount: 318, availableTickets: 15, amenities: ["guide", "audioguide"], city: "Москва", transport: "bus" },
  { id: "s3", title: "VIP-авто: маршрут по праздничной Москве + салют", startsAt: "2026-05-09T20:00:00+03:00", durationMinutes: 150, pier: "Любой адрес в центре", price: 5900, rating: 4.8, reviewCount: 87, availableTickets: 2, amenities: ["food", "music"], city: "Москва", transport: "car" },
  { id: "s4", title: "Мото-колонна: парад и салют", startsAt: "2026-05-09T18:00:00+03:00", durationMinutes: 240, pier: "Парк Победы", price: 1990, rating: 4.7, reviewCount: 156, availableTickets: 8, amenities: ["guide"], city: "Москва", transport: "moto" },
  { id: "s5", title: "Салют на Неве — разводные мосты и фейерверк", startsAt: "2026-05-09T21:00:00+03:00", durationMinutes: 120, pier: "Дворцовая наб.", price: 1990, rating: 4.9, reviewCount: 423, availableTickets: 4, shipName: "Аврора Ривер", amenities: ["food", "deck", "music"], city: "Санкт-Петербург", transport: "river" },
  { id: "s6", title: "Автобусный тур: военная история + салют", startsAt: "2026-05-09T17:00:00+03:00", durationMinutes: 240, pier: "Московский вокзал", price: 890, rating: 4.5, reviewCount: 267, availableTickets: 20, amenities: ["guide", "audioguide"], city: "Санкт-Петербург", transport: "bus" },
  { id: "s7", title: "Речная прогулка с видом на салют — Казанка", startsAt: "2026-05-09T20:00:00+03:00", durationMinutes: 90, pier: "Причал «Кремлёвская»", price: 1490, rating: 4.7, reviewCount: 198, availableTickets: 12, shipName: "Волга Стар", amenities: ["food", "deck"], city: "Казань", transport: "river" },
  { id: "s8", title: "Авто-тур по праздничной Казани", startsAt: "2026-05-09T19:30:00+03:00", durationMinutes: 120, pier: "Кремль", price: 2990, rating: 4.6, reviewCount: 64, availableTickets: 3, amenities: ["guide", "food"], city: "Казань", transport: "car" },
  { id: "s9", title: "Салют с борта: слияние Оки и Волги", startsAt: "2026-05-09T20:30:00+03:00", durationMinutes: 120, pier: "Причал «Стрелка»", price: 1690, rating: 4.8, reviewCount: 231, availableTickets: 9, shipName: "Нижегородец", amenities: ["food", "music", "deck"], city: "Нижний Новгород", transport: "river" },
  { id: "s10", title: "Автобус по местам боевой славы + салют", startsAt: "2026-05-09T16:00:00+03:00", durationMinutes: 300, pier: "пл. Минина", price: 790, rating: 4.4, reviewCount: 145, availableTickets: 25, amenities: ["guide", "audioguide"], city: "Нижний Новгород", transport: "bus" },
  { id: "s11", title: "Мото-парад 9 мая — Нижний Новгород", startsAt: "2026-05-09T17:00:00+03:00", durationMinutes: 180, pier: "пл. Победы", price: 1290, rating: 4.5, reviewCount: 78, availableTickets: 0, amenities: ["guide"], city: "Нижний Новгород", transport: "moto" },
  { id: "s12", title: "Речной круиз «Праздничный вечер» — СПб", startsAt: "2026-05-09T19:00:00+03:00", durationMinutes: 180, pier: "Английская наб.", price: 2990, rating: 4.8, reviewCount: 189, availableTickets: 3, shipName: "Царица Невы", amenities: ["food", "music", "guide", "deck"], city: "Санкт-Петербург", transport: "river" },
];

const FAQ_ITEMS = [
  { question: "Во сколько начинается салют 9 мая?", answer: "В большинстве городов праздничный салют начинается в 22:00. В Москве — традиционно 30 залпов с нескольких площадок одновременно. Рекомендуем выбирать рейсы, стартующие в 20:00–21:00." },
  { question: "Откуда лучше всего смотреть салют?", answer: "С воды — самый зрелищный вид: панорамный обзор, никаких деревьев и зданий. Автобусные туры привозят к лучшим смотровым площадкам. Авто-туры — максимальная гибкость маршрута." },
  { question: "Можно ли с детьми?", answer: "Да! Речные и автобусные экскурсии подходят для семей. Детские билеты обычно со скидкой 30–50%. На теплоходах есть крытые зоны." },
  { question: "Что взять с собой?", answer: "Тёплую одежду (вечером прохладно), фотоаппарат, хорошее настроение. На речных прогулках может быть ветрено — берите ветровку." },
  { question: "Как купить билет?", answer: "Выбирайте экскурсию в расписании и нажмите «Купить билет». Покупка оформляется через систему организатора. Мы помогаем сравнить предложения." },
];

const REVIEWS = [
  { text: "Смотрели салют с теплохода — это невероятно! Фейерверк отражается в воде, 360° обзор. Лучший День Победы!", author: "Наталья М.", rating: 5 },
  { text: "Автобусный тур — отличная идея: сначала экскурсия по памятным местам, потом салют. Познавательно и красиво.", author: "Алексей Р.", rating: 5 },
  { text: "Мото-парад — незабываемые эмоции! Колонна байкеров, музыка, а в финале — салют. Рекомендую всем!", author: "Сергей К.", rating: 5 },
  { text: "Брали VIP-авто на двоих. Водитель знал лучшие точки. Салют смотрели с Воробьёвых гор — магия.", author: "Ольга Д.", rating: 5 },
  { text: "Были с детьми на речной прогулке в Казани. Дети в восторге от салюта. Удобно, тепло, вкусно!", author: "Ирина В.", rating: 4 },
  { text: "Третий год подряд на салюте с воды. Каждый раз как первый — рекомендую всем!", author: "Максим Л.", rating: 5 },
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
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  return bestIdx >= 0 ? bestIdx : null;
}

// ─── PAGE ───────────────────────────────────────────────────

const Salute = () => {
  const [filters, setFilters] = useState<SaluteFilterState>({
    city: CITIES[0],
    transport: "",
    sort: "price",
    amenities: [],
  });

  const filtered = useMemo(() => {
    return MOCK_VARIANTS.filter((v) => {
      if (v.availableTickets <= 0) return true;
      if (filters.city && v.city !== filters.city) return false;
      if (filters.transport && v.transport !== filters.transport) return false;
      if (filters.amenities.length > 0) {
        const vAmenities = v.amenities || [];
        if (!filters.amenities.every((a) => vAmenities.includes(a))) return false;
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

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      <HeroSection
        title="Салют 9 мая — лучшие точки обзора"
        subtitle="Посмотрите праздничный салют с воды, автобуса, авто или мотоколонны. Сравните предложения от проверенных организаторов в вашем городе."
        totalTrips={MOCK_VARIANTS.length}
        totalSold={8340}
        avgRating={4.7}
      />

      <section id="variants" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Расписание экскурсий
        </h2>

        <SaluteFilterBar
          cities={CITIES}
          filters={filters}
          onChange={setFilters}
        />

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
      </section>

      <div className="container mx-auto px-4">
        <SaluteHowToChoose />
        <FaqSection items={FAQ_ITEMS} />
        <ReviewsSection items={REVIEWS} />

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

export default Salute;
