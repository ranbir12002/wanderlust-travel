import Image from "next/image";
import { Bike, IndianRupee } from "lucide-react";
import { Trip } from "@/data/tripsData";
import Link from "next/link";

interface StickySidebarProps {
  trips?: Trip[];
}

export default function StickySidebar({ trips }: StickySidebarProps) {
  const defaultCards = [
    {
      image: "https://picsum.photos/seed/spiti/800/1200",
      title: "SPITI VALLEY",
      duration: "10 Days",
      price: "25,999/-",
      buttonText: "EXPLORE >",
      buttonLink: "/trips/spiti-valley",
      isVerticalTitle: true,
    },
    {
      image: "https://picsum.photos/seed/plan/800/1200",
      title: "PLANNING A TRIP?",
      buttonText: "TALK TO OUR EXPERTS >",
      buttonLink: "#",
    }
  ];

  // If trips are provided, map them to the card format
  const displayCards = trips && trips.length > 0 
    ? trips.map(t => ({
        image: t.thumbnail || t.heroImage,
        title: t.title,
        duration: t.duration,
        price: t.price,
        buttonText: "EXPLORE >",
        buttonLink: `/trips/${t.slug}`,
        isVerticalTitle: true
      }))
    : defaultCards;

  return (
    <div className="lg:sticky lg:top-24 grid grid-cols-2 lg:grid-cols-1 gap-4 w-full max-w-xl lg:max-w-[220px] mx-auto">
      {displayCards.map((card, idx) => (
        <div key={idx} className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-lg">
          {card.image ? (
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover opacity-80"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-xs font-bold text-neutral-500">NO IMAGE</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col gap-1.5 sm:gap-2">
            <h3 className="text-sm sm:text-base lg:text-lg font-black italic text-white uppercase leading-tight">
              {card.title}
            </h3>
            
            {(card.duration || card.price) && (
              <div className="flex flex-wrap gap-2 text-white">
                {card.duration && (
                  <div className="flex items-center gap-1">
                    <Bike className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="text-[10px] sm:text-xs font-semibold">{card.duration}</span>
                  </div>
                )}
                {card.price && (
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="text-[10px] sm:text-xs font-semibold">{card.price}</span>
                  </div>
                )}
              </div>
            )}
            
            <Link href={card.buttonLink} className="w-fit">
              <button className="rounded-full bg-white px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-bold text-neutral-900 transition-transform hover:scale-105">
                {card.buttonText}
              </button>
            </Link>
          </div>
          
          {card.isVerticalTitle && (
            <div className="absolute right-3 top-1/2 hidden lg:flex origin-right -translate-y-1/2 -rotate-90 whitespace-nowrap text-lg font-black tracking-widest text-white/40 uppercase">
              {card.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
