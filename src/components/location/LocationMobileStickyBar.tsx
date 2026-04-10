import { useEffect, useState } from "react";

interface Props {
  priceFrom: number | null;
}

export function LocationMobileStickyBar({ priceFrom }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-cta-sentinel");
    if (!sentinel) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-4 py-3 flex items-center justify-between md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div>
        {priceFrom !== null ? (
          <>
            <p className="text-xs text-muted-foreground">от</p>
            <p className="text-xl font-extrabold text-foreground">
              {priceFrom === 0 ? "Бесплатно" : `${priceFrom.toLocaleString("ru-RU")} ₽`}
            </p>
          </>
        ) : (
          <p className="text-sm font-medium text-foreground">Билеты доступны</p>
        )}
      </div>
      <a
        href="#tickets"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-base transition-colors hover:bg-primary/90 shadow-sm"
      >
        Купить билет
      </a>
    </div>
  );
}
