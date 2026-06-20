import Image from "next/image";
import Link from "next/link";
import { Calendar, IndianRupee } from "lucide-react";
import { Trip } from "@/data/tripsData";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link href={`/trips/${trip.slug}`} className="group relative aspect-[1.1/1] xs:aspect-[4/3] cursor-pointer overflow-hidden rounded-xl xs:rounded-3xl bg-neutral-900 shadow-md sm:aspect-video md:aspect-[4/3]">
      <Image
        src={trip.thumbnail}
        alt={trip.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {trip.badge && (
        <div className="absolute left-2.5 top-2.5 xs:left-4 xs:top-4 rounded-full bg-[var(--color-sun-gold)] px-2 py-0.5 xs:px-4 xs:py-1 text-[8px] xs:text-[10px] font-black uppercase text-[var(--color-ocean-blue)] shadow-sm">
          {trip.badge}
        </div>
      )}

      <div className="absolute bottom-2.5 left-2.5 right-2.5 xs:bottom-4 xs:left-4 xs:right-4 flex flex-col gap-1 xs:gap-2 sm:flex-row sm:items-end sm:justify-between text-white">
        <h3 className="text-sm xs:text-base font-bold uppercase drop-shadow-md sm:text-xl md:text-2xl line-clamp-1 xs:line-clamp-2">
          {trip.title}
        </h3>
        
        <div className="flex sm:flex-col items-start sm:items-end gap-1.5 xs:gap-3 sm:gap-1 flex-wrap">
          <div className="flex items-center gap-0.5 xs:gap-1 text-[10px] xs:text-xs sm:text-sm font-semibold drop-shadow-md text-[var(--color-sun-gold)]">
            <Calendar className="h-3 w-3 xs:h-3.5 xs:w-3.5" />
            <span>{trip.duration}</span>
          </div>
          <div className="flex items-center gap-0.5 xs:gap-1 text-[10px] xs:text-xs sm:text-sm font-semibold drop-shadow-md text-white">
            <IndianRupee className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-[var(--color-sun-gold)]" />
            <span>{trip.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
