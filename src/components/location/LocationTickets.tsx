import { Ticket } from "lucide-react";
import type { TicketOption } from "@/data/locations";

interface Props {
  tickets: TicketOption[];
}

export function LocationTickets({ tickets }: Props) {
  if (tickets.length === 0) return null;

  return (
    <section id="tickets">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Ticket className="w-5 h-5 text-primary" />
        Входные билеты
      </h2>
      <div className="space-y-2">
        {tickets.map((t, i) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
          >
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{t.title}</p>
              {t.description && (
                <p className="text-sm text-muted-foreground mt-0.5">{t.description}</p>
              )}
            </div>
            <div className="text-right shrink-0 flex items-center gap-3">
              <p className="text-lg font-bold text-foreground">
                {t.price === 0 ? "Бесплатно" : `${t.price.toLocaleString("ru-RU")} ₽`}
              </p>
              {t.url && (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Купить
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
