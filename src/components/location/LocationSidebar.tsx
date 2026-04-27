import { Clock, MapPin, Phone, Globe, Train, Navigation } from "lucide-react";
import type { LocationData } from "@/data/locations";
import { LocationQuickEvents } from "./LocationQuickEvents";

interface Props {
  location: LocationData;
}

export function LocationSidebar({ location }: Props) {
  const todayHours = location.workingHours[0]?.hours;
  const isOpen = todayHours === "Круглосуточно" || (todayHours && !todayHours.includes("Выходной"));

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24 space-y-5">
        {/* Quick purchase card */}
        <div className="bg-card rounded-xl border border-border p-5">
          {location.priceFrom !== null && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground">Билет от</p>
              <p className="text-2xl font-extrabold text-foreground">
                {location.priceFrom === 0 ? "Бесплатно" : `${location.priceFrom.toLocaleString("ru-RU")} ₽`}
              </p>
            </div>
          )}
          <a
            href="#tickets"
            className="block w-full text-center px-5 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
          >
            {location.priceFrom === 0 || location.priceFrom === null ? "Подробнее" : "Выбрать билет"}
          </a>
          <div className="mt-3 space-y-2">
            {isOpen && todayHours && (
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                {todayHours === "Круглосуточно" ? "Открыто круглосуточно" : `Сегодня ${todayHours}`}
              </div>
            )}
          </div>
        </div>

        {/* Quick events for fast purchase */}
        <LocationQuickEvents events={location.events} />

        {/* Working hours */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
            <Clock size={14} className="text-muted-foreground" /> Часы работы
          </h3>
          <div className="space-y-1.5">
            {location.workingHours.map((wh) => (
              <div key={wh.day} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{wh.day}</span>
                <span className={`font-medium ${wh.hours === "Выходной" ? "text-destructive" : "text-foreground"}`}>
                  {wh.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-3">
          <h3 className="font-bold text-sm text-foreground">Контакты</h3>
          {location.address && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-muted-foreground/60" />
              <span>{location.address}</span>
            </div>
          )}
          {location.metro && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Train size={14} className="text-muted-foreground/60" />
              м. {location.metro}
            </div>
          )}
          {location.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-muted-foreground/60" />
              <a href={`tel:${location.phone}`} className="text-primary hover:underline">{location.phone}</a>
            </div>
          )}
          {location.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe size={14} className="text-muted-foreground/60" />
              <a
                href={location.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate"
              >
                {location.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </div>
          )}
          {location.mapUrl && (
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-1"
            >
              <Navigation size={14} /> Открыть на карте
            </a>
          )}
        </div>

        {/* Visit rules */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-bold text-sm text-foreground mb-3">Правила посещения</h3>
          <ul className="space-y-1.5">
            {location.visitRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5 text-xs">•</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
