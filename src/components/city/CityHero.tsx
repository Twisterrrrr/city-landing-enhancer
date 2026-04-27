import { ChevronRight, MapPin, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { CityData } from "@/data/cities";

interface Props {
  city: CityData;
}

export function CityHero({ city }: Props) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={city.heroImage} alt={city.name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-20">
        <nav className="flex items-center text-xs text-white/60 gap-1 mb-5">
          <Link to="/" className="hover:text-white">Главная</Link>
          <ChevronRight size={12} />
          <span className="text-white">{city.name}</span>
        </nav>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-medium flex items-center gap-1.5">
              <MapPin size={12} /> Город
            </span>
            <span className="px-3 py-1 bg-primary/90 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Calendar size={12} /> {city.eventsCount} событий
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            {city.name}
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
            {city.intro}
          </p>

          {/* Category quick-jumps */}
          <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl">
            {city.categories.map((c) => (
              <a
                key={c.key}
                href={c.href}
                className="group bg-white/10 hover:bg-white/15 backdrop-blur border border-white/10 rounded-xl px-3 py-3 sm:px-4 sm:py-4 transition-colors"
              >
                <div className="text-xl sm:text-2xl mb-1">{c.emoji}</div>
                <div className="text-xs sm:text-sm font-semibold leading-tight">{c.label}</div>
                <div className="text-xs text-white/60 mt-0.5">{c.count}</div>
              </a>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#recommended"
              className="px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold text-base shadow-lg shadow-primary/25 inline-flex items-center gap-2 transition-colors"
            >
              <Sparkles size={18} /> Все события в {city.name}
            </a>
            <a
              href="#sights"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/15 rounded-xl font-semibold text-base transition-colors"
            >
              Что посмотреть
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
