import { useEffect, useState } from "react";
import { Ship } from "lucide-react";

export function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Ship className="w-5 h-5 text-gold" />
          <span className="font-display font-semibold text-foreground text-sm">Ночные мосты</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#variants" className="hover:text-foreground transition-colors">Расписание</a>
          <a href="#how-to-choose" className="hover:text-foreground transition-colors">Как выбрать</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
        </nav>
        <a
          href="#variants"
          className="px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-gold)" }}
        >
          Купить билет
        </a>
      </div>
    </header>
  );
}
