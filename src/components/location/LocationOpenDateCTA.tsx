import { CalendarCheck, Sparkles, Zap } from "lucide-react";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

/** Высококонверсионный CTA-блок с акцентом на «Билет с открытой датой» */
export function LocationOpenDateCTA({ location }: Props) {
  const od = location.openDateTicket;
  if (!od) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-amber-500/10 p-5 md:p-7">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-3">
            <Sparkles size={12} /> ХИТ ПРОДАЖ
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight">
            {od.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            {od.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm font-semibold">
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <CalendarCheck size={15} /> {od.validity}
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-600">
              <Zap size={15} /> Мгновенная отправка на email
            </span>
          </div>
        </div>
        <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 flex-shrink-0">
          <div className="text-left md:text-right">
            <p className="text-xs text-muted-foreground">Билет от</p>
            <p className="text-3xl md:text-4xl font-extrabold text-foreground leading-none">
              {od.price.toLocaleString("ru-RU")} ₽
            </p>
          </div>
          <a
            href="#tickets"
            className="px-6 md:px-8 py-3 md:py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold text-base md:text-lg shadow-lg shadow-primary/25 transition-colors whitespace-nowrap"
          >
            Купить билет
          </a>
        </div>
      </div>
    </section>
  );
}
