import { BookOpen } from "lucide-react";
import type { RelatedArticle } from "@/data/locations";

interface Props {
  articles: RelatedArticle[];
}

export function LocationArticles({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Читайте также
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {articles.map((a, i) => (
          <a key={i} href={a.url} className="block">
            <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative h-28 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
