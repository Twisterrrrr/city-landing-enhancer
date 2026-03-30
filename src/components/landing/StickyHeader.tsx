import { useEffect, useState } from "react";
import { Ship } from "lucide-react";

export function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Ship className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground text-sm">ДайБилет</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#variants" className="hover:text-foreground transition-colors">Расписание</a>
          <a href="#how-to-choose" className="hover:text-foreground transition-colors">Как выбрать</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
        </nav>
        <a
          href="#variants"
          className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Купить билет
        </a>
      </div>
    </header>
  );
}
