import { MapPin, Clock, IndianRupee, Bed } from "lucide-react";
import { Trip } from "@/data/tripsData";

export default function QuickStats({ trip }: { trip: Trip }) {
  return (
    <div className="relative z-20 mx-auto mt-4 sm:mt-6 w-full max-w-3xl px-4">
      <div className="flex items-start justify-around py-4 sm:py-5">
        
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full" style={{ backgroundColor: '#e0e0e0' }}>
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#3a3a3a' }} />
          </div>
          <span className="text-[9px] sm:text-[10px] whitespace-nowrap" style={{ color: '#3a3a3a' }}>Nature of Trip</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase whitespace-nowrap" style={{ color: '#3a3a3a' }}>{trip.natureOfTrip}</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full" style={{ backgroundColor: '#e0e0e0' }}>
            <Clock className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#3a3a3a' }} />
          </div>
          <span className="text-[9px] sm:text-[10px] whitespace-nowrap" style={{ color: '#3a3a3a' }}>Duration</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase whitespace-nowrap" style={{ color: '#3a3a3a' }}>{trip.duration}</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full" style={{ backgroundColor: '#e0e0e0' }}>
            <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#3a3a3a' }} />
          </div>
          <span className="text-[9px] sm:text-[10px] whitespace-nowrap" style={{ color: '#3a3a3a' }}>Budget</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase whitespace-nowrap" style={{ color: '#3a3a3a' }}>{trip.price}</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full" style={{ backgroundColor: '#e0e0e0' }}>
            <Bed className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#3a3a3a' }} />
          </div>
          <span className="text-[9px] sm:text-[10px] whitespace-nowrap" style={{ color: '#3a3a3a' }}>Lodging</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase whitespace-nowrap" style={{ color: '#3a3a3a' }}>{trip.lodgingType}</span>
        </div>

      </div>
    </div>
  );
}
