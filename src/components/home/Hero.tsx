"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { SiteData } from "@/data/mockData";

const backgrounds = [
  "/hero banner/2webp.webp",
  "/hero banner/IMG_6669_Original.jpg",
  "/hero banner/licensed-image.jfif",
  "/hero banner/1.jpg"]

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
];

export default function Hero({ data }: { data: SiteData["hero"] }) {
  const [[currentSlide, direction], setSlideInfo] = useState([0, 1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideInfo((prev) => [(prev[0] + 1) % backgrounds.length, 1]);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const selectSlide = (index: number) => {
    if (index === currentSlide) return;
    const newDirection = index > currentSlide ? 1 : -1;
    setSlideInfo([index, newDirection]);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0.8,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction > 0 ? "-50%" : "50%",
        opacity: 0,
      };
    }
  };

  return (
    <section className="relative h-[75svh] min-h-[500px] w-full overflow-hidden bg-[#0A0A0A] text-white font-sans flex items-center">
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentSlide}
          src={backgrounds[currentSlide]}
          alt="Hero Background"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-center z-0"
        />
      </AnimatePresence>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ocean-blue)]/90 via-[var(--color-ocean-blue)]/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ocean-blue)]/70 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Absolute Layout Container */}
      <div className="relative z-20 h-full w-full max-w-[1920px] mx-auto px-6 lg:px-12 flex flex-col justify-center">

        {/* Center-Left: Main Content */}
        <div className="mt-24 sm:mt-20 lg:mt-0 flex flex-col justify-center lg:w-3/4 xl:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 
              className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5.5rem] font-black leading-[1.05] tracking-tighter uppercase mb-4 sm:mb-6 text-white whitespace-pre-line"
              style={{ 
                textShadow: '4px 4px 0px rgba(0,0,0,0.5), 8px 8px 20px rgba(0,0,0,0.4)' 
              }}
            >
              {data.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl font-light leading-relaxed mb-6 sm:mb-10 drop-shadow">
              {data.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <button className="w-full sm:w-auto px-2 py-3 sm:py-4 bg-transparent text-white text-sm font-medium border-b-2 border-[var(--color-sun-gold)] hover:text-[var(--color-sun-gold)] transition-colors uppercase tracking-wider">
                Explore Trips
              </button>
              <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-[var(--color-sun-gold)] text-[var(--color-ocean-blue)] text-sm font-bold hover:brightness-110 transition-all rounded-sm shadow-lg uppercase tracking-wider">
                Plan My Trip
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 flex flex-wrap gap-4 sm:gap-8 text-white pt-4 sm:pt-6 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-[var(--color-sun-gold)] drop-shadow-md">5,000+</span>
                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-wider opacity-90 mt-1">Travelers</span>
              </div>
              <div className="flex flex-col border-l border-white/20 pl-4 sm:pl-8">
                <span className="text-2xl sm:text-3xl font-bold text-[var(--color-sun-gold)] drop-shadow-md">21</span>
                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-wider opacity-90 mt-1">States Covered</span>
              </div>
              <div className="flex flex-col border-l border-white/20 pl-4 sm:pl-8">
                <span className="text-2xl sm:text-3xl font-bold text-[var(--color-sun-gold)] drop-shadow-md">100+</span>
                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-wider opacity-90 mt-1">Destinations</span>
              </div>
              <div className="flex flex-col border-l border-white/20 pl-4 sm:pl-8 justify-center">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-sun-gold)] drop-shadow-md">Domestic &</span>
                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-wider opacity-90 mt-1">International Tours</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
