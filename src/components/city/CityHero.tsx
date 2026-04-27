import { ChevronRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import type { CityData } from "@/data/cities";

interface Props {
  city: CityData;
}

export function CityHero({ city }: Props) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-blue-700 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <nav className="flex items-center text-sm text-primary-foreground/70 gap-1.5 mb-6">
          <Link to="/" className="hover:text-primary-foreground">Главная</Link>
          <ChevronRight size={14} />
          <span className="text-primary-foreground">{city.name}</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
          {city.name}
        </h1>
        <p className="mt-5 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-3xl">
          {city.intro}
        </p>

        {/* stat chips */}
        <div className="mt-7 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 backdrop-blur rounded-full text-sm font-semibold">
            <TrendingUp size={14} /> {city.eventsCount} событий в каталоге
          </span>
          {city.categories.map((c) => (
            <span key={c.key} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 backdrop-blur rounded-full text-sm font-medium">
              <span>{c.emoji}</span> {c.label}: {c.count}
            </span>
          ))}
        </div>

        {/* Single primary CTA */}
        <div className="mt-8">
          <a
            href="#recommended"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary rounded-xl font-bold text-base shadow-lg hover:bg-white/95 transition-colors"
          >
            🎟️ Все события в {city.name}
          </a>
        </div>
      </div>
    </section>
  );
}
