import { useParams } from "react-router-dom";
import { CITIES } from "@/data/cities";
import { StickyHeader } from "@/components/landing/StickyHeader";
import { CityHero } from "@/components/city/CityHero";
import { CitySights } from "@/components/city/CitySights";
import { CityVenues } from "@/components/city/CityVenues";
import { CityTags } from "@/components/city/CityTags";
import { CityEventsGrid } from "@/components/city/CityEventsGrid";
import { CityArticles } from "@/components/city/CityArticles";
import { CityFaq } from "@/components/city/CityFaq";
import NotFound from "./NotFound";

const City = () => {
  const { slug } = useParams<{ slug: string }>();
  const city = slug ? CITIES[slug] : undefined;
  if (!city) return <NotFound />;

  return (
    <div className="min-h-screen bg-secondary/30">
      <StickyHeader />
      <CityHero city={city} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-12 md:space-y-16">
        <CitySights sights={city.sights} cityName={city.name} />
        <CityVenues venues={city.venues} />
        <CityTags tags={city.popularTags} />
        <CityEventsGrid
          id="recommended"
          title={`Рекомендуем в ${city.name}`}
          subtitle="Топ событий по рейтингу"
          events={city.recommended}
          cityName={city.name}
          showAllHref="#more"
        />
        <CityEventsGrid
          id="more"
          title="Ещё события"
          events={city.more}
          cityName={city.name}
        />
        <CityArticles articles={city.articles} />
        {city.faq && <CityFaq faq={city.faq} />}
      </div>
    </div>
  );
};

export default City;
