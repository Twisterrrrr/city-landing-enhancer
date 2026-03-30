/**
 * Moscow-timezone date utilities.
 * All "today"/"tomorrow" logic is anchored to Europe/Moscow,
 * regardless of the user's local timezone.
 */

const MSK = "Europe/Moscow";

/** Returns today's date in Moscow as "yyyy-MM-dd" */
export function getMoscowTodayISO(): string {
  return dateToMoscowISO(new Date());
}

/** Returns tomorrow's date in Moscow as "yyyy-MM-dd" */
export function getMoscowTomorrowISO(): string {
  // Add 24h in UTC then convert to MSK — safe regardless of local TZ
  const tomorrow = new Date(Date.now() + 86_400_000);
  return dateToMoscowISO(tomorrow);
}

/** Converts any Date (or ISO string) to "yyyy-MM-dd" in Moscow timezone */
export function dateToMoscowISO(input: Date | string): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: MSK,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // en-CA formats as yyyy-MM-dd
  return formatter.format(d);
}

/** Returns a Date object representing the start of today in Moscow (for calendar `disabled` comparisons) */
export function getMoscowTodayDate(): Date {
  const iso = getMoscowTodayISO();
  return new Date(iso + "T00:00:00");
}

/** Human-readable date label in Russian, e.g. "15 июн" */
export function formatMoscowShort(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}
