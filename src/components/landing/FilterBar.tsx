import { RotateCcw } from "lucide-react";

export interface FilterState {
  date: string;
  timeSlot: string;
  pier: string;
  sort: string;
}

interface FilterBarProps {
  dates: string[];
  piers: string[];
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const TIME_SLOTS = [
  { value: "", label: "Любое время" },
  { value: "before-23:30", label: "До 23:30" },
  { value: "23:30-00:30", label: "23:30–00:30" },
  { value: "after-00:30", label: "После 00:30" },
];

const SORT_OPTIONS = [
  { value: "time", label: "По времени" },
  { value: "price", label: "По цене" },
  { value: "popular", label: "По рейтингу" },
];

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
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      {label}
    </button>
  );
}

export function FilterBar({ dates, piers, filters, onChange }: FilterBarProps) {
  const hasFilters = filters.date || filters.timeSlot || filters.pier;

  return (
    <div className="space-y-4">
      {/* Sort tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange({ ...filters, sort: opt.value })}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              filters.sort === opt.value
                ? "text-gold border-b-2 border-gold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Dates */}
        <Chip label="Все даты" active={!filters.date} onClick={() => onChange({ ...filters, date: "" })} />
        {dates.map((d) => (
          <Chip key={d} label={formatDateShort(d)} active={filters.date === d} onClick={() => onChange({ ...filters, date: d })} />
        ))}

        <div className="w-px h-6 bg-border mx-1 hidden md:block" />

        {/* Time */}
        {TIME_SLOTS.map((slot) => (
          <Chip
            key={slot.value}
            label={slot.label}
            active={filters.timeSlot === slot.value}
            onClick={() => onChange({ ...filters, timeSlot: slot.value })}
          />
        ))}

        {piers.length > 0 && (
          <>
            <div className="w-px h-6 bg-border mx-1 hidden md:block" />
            <Chip label="Все причалы" active={!filters.pier} onClick={() => onChange({ ...filters, pier: "" })} />
            {piers.map((p) => (
              <Chip key={p} label={p} active={filters.pier === p} onClick={() => onChange({ ...filters, pier: p })} />
            ))}
          </>
        )}

        {hasFilters && (
          <button
            onClick={() => onChange({ ...filters, date: "", timeSlot: "", pier: "" })}
            className="ml-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Сбросить
          </button>
        )}
      </div>
    </div>
  );
}
