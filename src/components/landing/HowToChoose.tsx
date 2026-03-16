import { motion } from "framer-motion";
import { Anchor, Clock, MapPin, Wallet } from "lucide-react";

const STEPS = [
  {
    icon: <Clock className="w-6 h-6 text-gold" />,
    title: "Выберите время отправления",
    text: "Самые зрелищные рейсы стартуют в 23:30–00:30, когда мосты разводятся один за другим.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-gold" />,
    title: "Определитесь с причалом",
    text: "Ближайший к вам причал сэкономит время. Популярные: наб. Мойки, Дворцовая наб., Английская наб.",
  },
  {
    icon: <Anchor className="w-6 h-6 text-gold" />,
    title: "Сравните теплоходы",
    text: "Обратите внимание на вместимость, наличие крытой палубы и бортового кафе.",
  },
  {
    icon: <Wallet className="w-6 h-6 text-gold" />,
    title: "Сравните цены",
    text: "Цены варьируются от 700 до 3 000 ₽. Ищите пометку «Оптимальный выбор» — наш алгоритм подберёт лучшее соотношение цены, рейтинга и времени.",
  },
];

export function HowToChoose() {
  return (
    <section id="how-to-choose" className="py-16">
      <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">
        Как выбрать прогулку
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-card rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              {step.icon}
            </div>
            <div className="text-sm font-bold text-gold mb-2">Шаг {idx + 1}</div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
