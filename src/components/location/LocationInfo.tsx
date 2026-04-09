import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export function LocationInfo({ location }: Props) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-base md:text-lg text-foreground leading-relaxed">
        {location.description}
      </p>

      {/* Address & How to get */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Адрес и как добраться
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-medium text-foreground">{location.address}</p>
          <p className="text-sm text-muted-foreground">{location.howToGet}</p>
          {location.mapUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="w-4 h-4 mr-1" />
                Открыть на карте
              </a>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Часы работы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {location.workingHours.map((wh) => (
              <div key={wh.day} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{wh.day}</span>
                <span className={`font-medium ${wh.hours === "Выходной" ? "text-destructive" : "text-foreground"}`}>
                  {wh.hours}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visit Rules */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Правила посещения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {location.visitRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-primary mt-0.5">•</span>
                {rule}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
