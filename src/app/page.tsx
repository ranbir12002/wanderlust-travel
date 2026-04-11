import Hero from "@/components/home/Hero";
import Values from "@/components/home/Values";
import Process from "@/components/home/Process";
import Services, { ServiceItem } from "@/components/home/Services";
import Portfolio, { PortfolioData } from "@/components/home/Portfolio";
import Testimonials from "@/components/trip/Testimonials";
import CTA from "@/components/home/CTA";
import ContactForm from "@/components/trip/ContactForm";
import { getSiteContent } from "@/data/siteData";
import { getTripsByCategory } from "@/data/tripsData";
import { getBlogs } from "@/data/blogsData";

export default async function HomePage() {
  const siteData = await getSiteContent();
  
  // Fetch dynamic trips
  const domesticTrips = await getTripsByCategory("domestic");
  const internationalTrips = await getTripsByCategory("international");
  
  const tripCards: ServiceItem[] = [];
  
  const addTripToCards = (trip: any) => {
     tripCards.push({
       title: trip.title,
       desc: trip.subtitle || `Explore our ${trip.category} experience`,
       img: trip.thumbnail || trip.heroImage || "",
       tags: trip.tags || [trip.category],
       href: `/trips/${trip.slug}`
     });
  };

  // Try to use 2 domestic and 2 international
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

  // Fetch blogs
  const blogs = await getBlogs();
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
      <Values data={siteData.values} />
      {/* <Process data={siteData.process} /> */}
      <Services data={tripCards} />
      <Portfolio data={portfolioData} />
      <Testimonials data={siteData.testimonials} />
      <CTA data={siteData.cta} />
      <ContactForm />
    </main>
  );
}
