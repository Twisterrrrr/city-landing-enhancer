import { CalendarDays } from "lucide-react";
import type { LocationEvent } from "@/data/locations";

interface Props {
  events: LocationEvent[];
}

export function LocationEvents({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-primary" />
        События
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <p className="font-semibold text-foreground line-clamp-2 mb-1">{ev.title}</p>
              <p className="text-sm text-muted-foreground">{ev.date} · {ev.time}</p>
              <p className="text-sm font-medium text-primary mt-1">
                {ev.price === 0 ? "Бесплатно" : `от ${ev.price.toLocaleString("ru-RU")} ₽`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
