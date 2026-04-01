"use client";

import { motion } from "motion/react";
import { ArrowRight, Globe, Compass } from "lucide-react";
import type { SiteData } from "@/data/mockData";
import Button from "../ui/Button";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Text } from "../ui/Typography";

export default function Hero({ data }: { data: SiteData["hero"] }) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#0A0A0A] text-white">
      {/* 3D Global Interactive - Background Layer */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-60 md:opacity-100">
        <div className="relative h-full w-full">
          <iframe 
            title="Earth" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            src="https://sketchfab.com/models/41fc80d85dfd480281f21b74b2de2faa/embed?autospin=0.5&autostart=1&transparent=1&ui_hint=0&ui_infos=0&ui_stop=0&ui_watermark=0&ui_theme=dark"
            className="absolute -right-1/4 h-full w-[150%] scale-110 md:right-0 md:w-full md:scale-100"
          ></iframe>
        </div>
        {/* Subtle Vignette Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
      </div>

      <SectionContainer className="relative z-10 h-full flex flex-col justify-center pt-24 sm:pt-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 md:space-y-8"
          >
            {/* Tagline */}
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#FFE400]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFE400]">
                expedition editorial
              </span>
            </div>

            <Heading as="h1" variant="hero" className="max-w-2xl text-6xl font-black lowercase leading-[0.9] tracking-tighter sm:text-7xl lg:text-9xl">
              discover curated experiences, made for you
            </Heading>
            
            <Text className="max-w-md text-sm font-medium uppercase tracking-widest text-white/60 md:max-w-lg lg:text-base leading-relaxed">
              breathtaking journeys, tailored to your rhythm. explore the world through a lens of sophistication.
            </Text>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="flex flex-col sm:flex-row items-center gap-4 pt-6 sm:pt-8"
            >
              <Button size="lg" className="w-full sm:w-auto bg-[#FFE400] text-black hover:bg-white hover:text-black">
               <Globe className="mr-2 h-5 w-5" /> Explore Trips
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white backdrop-blur hover:bg-white hover:text-black">
                <Compass className="mr-2 h-5 w-5" /> Customise a Trip
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Premium Discovery Preview Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-12 right-6 md:right-12 z-20 hidden lg:block"
      >
        <div className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 p-8 backdrop-blur-3xl border border-white/10 max-w-xs transition-all hover:bg-white/10 shadow-2xl">
           <div className="absolute top-0 right-0 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE400] text-black">
                 <ArrowRight size={20} />
              </div>
           </div>
           
           <span className="mb-4 block text-[10px] font-black uppercase tracking-widest text-[#FFE400]">
              Recent Discovery
           </span>
           <h3 className="mb-2 text-2xl font-black leading-none tracking-tight">
              the silk road
           </h3>
           <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              uzbekistan — cultural expedition
           </p>
        </div>
      </motion.div>

      {/* Decorative Slide Indicators */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20 flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
           <div 
             key={i} 
             className={`h-1 w-8 rounded-full transition-all duration-500 ${i === 0 ? 'bg-[#FFE400] w-12' : 'bg-white/20'}`} 
           />
        ))}
      </div>
    </section>
  );
}
