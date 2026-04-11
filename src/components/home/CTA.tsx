"use client";

import { motion } from "motion/react";
import type { SiteData } from "@/data/mockData";
import Button from "../ui/Button";

export default function CTA({ data }: { data: SiteData["cta"] }) {
  return (
    <section className="relative py-14 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
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
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="w-full sm:w-auto"
        >
          <Button variant="outline" size="xl" fullWidth>
            {data.buttonText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
