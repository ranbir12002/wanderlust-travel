"use client";

import { motion } from "motion/react";
import type { SiteData } from "@/data/mockData";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Subheading, Text } from "../ui/Typography";

export default function Process({ data }: { data: SiteData["process"] }) {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[var(--color-ocean-blue)] text-white relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex flex-col justify-center overflow-hidden">
      <SectionContainer className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 sm:mb-20 md:mb-24 lg:mb-32 xl:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" light className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[80px]">
              {data.title}
            </Heading>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-6 md:mt-6"
          >
            <Subheading light>[ HOW IT WORKS ]</Subheading>
          </motion.div>
        </div>

        {/* Desktop Timeline */}
        <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] mt-16 md:mt-24 lg:mt-32 hidden md:block">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/30 -translate-y-1/2"></div>

          <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8 h-full">
            {data.steps.map((step, idx) => {
              const isTop = idx % 2 !== 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative h-full"
                >
                  {/* Dot */}
                  <div className="absolute top-1/2 left-0 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full -translate-y-1/2 -translate-x-1.5 md:-translate-x-2 z-10"></div>

                  {/* Dashed Line */}
                  {isTop ? (
                    <div className="absolute bottom-1/2 left-0 w-px h-16 md:h-20 lg:h-24 border-l border-dashed border-white/30 -translate-x-[5px] md:-translate-x-[7px]"></div>
                  ) : (
                    <div className="absolute top-1/2 left-0 w-px h-16 md:h-20 lg:h-24 border-l border-dashed border-white/30 -translate-x-[5px] md:-translate-x-[7px]"></div>
                  )}

                  {/* Content */}
                  <div
                    className={`absolute left-0 w-full pr-3 md:pr-6 lg:pr-12 ${
                      isTop
                        ? "bottom-[calc(50%+4rem)] md:bottom-[calc(50%+5rem)] lg:bottom-[calc(50%+6rem)]"
                        : "top-[calc(50%+4rem)] md:top-[calc(50%+5rem)] lg:top-[calc(50%+6rem)]"
                    }`}
                  >
                    <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 font-headline tracking-tight">
                      {step.num} | {step.title}
                    </h3>
                    <p className="text-white/70 text-xs md:text-sm lg:text-base leading-relaxed font-body">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden flex flex-col gap-8 sm:gap-10 md:gap-12 mt-8 sm:mt-12 md:mt-16 relative">
          <div className="absolute top-2 bottom-2 left-0 w-px border-l border-dashed border-white/30"></div>
          {data.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-8"
            >
              <div className="absolute top-2 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full -translate-x-[5px] sm:-translate-x-[6px] z-10"></div>
              <Heading as="h3" variant="card" light className="mb-2 sm:mb-3">
                {step.num} | {step.title}
              </Heading>
              <Text variant="small" light>
                {step.desc}
              </Text>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Logo Bottom Right */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 flex items-center gap-2 text-white/40">
        <Heading variant="accent" light as="span">
          Beaches to Mountains
        </Heading>
      </div>
    </section>
  );
}
