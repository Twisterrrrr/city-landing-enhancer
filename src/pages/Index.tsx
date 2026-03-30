import { useMemo, useState } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FilterBar, type FilterState } from "@/components/landing/FilterBar";
import { TripCard, type TripVariant, type Amenity } from "@/components/landing/TripCard";
import { HowToChoose } from "@/components/landing/HowToChoose";
import { FaqSection } from "@/components/landing/FaqSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { StickyHeader } from "@/components/landing/StickyHeader";
import { Shield } from "lucide-react";

// ─── MOCK DATA ──────────────────────────────────────────────

const today = new Date();
const fmt = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => new Date(today.getTime() + n * 86400000);

const DATES = [fmt(today), fmt(addDays(1)), fmt(addDays(2)), fmt(addDays(3))];
const PIERS = ["наб. Мойки", "Дворцовая наб.", "Английская наб."];

function mockISO(dateStr: string, h: number, m: number): string {
  return `${dateStr}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00+03:00`;
}

const MOCK_VARIANTS: TripVariant[] = [
  { id: "1", title: "Ночной Петербург — мосты и дворцы", startsAt: mockISO(DATES[0], 23, 0), durationMinutes: 90, pier: "наб. Мойки", price: 990, rating: 4.8, reviewCount: 312, availableTickets: 8, shipName: "Фонтанка", amenities: ["guide", "deck", "food"] },
  { id: "2", title: "Разводные мосты под звёздами", startsAt: mockISO(DATES[0], 23, 30), durationMinutes: 120, pier: "Дворцовая наб.", price: 1490, rating: 4.9, reviewCount: 487, availableTickets: 3, shipName: "Аврора Ривер", amenities: ["music", "food", "deck"] },
  { id: "3", title: "Классическая прогулка под мостами", startsAt: mockISO(DATES[0], 23, 45), durationMinutes: 90, pier: "Английская наб.", price: 790, rating: 4.5, reviewCount: 198, availableTickets: 22, shipName: "Невский экспресс", amenities: ["audioguide"] },
  { id: "4", title: "VIP-круиз: мосты + шампанское", startsAt: mockISO(DATES[1], 0, 0), durationMinutes: 150, pier: "Дворцовая наб.", price: 2990, rating: 4.9, reviewCount: 89, availableTickets: 2, shipName: "Империал", amenities: ["food", "music", "guide", "deck"] },
  { id: "5", title: "Ночные мосты — экономный маршрут", startsAt: mockISO(DATES[1], 23, 15), durationMinutes: 75, pier: "наб. Мойки", price: 690, rating: 4.3, reviewCount: 256, availableTickets: 35, amenities: ["audioguide"] },
  { id: "6", title: "Романтический рейс для двоих", startsAt: mockISO(DATES[1], 23, 30), durationMinutes: 120, pier: "Английская наб.", price: 1990, rating: 4.7, reviewCount: 134, availableTickets: 0, shipName: "Царица Невы", amenities: ["food", "music", "deck"] },
  { id: "7", title: "Панорама разводных мостов", startsAt: mockISO(DATES[2], 23, 0), durationMinutes: 105, pier: "Дворцовая наб.", price: 1190, rating: 4.6, reviewCount: 341, availableTickets: 12, amenities: ["guide", "deck"] },
  { id: "8", title: "Ночной Петербург с гидом", startsAt: mockISO(DATES[2], 0, 15), durationMinutes: 120, pier: "наб. Мойки", price: 1290, rating: 4.8, reviewCount: 210, availableTickets: 6, shipName: "Северная Венеция", amenities: ["guide", "food", "audioguide"] },
];

