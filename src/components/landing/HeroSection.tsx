import { motion } from "framer-motion";
import { ChevronDown, Shield, Star, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bridges.jpg";

interface HeroProps {
  title: string;
  subtitle: string;
  totalTrips: number;
  totalSold: number;
  avgRating: number;
}

export function HeroSection({ title, subtitle, totalTrips, totalSold, avgRating }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Разводные мосты Санкт-Петербурга ночью"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-12 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#variants"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground transition-all hover:scale-105"
              style={{ background: "var(--gradient-gold)" }}
            >
              Смотреть рейсы
              <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="#how-to-choose"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border text-foreground bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-all"
            >
              Как выбрать маршрут
            </a>
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-4 md:gap-6"
        >
          <TrustItem icon={<Shield className="w-5 h-5 text-gold" />} label={`${totalTrips} рейсов доступно`} />
          <TrustItem icon={<TrendingUp className="w-5 h-5 text-gold" />} label={`${totalSold.toLocaleString("ru-RU")}+ билетов продано`} />
          {avgRating > 0 && (
            <TrustItem icon={<Star className="w-5 h-5 text-gold" />} label={`${avgRating} / 5 — средняя оценка`} />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary/60 backdrop-blur-sm border border-border">
      {icon}
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}
