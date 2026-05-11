import Image from "next/image";
import Link from "next/link";
import { Calendar, IndianRupee } from "lucide-react";
import { Trip } from "@/data/tripsData";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link href={`/trips/${trip.slug}`} className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl bg-neutral-900 shadow-md sm:aspect-video md:aspect-[4/3]">
      <Image
        src={trip.thumbnail}
        alt={trip.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {trip.badge && (
        <div className="absolute left-6 top-6 rounded-full bg-[var(--color-sun-gold)] px-4 py-1 text-xs font-black uppercase text-[var(--color-ocean-blue)] shadow-sm">
          {trip.badge}
        </div>
      )}

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
        <h3 className="text-xl font-bold uppercase drop-shadow-md sm:text-2xl">
          {trip.title}
        </h3>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-sm font-semibold drop-shadow-md text-[var(--color-sun-gold)]">
            <Calendar className="h-4 w-4" />
            <span>{trip.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold drop-shadow-md text-white">
            <IndianRupee className="h-4 w-4 text-[var(--color-sun-gold)]" />
            <span>{trip.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
