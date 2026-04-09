import { Badge } from "@/components/ui/badge";
import { LOCATION_TYPE_LABELS, type LocationData } from "@/data/locations";
import { MapPin } from "lucide-react";

interface Props {
  location: LocationData;
}

export function LocationHero({ location }: Props) {
  return (
    <section className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
      <img
        src={location.heroImage}
        alt={location.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8">
        <Badge variant="secondary" className="w-fit mb-3 bg-white/90 text-foreground">
          {LOCATION_TYPE_LABELS[location.type]}
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          {location.title}
        </h1>
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{location.city}</span>
        </div>
      </div>
    </section>
  );
}
