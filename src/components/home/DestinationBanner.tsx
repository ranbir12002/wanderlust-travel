"use client";

import { useState } from "react";
import { motion } from "motion/react";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Text } from "../ui/Typography";
import Button from "../ui/Button";
import TripRequestModal from "../trip/TripRequestModal";

const avatars = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100",
];

export default function DestinationBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Heading as="h2" variant="section" className="text-[var(--color-ocean-blue)] font-headline">
                Designed for Every {"\n"}Destination
              </Heading>

              <div className="flex items-center gap-4 py-2">
                <div className="flex -space-x-4 overflow-hidden">
                  {avatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="user"
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    />
                  ))}
                </div>
                <div className="text-xl font-black text-[var(--color-ocean-blue)] tracking-tighter">
                  86 M+
                </div>
              </div>
            </div>

            <Text className="text-neutral-500 max-w-xl leading-relaxed text-base">
              Every journey is unique, from mountain peaks to coastal escapes, GoVista helps you find experiences that match your mood, style, and sense of adventure. Our trusted partners ensure every moment of your trip is smooth, safe, and memorable.
            </Text>

            <Button
              variant="primary"
              size="lg"
              className="bg-[var(--color-sun-gold)] border-none hover:brightness-110 rounded-lg text-[var(--color-ocean-blue)] font-bold tracking-normal py-4 px-10 shadow-lg shadow-gold-500/20"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-2xl relative z-10 aspect-[4/3] lg:aspect-auto h-[400px] lg:h-[500px]">
              <img
                src="/hero banner/image.png"
                alt="Scenic travel"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Simple decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-sun-gold)]/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>

        </div>
      </SectionContainer>

      <TripRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
