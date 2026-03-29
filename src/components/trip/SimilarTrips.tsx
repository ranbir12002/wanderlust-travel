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
    <section className="w-full overflow-hidden py-16">
      <SectionHeading title="similar trips" />
      
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
        {TRIPS.map((trip) => (
          <div key={trip.id} className="group relative aspect-video cursor-pointer overflow-hidden rounded-3xl bg-neutral-900 shadow-md">
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 text-xl font-bold uppercase text-white">
              {trip.title}
            </div>
            
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1 text-white">
              <div className="flex items-center gap-1 text-sm font-semibold">
                <Calendar className="h-4 w-4" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold">
                <IndianRupee className="h-4 w-4" />
                <span>{trip.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
