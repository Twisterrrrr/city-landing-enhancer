import type { CityData } from "@/data/cities";

interface Props {
  tags: CityData["popularTags"];
}

export function CityTags({ tags }: Props) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Популярные теги</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((t, i) => (
          <button
            key={i}
            type="button"
            className="px-3.5 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {t.label}
            {t.count !== undefined && (
              <span className="ml-1.5 text-xs text-muted-foreground">{t.count}</span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
