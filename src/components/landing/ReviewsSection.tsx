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
      <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">
        Отзывы
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-card rounded-xl p-6 flex flex-col"
          >
            <Quote className="w-8 h-8 text-gold/30 mb-3" />
            <p className="text-sm text-foreground/90 leading-relaxed flex-1 mb-4">
              {review.text}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{review.author}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
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
