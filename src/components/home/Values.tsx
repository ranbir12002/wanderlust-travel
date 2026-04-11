"use client";

import { motion } from "motion/react";
import { Leaf, Droplet, PenTool, Scissors } from "lucide-react";
import type { SiteData } from "@/data/mockData";
import Button from "../ui/Button";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Subheading, Text } from "../ui/Typography";

const IconMap: Record<string, React.ElementType> = {
  Leaf,
  PenTool,
  Scissors,
  Droplet,
};

export default function Values({ data }: { data: SiteData["values"] }) {
  return (
    <section className="py-12 sm:py-14 md:py-20 lg:py-24 bg-surface">
      <SectionContainer className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
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
            <Text variant="caption" className="mt-1 md:mt-2 text-center text-on-secondary-fixed-variant">
              {data.yearsText}
            </Text>
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
            <Subheading accent>[ VALUES ]</Subheading>
            
            <Heading>
              {data.title}
            </Heading>
            
            <Text className="max-w-lg">
              {data.description}
            </Text>

            <Button variant="secondary" size="lg" className="mt-4 sm:mt-6 md:mt-8">
              GET STARTED
            </Button>
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
                  <Heading variant="card" as="h4">
                    {feature.title}
                  </Heading>
                  <Text variant="small">
                    {feature.desc}
                  </Text>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
