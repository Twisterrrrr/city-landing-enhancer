import { useState } from "react";
import { RotateCcw, UtensilsCrossed, Music, Mic, Headphones, Sun, CalendarDays } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

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
  { value: "distance", label: "По удалённости" },
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

function AmenityIcons({ filters, toggleAmenity }: { filters: FilterState; toggleAmenity: (a: Amenity) => void }) {
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

function ResetButton({ filters, onChange }: { filters: FilterState; onChange: (f: FilterState) => void }) {
  const hasFilters = filters.timeSlot || filters.pier || filters.amenities.length > 0;
  if (!hasFilters) return null;
  return (
    <button onClick={() => onChange({ ...filters, timeSlot: "", pier: "", amenities: [] })}
      className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <RotateCcw className="w-3.5 h-3.5" />Сбросить
    </button>
  );
}

function TimeSelect({ filters, onChange }: { filters: FilterState; onChange: (f: FilterState) => void }) {
  return (
    <Select value={filters.timeSlot || "all"} onValueChange={(v) => onChange({ ...filters, timeSlot: v === "all" ? "" : v })}>
      <SelectTrigger className="w-[160px] h-9 rounded-lg text-sm"><SelectValue placeholder="Любое время" /></SelectTrigger>
      <SelectContent>{TIME_SLOTS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function PierSelect({ filters, onChange, piers }: { filters: FilterState; onChange: (f: FilterState) => void; piers: string[] }) {
  if (piers.length === 0) return null;
  return (
    <Select value={filters.pier || "all"} onValueChange={(v) => onChange({ ...filters, pier: v === "all" ? "" : v })}>
      <SelectTrigger className="w-[180px] h-9 rounded-lg text-sm"><SelectValue placeholder="Все причалы" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Все причалы</SelectItem>
        {piers.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function DatePickerButton({ filters, onChange, dates }: { filters: FilterState; onChange: (f: FilterState) => void; dates: string[] }) {
  const [open, setOpen] = useState(false);
  const selectedDate = filters.date && !dates.includes(filters.date) ? new Date(filters.date + "T00:00:00") : undefined;
  const isCustomDate = filters.date && !dates.includes(filters.date);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
            isCustomDate
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:border-primary/40 hover:text-primary"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          {isCustomDate ? formatDateShort(filters.date) : "Другая дата"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(day) => {
            if (day) {
              const iso = day.toISOString().slice(0, 10);
              onChange({ ...filters, date: iso });
            }
            setOpen(false);
          }}
          disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function FilterBar({ dates, piers, filters, onChange }: FilterBarProps) {
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
        {dates.map((d) => (
          <Chip key={d} label={formatDateShort(d)} active={filters.date === d} onClick={() => onChange({ ...filters, date: d })} />
        ))}
        <DatePickerButton filters={filters} onChange={onChange} dates={dates} />
        <div className="w-px h-6 bg-border mx-1" />
        <TimeSelect filters={filters} onChange={onChange} />
        <PierSelect filters={filters} onChange={onChange} piers={piers} />
        <div className="w-px h-6 bg-border mx-1" />
        <div className="flex items-center gap-1.5">
          <AmenityIcons filters={filters} toggleAmenity={toggleAmenity} />
        </div>
        <ResetButton filters={filters} onChange={onChange} />
      </div>

      {/* Tablet (sm–lg): stacked rows */}
      <div className="hidden sm:block lg:hidden space-y-3">
        {/* Row 1: date chips + calendar picker */}
        <div className="flex items-center gap-2 flex-wrap">
          {dates.map((d) => (
            <Chip key={d} label={formatDateShort(d)} active={filters.date === d} onClick={() => onChange({ ...filters, date: d })} />
          ))}
          <DatePickerButton filters={filters} onChange={onChange} dates={dates} />
        </div>

        {/* Row 2: time + pier selects + amenity icons */}
        <div className="flex items-center gap-2">
          <TimeSelect filters={filters} onChange={onChange} />
          <PierSelect filters={filters} onChange={onChange} piers={piers} />
          <div className="w-px h-6 bg-border mx-1" />
          <div className="flex items-center gap-1.5">
            <AmenityIcons filters={filters} toggleAmenity={toggleAmenity} />
          </div>
          <ResetButton filters={filters} onChange={onChange} />
        </div>
      </div>

      {/* Mobile (<sm): stacked rows */}
      <div className="sm:hidden space-y-3">
        {/* Row 1: first 2 date chips + calendar picker */}
        <div className="flex items-center gap-2 flex-wrap">
          {dates.slice(0, 2).map((d) => (
            <Chip key={d} label={formatDateShort(d)} active={filters.date === d} onClick={() => onChange({ ...filters, date: d })} />
          ))}
          <DatePickerButton filters={filters} onChange={onChange} dates={dates} />
        </div>

        {/* Row 2: time + pier selects */}
        <div className="flex items-center gap-2">
          <Select value={filters.timeSlot || "all"} onValueChange={(v) => onChange({ ...filters, timeSlot: v === "all" ? "" : v })}>
            <SelectTrigger className="flex-1 h-9 rounded-lg text-sm"><SelectValue placeholder="Любое время" /></SelectTrigger>
            <SelectContent>{TIME_SLOTS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
          </Select>
          {piers.length > 0 && (
            <Select value={filters.pier || "all"} onValueChange={(v) => onChange({ ...filters, pier: v === "all" ? "" : v })}>
              <SelectTrigger className="flex-1 h-9 rounded-lg text-sm"><SelectValue placeholder="Все причалы" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все причалы</SelectItem>
                {piers.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Row 3: amenity icons */}
        <div className="flex items-center gap-1.5">
          <AmenityIcons filters={filters} toggleAmenity={toggleAmenity} />
          <ResetButton filters={filters} onChange={onChange} />
        </div>

        {/* Row 4: sort */}
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
