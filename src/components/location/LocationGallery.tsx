interface Props {
  images: string[];
  title: string;
}

export function LocationGallery({ images, title }: Props) {
  if (images.length === 0) return null;

  return (
    <section>
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-64 h-44 rounded-xl overflow-hidden snap-start border border-border">
            <img
              src={src}
              alt={`${title} — фото ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
