"use client";

import { motion } from "motion/react";
import { MapPin, Compass, Camera, Sun, CheckCircle2, Car, ShieldCheck, Users, Headset } from "lucide-react";
import type { SiteData } from "@/data/mockData";
import Button from "../ui/Button";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Subheading, Text } from "../ui/Typography";

const IconMap: Record<string, React.ElementType> = {
  MapPin,
  Compass,
  Camera,
  Sun,
  CheckCircle2,
  Car,
  ShieldCheck,
  Users,
  Headset,
};

export default function Values({ data }: { data: SiteData["values"] }) {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-surface">
      <SectionContainer className="max-w-5xl mx-auto items-center">
        <div className="space-y-8 sm:space-y-10 lg:space-y-12 w-full text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            {/* <Subheading accent>[ WHY TRAVEL WITH US? ]</Subheading> */}

            <Heading className="!text-3xl sm:!text-4xl md:!text-5xl">
              {data.title}
            </Heading>

            {data.description && (
              <Text className="max-w-lg">
                {data.description}
              </Text>
            )}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 md:pt-4">
            {data.features.map((feature, idx) => {
              const IconComp = IconMap[feature.iconName] || MapPin;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="space-y-1 sm:space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--color-sky-blue)]/20 rounded-full flex items-center justify-center shrink-0 text-[var(--color-ocean-blue)] [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5">
                      <IconComp />
                    </div>
                    <Heading variant="card" as="h4">
                      {feature.title}
                    </Heading>
                  </div>
                  <Text variant="small" className="pl-11 sm:pl-13 text-neutral-600">
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
