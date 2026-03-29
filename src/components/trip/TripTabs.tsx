"use client";

import { useState } from "react";

const TABS = ["EXPERIENCE", "ITINERARY", "BUDGET", "ESSENTIALS", "OTHER INFO"];

export default function TripTabs() {
  const [activeTab, setActiveTab] = useState("ITINERARY");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-4 px-4 py-8">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`rounded-full px-6 py-2 text-sm font-semibold tracking-wide transition-all ${
            activeTab === tab
              ? "bg-neutral-900 text-white"
              : "bg-neutral-200/60 text-neutral-500 hover:bg-neutral-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
