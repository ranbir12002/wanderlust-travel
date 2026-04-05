import TripsPageContent from "@/components/trip/TripsPageContent";
import BlogSection from "@/components/trip/BlogSection";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { getTripsByCategory } from "@/data/tripsData";

export default async function InternationalTripsPage(props: { 
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const searchParams = await props.searchParams;
  const tripsData = await getTripsByCategory("international");
  
  return (
    <TripsPageContent 
      tripsData={tripsData} 
      title="International" 
      subtitle="Discover the wonders of the global horizons"
      heroImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1920"
      searchParams={searchParams}
    >
      <BlogSection />
      <ContactForm />
      <Testimonials />
    </TripsPageContent>
  );
}
