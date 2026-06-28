"use client";

import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import TripCard from "@/components/trip/TripCard";
import TripsFilterBar from "@/components/trip/TripsFilterBar";
import { Trip } from "@/data/tripsData";

interface TripsPageContentProps {
  tripsData: Trip[];
  title: string;
  subtitle?: string;
  heroImage?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
  children?: React.ReactNode;
}

export default function TripsPageContent({
  tripsData,
  title,
  subtitle = "our trips",
  heroImage = "https://picsum.photos/seed/night-tent/1920/1080",
  searchParams = {},
  children
}: TripsPageContentProps) {
  
  // Extract unique filter options
  const destinations = Array.from(new Set(tripsData.map(t => t.title))).filter(Boolean);
  const natureOfTrips = Array.from(new Set(tripsData.map(t => t.natureOfTrip))).filter(Boolean);
  const durations = ["1-3 Days", "4-6 Days", "7-9 Days", "10+ Days"];
  const budgets = ["Under ₹10,000", "₹10,000 - ₹20,000", "₹20,000+"];

  // Normalize search params to arrays
  const getParamArray = (key: string) => {
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
      <div className="relative flex min-h-[38vh] sm:min-h-[45vh] pt-24 sm:pt-32 w-full flex-col justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover brightness-75"
          priority
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-[#F5F5F5] to-transparent opacity-60" />
        
        {/* Typography & Social Icons Group */}
        <div className="absolute left-4 top-1/3 sm:left-6 md:left-8 z-20 flex items-center gap-4 sm:gap-5">
          {/* Social Icons */}
          <div className="hidden md:flex flex-col gap-3">
            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-neutral-900" />
            </a>
            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-neutral-900" />
            </a>
            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white hover:scale-110" aria-label="YouTube">
              <Youtube className="h-5 w-5 text-neutral-900" />
            </a>
          </div>

          {/* Typography */}
          <div className="flex flex-col">
            <p className="text-sm font-light lowercase sm:text-lg md:text-xl text-white">{subtitle}</p>
            <h1 className="text-3xl sm:text-4xl font-black lowercase tracking-tight md:text-5xl text-white">{title}</h1>
          </div>
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
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-16">
        <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:gap-6 md:grid-cols-3">
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

      {/* Blog, Contact & Testimonials (passed as children) */}
      {children}

    </div>
  );
}
