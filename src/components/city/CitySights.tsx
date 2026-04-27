import { Link } from "react-router-dom";
import type { CitySight } from "@/data/cities";

interface Props {
  sights: CitySight[];
  cityName: string;
}

export function CitySights({ sights, cityName }: Props) {
  return (
    <section id="sights">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Что обязательно посетить в {cityName}</h2>
        <p className="text-muted-foreground mt-1">Главные достопримечательности, которые стоит увидеть</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {sights.map((s, i) => {
          const inner = (
            <div className="relative h-44 md:h-56 rounded-2xl overflow-hidden group cursor-pointer">
              <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                <p className="font-bold text-base md:text-lg leading-tight">{s.title}</p>
                <p className="text-xs md:text-sm text-white/75 mt-1 line-clamp-2">{s.description}</p>
                {s.locationSlug && (
                  <span className="inline-block mt-2 text-xs font-semibold text-primary-foreground bg-primary/90 px-2 py-0.5 rounded-md">
                    Подробнее →
                  </span>
                )}
              </div>
            </div>
          );
          return s.locationSlug ? (
            <Link key={i} to={`/locations/${s.locationSlug}`}>{inner}</Link>
          ) : (
            <div key={i}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
