import { MapPin, Clock, IndianRupee, Bed } from "lucide-react";
import { Trip } from "@/data/tripsData";

export default function QuickStats({ trip }: { trip: Trip }) {
  return (
    <div className="relative z-20 mx-auto -mt-12 sm:-mt-16 w-full max-w-5xl px-4">
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 rounded-2xl bg-white p-5 px-6 sm:p-6 sm:px-12 shadow-xl md:grid-cols-4 md:gap-6">
        
        <div className="flex flex-col items-center gap-1 text-center">
          <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-neutral-400" />
          <span className="text-[10px] sm:text-xs text-neutral-500 whitespace-nowrap">Nature of Trip</span>
          <span className="text-xs sm:text-sm font-bold uppercase text-neutral-900 whitespace-nowrap">{trip.natureOfTrip}</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-neutral-400" />
          <span className="text-[10px] sm:text-xs text-neutral-500 whitespace-nowrap">Duration</span>
          <span className="text-xs sm:text-sm font-bold uppercase text-neutral-900 whitespace-nowrap">{trip.duration}</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <IndianRupee className="h-6 w-6 sm:h-8 sm:w-8 text-neutral-400" />
          <span className="text-[10px] sm:text-xs text-neutral-500 whitespace-nowrap">Budget</span>
          <span className="text-xs sm:text-sm font-bold uppercase text-neutral-900 whitespace-nowrap">{trip.price}</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <Bed className="h-6 w-6 sm:h-8 sm:w-8 text-neutral-400" />
          <span className="text-[10px] sm:text-xs text-neutral-500 whitespace-nowrap">Lodging</span>
          <span className="text-xs sm:text-sm font-bold uppercase text-neutral-900 whitespace-nowrap">{trip.lodgingType}</span>
        </div>

      </div>
    </div>
  );
}
