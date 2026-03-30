import { motion } from "framer-motion";
import { Shield, Star, TrendingUp } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  totalTrips: number;
  totalSold: number;
  avgRating: number;
}

export function HeroSection({ title, subtitle, totalTrips, totalSold, avgRating }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <a href="/" className="hover:text-white transition-colors">Главная</a>
            <span>/</span>
            <a href="/" className="hover:text-white transition-colors">Санкт-Петербург</a>
            <span>/</span>
            <span className="text-white">Ночные мосты</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <StatChip icon={<TrendingUp className="w-4 h-4" />} label={`${totalTrips} рейсов`} />
            <StatChip icon={<Shield className="w-4 h-4" />} label={`${totalSold.toLocaleString("ru-RU")}+ продано`} />
            {avgRating > 0 && (
              <StatChip icon={<Star className="w-4 h-4" />} label={`${avgRating} / 5`} />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
      {icon}
      {label}
    </div>
  );
}
