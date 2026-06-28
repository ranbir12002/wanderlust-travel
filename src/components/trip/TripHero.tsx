import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import RouteMap from "./RouteMap";

interface TripHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
  videoUrl?: string;
  routeWaypoints?: string[];
}

export default function TripHero({ title, subtitle, heroImage, videoUrl, routeWaypoints }: TripHeroProps) {
  return (
    <div className="relative flex min-h-[65vh] sm:min-h-[75vh] md:min-h-[85vh] w-full items-center justify-center pt-24 sm:pt-32 pb-16">
      {/* Background Media */}
      {videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover brightness-75"
        />
      ) : heroImage ? (
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover brightness-75"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
          <span className="text-neutral-400 font-medium">No background media selected</span>
        </div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-white to-transparent opacity-60" />

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
          <h2 className="text-sm font-light lowercase sm:text-lg md:text-xl" style={{ color: '#ffffff' }}>{subtitle}</h2>
          <h1 className="text-3xl sm:text-4xl font-black lowercase tracking-tight md:text-5xl" style={{ color: '#ffffff' }}>{title}</h1>
        </div>
      </div>

      {/* Route Map Overlay */}
      {routeWaypoints && routeWaypoints.length >= 2 && (
        <RouteMap waypoints={routeWaypoints} />
      )}
    </div>
  );
}
