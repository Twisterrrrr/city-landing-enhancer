import { motion } from "framer-motion";
import { Shield, Star, TrendingUp } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroProps {
  title: string;
  subtitle: string;
  totalTrips: number;
  totalSold: number;
  avgRating: number;
  breadcrumbs?: BreadcrumbItem[];
}

export function HeroSection({ title, subtitle, totalTrips, totalSold, avgRating, breadcrumbs }: HeroProps) {
  const crumbs: BreadcrumbItem[] = breadcrumbs || [
    { label: "Главная", href: "/" },
    { label: title },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {c.href ? (
                  <a href={c.href} className="hover:text-primary-foreground transition-colors">{c.label}</a>
                ) : (
                  <span className="text-primary-foreground">{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed">
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
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-sm font-medium">
      {icon}
      {label}
    </div>
  );
}
