import { Link } from "react-router-dom";
import { MapPin, Train, ArrowRight } from "lucide-react";
import type { CityVenue } from "@/data/cities";

interface Props {
  venues: CityVenue[];
}

export function CityVenues({ venues }: Props) {
  if (venues.length === 0) return null;
  return (
    <section id="venues">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Музеи и площадки</h2>
          <p className="text-muted-foreground mt-1">Места с собственным расписанием и билетами</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((v) => (
          <Link
            key={v.slug}
            to={`/locations/${v.slug}`}
            className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={v.image} alt={v.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur text-xs font-semibold text-foreground rounded-full">
                {v.type}
              </span>
            </div>
            <div className="p-4">
              <p className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{v.title}</p>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-start gap-1.5"><MapPin size={13} className="mt-0.5 flex-shrink-0" /> {v.address}</div>
                {v.metro && <div className="flex items-center gap-1.5"><Train size={13} /> м. {v.metro}</div>}
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Смотреть площадку <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
