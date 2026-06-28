"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Twitter, ChevronDown } from "lucide-react";
import StickySidebar from "./StickySidebar";
import { ItineraryDay, Trip } from "@/data/tripsData";

interface ItinerarySectionProps {
  itinerary: ItineraryDay[];
  sidebarTrips?: Trip[];
}

export default function ItinerarySection({ itinerary, sidebarTrips }: ItinerarySectionProps) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <div className="relative mx-auto grid max-w-7xl gap-8 lg:gap-12 px-4 py-8 lg:grid-cols-12">
      {/* Left Column: Accordion */}
      <div className="lg:col-span-8">
        <div className="space-y-4">
          {itinerary.map((dayObj) => {
            const isOpen = openDay === dayObj.day;
            return (
              <div key={dayObj.day} className="flex flex-col">
                <button
                  onClick={() => toggleDay(dayObj.day)}
                  className={`flex w-full items-center justify-between px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-left transition-all focus:outline-none shadow-sm ${
                    isOpen 
                      ? "bg-[#3a3a3a] text-white" 
                      : "bg-[#e5e5e5] text-[#555555] hover:bg-[#dbdbdb]"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold tracking-wider uppercase">
                    DAY {dayObj.day}: {dayObj.title}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 ${isOpen ? "text-white" : "text-[#555555]"}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 px-6 py-5 sm:px-8 sm:py-6 rounded-3xl bg-neutral-50/50 border border-neutral-100/50">
                        <div className="flex flex-col gap-6">
                          {/* Description */}
                          <div className="text-sm font-medium leading-relaxed text-neutral-600">
                            {dayObj.description}
                          </div>

                          {/* Sub-Activities Timeline */}
                          {dayObj.activities && dayObj.activities.length > 0 && (
                            <div className="space-y-6 border-l-2 border-neutral-200/80 pl-6 ml-1 py-1">
                              {dayObj.activities.map((activity, idx) => (
                                <div key={idx} className="relative">
                                  <div 
                                    className="absolute top-[3px] h-4 w-4 rounded-full border-2 border-white bg-black shadow-[0_1px_3px_rgba(0,0,0,0.2)]" 
                                    style={{ left: "-31px" }}
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-neutral-800 leading-snug">{activity.title}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Bullet Points */}
                          {dayObj.bulletPoints && dayObj.bulletPoints.length > 0 && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {dayObj.bulletPoints.map((bp, idx) => (
                                <li key={idx} className="flex items-start gap-3 rounded-2xl bg-neutral-100/60 p-3 sm:p-4">
                                  <span className="mt-1 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900" />
                                  <span className="text-xs font-semibold leading-snug text-neutral-700">{bp}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Notes Callout */}
                          {dayObj.notes && (
                            <div className="rounded-2xl border border-[#FFE400]/30 bg-[#FFE400]/5 p-4 sm:p-5">
                              <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                💡 pro-tip / note
                              </div>
                              <p className="text-xs italic leading-relaxed text-neutral-600">
                                {dayObj.notes}
                              </p>
                            </div>
                          )}
                        </div>
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

          <div className="flex flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial rounded-full bg-neutral-900 px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white transition-transform hover:scale-105 text-center">
              BOOK NOW
            </button>
            <button className="flex-1 sm:flex-initial rounded-full bg-neutral-900 px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white transition-transform hover:scale-105 text-center">
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
        <StickySidebar trips={sidebarTrips} />
      </div>
    </div>
  );
}
