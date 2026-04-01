"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, Play } from "lucide-react";
import Button from "@/components/ui/Button";

interface TripGalleryProps {
  images: string[];
  tripTitle?: string;
}

export default function TripGallery({ images = [], tripTitle = "Trip" }: TripGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const isVideo = (url: string) => {
    return /\.(mp4|webm|mov|ogg)$/i.test(url);
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const manualNext = () => {
    setIsAutoPlaying(false);
    setLastInteraction(Date.now());
    handleNext();
  };

  const manualPrev = () => {
    setIsAutoPlaying(false);
    setLastInteraction(Date.now());
    handlePrev();
  };

  // Auto-scroll logic
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext, images.length]);

  // Restart auto-scroll after 15s of inactivity
  useEffect(() => {
    if (isAutoPlaying) return;

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastInteraction > 15000) {
        setIsAutoPlaying(true);
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [isAutoPlaying, lastInteraction]);

  if (images.length === 0) return null;

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-black lowercase tracking-tighter text-neutral-900 md:text-6xl">
            the experience
          </h2>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
            capturing the soul of the journey
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFullGallery(true)}
          className="border-neutral-200 text-neutral-900 hover:bg-neutral-100"
        >
          <Maximize2 className="mr-2 h-4 w-4 text-neutral-400" /> View Full Gallery
        </Button>
      </div>

      {/* Main Carousel */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl md:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            {isVideo(images[currentIndex]) ? (
              <video
                src={images[currentIndex]}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 bottom-8 flex items-center justify-between px-8">
          <div className="flex gap-2">
            <button
              onClick={manualPrev}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={manualNext}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {!isAutoPlaying && (
              <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFE400]" />
                Paused
              </div>
            )}
            {/* Indicator */}
            <div className="flex items-center gap-4 rounded-full bg-black/40 px-6 py-2 text-xs font-bold tracking-widest text-white backdrop-blur-lg">
              <span>{(currentIndex + 1).toString().padStart(2, '0')}</span>
              <div className="h-[1px] w-8 bg-white/30" />
              <span className="text-white/50">{images.length.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {showFullGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-white"
          >
            <div className="flex items-center justify-between p-6">
              <h3 className="text-2xl font-black lowercase tracking-tight">Gallery</h3>
              <button 
                onClick={() => setShowFullGallery(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 transition-colors hover:bg-neutral-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="custom-scrollbar flex-1 overflow-y-auto px-6 pb-20">
              <div className="mx-auto max-w-6xl">
                <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
                  {images.map((img, idx) => {
                    const tags = ["MOST READ", "NEW", "TRENDING", "FEATURED", "HOT"];
                    const tag = tags[idx % tags.length];
                    const date = "january 2024";
                    const isVid = isVideo(img);
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group relative break-inside-avoid overflow-hidden rounded-[2rem] bg-neutral-100 shadow-sm transition-shadow hover:shadow-xl"
                        onClick={() => {
                          setCurrentIndex(idx);
                          setShowFullGallery(false);
                        }}
                      >
                        {/* Media Container */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden transition-transform duration-700 group-hover:scale-105">
                           <div className={`relative h-full w-full ${idx % 4 === 0 ? 'aspect-[16/9]' : 'aspect-square'}`}>
                            {isVid ? (
                              <video
                                src={img}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Image
                                src={img}
                                alt={`Gallery item ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            )}
                           </div>
                        </div>

                        {/* Top Badge */}
                        <div className="absolute left-6 top-6">
                          <span className="rounded-full bg-[#FFE400] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                            {tag}
                          </span>
                        </div>

                        {/* Bottom Overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-12 text-white">
                          <h4 className="mb-1 text-xl font-black lowercase leading-none tracking-tight">
                            capturing the essence of {tripTitle.split(' ')[0]}
                          </h4>
                          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                            {date}
                          </span>
                        </div>

                        {/* Hover interaction */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                           <div className="rounded-full bg-white/20 p-4 backdrop-blur-md">
                              {isVid ? <Play className="h-6 w-6 text-white" /> : <Maximize2 className="h-6 w-6 text-white" />}
                           </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
