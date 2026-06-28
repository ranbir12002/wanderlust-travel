import TripsPageContent from "@/components/trip/TripsPageContent";
import BlogSection from "@/components/trip/BlogSection";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { getTrips } from "@/data/tripsData";

export default async function TripsPage(props: { 
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const searchParams = await props.searchParams;
  const tripsData = await getTrips();
  
  return (
    <TripsPageContent 
      tripsData={tripsData} 
      title="Our Trips" 
      subtitle="Discover your next adventure"
      searchParams={searchParams}
    >
      <BlogSection />
      <Testimonials />
      <ContactForm />
    </TripsPageContent>
  );
}
