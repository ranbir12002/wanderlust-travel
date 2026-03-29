import Image from "next/image";
import { Bike, IndianRupee } from "lucide-react";

export default function StickySidebar() {
  return (
    <div className="sticky top-24 flex flex-col gap-8">
      {/* Card 1 */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-neutral-900 shadow-xl">
        <Image
          src="https://picsum.photos/seed/spiti/800/1200"
          alt="Spiti Valley"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
          <div className="flex gap-4 text-white">
            <div className="flex items-center gap-1">
              <Bike className="h-4 w-4" />
              <span className="text-sm font-semibold">10 Days</span>
            </div>
            <div className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4" />
              <span className="text-sm font-semibold">25,999/-</span>
            </div>
          </div>
          <button className="w-fit rounded-full bg-white px-6 py-2 text-sm font-bold text-neutral-900 transition-transform hover:scale-105">
            EXPLORE &gt;
          </button>
        </div>
        
        <div className="absolute right-4 top-1/2 flex origin-right -translate-y-1/2 -rotate-90 whitespace-nowrap text-2xl font-black tracking-widest text-white/50">
          SPITI VALLEY
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-neutral-900 shadow-xl">
        <Image
          src="https://picsum.photos/seed/plan/800/1200"
          alt="Planning a Trip"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
          <h3 className="text-lg font-black italic text-white lg:text-2xl">PLANNING A TRIP?</h3>
          <button className="w-fit rounded-full bg-white px-6 py-2 text-sm font-bold text-neutral-900 transition-transform hover:scale-105">
            TALK TO OUR EXPERTS &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
