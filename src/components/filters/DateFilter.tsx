import { useState } from "react";
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateFilterProps {
  value: string; // ISO date string or ""
  onChange: (date: string) => void;
  className?: string;
}

function chipClass(active: boolean) {
  return `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
    active
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-background text-foreground border-border hover:border-primary/40 hover:text-primary"
  }`;
}

/** Format date as yyyy-MM-dd in Europe/Moscow timezone */
function toMoscowIso(d: Date) {
  const msk = new Date(d.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
  const y = msk.getFullYear();
  const m = String(msk.getMonth() + 1).padStart(2, "0");
  const day = String(msk.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function DateFilter({ value, onChange, className }: DateFilterProps) {
  const [open, setOpen] = useState(false);
  const now = new Date();
  const todayIso = toMoscowIso(now);
  const tomorrowIso = toMoscowIso(addDays(now, 1));

  const isCustom = value && value !== todayIso && value !== tomorrowIso;

  const customLabel = isCustom
    ? format(new Date(value + "T00:00:00"), "d MMM", { locale: ru })
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
            selected={value ? new Date(value + "T00:00:00") : undefined}
            onSelect={(d) => {
              if (d) {
                onChange(toIso(d));
                setOpen(false);
              }
            }}
            disabled={(d) => d < today}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
