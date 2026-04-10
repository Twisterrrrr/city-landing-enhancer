import { MapPin, Navigation, Clock, ShieldCheck, Train, Phone, Globe } from "lucide-react";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

/** Mobile-only info section (sidebar handles this on desktop) */
export function LocationInfo({ location }: Props) {
  return (
    <div className="space-y-4 lg:hidden">
      {/* How to get */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-primary" /> Адрес и как добраться
        </h3>
        <p className="font-medium text-sm text-foreground">{location.address}</p>
        {location.metro && (
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
            <Train size={14} /> м. {location.metro}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-2">{location.howToGet}</p>
        <div className="flex flex-wrap gap-3 mt-3">
          {location.mapUrl && (
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <Navigation size={14} /> На карте
            </a>
          )}
          {location.phone && (
            <a href={`tel:${location.phone}`} className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
              <Phone size={14} /> {location.phone}
            </a>
          )}
          {location.website && (
            <a href={location.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
              <Globe size={14} /> Сайт
            </a>
          )}
        </div>
      </div>

      {/* Working hours (mobile) */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Clock size={14} className="text-primary" /> Часы работы
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

      {/* Visit rules (mobile) */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <ShieldCheck size={14} className="text-primary" /> Правила посещения
        </h3>
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
  );
}
