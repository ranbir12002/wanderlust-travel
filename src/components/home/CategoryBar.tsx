"use client";

import { motion } from "framer-motion";
import { Globe, Compass, Calendar, Users, Footprints, Heart, CalendarDays } from "lucide-react";

interface CategoryItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const categories: CategoryItem[] = [
  { label: "International Trips", href: "/trips/international", icon: Globe },
  { label: "India Trips", href: "/trips/domestic", icon: Compass },
  { label: "Upcoming Trips", href: "/trips?filter=upcoming", icon: Calendar },
  { label: "Family Tours", href: "/trips?filter=family", icon: Users },
  { label: "Group Trips", href: "/trips?filter=group", icon: Footprints },
  { label: "Honeymoon Packages", href: "/trips?filter=honeymoon", icon: Heart },
  { label: "Trips by Month", href: "/trips/seasonal", icon: CalendarDays },
];

export default function CategoryBar() {
  return (
    <div className="w-full bg-white border-b border-neutral-100 sticky top-14 md:top-16 lg:top-20 z-40 shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-12">
        {/* Horizontal scroll container with fade effects */}
        <div className="relative flex items-center">
          <div className="flex w-full items-center justify-between overflow-x-auto py-2.5 gap-5 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <a
                  key={idx}
                  href={cat.href}
                  className="group flex items-center gap-2 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-ocean-blue)] hover:text-[var(--color-sun-gold)] transition-colors duration-300 relative py-1.5"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-sky-blue)]/10 text-[var(--color-ocean-blue)] group-hover:bg-[var(--color-sun-gold)] group-hover:text-[var(--color-ocean-blue)] transition-all duration-300">
                    <Icon size={12} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span>{cat.label}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-sun-gold)] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </a>
              );
            })}
          </div>
          {/* Subtle horizontal gradient indicators on mobile overflow */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white pointer-events-none lg:hidden" />
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-white pointer-events-none lg:hidden" />
        </div>
      </div>
    </div>
  );
}
