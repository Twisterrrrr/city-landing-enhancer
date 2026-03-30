import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/landing/HeroSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { StickyHeader } from "@/components/landing/StickyHeader";
import {
  DinnerFilterBar,
  type DinnerFilterState,
} from "@/components/dinner/DinnerFilterBar";
import {
  DINNER_CRUISE_CITIES,
  DINNER_CRUISE_MOCK,
  type DinnerCruiseVariant,
} from "@/data/dinner-cruise-landings";
import {
  Shield,
  Star,
  Clock,
  MapPin,
  Heart,
  Cake,
  Users,
  Briefcase,
  UtensilsCrossed,
  Anchor,
  AlertCircle,
} from "lucide-react";

// ─── helpers ───────────────────────────────────────────────

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? (m > 0 ? `${h} ч ${m} мин` : `${h} ч`) : `${m} мин`;
}

function formatPrice(n: number) {
  return n.toLocaleString("ru-RU") + " ₽";
}

const FORMAT_LABELS: Record<string, string> = {
  romantic: "Романтический",
  panoramic: "Панорамный",
  vip: "VIP",
  classic: "Классический",
};

const MENU_LABELS: Record<string, string> = {
  set: "Сет-меню",
  buffet: "Фуршет",
};

const FOR_WHOM_ICONS: Record<string, React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  cake: <Cake className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
};

// ─── JSON-LD ────────────────────────────────────────────────

function EventJsonLd({ variants, cityName }: { variants: DinnerCruiseVariant[]; cityName: string }) {
  const events = variants
    .filter((v) => v.availableTickets > 0)
    .slice(0, 5)
    .map((v) => ({
      "@context": "https://schema.org",
      "@type": "FoodEvent",
      name: v.title,
      startDate: v.startsAt,
      location: {
        "@type": "Place",
        name: v.pier,
        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressCountry: "RU",
        },
      },
      offers: {
        "@type": "Offer",
        price: v.price,
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
      },
      description: v.description,
    }));
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(events.length === 1 ? events[0] : events),
      }}
    />
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

// ─── Table Row ──────────────────────────────────────────────

