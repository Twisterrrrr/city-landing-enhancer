import { motion } from "framer-motion";
import { Anchor, Clock, MapPin, Wallet } from "lucide-react";

const STEPS = [
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Выберите время",
    text: "Самые зрелищные рейсы стартуют в 23:30–00:30, когда мосты разводятся один за другим.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Определите причал",
    text: "Ближайший к вам причал сэкономит время. Популярные: наб. Мойки, Дворцовая наб., Английская наб.",
  },
  {
    icon: <Anchor className="w-6 h-6 text-primary" />,
    title: "Сравните теплоходы",
    text: "Обратите внимание на вместимость, наличие крытой палубы и бортового кафе.",
  },
  {
    icon: <Wallet className="w-6 h-6 text-primary" />,
    title: "Сравните цены",
    text: "Цены от 700 до 3 000 ₽. Ищите пометку «Оптимальный выбор» — лучшее соотношение цены и рейтинга.",
  },
];

export function HowToChoose() {
  return (
    <section id="how-to-choose" className="py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
        Как выбрать прогулку
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        4 простых шага к идеальному рейсу
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {step.icon}
            </div>
            <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Шаг {idx + 1}</div>
            <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
