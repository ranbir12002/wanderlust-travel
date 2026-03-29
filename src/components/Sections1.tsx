"use client";

import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  PenTool,
  Scissors,
  Droplet,
} from "lucide-react";
import type { SiteData } from "@/data/mockData";

const IconMap: Record<string, React.ElementType> = {
  Leaf,
  PenTool,
  Scissors,
  Droplet,
};

export function Hero({ data }: { data: SiteData["hero"] }) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-primary-container">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Lush Garden bg"
          className="w-full h-full object-cover opacity-80"
          src={data.bgImage}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1600px] mx-auto w-full pt-16 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-4 sm:space-y-6"
        >
          <h1 className="text-white font-headline font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tighter whitespace-pre-line">
            {data.title}
          </h1>
          <p className="text-on-primary-container text-sm sm:text-base md:text-lg xl:text-xl max-w-md md:max-w-lg xl:max-w-xl font-body leading-relaxed">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-8">
            <button className="bg-primary text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-headline font-bold text-xs sm:text-sm tracking-widest uppercase rounded-sm hover:bg-primary-container transition-all duration-300 w-full sm:w-auto text-center">
              GET STARTED
            </button>
            <button className="bg-surface-container-highest/20 backdrop-blur-md text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-headline font-bold text-xs sm:text-sm tracking-widest uppercase rounded-sm hover:bg-white/20 transition-all duration-300 w-full sm:w-auto text-center">
              EXPLORE PROJECTS
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider Widget Bottom Right — hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-16 sm:bottom-12 right-4 sm:right-6 md:right-8 lg:right-12 z-20 hidden sm:block"
      >
        <div className="bg-primary-container/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl max-w-[200px] sm:max-w-[240px] md:max-w-xs border border-outline-variant/10 shadow-2xl">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-on-primary-container font-headline font-bold text-[10px] sm:text-xs tracking-widest uppercase">
              Next Project
            </span>
            <span className="text-white text-xs sm:text-sm font-headline">
              {data.nextProject.current} / {data.nextProject.total}
            </span>
          </div>
          <h3 className="text-white font-headline font-black text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">
            {data.nextProject.name}
          </h3>
          <p className="text-on-primary-container text-[10px] sm:text-xs font-body mb-4 sm:mb-6">
            {data.nextProject.location}
          </p>
          <div className="flex gap-2">
            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-on-primary-container/30 text-white rounded-full hover:bg-white hover:text-primary transition-all">
              <ArrowLeft size={14} className="sm:hidden" />
              <ArrowLeft size={16} className="hidden sm:block" />
            </button>
            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-on-primary-container/30 text-white rounded-full hover:bg-white hover:text-primary transition-all">
              <ArrowRight size={14} className="sm:hidden" />
              <ArrowRight size={16} className="hidden sm:block" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators Bottom Left */}
      <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-6 md:left-12 lg:left-16 xl:left-24 z-20 flex gap-2 sm:gap-4">
        <div className="w-8 sm:w-12 h-1 bg-white"></div>
        <div className="w-8 sm:w-12 h-1 bg-white/30"></div>
        <div className="w-8 sm:w-12 h-1 bg-white/30"></div>
      </div>
    </section>
  );
}

export function Values({ data }: { data: SiteData["values"] }) {
  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-32 xl:py-40 bg-surface px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Garden values"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover rounded-sm shadow-2xl"
            src={data.image}
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 xl:-bottom-10 xl:-right-10 hidden md:flex flex-col justify-center items-center w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-secondary-container p-4 md:p-6 xl:p-8 shadow-xl">
            <span className="text-primary font-headline font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {data.yearsExperience}
            </span>
            <p className="text-on-secondary-fixed-variant font-headline font-bold text-[10px] md:text-xs lg:text-sm tracking-widest mt-1 md:mt-2 uppercase text-center">
              {data.yearsText}
            </p>
          </div>
        </motion.div>

        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <span className="text-secondary font-headline font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">
              [ VALUES ]
            </span>
            <h2 className="text-primary font-headline font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight whitespace-pre-line">
              {data.title}
            </h2>
            <p className="text-on-surface-variant font-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
              {data.description}
            </p>
            <button className="mt-4 sm:mt-6 md:mt-8 bg-primary text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-headline font-bold text-xs sm:text-sm tracking-widest uppercase rounded-sm hover:translate-y-[-2px] hover:shadow-lg transition-all w-full sm:w-auto text-center">
              GET STARTED
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-6 md:pt-8">
            {data.features.map((feature, idx) => {
              const IconComp = IconMap[feature.iconName] || Leaf;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-secondary-container rounded-full flex items-center justify-center text-primary [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5 md:[&_svg]:w-6 md:[&_svg]:h-6">
                    <IconComp />
                  </div>
                  <h4 className="font-headline font-bold text-base sm:text-lg md:text-xl text-primary">
                    {feature.title}
                  </h4>
                  <p className="text-on-surface-variant text-xs sm:text-sm font-body leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process({ data }: { data: SiteData["process"] }) {
  const [firstHalf, secondHalf] = data.title.split("\\n");
  
  // A slightly brittle split, but works if "LANDSCAPE" is the second word on the second line...
  // In our mock data: "SIMPLE STEPS FOR OUR\nLANDSCAPE WORK"
  // Actually we can just render the raw string with whitespace-pre-line, but the design had a subtle span style: 
  // <span className="text-white/40">LANDSCAPE</span> WORK
  // So we will reconstruct it dynamically if we want, or just leave it generic.
  // For safety, let's just make the whole text render:
  
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-accent-dark text-white px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex flex-col justify-center overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 sm:mb-20 md:mb-24 lg:mb-32 xl:mb-40">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[80px] font-bold tracking-tight leading-[1.1] font-headline whitespace-pre-line"
          >
            {data.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm tracking-widest uppercase mt-4 sm:mt-6 md:mt-6 font-medium"
          >
            [ HOW IT WORKS ]
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
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 font-headline tracking-tight">
                {step.num} | {step.title}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-body">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logo Bottom Right */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 flex items-center gap-2 text-white/40">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-6 sm:h-6"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
        <span className="text-lg sm:text-xl md:text-2xl font-serif tracking-wide lowercase">
          leaflife
        </span>
      </div>
    </section>
  );
}
