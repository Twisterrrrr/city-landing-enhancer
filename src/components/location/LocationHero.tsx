import { LOCATION_TYPE_LABELS, FEATURE_LABELS, type LocationData } from "@/data/locations";
import { ChevronRight, Star, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  location: LocationData;
}

export function LocationHero({ location }: Props) {
  const typeLabel = LOCATION_TYPE_LABELS[location.type];
  const hasNoQueue = location.features.includes("no_queue");
  const todayHours = location.workingHours[0]?.hours;

  // Simple "open now" check
  const openNow = todayHours && !todayHours.toLowerCase().includes("выходной") && todayHours !== "Круглосуточно"
    ? (() => {
        const parts = todayHours.split(/[–-]/);
        if (parts.length < 2) return false;
        const now = new Date();
        const currentMin = now.getHours() * 60 + now.getMinutes();
        const [oh, om] = (parts[0] || "").trim().split(":").map(Number);
        const [ch, cm] = (parts[1] || "").trim().split(":").map(Number);
        return currentMin >= ((oh || 0) * 60 + (om || 0)) && currentMin < ((ch || 0) * 60 + (cm || 0));
      })()
    : todayHours === "Круглосуточно";

  const quickFacts: string[] = [];
  if (location.metro) quickFacts.push(`м. ${location.metro}`);
  if (location.features.includes("kids_friendly")) quickFacts.push("Подходит детям");
  if (location.features.includes("audio_guide")) quickFacts.push("Аудиогид");

  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 opacity-25">
        <img
          src={location.heroImage}
          alt={location.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-14">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs text-white/50 gap-1 mb-4">
          <Link to="/" className="hover:text-white/80 transition-colors">Главная</Link>
          <ChevronRight size={12} />
          <span className="text-white">{location.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-1 bg-white/15 backdrop-blur rounded-full text-xs font-medium">
                {typeLabel}
              </span>
              {openNow && (
                <span className="px-2.5 py-1 bg-emerald-500/90 rounded-full text-xs font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Открыто сейчас
                </span>
              )}
              {hasNoQueue && (
                <span className="px-2.5 py-1 bg-amber-500/90 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Zap size={12} /> Без очереди
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              {location.title}
            </h1>

            {/* Rating */}
            {location.rating > 0 && (
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i <= Math.round(location.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/30"}
                    />
                  ))}
                </div>
                <span className="font-bold text-lg">{location.rating.toFixed(1)}</span>
                <span className="text-white/60 text-sm">{location.reviewCount.toLocaleString("ru-RU")} отзывов</span>
              </div>
            )}

            {location.introLead && (
              <p className="mt-3 text-white/80 text-sm md:text-base leading-relaxed">
                {location.introLead}
              </p>
            )}

            {/* Quick facts */}
            {quickFacts.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-white/70">
                {quickFacts.map((f, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CTA block (desktop) */}
          <div className="hidden md:flex flex-col items-end gap-2 flex-shrink-0">
            {location.priceFrom !== null && (
              <div className="text-right">
                <p className="text-white/60 text-sm">Билет от</p>
                <p className="text-3xl font-extrabold">
                  {location.priceFrom === 0 ? "Бесплатно" : `${location.priceFrom.toLocaleString("ru-RU")} ₽`}
                </p>
              </div>
            )}
            <a
              href="#tickets"
              className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary/25"
            >
              {location.priceFrom === 0 || location.priceFrom === null ? "Подробнее" : "Купить билет"}
            </a>
            {todayHours && (
              <p className="text-xs text-white/50 flex items-center gap-1">
                <Clock size={12} /> Сегодня {todayHours}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
