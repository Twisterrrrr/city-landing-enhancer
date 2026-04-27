import { Link } from "react-router-dom";
import { MapPin, Train } from "lucide-react";
import type { CityVenue } from "@/data/cities";

interface Props {
  venues: CityVenue[];
  title?: string;
  subtitle?: string;
}

export function CityVenues({ venues, title = "Музеи и искусство", subtitle = "Музеи, галереи и арт-пространства" }: Props) {
  if (venues.length === 0) return null;
  return (
    <section id="venues">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((v) => (
          <Link
            key={v.slug}
            to={`/locations/${v.slug}`}
            className="group bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all"
          >
            <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
              {v.type}
            </span>
            <p className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
              {v.title}
            </p>
            <div className="mt-2.5 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-start gap-1.5">
                <MapPin size={13} className="mt-0.5 flex-shrink-0" /> {v.address}
              </div>
              {v.metro && (
                <div className="flex items-center gap-1.5">
                  <Train size={13} /> м. {v.metro}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
