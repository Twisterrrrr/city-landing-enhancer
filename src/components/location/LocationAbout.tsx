import { CheckCircle, Zap, Headphones, Baby, Accessibility, Users } from "lucide-react";
import { FEATURE_LABELS, type LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

function FeatureIcon({ name }: { name: string }) {
  switch (name) {
    case "zap": return <Zap size={14} />;
    case "headphones": return <Headphones size={14} />;
    case "baby": return <Baby size={14} />;
    case "accessibility": return <Accessibility size={14} />;
    case "users": return <Users size={14} />;
    default: return <CheckCircle size={14} />;
  }
}

export function LocationAbout({ location }: Props) {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">О месте</h2>

      {/* Highlights */}
      {location.highlights.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {location.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* Feature pills */}
      {location.features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {location.features.map((f) => {
            const feat = FEATURE_LABELS[f];
            if (!feat) return null;
            return (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full text-xs font-medium text-secondary-foreground"
              >
                <FeatureIcon name={feat.icon} />
                {feat.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{location.description}</p>
    </section>
  );
}
