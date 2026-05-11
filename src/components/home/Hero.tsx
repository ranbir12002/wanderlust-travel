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
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#0A0A0A] text-white font-sans flex items-center">
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
        <div className="mt-20 lg:mt-0 flex flex-col justify-center lg:w-3/4 xl:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 
              className="text-[3rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black leading-[1.05] tracking-tighter uppercase mb-6 text-white whitespace-pre-line"
              style={{ 
                textShadow: '4px 4px 0px rgba(0,0,0,0.5), 8px 8px 20px rgba(0,0,0,0.4)' 
              }}
            >
              {data.title}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-xl font-light leading-relaxed mb-10 drop-shadow">
              {data.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-sun-gold)] text-[var(--color-ocean-blue)] text-sm font-bold hover:brightness-110 transition-all rounded-sm shadow-lg uppercase tracking-wider">
                Book Your Journey
              </button>
              <button className="w-full sm:w-auto px-2 py-4 bg-transparent text-white text-sm font-medium border-b-2 border-[var(--color-sun-gold)] hover:text-[var(--color-sun-gold)] transition-colors uppercase tracking-wider">
                Explore Destinations
              </button>
            </div>
          </motion.div>
        </div>

        {/* Top-Right: Social Proof Widget */}
        <div className="hidden lg:flex absolute top-32 right-12 z-30">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-end text-right"
          >
            <div className="flex -space-x-4 mb-3">
              {avatars.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt="Client avatar"
                  className="w-12 h-12 rounded-full border-2 border-white/80 shadow-md object-cover"
                />
              ))}
            </div>
            <h3 className="text-4xl font-bold text-white mb-1 drop-shadow">500+</h3>
            <p className="text-sm font-light text-white/80">Satisfied Clients</p>
          </motion.div>
        </div>

        {/* Bottom-Right: Featured Project Card (Pinned to absolute right) */}
        <div className="hidden lg:block absolute bottom-24 right-12 z-30 w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-black/30 backdrop-blur-xl border border-white/10 p-6 rounded-lg shadow-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 border border-white/20 rounded-full">
                <MapPin className="w-5 h-5 text-white stroke-[1.5]" />
              </div>
              <button className="p-2 bg-white text-black hover:bg-neutral-200 transition-colors rounded-full">
                <ArrowUpRight className="w-5 h-5 stroke-2" />
              </button>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">{data.nextProject.name}</h4>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              {data.nextProject.location}
            </p>
          </motion.div>
        </div>

        {/* Bottom-Left: Thumbnails and Slider Controls */}
        <div className="absolute bottom-12 left-6 lg:left-12 z-30 flex flex-col gap-6 w-full lg:w-auto pr-6 lg:pr-0">
          {/* 4 Image Selector */}
          <div className="flex gap-4">
            {backgrounds.map((bg, index) => (
              <button
                key={index}
                onClick={() => selectSlide(index)}
                className={`relative w-20 h-12 md:w-24 md:h-16 overflow-hidden rounded-md transition-all duration-300 border-2 ${currentSlide === index ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105" : "border-white/20 hover:border-white/60 opacity-60 hover:opacity-100"
                  }`}
              >
                <img src={bg} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-6 shrink-0 font-mono">0{currentSlide + 1}</span>
            <div className="relative h-[2px] w-full max-w-sm bg-white/20 overflow-hidden">
              <motion.div
                key={currentSlide}
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
            <span className="text-sm text-white/50 w-6 shrink-0 font-mono text-right">0{backgrounds.length}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
