import { MapPin, Eye, Lightbulb } from "lucide-react";
import type { LandingContent } from "@/data/salute-landings";

interface CityIntroSectionProps {
  landing: LandingContent;
}

export function CityIntroSection({ landing }: CityIntroSectionProps) {
  return (
    <section className="container mx-auto px-4 py-8 space-y-8">
      {/* Intro text */}
      <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
        {landing.introText}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Viewpoints */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
            <Eye className="w-5 h-5 text-primary" />
            Лучшие точки обзора
          </div>
          <ul className="space-y-3">
            {landing.viewpoints.map((vp) => (
              <li key={vp.name} className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{vp.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                      vp.isFree
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {vp.isFree ? "Бесплатно" : "Билет"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{vp.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Tips */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
            <Lightbulb className="w-5 h-5 text-primary" />
            Советы
          </div>
          <ul className="space-y-3">
            {landing.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
