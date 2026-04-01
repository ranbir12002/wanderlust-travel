"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { SiteData } from "@/data/mockData";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Text } from "../ui/Typography";
import Badge from "../ui/Badge";

export default function Services({ data }: { data: SiteData["services"] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-bg-alt">
      <SectionContainer className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 h-auto lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
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
                  <Badge key={tag} variant="white">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8">
              <Heading
                as="h3"
                light
                className={`uppercase leading-none mb-2 sm:mb-3 md:mb-4 ${
                  idx === 3
                    ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                    : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                }`}
              >
                {service.title}
              </Heading>
              <Text light variant="small" className="max-w-md">
                {service.desc}
              </Text>
            </div>
          </motion.div>
        ))}
      </SectionContainer>
    </section>
  );
}
