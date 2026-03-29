"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import StickySidebar from "./StickySidebar";
import { ItineraryDay } from "@/data/tripsData";

export default function ItinerarySection({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<number | null>(itinerary[0]?.day || 1);

  const toggleDay = (day: number) => {
    setOpenDay((prev) => (prev === day ? null : day));
  };

  return (
    <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-8 lg:grid-cols-12">
      {/* Left Column: Accordion */}
      <div className="lg:col-span-8">
        <div className="flex flex-col gap-4">
          {itinerary.map(({ day, title, description }) => {
            const isOpen = openDay === day;
            return (
              <div key={day} className="flex flex-col">
                <button
                  onClick={() => toggleDay(day)}
                  className={`w-full rounded-full px-6 py-3 text-left font-bold transition-colors ${
                    isOpen ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  DAY {day}: {title}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-8 pt-6 leading-relaxed text-neutral-600">
                        <p>{description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer of Itinerary */}
        <div className="mt-8">
          <p className="my-6 text-sm italic text-neutral-500">
            NOTE: Numerous factors such as weather, road conditions, the physical ability of the participants etc. may dictate itinerary change. We reserve the rights to change any schedule in the interest of safety, comfort and general wellbeing.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button className="mr-4 rounded-full bg-neutral-900 px-8 py-3 font-semibold text-white transition-transform hover:scale-105">
              BOOK NOW
            </button>
            <button className="rounded-full bg-neutral-900 px-8 py-3 font-semibold text-white transition-transform hover:scale-105">
              INQUIRE
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-bold text-neutral-500">SHARE THIS TRIP:</span>
            <div className="flex gap-2">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200" aria-label="Facebook">
                <Facebook className="h-4 w-4 text-neutral-900" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200" aria-label="Instagram">
                <Instagram className="h-4 w-4 text-neutral-900" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200" aria-label="Twitter">
                <Twitter className="h-4 w-4 text-neutral-900" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Sidebar */}
      <div className="lg:col-span-4">
        <StickySidebar />
      </div>
    </div>
  );
}