function DinnerRow({
  v,
  isBest,
  index,
}: {
  v: DinnerCruiseVariant;
  isBest: boolean;
  index: number;
}) {
  const soldOut = v.availableTickets <= 0;
  const urgent = !soldOut && v.availableTickets <= 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`group rounded-xl border p-4 md:p-5 transition-all ${
        isBest
          ? "border-primary/40 bg-primary/[0.03] ring-1 ring-primary/20"
          : "border-border bg-card hover:border-primary/20"
      } ${soldOut ? "opacity-60" : ""}`}
    >
      {/* Desktop: table-like row */}
      <div className="hidden md:grid md:grid-cols-[1.5fr_0.7fr_0.6fr_0.5fr_0.6fr_auto] gap-4 items-center">
        {/* Ship + Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            {isBest && (
              <span className="text-[11px] font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                Лучший выбор
              </span>
            )}
          </div>
          <h3 className="font-semibold text-foreground text-sm leading-snug">
            {v.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {v.shipName} · {v.pier}
          </p>
        </div>

        {/* Menu */}
        <div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
            <UtensilsCrossed className="w-3.5 h-3.5 text-primary" />
            {MENU_LABELS[v.menuType]}
          </span>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {v.menuHighlights.slice(0, 3).join(", ")}
          </p>
        </div>

        {/* Price */}
        <div>
          <span className="text-lg font-bold text-foreground">
            {formatPrice(v.price)}
          </span>
        </div>

        {/* Time */}
        <div className="text-sm text-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            {formatTime(v.startsAt)}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDuration(v.durationMinutes)}
          </span>
        </div>

        {/* Format + Rating */}
        <div>
          <span className="text-xs font-medium text-muted-foreground">
            {FORMAT_LABELS[v.format]}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-foreground">
              {v.rating}
            </span>
            <span className="text-xs text-muted-foreground">
              ({v.reviewCount})
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-end gap-1">
          <a
            href="#"
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              soldOut
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {soldOut ? "Распродано" : "Забронировать"}
          </a>
          {urgent && (
            <span className="text-xs text-destructive font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Осталось {v.availableTickets} мест
            </span>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        <div>
          {isBest && (
            <span className="text-[11px] font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full mb-2 inline-block">
              Лучший выбор
            </span>
          )}
          <h3 className="font-semibold text-foreground text-sm">{v.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {v.shipName} · {v.pier}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
            <UtensilsCrossed className="w-3 h-3 text-primary" />
            {MENU_LABELS[v.menuType]}
          </span>
          <span className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
            <Clock className="w-3 h-3 text-muted-foreground" />
            {formatTime(v.startsAt)} · {formatDuration(v.durationMinutes)}
          </span>
          <span className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
            {FORMAT_LABELS[v.format]}
          </span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {v.menuHighlights.join(", ")}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">
              {formatPrice(v.price)}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold">{v.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({v.reviewCount})
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <a
              href="#"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                soldOut
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {soldOut ? "Распродано" : "Забронировать"}
            </a>
            {urgent && (
              <span className="text-xs text-destructive font-medium">
                Осталось {v.availableTickets}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── For Whom Block ─────────────────────────────────────────

function ForWhomBlock({
  items,
}: {
  items: { icon: string; title: string; description: string }[];
}) {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Для кого подойдёт ужин на теплоходе
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-5 space-y-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              {FOR_WHOM_ICONS[item.icon] || <Heart className="w-6 h-6" />}
            </div>
            <h3 className="font-semibold text-foreground text-sm">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Cross-link Block ───────────────────────────────────────

function CrossLinkBlock({
  parentLink,
}: {
  parentLink: { label: string; href: string };
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
      <Anchor className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">
          Ищете обычную речную прогулку без ужина? Посмотрите все варианты:
        </p>
      </div>
      <Link
        to={parentLink.href}
        className="px-4 py-2 rounded-lg text-sm font-semibold border border-primary text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
      >
        {parentLink.label}
      </Link>
    </div>
  );
}

// ─── Reviews ────────────────────────────────────────────────

const REVIEWS = [
  {
    text: "Ужин на «Ривер Палас» — лучший вечер в Москве! Кремль с воды, живой джаз, потрясающая еда.",
    author: "Анна К.",
    rating: 5,
  },
  {
    text: "Романтический круиз на «Риверсайд» — идеальный подарок для жены. Просекко, закат, панорамные окна.",
    author: "Дмитрий С.",
    rating: 5,
  },
  {
    text: "VIP-ужин на «Монархе» — другой уровень. Дегустационный сет и персональный сомелье.",
    author: "Марина П.",
    rating: 5,
  },
  {
    text: "Фуршет на «Нео» — весело, вкусно, демократично. Отличный вариант для компании.",
    author: "Игорь Л.",
    rating: 4,
  },
];

// ─── Scoring ────────────────────────────────────────────────

function pickBest(variants: DinnerCruiseVariant[]): number | null {
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
    const score = 0.5 * ratingScore + 0.3 * priceScore + 0.2 * Math.min(v.reviewCount / 500, 1);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  return bestIdx >= 0 ? bestIdx : null;
}

// ─── Page ───────────────────────────────────────────────────

const DinnerCruise = () => {
  const { city: citySlug } = useParams<{ city?: string }>();
  const landing = citySlug ? DINNER_CRUISE_CITIES[citySlug] : undefined;

  const [filters, setFilters] = useState<DinnerFilterState>({
    menuType: "",
    timeSlot: "",
    format: "",
    sort: "price",
    maxPrice: "",
  });

  const filtered = useMemo(() => {
    return DINNER_CRUISE_MOCK.filter((v) => {
      if (filters.menuType && v.menuType !== filters.menuType) return false;
      if (filters.timeSlot && v.timeCategory !== filters.timeSlot) return false;
      if (filters.format && v.format !== filters.format) return false;
      if (filters.maxPrice && v.price > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const out = [...filtered];
    if (filters.sort === "price") out.sort((a, b) => a.price - b.price);
    else if (filters.sort === "rating") out.sort((a, b) => b.rating - a.rating);
    else out.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
    return out;
  }, [filtered, filters.sort]);

  const bestIdx = useMemo(() => pickBest(sorted), [sorted]);

  if (!landing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Ужин на теплоходе
          </h1>
          <p className="text-muted-foreground">
            Выберите город для просмотра предложений
          </p>
          <Link
            to="/dinner-cruise/moscow"
            className="inline-flex px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Москва
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title={landing.seoTitle} description={landing.seoDescription} />
      <EventJsonLd variants={sorted} cityName={landing.cityName} />
      <StickyHeader />

      <HeroSection
        title={`Ужин на теплоходе по ${landing.cityNameDative} — цены и расписание`}
        subtitle={landing.heroSubtitle}
        totalTrips={DINNER_CRUISE_MOCK.length}
        totalSold={8400}
        avgRating={4.8}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Речные прогулки", href: `/river-cruises/${landing.slug}` },
          { label: `Ужин на теплоходе — ${landing.cityName}` },
        ]}
      />

      {/* Intro */}
      <section className="container mx-auto px-4 py-8">
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            {landing.introTitle}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            {landing.introText}
          </p>
        </div>
      </section>

      {/* Table / Cards */}
      <section id="variants" className="container mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Теплоходы с ужином — {landing.cityName}
        </h2>

        <DinnerFilterBar filters={filters} onChange={setFilters} />

        <div className="flex items-center gap-3 mt-6 mb-4">
          <span className="text-sm text-muted-foreground">
            {sorted.length > 0
              ? `${sorted.length} ${sorted.length === 1 ? "вариант" : sorted.length < 5 ? "варианта" : "вариантов"}`
              : "Нет вариантов по выбранным фильтрам"}
          </span>
          {bestIdx !== null && (
            <span className="text-xs text-primary font-medium">
              ⭐ Лучший выбор выделен
            </span>
          )}
        </div>

        {/* Desktop table header */}
        <div className="hidden md:grid md:grid-cols-[1.5fr_0.7fr_0.6fr_0.5fr_0.6fr_auto] gap-4 items-center px-5 py-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Теплоход
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Меню
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Цена
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Время
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Формат
          </span>
          <span />
        </div>

        <div className="space-y-3">
          {sorted.map((v, i) => (
            <DinnerRow key={v.id} v={v} isBest={i === bestIdx} index={i} />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Попробуйте изменить фильтры
            </p>
          </div>
        )}
      </section>

      {/* For Whom */}
      <section className="container mx-auto px-4">
        <ForWhomBlock items={landing.forWhom} />
      </section>

      {/* Cross-link to river cruises */}
      <section className="container mx-auto px-4 pb-6">
        <CrossLinkBlock parentLink={landing.parentLink} />
      </section>

      {/* FAQ + Reviews */}
      <div className="container mx-auto px-4">
        <FaqSection items={landing.faq} />
        <ReviewsSection items={REVIEWS} />

        <div className="py-12 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>
              Бронирование через систему организатора. Мы помогаем сравнить
              предложения ужинов на теплоходах.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinnerCruise;
