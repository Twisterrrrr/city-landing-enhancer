import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getTodayISO,
  getTomorrowISO,
  dateToISO,
  formatShortDate,
} from "@/lib/date/moscow";

interface DateFilterProps {
  value: string; // ISO date string or ""
  onChange: (date: string) => void;
  timezone?: string; // IANA timezone, defaults to Europe/Moscow
  className?: string;
}

function chipClass(active: boolean) {
  return `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
    active
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-background text-foreground border-border hover:border-primary/40 hover:text-primary"
  }`;
}

export function DateFilter({ value, onChange, timezone, className }: DateFilterProps) {
  const [open, setOpen] = useState(false);
  const todayIso = getTodayISO(timezone);
  const tomorrowIso = getTomorrowISO(timezone);

  const isCustom = value && value !== todayIso && value !== tomorrowIso;

  const customLabel = isCustom
    ? formatShortDate(value)
    : "Другая дата";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <button
        className={chipClass(value === todayIso)}
        onClick={() => onChange(todayIso)}
      >
        Сегодня
      </button>
      <button
        className={chipClass(value === tomorrowIso)}
        onClick={() => onChange(tomorrowIso)}
      >
        Завтра
      </button>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className={chipClass(!!isCustom)}>
            <span className="inline-flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              {customLabel}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={isCustom ? new Date(value + "T12:00:00") : undefined}
            onSelect={(d) => {
              if (d) {
                onChange(dateToISO(d, timezone));
                setOpen(false);
              }
            }}
            disabled={(d) => {
              const dIso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
              return dIso < todayIso;
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
