import { Calendar, Flame, Star } from "lucide-react";
import type { LocationEvent } from "@/data/locations";

interface Props {
  events: LocationEvent[];
}

export function LocationQuickEvents({ events }: Props) {
  // Топ события: с бейджем или мало мест, иначе первые
  const ranked = [...events].sort((a, b) => {
    const score = (e: LocationEvent) =>
      (e.badge ? 2 : 0) + (e.spotsLeft && e.spotsLeft <= 10 ? 2 : 0) + (e.rating ?? 0) / 5;
    return score(b) - score(a);
  });
  const top = ranked.slice(0, 3);

  if (top.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
          <Calendar size={14} className="text-muted-foreground" /> Ближайшие события
        </h3>
        <a href="#events" className="text-xs text-primary hover:underline font-medium">
          Все
        </a>
      </div>
      <div className="space-y-3">
        {top.map((event) => {
          const urgent = event.spotsLeft !== undefined && event.spotsLeft <= 10;
          return (
            <a
              key={event.id}
              href={event.href || "#events"}
              className="group block rounded-lg border border-border hover:border-primary/40 hover:shadow-sm transition-all overflow-hidden bg-background"
            >
              <div className="flex gap-3">
                <div
                  className="w-20 h-20 flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  {event.badge && (
                    <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 bg-primary text-primary-foreground rounded-br-md">
                      {event.badge}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-2 pr-2">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {event.date} · {event.time}
                  </p>
                  <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {event.title}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-sm font-bold text-foreground">
                      {event.price === 0 ? "Бесплатно" : `от ${event.price.toLocaleString("ru-RU")} ₽`}
                    </span>
                    {event.rating && (
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        {event.rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {urgent && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 border-t border-orange-100 text-[11px] font-medium text-orange-700">
                  <Flame size={11} /> Осталось {event.spotsLeft} мест
                </div>
              )}
              <div className="px-3 py-2 border-t border-border bg-muted/30 text-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Купить билет →
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
