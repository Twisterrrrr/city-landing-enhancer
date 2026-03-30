import { useState, useEffect } from "react";

export interface GeoPosition {
  lat: number;
  lng: number;
}

interface UseGeolocationResult {
  position: GeoPosition | null;
  error: string | null;
  loading: boolean;
  request: () => void;
}

export function useGeolocation(): UseGeolocationResult {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);

  const request = () => setRequested(true);

  useEffect(() => {
    if (!requested) return;
    if (!navigator.geolocation) {
      setError("Геолокация недоступна");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setError("Нет доступа к геолокации");
        setLoading(false);
        // Fallback: центр Петербурга
        setPosition({ lat: 59.9343, lng: 30.3351 });
      },
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, [requested]);

  return { position, error, loading, request };
}

/** Расстояние в метрах (формула Haversine) */
export function distanceMeters(a: GeoPosition, b: GeoPosition): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