const FAQ_ITEMS = [
  { question: "Когда разводят мосты в Санкт-Петербурге?", answer: "Мосты разводят с конца апреля по ноябрь. Дворцовый мост разводится в 01:10–02:50 и 03:10–04:55. Троицкий мост — в 01:20–04:50. Расписание может меняться." },
  { question: "Стоит ли брать ночную прогулку или дневную?", answer: "Ночная прогулка — это уникальный опыт: разводка мостов, подсветка дворцов, белые ночи. Днём виды тоже красивые, но ночью — незабываемо." },
  { question: "Можно ли с детьми?", answer: "Да, большинство рейсов подходят для детей от 3 лет. На борту есть крытые зоны. Детские билеты обычно со скидкой 30–50%." },
  { question: "Что взять с собой?", answer: "Тёплую одежду (на воде прохладно даже летом), фотоаппарат, и хорошее настроение! Некоторые теплоходы предлагают пледы." },
  { question: "Как купить билет?", answer: "Выбирайте рейс в расписании выше и нажмите «Купить билет». Покупка оформляется через билетную систему организатора. Мы помогаем сравнить варианты." },
];

const REVIEWS = [
  { text: "Потрясающая прогулка! Мосты разводились прямо перед нами. Гид рассказывал интересные факты. Теплоход чистый, с кафе на борту.", author: "Анна К.", rating: 5 },
  { text: "Брали ночной рейс в 23:30. Идеальное время — успели увидеть 5 мостов. Цена оправдана. Рекомендую!", author: "Дмитрий П.", rating: 5 },
  { text: "Хороший маршрут, но было немного холодно. Совет: одевайтесь теплее. В целом — очень атмосферно и красиво.", author: "Мария С.", rating: 4 },
  { text: "Были с детьми, все остались в восторге. Корабль удобный, есть крытая палуба. Вернёмся в следующем году!", author: "Олег В.", rating: 5 },
  { text: "Романтический рейс — лучший подарок на годовщину. Шампанское, закаты, мосты. Магия!", author: "Елена Т.", rating: 5 },
  { text: "Третий раз на ночных мостах и каждый раз как первый. Питер ночью — это что-то невероятное.", author: "Игорь Н.", rating: 5 },
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

function matchTimeSlot(iso: string, slot: string): boolean {
  if (!slot) return true;
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes();
  const time = h * 60 + m;
  if (slot === "before-23:30") return time < 1410 && time >= 360;
  if (slot === "23:30-00:30") return time >= 1410 || time <= 30;
  if (slot === "after-00:30") return time > 30 && time < 360;
  return true;
}

// ─── PAGE ───────────────────────────────────────────────────

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    date: "",
    timeSlot: "",
    pier: "",
    sort: "time",
    amenities: [],
  });

  const filtered = useMemo(() => {
    return MOCK_VARIANTS.filter((v) => {
      if (v.availableTickets <= 0) return true;
      if (filters.date) {
        const vDate = v.startsAt.slice(0, 10);
        if (vDate !== filters.date) return false;
      }
      if (filters.timeSlot && !matchTimeSlot(v.startsAt, filters.timeSlot)) return false;
      if (filters.pier && !v.pier.includes(filters.pier)) return false;
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
        title="Ночные мосты Санкт-Петербурга"
        subtitle="Увидьте разводные мосты с воды — выберите лучший рейс по цене, времени и рейтингу. Сравните предложения от проверенных организаторов."
        totalTrips={MOCK_VARIANTS.length}
        totalSold={14820}
        avgRating={4.7}
      />

      {/* Schedule */}
      <section id="variants" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Расписание рейсов
        </h2>

        <FilterBar
          dates={DATES}
          piers={PIERS}
          filters={filters}
          onChange={setFilters}
        />

        <div className="flex items-center gap-3 mt-6 mb-4">
          <span className="text-sm text-muted-foreground">
            {sorted.length > 0
              ? `${sorted.length} ${sorted.length === 1 ? "рейс" : sorted.length < 5 ? "рейса" : "рейсов"}`
              : "Нет рейсов по выбранным фильтрам"}
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
        <HowToChoose />
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

export default Index;
