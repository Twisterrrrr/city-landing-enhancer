import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
        Частые вопросы
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        Ответы на популярные вопросы о ночных прогулках
      </p>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-secondary/50"
              >
                <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="flex-1 font-medium text-foreground">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pl-14 text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
