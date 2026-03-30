import { Ship, Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  "Направления": ["Ночные мосты", "Дневные прогулки", "Каналы и реки", "Петергоф с воды"],
  "Информация": ["О сервисе", "Как купить билет", "Возврат билетов", "Контакты"],
  "Поддержка": ["Частые вопросы", "Политика конфиденциальности", "Пользовательское соглашение"],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Ship className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">НочныеМосты.рф</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Сравнение ночных прогулок на теплоходах по рекам и каналам Санкт-Петербурга. Помогаем выбрать лучший рейс.
            </p>
            <div className="space-y-2 text-sm text-background/60">
              <a href="tel:+78121234567" className="flex items-center gap-2 hover:text-background transition-colors">
                <Phone className="w-4 h-4" /> +7 (812) 123-45-67
              </a>
              <a href="mailto:info@nochnye-mosty.rf" className="flex items-center gap-2 hover:text-background transition-colors">
                <Mail className="w-4 h-4" /> info@nochnye-mosty.rf
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" /> Санкт-Петербург, Россия
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} НочныеМосты.рф — Сервис сравнения речных прогулок
          </p>
          <p className="text-xs text-background/40">
            Мы не продаём билеты, а помогаем сравнить предложения организаторов
          </p>
        </div>
      </div>
    </footer>
  );
}
