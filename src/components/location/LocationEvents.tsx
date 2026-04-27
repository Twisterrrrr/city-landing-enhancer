import { CalendarDays, Clock, Star, ArrowRight, Flame } from "lucide-react";
import type { LocationEvent } from "@/data/locations";

interface Props {
  events: LocationEvent[];
}

export function LocationEvents({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <section id="events">
      <div className="flex items-end justify-between mb-5 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary" />
            События в этой локации
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Концерты, экскурсии и спецпрограммы — покупка онлайн без очереди
          </p>
        </div>
        <a href="#" className="hidden sm:inline text-sm font-semibold text-primary hover:underline whitespace-nowrap">
          Все события →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((ev) => {
          const isFree = ev.price === 0;
          return (
            <article
              key={ev.id}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {ev.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow">
                    {ev.badge}
                  </span>
                )}
                {ev.rating !== undefined && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur rounded-full text-xs text-white font-semibold">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    {ev.rating.toFixed(1)}
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide">
                  <span>{ev.date}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground font-medium normal-case tracking-normal">{ev.time}</span>
                </div>

                <p className="font-bold text-foreground line-clamp-2 mt-1.5 group-hover:text-primary transition-colors">
                  {ev.title}
                </p>

                {ev.duration && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Clock size={12} /> {ev.duration}
                  </div>
                )}

                {ev.spotsLeft !== undefined && ev.spotsLeft <= 15 && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-orange-600 mt-2">
                    <Flame size={12} /> Осталось {ev.spotsLeft} {ev.spotsLeft === 1 ? "место" : "мест"}
                  </div>
                )}

                <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/60 mt-3">
                  <div>
                    <span className="text-xs text-muted-foreground">{isFree ? "" : "от"}</span>
                    <p className="text-lg font-extrabold text-foreground leading-none">
                      {isFree ? "Бесплатно" : `${ev.price.toLocaleString("ru-RU")} ₽`}
                    </p>
                  </div>
                  <a
                    href={ev.href || "#"}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-bold shadow-sm shadow-primary/20 transition-colors"
                  >
                    {isFree ? "Записаться" : "Купить"}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
