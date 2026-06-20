import Hero from "@/components/home/Hero";
import CategoryBar from "@/components/home/CategoryBar";
import Values from "@/components/home/Values";
import Process from "@/components/home/Process";
import Services, { ServiceItem } from "@/components/home/Services";
import Portfolio, { PortfolioData } from "@/components/home/Portfolio";
import Testimonials from "@/components/trip/Testimonials";
import CTA from "@/components/home/CTA";
import DestinationBanner from "@/components/home/DestinationBanner";
import ContactForm from "@/components/trip/ContactForm";
import { getSiteContent } from "@/data/siteData";
import { getTrips, getTripsByCategory } from "@/data/tripsData";
import { getBlogs } from "@/data/blogsData";
import { getDestinations } from "@/data/destinationsData";
import { getFeaturedCards } from "@/data/featuredCardsData";

export default async function HomePage() {
  const [siteData, featuredCards, allTrips, allDestinations, blogs] = await Promise.all([
    getSiteContent(),
    getFeaturedCards(),
    getTrips(),
    getDestinations(),
    getBlogs()
  ]);
  
  const tripCards: ServiceItem[] = [];

  if (featuredCards.length > 0) {
    // Admin has configured featured cards — resolve each one
    for (const card of featuredCards) {
      if (card.type === "trip") {
        const trip = allTrips.find(t => t.slug === card.slug);
        if (trip) {
          tripCards.push({
            title: card.customTitle || trip.title,
            desc: card.customDesc || trip.subtitle || `Explore our ${trip.category} experience`,
            img: card.customImage || trip.thumbnail || trip.heroImage || "",
            tags: trip.tags || [trip.category || ""],
            href: `/trips/${trip.slug}`,
            price: trip.price || "",
            location: trip.category === "domestic" ? "India" : "International",
          });
        }
      } else {
        const dest = allDestinations.find(d => d.slug === card.slug);
        if (dest) {
          tripCards.push({
            title: card.customTitle || dest.title,
            desc: card.customDesc || dest.description || `Discover ${dest.title}`,
            img: card.customImage || dest.heroImage || "",
            tags: [dest.category],
            href: `/trips/${dest.category}/${dest.slug}`,
            location: dest.category === "domestic" ? "India" : "International",
          });
        }
      }
    }
  }

  // Fallback: if no featured cards configured (or none resolved), use old 2+2 logic
  if (tripCards.length === 0) {
    const domesticTrips = allTrips.filter(t => t.category === "domestic");
    const internationalTrips = allTrips.filter(t => t.category === "international");

    const addTripToCards = (trip: any) => {
       tripCards.push({
         title: trip.title,
         desc: trip.subtitle || `Explore our ${trip.category} experience`,
         img: trip.thumbnail || trip.heroImage || "",
         tags: trip.tags || [trip.category],
         href: `/trips/${trip.slug}`,
         price: trip.price || "",
         location: trip.category === "domestic" ? "India" : "International",
       });
    };

    domesticTrips.slice(0, 2).forEach(addTripToCards);
    internationalTrips.slice(0, 2).forEach(addTripToCards);
    
    // Pad with mock data if we have less than 4 trips
    if (tripCards.length < 4) {
        siteData.services.forEach(mockService => {
           if (tripCards.length < 4) {
              tripCards.push({
                 title: mockService.title,
                 desc: mockService.desc,
                 img: mockService.img,
                 tags: mockService.tags,
              });
           }
        });
    }
  }
  const portfolioData: PortfolioData = {
    title: "READ OUR \nLATEST TRAVEL ",
    highlightText: "STORIES",
    works: blogs.slice(0, 5).map((blog) => ({
      title: blog.title,
      loc: blog.category || blog.author || "BLOG",
      desc: blog.content?.[0] || "Read more about this journey...",
      img: blog.thumbnail || blog.heroImage || "",
      href: `/blogs/${blog.slug}`
    }))
  };

  if (portfolioData.works.length === 0) {
    portfolioData.title = siteData.portfolio.title;
    portfolioData.highlightText = siteData.portfolio.highlightText;
    portfolioData.works = siteData.portfolio.works.map(w => ({ ...w, href: undefined }));
  }
  
  return (
    <main>
      <Hero data={siteData.hero} />
      <CategoryBar />
      {/* <Process data={siteData.process} /> */}
      <DestinationBanner />
      <Services data={tripCards} />
      <Values data={siteData.values} />
      <Portfolio data={portfolioData} />
      <Testimonials />
      <CTA data={siteData.cta} />
      <ContactForm />
    </main>
  );
}
