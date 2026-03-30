import { motion } from "framer-motion";
import { MapPin, Bus, Wallet, Eye } from "lucide-react";

const STEPS = [
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Выберите город",
    text: "Салют проходит в десятках городов. Выберите свой и сравните все варианты экскурсий.",
  },
  {
    icon: <Bus className="w-6 h-6 text-primary" />,
    title: "Тип транспорта",
    text: "Речная прогулка — панорама с воды. Автобус — экскурсия + салют. Авто — комфорт. Мото — адреналин.",
  },
  {
    icon: <Eye className="w-6 h-6 text-primary" />,
    title: "Выберите точку обзора",
    text: "Лучшие виды — с воды и возвышенностей. Организаторы знают идеальные точки.",
  },
  {
    icon: <Wallet className="w-6 h-6 text-primary" />,
    title: "Сравните цены",
    text: "От 800 до 6 000 ₽. Ищите пометку «Оптимальный выбор» — лучшее соотношение цены и рейтинга.",
  },
];

export function SaluteHowToChoose() {
  return (
    <section id="how-to-choose" className="py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
        Как выбрать экскурсию на салют
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        4 простых шага к лучшему празднику
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
