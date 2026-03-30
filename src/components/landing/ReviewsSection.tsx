import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Review {
  text: string;
  author: string;
  rating: number;
}

export function ReviewsSection({ items }: { items: Review[] }) {
  return (
    <section id="reviews" className="py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
        Отзывы пассажиров
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        Что говорят наши гости
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="rounded-xl border border-border bg-card p-6 flex flex-col hover:shadow-md transition-shadow"
          >
            <Quote className="w-7 h-7 text-primary/20 mb-3" />
            <p className="text-sm text-foreground/80 leading-relaxed flex-1 mb-4">
              {review.text}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-medium text-foreground">{review.author}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-border"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
