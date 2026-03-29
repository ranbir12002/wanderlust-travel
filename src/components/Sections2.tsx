"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteData } from "@/data/mockData";

export function Services({ data }: { data: SiteData["services"] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-bg-alt">
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 h-auto lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
        {data.map((service, idx) => (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={`relative group overflow-hidden rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-0 transition-all duration-700 ease-out w-full ${
              hoveredIdx === null
                ? idx === 3
                  ? "lg:w-[40%]"
                  : "lg:w-[20%]"
                : hoveredIdx === idx
                  ? "lg:w-[55%]"
                  : "lg:w-[15%]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              src={service.img}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Top Right Arrow */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6">
              <div
                className={`rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform duration-300 cursor-pointer ${
                  idx === 3
                    ? "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                    : "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                }`}
              >
                <ArrowUpRight
                  size={idx === 3 ? 20 : 16}
                  strokeWidth={1.5}
                  className="sm:[&]:w-5 sm:[&]:h-5 md:[&]:w-6 md:[&]:h-6"
                />
              </div>
            </div>

            {/* Tags for the 4th card */}
            {service.tags && (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 flex flex-wrap gap-1.5 sm:gap-2 max-w-[70%]">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 rounded-full border border-white/60 text-white text-[10px] sm:text-xs md:text-sm font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8">
              <h3
                className={`text-white font-headline font-bold uppercase tracking-tight whitespace-pre-line leading-none mb-2 sm:mb-3 md:mb-4 ${
                  idx === 3
                    ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                    : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                }`}
              >
                {service.title}
              </h3>
              <p className="text-white/90 font-body text-xs sm:text-sm md:text-base max-w-md">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Testimonial({ data }: { data: SiteData["testimonial"] }) {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-surface-container-low px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
      >
        <Quote className="text-primary opacity-20 mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        <p className="text-primary font-headline font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight italic tracking-tight px-2 sm:px-4">
          &ldquo;{data.quote}&rdquo;
        </p>
        <div className="space-y-1 sm:space-y-2">
          <h5 className="text-primary font-headline font-bold text-base sm:text-lg md:text-xl uppercase tracking-widest">
            {data.author}
          </h5>
          <p className="text-on-surface-variant font-body text-xs sm:text-sm">
            {data.role}
          </p>
        </div>
        <div className="flex gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 md:pt-8">
          <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export function Portfolio({ data }: { data: SiteData["portfolio"] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.works.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.works.length) % data.works.length);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-bg-alt overflow-hidden">
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 sm:space-y-4"
        >
          <h2 className="text-primary font-headline font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight whitespace-pre-line">
            {data.title}
            <span className="text-outline-variant">{data.highlightText}</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative pl-4 sm:pl-6 md:pl-12 lg:pl-16 xl:pl-24 max-w-[1600px] mx-auto">
        <motion.div
          className="flex gap-4 sm:gap-6 md:gap-8"
          animate={{
            x: `calc(-${currentIndex * 85}% - ${currentIndex * 1}rem)`,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {data.works.map((work, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={idx}
                className="min-w-[85%] sm:min-w-[80%] md:min-w-[75%] lg:min-w-[70%] shrink-0 transition-opacity duration-700"
                style={{ opacity: isActive ? 1 : 0.4 }}
              >
                <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-sm mb-4 sm:mb-5 md:mb-6 bg-surface-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={work.title}
                    className="w-full h-full object-cover"
                    src={work.img}
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  <div className="flex-1">
                    <p className="text-[9px] sm:text-[10px] md:text-[11px] text-on-surface-variant uppercase tracking-widest mb-0.5 sm:mb-1">
                      NAME
                    </p>
                    <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-headline font-bold text-primary">
                      {work.title}
                    </h4>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] sm:text-[10px] md:text-[11px] text-on-surface-variant uppercase tracking-widest mb-0.5 sm:mb-1">
                      LOCATION
                    </p>
                    <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-headline font-bold text-primary">
                      {work.loc}
                    </h4>
                  </div>
                  <div className="flex-[2] hidden sm:block">
                    <p
                      className={`text-xs sm:text-sm text-on-surface-variant transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {work.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Mobile navigation buttons */}
        <div className="flex gap-3 mt-6 sm:mt-8 lg:hidden justify-center pr-4 sm:pr-6">
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Desktop NEXT Button Overlay */}
        <div className="absolute top-0 right-0 w-[30%] h-[calc(100%-100px)] hidden lg:flex items-center justify-center pointer-events-none">
          <button
            onClick={nextSlide}
            className="w-24 h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full border border-primary/30 flex items-center justify-center text-primary font-body text-xs sm:text-sm tracking-widest hover:bg-primary hover:text-white transition-all duration-300 pointer-events-auto backdrop-blur-sm"
          >
            NEXT
          </button>
        </div>
      </div>
    </section>
  );
}

export function CTA({ data }: { data: SiteData["cta"] }) {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="CTA Background"
          className="w-full h-full object-cover"
          src={data.bgImage}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
      </div>
      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10 max-w-[1600px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-headline font-black text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight max-w-5xl uppercase tracking-tighter"
        >
          {data.title}
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white text-primary px-8 sm:px-10 md:px-12 lg:px-16 py-3 sm:py-4 md:py-5 lg:py-6 font-headline font-bold text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase rounded-sm hover:bg-surface-container transition-all shadow-2xl hover:scale-105 w-full sm:w-auto"
        >
          {data.buttonText}
        </motion.button>
      </div>
    </section>
  );
}
