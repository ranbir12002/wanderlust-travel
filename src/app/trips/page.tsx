import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import TripCard from "@/components/trip/TripCard";
import TripsFilterBar from "@/components/trip/TripsFilterBar";
import BlogSection from "@/components/trip/BlogSection";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { getTrips } from "@/data/tripsData";

export default async function TripsPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const tripsData = await getTrips();
  
  // Extract unique filter options
  const destinations = Array.from(new Set(tripsData.map(t => t.title))).filter(Boolean);
  const natureOfTrips = Array.from(new Set(tripsData.map(t => t.natureOfTrip))).filter(Boolean);
  const durations = ["1-3 Days", "4-6 Days", "7-9 Days", "10+ Days"];
  const budgets = ["Under ₹10,000", "₹10,000 - ₹20,000", "₹20,000+"];

  // Normalize search params to arrays
  const getParamArray = (key: string) => {
    if (!searchParams) return [];
    const param = searchParams[key];
    if (Array.isArray(param)) return param;
    if (param) return [param];
    return [];
  };

  const currentDestination = getParamArray("destination");
  const currentDuration = getParamArray("duration");
  const currentBudget = getParamArray("budget");
  const currentNature = getParamArray("nature");

  // Filter the trips
  const filteredTrips = tripsData.filter(trip => {
    let matches = true;
    
    // 1. Destination
    if (currentDestination.length > 0) {
      if (!currentDestination.includes(trip.title)) {
        matches = false;
      }
    }

    // 2. Nature of Trip
    if (matches && currentNature.length > 0) {
      if (!currentNature.includes(trip.natureOfTrip)) {
        matches = false;
      }
    }

    // 3. Duration
    if (matches && currentDuration.length > 0) {
      const numDays = parseInt(trip.duration.match(/\d+/)?.[0] || "0", 10);
      const matchesDuration = currentDuration.some(range => {
        if (range === "1-3 Days" && numDays >= 1 && numDays <= 3) return true;
        if (range === "4-6 Days" && numDays >= 4 && numDays <= 6) return true;
        if (range === "7-9 Days" && numDays >= 7 && numDays <= 9) return true;
        if (range === "10+ Days" && numDays >= 10) return true;
        return false;
      });
      if (!matchesDuration) matches = false;
    }

    // 4. Budget
    if (matches && currentBudget.length > 0) {
      const priceStr = trip.price.replace(/[^\d]/g, ''); // strip all non-digits e.g. "11,000/- onwards" -> 11000
      const price = parseInt(priceStr, 10);
      const matchesBudget = currentBudget.some(range => {
        if (range === "Under ₹10,000" && price < 10000) return true;
        if (range === "₹10,000 - ₹20,000" && price >= 10000 && price <= 20000) return true;
        if (range === "₹20,000+" && price > 20000) return true;
        return false;
      });
      if (!matchesBudget) matches = false;
    }

    return matches;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      
      {/* Hero Section */}
      <div className="relative flex min-h-[60vh] w-full flex-col justify-center overflow-hidden">
        {/* Background Image: Starry tent */}
        <Image
          src="https://picsum.photos/seed/night-tent/1920/1080"
          alt="Night under a tent"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark Overlays for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F5] via-transparent to-transparent" />
        
        {/* Typography */}
        <div className="relative z-10 px-8 md:px-24">
          <div className="absolute -left-4 top-1/2 -z-10 -translate-y-1/2 text-[8rem] font-black tracking-tighter text-white/10 sm:text-[14rem]">
            OUR TRIPS
          </div>
          <h1 className="text-5xl font-black lowercase tracking-tight text-white drop-shadow-lg md:text-7xl">
            our trips
          </h1>
        </div>

        {/* Social Icons (left floating) */}
        <div className="absolute left-6 top-1/4 z-20 flex flex-col gap-4 rounded-full bg-white p-2 shadow-lg">
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200">
            <Facebook className="h-4 w-4 text-neutral-900" />
          </a>
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200">
            <Instagram className="h-4 w-4 text-neutral-900" />
          </a>
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200">
            <Youtube className="h-4 w-4 text-neutral-900" />
          </a>
        </div>
      </div>

      {/* Filter Bar overlapping hero */}
      <TripsFilterBar 
        destinations={destinations}
        durations={durations}
        budgets={budgets}
        natureOfTrips={natureOfTrips}
      />

      {/* Trips Grid */}
      <main className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h2 className="text-2xl font-bold text-neutral-800">No trips found</h2>
              <p className="mt-2 text-neutral-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </main>

      {/* Blog, Contact & Testimonials */}
      <BlogSection />
      <ContactForm />
      <Testimonials />

    </div>
  );
}
