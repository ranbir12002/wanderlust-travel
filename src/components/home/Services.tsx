"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import Link from "next/link";
import SectionContainer from "../ui/SectionContainer";
import Badge from "../ui/Badge";

export interface ServiceItem {
  title: string;
  desc: string;
  img: string;
  tags?: string[];
  href?: string;
  price?: string;
  location?: string;
}

export default function Services({ data }: { data: ServiceItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 bg-bg-alt">
      <SectionContainer className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 h-auto lg:h-[380px] xl:h-[420px] 2xl:h-[460px]">
        {data.map((service, idx) => (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={`relative group overflow-hidden rounded-xl sm:rounded-[1.5rem] lg:rounded-[2rem] min-h-[165px] xs:min-h-[185px] sm:min-h-[210px] lg:min-h-0 transition-all duration-700 ease-out w-full ${
              hoveredIdx === null
                ? idx === data.length - 1
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            {service.href && <Link href={service.href} className="absolute inset-0 z-20"></Link>}

            {/* Top Right Arrow */}
            <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4">
              <div
                className="rounded-full bg-[var(--color-sun-gold)] flex items-center justify-center text-[var(--color-ocean-blue)] hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10"
              >
                <ArrowUpRight strokeWidth={2.5} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Tags */}
            {service.tags && (
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex flex-wrap gap-1 max-w-[70%]">
                {service.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="white">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Bottom Content */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-5 md:left-5 md:right-5">
              {/* Location */}
              {service.location && (
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-2.5 w-2.5 text-[var(--color-sun-gold)]" />
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-white/70">
                    {service.location}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3
                className={`uppercase leading-tight mb-1 sm:mb-1.5 font-black text-white ${
                  hoveredIdx === idx
                    ? "text-base sm:text-xl md:text-2xl lg:text-3xl"
                    : "text-sm sm:text-lg md:text-xl lg:text-2xl"
                } transition-all duration-500`}
              >
                {service.title}
              </h3>

              {/* Description — only when hovered or active */}
              <p className={`text-white/70 text-[10px] sm:text-[13px] leading-snug max-w-sm mb-1.5 transition-all duration-500 ${
                hoveredIdx === idx ? "opacity-100 h-auto" : "opacity-0 h-0 mb-0 overflow-hidden"
              }`}>
                {service.desc}
              </p>

              {/* Rating + Price Row */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-[var(--color-sun-gold)] text-[var(--color-sun-gold)]" />
                  ))}
                  <span className="text-[9px] font-bold text-white/50 ml-1">5.0</span>
                </div>

                {/* Price */}
                {service.price && (
                  <span className="text-[10px] sm:text-xs font-bold text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 border border-white/10">
                    {service.price}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </SectionContainer>
    </section>
  );
}
