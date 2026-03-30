import { motion } from "framer-motion";
import { Clock, MapPin, Ship, Star, Users, ArrowRight } from "lucide-react";

export interface TripVariant {
  id: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  durationMinutes: number;
  pier: string;
  price: number;
  rating: number;
  reviewCount: number;
  availableTickets: number;
  shipName?: string;
}

interface TripCardProps {
  variant: TripVariant;
  isBest: boolean;
  index: number;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Moscow" });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short", weekday: "short", timeZone: "Europe/Moscow" });
}

function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} мин`;
  if (m === 0) return `${h} ч`;
  return `${h} ч ${m} мин`;
}

export function TripCard({ variant, isBest, index }: TripCardProps) {
  const seatsLeft = variant.availableTickets;
  const urgencyClass = seatsLeft <= 5 ? "text-urgency" : seatsLeft <= 15 ? "text-primary" : "text-success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`rounded-xl border p-5 transition-all duration-200 bg-card hover:shadow-md ${
        isBest ? "best-deal-ring" : "border-border"
      }`}
    >
      {isBest && (
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            ⭐ Оптимальный выбор
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Time & Date */}
        <div className="md:w-28 shrink-0">
          <div className="text-2xl font-bold text-foreground">
            {formatTime(variant.startsAt)}
          </div>
          <div className="text-sm text-muted-foreground">{formatDate(variant.startsAt)}</div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-1.5">
          <h3 className="font-semibold text-foreground">{variant.title}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(variant.durationMinutes)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {variant.pier}
            </span>
            {variant.shipName && (
              <span className="flex items-center gap-1">
                <Ship className="w-3.5 h-3.5" />
                {variant.shipName}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500" />
              {variant.rating} ({variant.reviewCount})
            </span>
          </div>
        </div>

        {/* Seats & Price */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-right">
            <div className={`flex items-center gap-1 text-xs font-medium ${urgencyClass}`}>
              <Users className="w-3.5 h-3.5" />
              {seatsLeft <= 0 ? "Распродано" : `Осталось ${seatsLeft}`}
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-foreground">
              {variant.price.toLocaleString("ru-RU")} ₽
            </div>
            <button
              disabled={seatsLeft <= 0}
              className={`mt-1.5 inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                seatsLeft <= 0
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
              }`}
            >
              {seatsLeft <= 0 ? "Распродано" : (
                <>Купить <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
