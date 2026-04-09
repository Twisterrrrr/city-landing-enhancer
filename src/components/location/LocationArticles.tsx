import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BookOpen } from "lucide-react";
import type { RelatedArticle } from "@/data/locations";

interface Props {
  articles: RelatedArticle[];
}

export function LocationArticles({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-primary" />
        Подборки и статьи
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((a, i) => (
          <a key={i} href={a.url} className="block">
            <Card className="overflow-hidden hover:shadow-md transition-shadow group">
              <AspectRatio ratio={2 / 1}>
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </AspectRatio>
              <CardContent className="p-4">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {a.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
