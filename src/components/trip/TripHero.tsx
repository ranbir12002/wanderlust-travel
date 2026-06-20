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
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : heroImage ? (
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
          <span className="text-neutral-400 font-medium">No background media selected</span>
        </div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

      {/* Typography */}
      <div className="absolute left-6 bottom-16 sm:left-12 md:left-24 sm:bottom-24 z-10 flex flex-col">
        <h2 className="text-lg font-light lowercase text-neutral-800 sm:text-2xl md:text-3xl">{subtitle}</h2>
        <h1 className="text-4xl sm:text-6xl font-black lowercase tracking-tight text-black md:text-8xl">{title}</h1>
      </div>

      {/* Route Map Overlay */}
      {routeWaypoints && routeWaypoints.length >= 2 && (
        <RouteMap waypoints={routeWaypoints} />
      )}

      {/* Social Icons */}
      <div className="hidden md:flex absolute left-6 top-1/3 z-20 flex-col gap-4 rounded-full bg-white p-2 shadow-lg">
        <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200" aria-label="Facebook">
          <Facebook className="h-4 w-4 text-neutral-900" />
        </a>
        <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200" aria-label="Instagram">
          <Instagram className="h-4 w-4 text-neutral-900" />
        </a>
        <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200" aria-label="YouTube">
          <Youtube className="h-4 w-4 text-neutral-900" />
        </a>
      </div>
    </div>
  );
}
