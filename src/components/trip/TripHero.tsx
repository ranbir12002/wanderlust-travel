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
    <div className="relative flex min-h-[85vh] w-full items-center justify-center">
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
      <div className="absolute left-8 z-10 flex flex-col md:left-24">
        <h2 className="text-xl font-light lowercase text-white/90 md:text-3xl">{subtitle}</h2>
        <h1 className="text-6xl font-black lowercase tracking-tight text-white drop-shadow-lg md:text-8xl">{title}</h1>
      </div>

      {/* Route Map Overlay */}
      {routeWaypoints && routeWaypoints.length >= 2 && (
        <RouteMap waypoints={routeWaypoints} />
      )}

      {/* Social Icons */}
      <div className="absolute left-6 top-32 z-20 flex flex-col gap-4 rounded-full bg-white p-2 shadow-lg">
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
