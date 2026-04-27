import type { CityArticle } from "@/data/cities";

interface Props {
  articles: CityArticle[];
}

export function CityArticles({ articles }: Props) {
  if (articles.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-5">Подборки и статьи</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((a, i) => (
          <a key={i} href={a.url} className="group flex gap-4 bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
            <img src={a.image} alt={a.title} loading="lazy" className="w-32 sm:w-40 h-28 sm:h-36 object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-500" />
            <div className="p-3 sm:p-4 flex flex-col justify-center">
              <p className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{a.title}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.excerpt}</p>
              <span className="text-xs font-semibold text-primary mt-2">Читать →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
