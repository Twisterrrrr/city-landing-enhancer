import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Props {
  images: string[];
  title: string;
}

export function LocationGallery({ images, title }: Props) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((src, i) => (
        <div key={i} className="rounded-lg overflow-hidden border border-border">
          <AspectRatio ratio={4 / 3}>
            <img
              src={src}
              alt={`${title} — фото ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
}
