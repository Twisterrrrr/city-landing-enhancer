import type { CityCategory } from "@/data/cities";

interface Props {
  categories: CityCategory[];
}

export function CityCategories({ categories }: Props) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <a
            key={c.key}
            href={c.href}
            className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-5 md:p-6 hover:border-primary/40 hover:shadow-md transition-all"
          >
            <div className="text-3xl md:text-4xl">{c.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-foreground text-lg group-hover:text-primary transition-colors">
                {c.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {c.count} {pluralize(c.count, ["событие", "события", "событий"])}
              </p>
            </div>
            <span className="text-primary text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
