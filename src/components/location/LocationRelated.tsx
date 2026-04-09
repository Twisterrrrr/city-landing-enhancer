import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
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
      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Compass className="w-6 h-6 text-primary" />
        Похожие места
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((p) => (
          <Link key={p.slug} to={`/locations/${p.slug}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow group">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </AspectRatio>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2 text-xs">
                  {LOCATION_TYPE_LABELS[p.type]}
                </Badge>
                <p className="font-semibold text-foreground">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.city}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
