import { Star, Clock, ArrowRight } from "lucide-react";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((e) => (
          <a key={e.id} href={e.href} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
            <div className="relative h-44 overflow-hidden">
              <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {e.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow">
                  {e.badge}
                </span>
              )}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur rounded-full text-xs text-white font-semibold">
                <Star size={11} className="fill-yellow-400 text-yellow-400" /> {e.rating.toFixed(1)}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{e.title}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Clock size={12} /> {e.duration} · {cityName}
              </div>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">от</span>
                  <p className="text-lg font-extrabold text-foreground leading-none">{e.priceFrom.toLocaleString("ru-RU")} ₽</p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Купить <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
