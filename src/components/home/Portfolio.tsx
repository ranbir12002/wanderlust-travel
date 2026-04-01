"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteData } from "@/data/mockData";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Text } from "../ui/Typography";

export default function Portfolio({ data }: { data: SiteData["portfolio"] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.works.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.works.length) % data.works.length);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-bg-alt overflow-hidden">
      <SectionContainer className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 sm:space-y-4"
        >
          <Heading>
            {data.title}
            <span className="text-outline-variant">{data.highlightText}</span>
          </Heading>
        </motion.div>
      </SectionContainer>

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
                    <Text variant="caption">NAME</Text>
                    <Heading as="h4" variant="card">
                      {work.title}
                    </Heading>
                  </div>
                  <div className="flex-1">
                    <Text variant="caption">LOCATION</Text>
                    <Heading as="h4" variant="card">
                      {work.loc}
                    </Heading>
                  </div>
                  <div className="flex-[2] hidden sm:block">
                    <Text
                      variant="small"
                      className={`transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {work.desc}
                    </Text>
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
