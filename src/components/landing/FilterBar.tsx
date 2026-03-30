import { RotateCcw, UtensilsCrossed, Music, Mic, Headphones, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

import type { Amenity } from "@/components/landing/TripCard";
import { AMENITY_META } from "@/components/landing/TripCard";

export interface FilterState {
  date: string;
  timeSlot: string;
  pier: string;
  sort: string;
  amenities: Amenity[];
}

interface FilterBarProps {
  dates: string[];
  piers: string[];
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const TIME_SLOTS = [
  { value: "all", label: "Любое время" },
  { value: "before-23:30", label: "До 23:30" },
  { value: "23:30-00:30", label: "23:30–00:30" },
  { value: "after-00:30", label: "После 00:30" },
];

const SORT_OPTIONS = [
  { value: "time", label: "По времени" },
  { value: "price", label: "По цене" },
  { value: "popular", label: "По рейтингу" },
];

const ALL_AMENITIES: Amenity[] = ["food", "music", "guide", "audioguide", "deck"];

const AMENITY_ICON_MAP: Record<Amenity, React.ReactNode> = {
  food: <UtensilsCrossed className="w-4 h-4" />,
  music: <Music className="w-4 h-4" />,
  guide: <Mic className="w-4 h-4" />,
  audioguide: <Headphones className="w-4 h-4" />,
  deck: <Sun className="w-4 h-4" />,
};

function formatDateShort(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const tomorrow = new Date(now.getTime() + 86400000).toISOString().slice(0, 10);
  if (iso === today) return "Сегодня";
  if (iso === tomorrow) return "Завтра";
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short", weekday: "short" });
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground border-border hover:border-primary/40 hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

export function FilterBar({ dates, piers, filters, onChange }: FilterBarProps) {
  const hasFilters = filters.date || filters.timeSlot || filters.pier || filters.amenities.length > 0;

  const toggleAmenity = (a: Amenity) => {
    const current = filters.amenities;
    const next = current.includes(a) ? current.filter((x) => x !== a) : [...current, a];
    onChange({ ...filters, amenities: next });
  };

  return (
    <div className="space-y-4">
      {/* Sort tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange({ ...filters, sort: opt.value })}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              filters.sort === opt.value
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
            {filters.sort === opt.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Date chips — single row */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Chip label="Все" active={!filters.date} onClick={() => onChange({ ...filters, date: "" })} />
        {dates.map((d) => (
          <Chip key={d} label={formatDateShort(d)} active={filters.date === d} onClick={() => onChange({ ...filters, date: d })} />
        ))}
      </div>

      {/* Time + Pier selects — one row on mobile */}
      <div className="flex items-center gap-2">
        <Select
          value={filters.timeSlot || "all"}
          onValueChange={(v) => onChange({ ...filters, timeSlot: v === "all" ? "" : v })}
        >
          <SelectTrigger className="flex-1 sm:w-[160px] sm:flex-none h-9 rounded-lg text-sm">
            <SelectValue placeholder="Время" />
          </SelectTrigger>
          <SelectContent>
            {TIME_SLOTS.map((slot) => (
              <SelectItem key={slot.value} value={slot.value}>
                {slot.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {piers.length > 0 && (
          <Select
            value={filters.pier || "all"}
            onValueChange={(v) => onChange({ ...filters, pier: v === "all" ? "" : v })}
          >
            <SelectTrigger className="flex-1 sm:w-[180px] sm:flex-none h-9 rounded-lg text-sm">
              <SelectValue placeholder="Причал" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все причалы</SelectItem>
              {piers.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Amenity icons + reset */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          {ALL_AMENITIES.map((a) => {
            const active = filters.amenities.includes(a);
            return (
              <button
                key={a}
                onClick={() => toggleAmenity(a)}
                title={AMENITY_META[a].label}
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-all ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {AMENITY_ICON_MAP[a]}
              </button>
            );
          })}
        </div>

        {hasFilters && (
          <button
            onClick={() => onChange({ ...filters, date: "", timeSlot: "", pier: "", amenities: [] })}
            className="ml-1 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Сбросить
          </button>
        )}
      </div>
    </div>
  );
}
