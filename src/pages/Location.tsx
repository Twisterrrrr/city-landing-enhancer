import { useParams } from "react-router-dom";
import { LOCATIONS } from "@/data/locations";
import { LocationHero } from "@/components/location/LocationHero";
import { LocationGallery } from "@/components/location/LocationGallery";
import { LocationAbout } from "@/components/location/LocationAbout";
import { LocationInfo } from "@/components/location/LocationInfo";
import { LocationTickets } from "@/components/location/LocationTickets";
import { LocationEvents } from "@/components/location/LocationEvents";
import { LocationRelated } from "@/components/location/LocationRelated";
import { LocationArticles } from "@/components/location/LocationArticles";
import { LocationSidebar } from "@/components/location/LocationSidebar";
import { LocationMobileStickyBar } from "@/components/location/LocationMobileStickyBar";
import { StickyHeader } from "@/components/landing/StickyHeader";
import NotFound from "./NotFound";

const Location = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? LOCATIONS[slug] : undefined;

  if (!location) return <NotFound />;

  return (
    <div className="min-h-screen bg-secondary/30">
      <StickyHeader />
      <LocationHero location={location} />
      <LocationMobileStickyBar priceFrom={location.priceFrom} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 pb-24 md:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content — 2/3 */}
          <div className="lg:col-span-2 space-y-10">
            <LocationTickets tickets={location.tickets} />
            <LocationAbout location={location} />
            <LocationGallery images={location.gallery} title={location.title} />
            <LocationInfo location={location} />
            <LocationEvents events={location.events} />
            <LocationRelated places={location.relatedPlaces} />
            <LocationArticles articles={location.articles} />
          </div>

          {/* Sidebar — 1/3 (desktop) */}
          <LocationSidebar location={location} />
        </div>
      </div>
    </div>
  );
};

export default Location;
