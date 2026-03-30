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

function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU");
}

export function TripCard({ variant, isBest, index }: TripCardProps) {
  const seatsLeft = variant.availableTickets;
  const soldOut = seatsLeft <= 0;
  const urgencyClass = seatsLeft <= 5 ? "text-urgency" : seatsLeft <= 15 ? "text-primary" : "text-success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`rounded-xl border p-4 md:p-5 transition-all duration-200 bg-card hover:shadow-md ${
        isBest ? "best-deal-ring" : "border-border"
      }`}
    >
      {isBest && (
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            ⭐ Оптимальный выбор
          </span>
        </div>
      )}

      {/* Desktop layout */}
      <div className="hidden md:flex md:items-center gap-4">
        {/* Time & Date */}
        <div className="w-28 shrink-0">
          <div className="text-2xl font-bold text-foreground">{formatTime(variant.startsAt)}</div>
          <div className="text-sm text-muted-foreground">{formatDate(variant.startsAt)}</div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <h3 className="font-semibold text-foreground truncate">{variant.title}</h3>
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
        {/* Seats + Button */}
        <div className="shrink-0 flex items-center gap-4">
          {!soldOut && (
            <div className={`flex items-center gap-1 text-xs font-medium ${urgencyClass}`}>
              <Users className="w-3.5 h-3.5" />
              Осталось {seatsLeft} мест
            </div>
          )}
          <button
            disabled={soldOut}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              soldOut
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
            }`}
          >
            {soldOut ? "Распродано" : (
              <>{formatPrice(variant.price)} ₽ <ArrowRight className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col gap-3">
        {/* Top row: time + title */}
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <div className="text-xl font-bold text-foreground">{formatTime(variant.startsAt)}</div>
            <div className="text-xs text-muted-foreground">{formatDate(variant.startsAt)}</div>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-tight">{variant.title}</h3>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(variant.durationMinutes)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {variant.pier}
          </span>
          {variant.shipName && (
            <span className="flex items-center gap-1">
              <Ship className="w-3 h-3" />
              {variant.shipName}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            {variant.rating} ({variant.reviewCount})
          </span>
        </div>

        {/* Seats + Button row */}
        <div className="flex items-center justify-between gap-3">
          {!soldOut ? (
            <div className={`flex items-center gap-1 text-xs font-medium ${urgencyClass}`}>
              <Users className="w-3 h-3" />
              Осталось {seatsLeft}
            </div>
          ) : <div />}
          <button
            disabled={soldOut}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              soldOut
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
            }`}
          >
            {soldOut ? "Распродано" : `${formatPrice(variant.price)} ₽`}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
