import { RotateCcw, UtensilsCrossed, Music, Mic, Headphones, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateFilter } from "@/components/filters/DateFilter";
import type { Amenity } from "@/components/landing/TripCard";
import { AMENITY_META } from "@/components/landing/TripCard";

export interface SaluteFilterState {
  city: string;
  date: string;
  transport: string;
  sort: string;
  amenities: Amenity[];
}

interface SaluteFilterBarProps {
  cities: string[];
  filters: SaluteFilterState;
  onChange: (f: SaluteFilterState) => void;
}

const TRANSPORT_OPTIONS = [
  { value: "all", label: "Любой транспорт" },
  { value: "river", label: "Речная" },
  { value: "bus", label: "Автобусная" },
  { value: "car", label: "Авто" },
  { value: "moto", label: "Мото" },
];

const SORT_OPTIONS = [
  { value: "price", label: "По цене" },
  { value: "popular", label: "По рейтингу" },
  { value: "time", label: "По времени" },
];

const ALL_AMENITIES: Amenity[] = ["food", "music", "guide", "audioguide", "deck"];

const AMENITY_ICON_MAP: Record<Amenity, React.ReactNode> = {
  food: <UtensilsCrossed className="w-4 h-4" />,
  music: <Music className="w-4 h-4" />,
  guide: <Mic className="w-4 h-4" />,
  audioguide: <Headphones className="w-4 h-4" />,
  deck: <Sun className="w-4 h-4" />,
};

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

function AmenityIcons({ filters, toggleAmenity }: { filters: SaluteFilterState; toggleAmenity: (a: Amenity) => void }) {
  return (
    <>
      {ALL_AMENITIES.map((a) => {
        const active = filters.amenities.includes(a);
        return (
          <button key={a} onClick={() => toggleAmenity(a)} title={AMENITY_META[a].label}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-all ${
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >{AMENITY_ICON_MAP[a]}</button>
        );
      })}
    </>
  );
}

function ResetButton({ filters, onChange }: { filters: SaluteFilterState; onChange: (f: SaluteFilterState) => void }) {
  const hasFilters = filters.transport || filters.amenities.length > 0;
  if (!hasFilters) return null;
  return (
    <button onClick={() => onChange({ ...filters, transport: "", amenities: [] })}
      className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <RotateCcw className="w-3.5 h-3.5" />Сбросить
    </button>
  );
}

export function SaluteFilterBar({ cities, filters, onChange }: SaluteFilterBarProps) {
  const toggleAmenity = (a: Amenity) => {
    const current = filters.amenities;
    const next = current.includes(a) ? current.filter((x) => x !== a) : [...current, a];
    onChange({ ...filters, amenities: next });
  };

  return (
    <div className="space-y-4">
      {/* Sort tabs — desktop/tablet */}
      <div className="hidden sm:flex items-center gap-1 border-b border-border">
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

      {/* Desktop (lg+): single row */}
      <div className="hidden lg:flex flex-wrap items-center gap-2">
        <DateFilter value={filters.date} onChange={(d) => onChange({ ...filters, date: d })} />
        <div className="w-px h-6 bg-border mx-1" />
        <Chip label="Все города" active={filters.city === ""} onClick={() => onChange({ ...filters, city: "" })} />
        {cities.map((c) => (
          <Chip key={c} label={c} active={filters.city === c} onClick={() => onChange({ ...filters, city: c })} />
        ))}
        <div className="w-px h-6 bg-border mx-1" />
        <Select value={filters.transport || "all"} onValueChange={(v) => onChange({ ...filters, transport: v === "all" ? "" : v })}>
          <SelectTrigger className="w-[180px] h-9 rounded-lg text-sm"><SelectValue placeholder="Любой транспорт" /></SelectTrigger>
          <SelectContent>
            {TRANSPORT_OPTIONS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="w-px h-6 bg-border mx-1" />
        <div className="flex items-center gap-1.5">
          <AmenityIcons filters={filters} toggleAmenity={toggleAmenity} />
        </div>
        <ResetButton filters={filters} onChange={onChange} />
      </div>

      {/* Tablet (sm–lg): stacked rows */}
      <div className="hidden sm:block lg:hidden space-y-3">
        <DateFilter value={filters.date} onChange={(d) => onChange({ ...filters, date: d })} />
        <div className="flex items-center gap-2 flex-wrap">
          <Chip label="Все города" active={filters.city === ""} onClick={() => onChange({ ...filters, city: "" })} />
          {cities.map((c) => (
            <Chip key={c} label={c} active={filters.city === c} onClick={() => onChange({ ...filters, city: c })} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Select value={filters.transport || "all"} onValueChange={(v) => onChange({ ...filters, transport: v === "all" ? "" : v })}>
            <SelectTrigger className="w-[180px] h-9 rounded-lg text-sm"><SelectValue placeholder="Любой транспорт" /></SelectTrigger>
            <SelectContent>
              {TRANSPORT_OPTIONS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="w-px h-6 bg-border mx-1" />
          <div className="flex items-center gap-1.5">
            <AmenityIcons filters={filters} toggleAmenity={toggleAmenity} />
          </div>
          <ResetButton filters={filters} onChange={onChange} />
        </div>
      </div>

      {/* Mobile (<sm): stacked rows */}
      <div className="sm:hidden space-y-3">
        <DateFilter value={filters.date} onChange={(d) => onChange({ ...filters, date: d })} />
        <div className="flex items-center gap-2">
          <Select value={filters.city || "all"} onValueChange={(v) => onChange({ ...filters, city: v === "all" ? "" : v })}>
            <SelectTrigger className="flex-1 h-9 rounded-lg text-sm"><SelectValue placeholder="Все города" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filters.transport || "all"} onValueChange={(v) => onChange({ ...filters, transport: v === "all" ? "" : v })}>
            <SelectTrigger className="flex-1 h-9 rounded-lg text-sm"><SelectValue placeholder="Любой транспорт" /></SelectTrigger>
            <SelectContent>
              {TRANSPORT_OPTIONS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1.5">
          <AmenityIcons filters={filters} toggleAmenity={toggleAmenity} />
          <ResetButton filters={filters} onChange={onChange} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Сортировать:</span>
          <Select value={filters.sort} onValueChange={(v) => onChange({ ...filters, sort: v })}>
            <SelectTrigger className="flex-1 h-9 rounded-lg text-sm">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
