import TripsPageContent from "@/components/trip/TripsPageContent";
import BlogSection from "@/components/trip/BlogSection";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { getTripsByCategory } from "@/data/tripsData";

export default async function DomesticTripsPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const tripsData = await getTripsByCategory("domestic");

  return (
    <TripsPageContent
      tripsData={tripsData}
      title="Domestic"
      subtitle="Explore the beauty of our homeland"
      heroImage="/hero banner/1.jpg"
      searchParams={searchParams}
    >
      <BlogSection />
      <ContactForm />
      <Testimonials />
    </TripsPageContent>
  );
}
