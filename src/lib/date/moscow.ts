/**
 * City-local date utilities.
 * All "today"/"tomorrow" logic is anchored to the city's own timezone,
 * regardless of the user's local timezone.
 *
 * Default timezone is Europe/Moscow (UTC+3).
 */

const DEFAULT_TZ = "Europe/Moscow";

/** Known city-slug → IANA timezone mapping */
export const CITY_TIMEZONES: Record<string, string> = {
  moscow: "Europe/Moscow",
  spb: "Europe/Moscow",
  kazan: "Europe/Moscow",
  "nizhny-novgorod": "Europe/Moscow",
  yaroslavl: "Europe/Moscow",
  tver: "Europe/Moscow",
  volgograd: "Europe/Volgograd",
  samara: "Europe/Samara",
  perm: "Asia/Yekaterinburg",
  "rostov-on-don": "Europe/Moscow",
  krasnoyarsk: "Asia/Krasnoyarsk",
  novosibirsk: "Asia/Novosibirsk",
};

/** Resolve timezone for a city slug (falls back to Moscow) */
export function getCityTimezone(citySlug?: string): string {
  if (!citySlug) return DEFAULT_TZ;
  return CITY_TIMEZONES[citySlug] ?? DEFAULT_TZ;
}

/** Returns today's date in the given timezone as "yyyy-MM-dd" */
export function getTodayISO(tz: string = DEFAULT_TZ): string {
  return dateToISO(new Date(), tz);
}

/** Returns tomorrow's date in the given timezone as "yyyy-MM-dd" */
export function getTomorrowISO(tz: string = DEFAULT_TZ): string {
  const tomorrow = new Date(Date.now() + 86_400_000);
  return dateToISO(tomorrow, tz);
}

/** Converts any Date (or ISO string) to "yyyy-MM-dd" in the given timezone */
export function dateToISO(input: Date | string, tz: string = DEFAULT_TZ): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // en-CA formats as yyyy-MM-dd
  return formatter.format(d);
}

/** Returns a Date object representing the start of today in the given timezone */
export function getTodayDate(tz: string = DEFAULT_TZ): Date {
  const iso = getTodayISO(tz);
  return new Date(iso + "T00:00:00");
}

/** Human-readable date label in Russian, e.g. "15 июн" */
export function formatShortDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

// ─── Backward-compatible aliases (Moscow-default) ────────────

/** @deprecated Use getTodayISO(tz) */
export const getMoscowTodayISO = () => getTodayISO(DEFAULT_TZ);
/** @deprecated Use getTomorrowISO(tz) */
export const getMoscowTomorrowISO = () => getTomorrowISO(DEFAULT_TZ);
/** @deprecated Use dateToISO(input, tz) */
export const dateToMoscowISO = (input: Date | string) => dateToISO(input, DEFAULT_TZ);
/** @deprecated Use getTodayDate(tz) */
export const getMoscowTodayDate = () => getTodayDate(DEFAULT_TZ);
/** @deprecated Use formatShortDate(isoDate) */
export const formatMoscowShort = (isoDate: string) => formatShortDate(isoDate);
