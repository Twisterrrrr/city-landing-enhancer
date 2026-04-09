import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import type { TicketOption } from "@/data/locations";

interface Props {
  tickets: TicketOption[];
}

export function LocationTickets({ tickets }: Props) {
  if (tickets.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Ticket className="w-6 h-6 text-primary" />
        Входные билеты
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tickets.map((t, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{t.title}</p>
                {t.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">{t.description}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-primary">
                  {t.price === 0 ? "Бесплатно" : `${t.price.toLocaleString("ru-RU")} ₽`}
                </p>
                {t.url && (
                  <Button size="sm" className="mt-1" asChild>
                    <a href={t.url} target="_blank" rel="noopener noreferrer">Купить</a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
