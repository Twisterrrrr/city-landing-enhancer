import { Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { LOCATION_TYPE_LABELS, type RelatedPlace } from "@/data/locations";

interface Props {
  places: RelatedPlace[];
}

export function LocationRelated({ places }: Props) {
  if (places.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Compass className="w-5 h-5 text-primary" />
        Похожие места
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {places.map((p) => (
          <Link key={p.slug} to={`/locations/${p.slug}`}>
            <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative h-32 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <span className="text-xs font-medium text-muted-foreground">
                  {LOCATION_TYPE_LABELS[p.type]}
                </span>
                <p className="font-semibold text-foreground text-sm mt-0.5">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.city}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
