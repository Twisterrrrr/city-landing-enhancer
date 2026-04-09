import { useParams } from "react-router-dom";
import { LOCATIONS } from "@/data/locations";
import { LocationHero } from "@/components/location/LocationHero";
import { LocationGallery } from "@/components/location/LocationGallery";
import { LocationInfo } from "@/components/location/LocationInfo";
import { LocationTickets } from "@/components/location/LocationTickets";
import { LocationEvents } from "@/components/location/LocationEvents";
import { LocationRelated } from "@/components/location/LocationRelated";
import { LocationArticles } from "@/components/location/LocationArticles";
import { StickyHeader } from "@/components/landing/StickyHeader";
import NotFound from "./NotFound";

const Location = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? LOCATIONS[slug] : undefined;

  if (!location) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <LocationHero location={location} />

      <div className="container mx-auto px-4 py-10 space-y-12">
        {/* Gallery */}
        <LocationGallery images={location.gallery} title={location.title} />

        {/* Info: description, address, hours, rules */}
        <LocationInfo location={location} />

        {/* Tickets */}
        <LocationTickets tickets={location.tickets} />

        {/* Events */}
        <LocationEvents events={location.events} />

        {/* Related places */}
        <LocationRelated places={location.relatedPlaces} />

        {/* Articles */}
        <LocationArticles articles={location.articles} />
      </div>
    </div>
  );
};

export default Location;
