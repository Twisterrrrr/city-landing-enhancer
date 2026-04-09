import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays } from "lucide-react";
import type { LocationEvent } from "@/data/locations";

interface Props {
  events: LocationEvent[];
}

export function LocationEvents({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <CalendarDays className="w-6 h-6 text-primary" />
        События в этой локации
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((ev) => (
          <Card key={ev.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <AspectRatio ratio={16 / 9}>
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </AspectRatio>
            <CardContent className="p-4">
              <p className="font-semibold text-foreground line-clamp-2 mb-1">{ev.title}</p>
              <p className="text-sm text-muted-foreground">{ev.date} · {ev.time}</p>
              <p className="text-sm font-medium text-primary mt-1">
                {ev.price === 0 ? "Бесплатно" : `от ${ev.price.toLocaleString("ru-RU")} ₽`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
