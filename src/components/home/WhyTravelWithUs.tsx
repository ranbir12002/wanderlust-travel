"use client";

import { motion } from "motion/react";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Subheading, Text } from "../ui/Typography";
import { CheckCircle2, ShieldCheck, Car, Users, Headset } from "lucide-react";

const features = [
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Verified Stays",
    desc: "We handpick stays that offer the perfect balance of comfort, location, and value. Whether it's a cozy homestay in the mountains or a lakeside resort, we ensure every stay enhances your experience.",
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: "Safe & Comfortable Transportation",
    desc: "Travel in well-maintained vehicles driven by experienced professionals. From winding mountain roads to long highway journeys, safety and comfort remain our top priorities.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "No Middlemen. No Hidden Markups.",
    desc: "Unlike many travel companies, Beaches2Mountains operates through its own in-house team. We don't rely on third-party vendors or hidden B2B partnerships, ensuring better transparency, quality control, and support throughout your journey.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Dedicated Trip Coordinators",
    desc: "Our young and experienced trip coordinators travel with you every step of the way. With strong local knowledge, problem-solving skills, and a passion for creating memorable experiences, they're much more than just guides.",
  },
  {
    icon: <Headset className="w-6 h-6" />,
    title: "Support Before, During & After Your Trip",
    desc: "Questions before booking? Need assistance during the journey? Looking for recommendations after your trip? Our team is always just a call or message away.",
  }
];

export default function WhyTravelWithUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <SectionContainer>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Subheading accent>[ WHY TRAVEL WITH US? ]</Subheading>
            <Heading className="mt-4 mb-6">Travel Without The Guesswork</Heading>
            <Text className="text-lg">
              From stays and transportation to on-ground support, every detail is handled by our team so you can focus on making memories.
            </Text>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-10">
          {features.map((feature, idx) => {
            let colClass = "md:col-span-2";
            if (idx === 3) colClass += " lg:col-start-2";
            if (idx === 4) colClass += " md:col-start-2 lg:col-start-4";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${colClass} bg-surface p-8 rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow`}
              >
              <div className="w-14 h-14 bg-[var(--color-sky-blue)]/20 rounded-full flex items-center justify-center text-[var(--color-ocean-blue)] mb-6">
                {feature.icon}
              </div>
              <Heading variant="card" as="h4" className="mb-4">
                {feature.title}
              </Heading>
              <Text variant="small">
                {feature.desc}
              </Text>
            </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
