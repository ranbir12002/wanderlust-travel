import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";
import { Calendar, IndianRupee } from "lucide-react";

export default function SimilarTrips() {
  const TRIPS = [
    {
      id: 1,
      title: "LEH-LADAKH",
      duration: "11 days",
      price: "₹ 29,999/-",
      image: "https://picsum.photos/seed/leh/1920/1080"
    },
    {
      id: 2,
      title: "SPITI VALLEY",
      duration: "10 days",
      price: "₹ 25,999/-",
      image: "https://picsum.photos/seed/spiti/1920/1080"
    },
    {
      id: 3,
      title: "MEGHALAYA",
      duration: "7 days",
      price: "₹ 22,999/-",
      image: "https://picsum.photos/seed/meghalaya/1920/1080"
    }
  ];

  return (
    <section className="w-full overflow-hidden py-8">
      <SectionHeading title="similar trips" />
      
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 xs:gap-4 sm:gap-6 px-4 md:grid-cols-3">
        {TRIPS.map((trip) => (
          <div key={trip.id} className="group relative aspect-[1.1/1] xs:aspect-[4/3] sm:aspect-video md:aspect-[4/3] cursor-pointer overflow-hidden rounded-xl xs:rounded-3xl bg-neutral-900 shadow-md">
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
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
          </div>
        ))}
      </div>
    </section>
  );
}
