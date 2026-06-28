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
  const defaultInclusions = ["Professional Guide", "All Internal Transfers", "Breakfast & Dinner", "Camping Equipment"];
  const defaultExclusions = ["Personal Expenses", "Insurance", "Airfare"];
  const defaultEssentials = ["Thermals", "Sturdy Boots", "Waterproof Bag", "Flashlight", "Medical Kit", "Sunscreen", "Power Bank", "Woolen Socks"];
  const defaultOtherInfo = "This journey is designed for adventure seeking individuals. It requires a reasonable level of physical fitness and an open mind. Weather conditions can change rapidly in the mountains.";

  const inclusions = trip.budgeting?.inclusions?.length ? trip.budgeting.inclusions : defaultInclusions;
  const exclusions = trip.budgeting?.exclusions?.length ? trip.budgeting.exclusions : defaultExclusions;
  const essentials = trip.essentials?.length ? trip.essentials : defaultEssentials;
  const otherInfo = trip.otherInfo ? trip.otherInfo : defaultOtherInfo;

  return (
    <div className="min-h-screen bg-white">
      <TripHero 
        title={trip.title} 
        subtitle={trip.subtitle} 
        heroImage={trip.heroImage} 
        routeWaypoints={trip.routeWaypoints} 
      />
      
      <QuickStats trip={trip} />
      
      <main className="pb-0 pt-8">
        <TripTabs />
        
        <div id="itinerary">
          <ItinerarySection 
            itinerary={trip.itinerary} 
            sidebarTrips={
              trip.sidebarTripSlugs 
                ? (await Promise.all(trip.sidebarTripSlugs.map(slug => getTripBySlug(slug)))).filter(Boolean) as any
                : undefined
            } 
          />
        </div>

        {trip.gallery && trip.gallery.length > 0 && (
          <TripGallery images={trip.gallery} tripTitle={trip.title} />
        )}

        {/* Dynamic Budget Section (with Fallbacks) */}
        <section id="budget" className="mx-auto max-w-7xl px-4 py-8 sm:py-12 border-t border-neutral-100">
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-black lowercase tracking-tight text-neutral-900">budgeting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inclusions.length > 0 && (
              <div className="rounded-3xl bg-neutral-50 p-8">
                <h3 className="mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400">Inclusions</h3>
                <ul className="space-y-3 text-neutral-600">
                  {inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider">✓ {item}</li>
                  ))}
                </ul>
              </div>
            )}
            {exclusions.length > 0 && (
              <div className="rounded-3xl bg-neutral-50 p-8">
                <h3 className="mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400">Exclusions</h3>
                <ul className="space-y-3 text-neutral-400">
                  {exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider">✕ {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Essentials Section */}
        {essentials.length > 0 && (
          <section id="essentials" className="mx-auto max-w-7xl px-4 py-6 sm:py-10 border-t border-neutral-100">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-black lowercase tracking-tight text-neutral-900">essentials</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {essentials.map((item, idx) => (
                <div key={idx} className="flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-neutral-200 bg-white shadow-sm text-center">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Other Info Section */}
        {otherInfo && (
          <section id="other" className="mx-auto max-w-7xl px-4 pt-8 pb-2 sm:pt-12 sm:pb-4 border-t border-neutral-100">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-black lowercase tracking-tight text-neutral-900">other info</h2>
            <div className="rounded-3xl bg-neutral-900 p-8 sm:p-12 text-white">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-relaxed text-neutral-300">
                {otherInfo}
              </p>
            </div>
          </section>
        )}
      </main>
      
      <SimilarTrips />
      <Testimonials />
      <ContactForm />
    </div>
  );
}
