import { Star, Clock, MapPin } from "lucide-react";
import type { CityEventCard } from "@/data/cities";

interface Props {
  title: string;
  subtitle?: string;
  events: CityEventCard[];
  cityName: string;
  id?: string;
  showAllHref?: string;
}

export function CityEventsGrid({ title, subtitle, events, cityName, id, showAllHref }: Props) {
  if (events.length === 0) return null;
  return (
    <section id={id}>
      <div className="flex items-end justify-between mb-5 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {showAllHref && (
          <a href={showAllHref} className="text-sm font-semibold text-primary hover:underline whitespace-nowrap">
            Все события →
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {events.map((e) => (
          <a
            key={e.id}
            href={e.href}
            className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={e.image}
                alt={e.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* price badge */}
              <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/95 backdrop-blur text-xs font-extrabold text-foreground rounded-full shadow-sm">
                от {e.priceFrom.toLocaleString("ru-RU")} ₽
              </span>
              {e.badge && (
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide rounded-full shadow-sm">
                  {e.badge}
                </span>
              )}
              {/* rating + city pinned bottom over image */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/55 backdrop-blur rounded-full font-semibold">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" /> {e.rating.toFixed(1)}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/55 backdrop-blur rounded-full">
                  <MapPin size={10} /> {cityName}
                </span>
              </div>
            </div>
            <div className="p-3 md:p-3.5 flex flex-col flex-1">
              <p className="font-semibold text-sm md:text-[15px] text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors min-h-[2.6em]">
                {e.title}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Clock size={12} /> {e.duration}
              </div>
              <span className="mt-2 text-xs font-semibold text-primary">Подробнее →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
