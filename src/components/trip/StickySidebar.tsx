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
    <div className="sticky top-24 flex flex-col gap-8">
      {displayCards.map((card, idx) => (
        <div key={idx} className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-neutral-900 shadow-xl">
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
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
            <h3 className="text-lg font-black italic text-white lg:text-2xl uppercase leading-tight">
              {card.title}
            </h3>
            
            {(card.duration || card.price) && (
              <div className="flex gap-4 text-white">
                {card.duration && (
                  <div className="flex items-center gap-1">
                    <Bike className="h-4 w-4" />
                    <span className="text-sm font-semibold">{card.duration}</span>
                  </div>
                )}
                {card.price && (
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" />
                    <span className="text-sm font-semibold">{card.price}</span>
                  </div>
                )}
              </div>
            )}
            
            <Link href={card.buttonLink} className="w-fit">
              <button className="rounded-full bg-white px-6 py-2 text-sm font-bold text-neutral-900 transition-transform hover:scale-105">
                {card.buttonText}
              </button>
            </Link>
          </div>
          
          {card.isVerticalTitle && (
            <div className="absolute right-4 top-1/2 flex origin-right -translate-y-1/2 -rotate-90 whitespace-nowrap text-2xl font-black tracking-widest text-white/50 uppercase">
              {card.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
