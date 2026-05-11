"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube, Star, ExternalLink } from "lucide-react";
import type { SiteData } from "@/data/mockData";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Text } from "../ui/Typography";
import Image from "next/image";

export default function SocialLinks({ data }: { data: SiteData["social"] }) {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Column 1: Info & Icons */}
          <div className="space-y-12">
            <div className="space-y-6">
              <Heading as="h2" variant="section" className="text-4xl md:text-5xl font-black lowercase tracking-tighter">
                {data.title}
              </Heading>
              <Text className="max-w-xs leading-relaxed opacity-70">
                {data.description}
              </Text>
            </div>

            <div className="flex flex-col gap-4">
              <a 
                href={data.instagramUrl} 
                className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--color-ocean-blue)]/10 bg-[var(--color-sky-blue)]/5 hover:bg-[var(--color-ocean-blue)] hover:text-white transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-pink-50 group-hover:bg-white/20 transition-colors">
                    <Instagram className="w-5 h-5 text-pink-500 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest">Instagram</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a 
                href={data.youtubeUrl} 
                className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--color-ocean-blue)]/10 bg-[var(--color-sky-blue)]/5 hover:bg-[var(--color-ocean-blue)] hover:text-white transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-red-50 group-hover:bg-white/20 transition-colors">
                    <Youtube className="w-5 h-5 text-red-500 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest">YouTube</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a 
                href={data.googleUrl} 
                className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--color-ocean-blue)]/10 bg-[var(--color-sky-blue)]/5 hover:bg-[var(--color-ocean-blue)] hover:text-white transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-blue-50 group-hover:bg-white/20 transition-colors">
                    <Star className="w-5 h-5 text-blue-500 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest">Google Reviews</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Columns 2 & 3: Instagram Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {data.feedImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-700 ${idx % 3 === 1 ? 'mt-8 sm:mt-12' : ''}`}
              >
                <Image
                  src={img}
                  alt={`Instagram Feed ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </SectionContainer>
    </section>
  );
}
