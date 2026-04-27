import { Link } from "react-router-dom";
import type { CitySight } from "@/data/cities";

interface Props {
  sights: CitySight[];
  cityName: string;
}

export function CitySights({ sights, cityName }: Props) {
  return (
    <section id="sights">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
          Что обязательно посетить в {cityName}
        </h2>
        <p className="text-muted-foreground mt-1">Главные достопримечательности, которые стоит увидеть</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sights.map((s, i) => {
          const inner = (
            <div className="group h-full bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-lg">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground text-base md:text-lg leading-snug group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.description}</p>
                  {s.locationSlug && (
                    <span className="inline-block mt-3 text-xs font-semibold text-primary">
                      Подробнее →
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
          return s.locationSlug ? (
            <Link key={i} to={`/locations/${s.locationSlug}`} className="block h-full">{inner}</Link>
          ) : (
            <div key={i} className="h-full">{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
