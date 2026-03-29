import { notFound } from "next/navigation";
import TripHero from "@/components/trip/TripHero";
import QuickStats from "@/components/trip/QuickStats";
import TripTabs from "@/components/trip/TripTabs";
import ItinerarySection from "@/components/trip/ItinerarySection";
import SimilarTrips from "@/components/trip/SimilarTrips";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { getTripBySlug } from "@/data/tripsData";

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);

  if (!trip) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-white">
      <TripHero title={trip.title} subtitle={trip.subtitle} heroImage={trip.heroImage} routeWaypoints={trip.routeWaypoints} />
      <QuickStats trip={trip} />
      
      <main className="pb-16 pt-8">
        <TripTabs />
        <ItinerarySection itinerary={trip.itinerary} />
      </main>
      
      <SimilarTrips />
      <Testimonials />
      <ContactForm />
    </div>
  );
}
