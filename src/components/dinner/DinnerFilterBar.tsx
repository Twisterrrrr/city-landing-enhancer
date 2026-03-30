import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateFilter } from "@/components/filters/DateFilter";
import { UtensilsCrossed, Wine, Clock, Sun, Moon } from "lucide-react";

export interface DinnerFilterState {
  menuType: string;      // "" | "set" | "buffet"
  timeSlot: string;      // "" | "sunset" | "night"
  format: string;        // "" | "romantic" | "panoramic" | "vip" | "classic"
  sort: string;          // "price" | "rating" | "time"
  maxPrice: string;      // "" | "3000" | "5000" | "7000"
}

interface DinnerFilterBarProps {
  filters: DinnerFilterState;
  onChange: (f: DinnerFilterState) => void;
}

const MENU_TYPES = [
  { value: "", label: "Любое меню" },
  { value: "set", label: "Сет-меню" },
  { value: "buffet", label: "Фуршет" },
];

const TIME_SLOTS = [
  { value: "", label: "Любое время" },
  { value: "sunset", label: "Закат (18–21)" },
  { value: "night", label: "Ночь (21+)" },
];

const FORMATS = [
  { value: "", label: "Любой формат" },
  { value: "romantic", label: "Романтический" },
  { value: "panoramic", label: "Панорамный" },
  { value: "vip", label: "VIP" },
  { value: "classic", label: "Классический" },
];

const MAX_PRICES = [
  { value: "", label: "Любая цена" },
  { value: "3000", label: "до 3 000 ₽" },
  { value: "5000", label: "до 5 000 ₽" },
  { value: "7000", label: "до 7 000 ₽" },
];

const SORT_OPTIONS = [
  { value: "price", label: "По цене" },
  { value: "rating", label: "По рейтингу" },
  { value: "time", label: "По времени" },
];

function Chip({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ResetButton({
  filters,
  onChange,
}: {
  filters: DinnerFilterState;
  onChange: (f: DinnerFilterState) => void;
}) {
  const hasFilters =
    filters.menuType || filters.timeSlot || filters.format || filters.maxPrice;
  if (!hasFilters) return null;
  return (
    <button
      onClick={() =>
        onChange({
          ...filters,
          menuType: "",
          timeSlot: "",
          format: "",
          maxPrice: "",
        })
      }
      className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
    >
      Сбросить
    </button>
  );
}

export function DinnerFilterBar({ filters, onChange }: DinnerFilterBarProps) {
  const isMobile = useIsMobile();

  const set = (patch: Partial<DinnerFilterState>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="space-y-3">
      {/* Sort tabs — desktop */}
      <div className="hidden sm:flex items-center gap-1 mb-2">
        {SORT_OPTIONS.map((o) => (
          <Chip
            key={o.value}
            label={o.label}
            active={filters.sort === o.value}
            onClick={() => set({ sort: o.value })}
          />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <UtensilsCrossed className="w-4 h-4 text-muted-foreground" />
          {MENU_TYPES.map((m) => (
            <Chip
              key={m.value}
              label={m.label}
              active={filters.menuType === m.value}
              onClick={() => set({ menuType: m.value })}
            />
          ))}
        </div>

        <div className="w-px h-6 bg-border" />

        <div className="flex items-center gap-1.5">
          {TIME_SLOTS.slice(1).map((t) => (
            <Chip
              key={t.value}
              label={t.label}
              active={filters.timeSlot === t.value}
              onClick={() =>
                set({ timeSlot: filters.timeSlot === t.value ? "" : t.value })
              }
              icon={
                t.value === "sunset" ? (
                  <Sun className="w-3.5 h-3.5" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )
              }
            />
          ))}
        </div>

        <div className="w-px h-6 bg-border" />

        <Select
          value={filters.format}
          onValueChange={(v) => set({ format: v })}
        >
          <SelectTrigger className="w-[160px] h-9 text-sm rounded-lg">
            <SelectValue placeholder="Формат" />
          </SelectTrigger>
          <SelectContent>
            {FORMATS.map((f) => (
              <SelectItem key={f.value} value={f.value || "__all__"}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.maxPrice}
          onValueChange={(v) => set({ maxPrice: v === "__all__" ? "" : v })}
        >
          <SelectTrigger className="w-[140px] h-9 text-sm rounded-lg">
            <SelectValue placeholder="Цена" />
          </SelectTrigger>
          <SelectContent>
            {MAX_PRICES.map((p) => (
              <SelectItem key={p.value} value={p.value || "__all__"}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ResetButton filters={filters} onChange={onChange} />
      </div>

      {/* Mobile / Tablet */}
      <div className="lg:hidden space-y-2">
        {isMobile && (
          <Select
            value={filters.sort}
            onValueChange={(v) => set({ sort: v })}
          >
            <SelectTrigger className="w-full h-9 text-sm rounded-lg">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex gap-2">
          <Select
            value={filters.menuType}
            onValueChange={(v) => set({ menuType: v === "__all__" ? "" : v })}
          >
            <SelectTrigger className="flex-1 h-9 text-sm rounded-lg">
              <SelectValue placeholder="Меню" />
            </SelectTrigger>
            <SelectContent>
              {MENU_TYPES.map((m) => (
                <SelectItem key={m.value} value={m.value || "__all__"}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.timeSlot}
            onValueChange={(v) => set({ timeSlot: v === "__all__" ? "" : v })}
          >
            <SelectTrigger className="flex-1 h-9 text-sm rounded-lg">
              <SelectValue placeholder="Время" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t.value} value={t.value || "__all__"}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Select
            value={filters.format}
            onValueChange={(v) => set({ format: v === "__all__" ? "" : v })}
          >
            <SelectTrigger className="flex-1 h-9 text-sm rounded-lg">
              <SelectValue placeholder="Формат" />
            </SelectTrigger>
            <SelectContent>
              {FORMATS.map((f) => (
                <SelectItem key={f.value} value={f.value || "__all__"}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.maxPrice}
            onValueChange={(v) => set({ maxPrice: v === "__all__" ? "" : v })}
          >
            <SelectTrigger className="flex-1 h-9 text-sm rounded-lg">
              <SelectValue placeholder="Цена" />
            </SelectTrigger>
            <SelectContent>
              {MAX_PRICES.map((p) => (
                <SelectItem key={p.value} value={p.value || "__all__"}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ResetButton filters={filters} onChange={onChange} />
      </div>
    </div>
  );
}
