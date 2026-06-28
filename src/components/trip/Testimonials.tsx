"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const ALL_TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Local Guide",
    time: "2 weeks ago",
    text: "Beaches to Mountains crafted the perfect itinerary for our anniversary. The attention to detail and curated experiences were unmatched. Highly recommend Dhanush and the team!",
    image: "https://picsum.photos/seed/user1/800/800",
    rating: 5
  },
  {
    id: 2,
    name: "Michael T.",
    role: "3 reviews",
    time: "a month ago",
    text: "Absolutely breathtaking views and stellar organization. It felt like an exclusive, private expedition tailored just for us. Everything went smoothly without any delay.",
    image: "https://picsum.photos/seed/user2/800/800",
    rating: 5
  },
  {
    id: 3,
    name: "Elena R.",
    role: "Local Guide · 12 reviews",
    time: "2 months ago",
    text: "The best travel agency for bespoke trips. From the moment we landed in Delhi, everything was handled with pure professionalism. Will book my next trip with them soon.",
    image: "https://picsum.photos/seed/user3/800/800",
    rating: 5
  },
  {
    id: 4,
    name: "David L.",
    role: "4 reviews",
    time: "3 months ago",
    text: "Our group tour through the Alps was unforgettable. Expert guides, premium stays, and seamless logistics. Worth every single penny spent.",
    image: "https://picsum.photos/seed/user4/800/800",
    rating: 5
  },
  {
    id: 5,
    name: "Keerthana Reddy",
    role: "Local Guide · 8 reviews",
    time: "1 week ago",
    text: "It was a great trip to Kerala. I enjoyed a lot, all thanks to Beaches2Mountains. Special thanks to Dhanush Anna for helping us out late night.",
    image: "https://picsum.photos/seed/user5/800/800",
    rating: 5
  },
  {
    id: 6,
    name: "Hend Rabie",
    role: "Solo Traveler · 2 reviews",
    time: "3 weeks ago",
    text: "As a solo female traveler, I felt safe and well-cared for. Harnath made sure my stay was enjoyable. Magnificent arrangements!",
    image: "https://picsum.photos/seed/user6/800/800",
    rating: 5
  },
  {
    id: 7,
    name: "Deepika",
    role: "Local Guide · 15 reviews",
    time: "a week ago",
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
    <section className="w-full py-12 bg-[#f8f9fa] border-t border-neutral-200 overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl px-4 flex flex-col w-full">
        {/* Google Header Widget Summary */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-neutral-200 pb-8 mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-center">
              <GoogleIcon />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-neutral-800">Google Reviews</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500 font-semibold border border-neutral-200">Verified</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-3xl font-black text-neutral-900 leading-none">5.0</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-[#fbbc05] text-[#fbbc05]" />
                  ))}
                </div>
                <span className="text-xs text-neutral-500 font-medium">({ALL_TESTIMONIALS.length} reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={prevSlide}
              className="p-2.5 rounded-full border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-black shadow-sm transition-all focus:outline-none"
              aria-label="Previous Reviews"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2.5 rounded-full border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-black shadow-sm transition-all focus:outline-none"
              aria-label="Next Reviews"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {currentReviews.map((review) => (
              <div key={review.id} className="relative flex flex-col justify-between p-6 rounded-xl bg-white border border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                          {review.name}
                        </h4>
                        <span className="text-[10px] text-neutral-500 font-medium">
                          {review.role}
                        </span>
                      </div>
                    </div>
                    <GoogleIcon />
                  </div>

                  {/* Rating & Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#fbbc05] text-[#fbbc05]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-medium">{review.time}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal line-clamp-5">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Page Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-6 bg-neutral-800" : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
