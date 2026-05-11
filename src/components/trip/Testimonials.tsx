"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ALL_TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    platform: "Google Reviewer",
    trip: "Anniversary Special",
    text: "Beaches to Mountains crafted the perfect itinerary for our anniversary. The attention to detail and curated experiences were unmatched.",
    image: "https://picsum.photos/seed/user1/800/800",
    rating: 5
  },
  {
    id: 2,
    name: "Michael T.",
    platform: "Instagram Traveler",
    trip: "Private Expedition",
    text: "Absolutely breathtaking views and stellar organization. It felt like an exclusive, private expedition tailored just for us.",
    image: "https://picsum.photos/seed/user2/800/800",
    rating: 5
  },
  {
    id: 3,
    name: "Elena R.",
    platform: "Google Local Guide",
    trip: "Bespoke Journey",
    text: "The best travel agency for bespoke trips. From the moment we landed, everything was handled with pure professionalism.",
    image: "https://picsum.photos/seed/user3/800/800",
    rating: 5
  },
  {
    id: 4,
    name: "David L.",
    platform: "World Traveler",
    trip: "Alpine Adventure",
    text: "Our group tour through the Alps was unforgettable. Expert guides, premium stays, and seamless logistics.",
    image: "https://picsum.photos/seed/user4/800/800",
    rating: 5
  },
  {
    id: 5,
    name: "KEERTHANA REDDY",
    platform: "Google Reviewer",
    trip: "Kerala Experience",
    text: "It was a great trip to Kerala. I enjoyed a lot, all thanks to Beaches2Mountains. Special thanks to Dhanush Anna.",
    image: "https://picsum.photos/seed/user5/800/800",
    rating: 5
  },
  {
    id: 6,
    name: "HEND RABIE",
    platform: "Solo Traveler",
    trip: "Solo Explorer",
    text: "As a solo female traveler, I felt safe and well-cared for. Harnath made sure my stay was enjoyable. Magnificent arrangements!",
    image: "https://picsum.photos/seed/user6/800/800",
    rating: 5
  },
  {
    id: 7,
    name: "DEEPIKA",
    platform: "Group Traveler",
    trip: "Group Fun",
    text: "Met many new people who are so sweet and fun to be with. The itinerary was good, and you can enjoy all days without any second thought.",
    image: "https://picsum.photos/seed/user7/800/800",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(ALL_TESTIMONIALS.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentReviews = ALL_TESTIMONIALS.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section className="w-full py-16 bg-white border-t border-neutral-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 flex flex-col w-full">
        <header className="relative mb-12 pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="relative">
            <div className="absolute -top-6 -left-4 md:-left-8 z-0 text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] tracking-[0.1em] leading-none opacity-5 font-extrabold uppercase pointer-events-none select-none text-neutral-900">
              TESTIMONIALS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold relative z-10 lowercase mb-4 text-neutral-900">
              testimonials
            </h2>
            <p className="text-neutral-600 text-sm md:text-base max-w-2xl leading-relaxed relative z-10">
              Hear from our travelers. Read about their experiences and stories.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-[var(--color-sky-blue)]/20 text-[var(--color-ocean-blue)] hover:bg-[var(--color-ocean-blue)] hover:text-white transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-[var(--color-sky-blue)]/20 text-[var(--color-ocean-blue)] hover:bg-[var(--color-ocean-blue)] hover:text-white transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </header>
      </div>
      
      <div className="mx-auto max-w-7xl px-4">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {currentReviews.map((review) => (
              <div key={review.id} className="relative h-56 overflow-hidden rounded-[2rem] bg-black text-white shadow-lg group">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  className="object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                
                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <div className="mb-3 flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[var(--color-sun-gold)] text-[var(--color-sun-gold)]" />
                    ))}
                  </div>
                  
                  <div className="mb-1 text-sm text-white">
                    <span className="font-bold uppercase drop-shadow-md">{review.name},</span>
                    <span className="ml-1 text-[10px] text-neutral-300 drop-shadow-md uppercase tracking-wider">
                       {review.platform}
                    </span>
                  </div>
                  
                  <p className="line-clamp-3 text-xs font-medium italic text-neutral-200 drop-shadow-md leading-relaxed">
                    {review.trip} - {review.text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex justify-center gap-1.5 mt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-8 bg-[var(--color-sun-gold)]" : "w-3 bg-[var(--color-sky-blue)]/30 hover:bg-[var(--color-sky-blue)]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
