import TripsPageContent from "@/components/trip/TripsPageContent";
import BlogSection from "@/components/trip/BlogSection";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { getTrips } from "@/data/tripsData";
import { getDestinationBySlug } from "@/data/destinationsData";
import { notFound } from "next/navigation";

export default async function DynamicInternationalDestinationPage(props: {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const destination = await getDestinationBySlug(params.slug);
  if (!destination || destination.category !== "international") {
    notFound();
  }

  const allTrips = await getTrips();
  
  // Filter trips by category and the target tag (case-insensitive search)
  const filteredTrips = allTrips.filter(trip => 
    trip.category === "international" && 
    trip.tags?.some(tag => tag.toLowerCase() === destination.tag.toLowerCase())
  );

  return (
    <TripsPageContent
      tripsData={filteredTrips}
      title={destination.title}
      subtitle={destination.description}
      heroImage={destination.heroImage || "/hero banner/2.jpg"}
      searchParams={searchParams}
    >
      <BlogSection />
      <ContactForm />
      <Testimonials />
    </TripsPageContent>
  );
}
