import { notFound } from "next/navigation";
import TripHero from "@/components/trip/TripHero";
import QuickStats from "@/components/trip/QuickStats";
import TripTabs from "@/components/trip/TripTabs";
import ItinerarySection from "@/components/trip/ItinerarySection";
import TripGallery from "@/components/trip/TripGallery";
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
      <TripHero 
        title={trip.title} 
        subtitle={trip.subtitle} 
        heroImage={trip.heroImage} 
        routeWaypoints={trip.routeWaypoints} 
      />
      
      <div id="experience">
        <QuickStats trip={trip} />
        {trip.gallery && trip.gallery.length > 0 && (
          <TripGallery images={trip.gallery} tripTitle={trip.title} />
        )}
      </div>
      
      <main className="pb-16 pt-8">
        <TripTabs />
        
        <div id="itinerary">
          <ItinerarySection itinerary={trip.itinerary} />
        </div>

        {/* Budget Section Placeholder */}
        <section id="budget" className="mx-auto max-w-7xl px-4 py-24 border-t border-neutral-100">
          <h2 className="mb-8 text-4xl font-black lowercase tracking-tight">budgeting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-neutral-50 p-8">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Inclusions</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-2">✓ Professional Guide</li>
                <li className="flex items-start gap-2">✓ All Internal Transfers</li>
                <li className="flex items-start gap-2">✓ Breakfast & Dinner</li>
                <li className="flex items-start gap-2">✓ Camping Equipment</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-neutral-50 p-8">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Exclusions</h3>
              <ul className="space-y-3 text-neutral-400 font-medium">
                <li className="flex items-start gap-2">✕ Personal Expenses</li>
                <li className="flex items-start gap-2">✕ Insurance</li>
                <li className="flex items-start gap-2">✕ Airfare</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Essentials Section Placeholder */}
        <section id="essentials" className="mx-auto max-w-7xl px-4 py-24 border-t border-neutral-100">
          <h2 className="mb-8 text-4xl font-black lowercase tracking-tight">essentials</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Thermals", "Sturdy Boots", "Waterproof Bag", "Flashlight", "Medical Kit", "Sunscreen", "Power Bank", "Woolen Socks"].map(item => (
              <div key={item} className="flex flex-col items-center justify-center p-6 rounded-2xl border border-neutral-100 bg-white shadow-sm">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-800">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Other Info Section Placeholder */}
        <section id="other" className="mx-auto max-w-7xl px-4 py-24 border-t border-neutral-100">
          <h2 className="mb-8 text-4xl font-black lowercase tracking-tight">other info</h2>
          <div className="rounded-3xl bg-neutral-900 p-12 text-white">
            <p className="max-w-2xl text-lg font-light leading-relaxed text-neutral-300">
              This journey is designed for adventure seeking individuals. It requires a reasonable level of physical fitness and an open mind. Weather conditions can change rapidly in the mountains.
            </p>
          </div>
        </section>
      </main>
      
      <SimilarTrips />
      <Testimonials />
      <ContactForm />
    </div>
  );
}
