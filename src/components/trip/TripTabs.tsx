"use client";

import { useState, useEffect } from "react";

const TABS = [
  { id: "experience", label: "EXPERIENCE" },
  { id: "itinerary", label: "ITINERARY" },
  { id: "budget", label: "BUDGET" },
  { id: "essentials", label: "ESSENTIALS" },
  { id: "other", label: "OTHER INFO" },
];

export default function TripTabs() {
  const [activeTab, setActiveTab] = useState("experience");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for any sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(id);
    }
  };

  // Sync active tab with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const tab of [...TABS].reverse()) {
        const element = document.getElementById(tab.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveTab(tab.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-30 mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-2 bg-white/80 px-4 py-4 backdrop-blur-md md:gap-4 md:py-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => scrollToSection(tab.id)}
          className={`rounded-full px-4 py-2 text-[10px] font-bold tracking-widest transition-all md:px-6 md:text-xs ${
            activeTab === tab.id
              ? "bg-neutral-900 text-white shadow-lg shadow-black/20"
              : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
