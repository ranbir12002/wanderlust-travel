"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TripsFilterBar({
  destinations,
  durations,
  budgets,
  natureOfTrips
}: {
  destinations: string[],
  durations: string[],
  budgets: string[],
  natureOfTrips: string[]
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  const currentDestination = searchParams.getAll("destination");
  const currentDuration = searchParams.getAll("duration");
  const currentBudget = searchParams.getAll("budget");
  const currentNature = searchParams.getAll("nature");

  const toggleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    
    // Toggle
    if (current.includes(value)) {
      params.delete(key);
      const remaining = current.filter(v => v !== value);
      remaining.forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }
    
    router.push("?" + params.toString(), { scroll: false });
  };

  const filters = [
    { id: "destination", label: "Destination", options: destinations, current: currentDestination },
    { id: "duration", label: "Duration", options: durations, current: currentDuration },
    { id: "budget", label: "Budget", options: budgets, current: currentBudget },
    { id: "nature", label: "Nature of trip", options: natureOfTrips, current: currentNature },
  ];

  return (
    <div ref={containerRef} className="relative z-20 mx-auto -mt-8 flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 px-4 sm:-mt-10 md:gap-6">
      
      {filters.map(filter => (
        <div key={filter.id} className="group relative">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown(filter.id);
            }}
            className={`flex min-w-[140px] items-center justify-between rounded-full px-6 py-3 text-sm font-bold uppercase shadow-lg transition-transform hover:scale-105 ${
              filter.current.length > 0 
                ? "bg-neutral-900 text-white" 
                : "bg-white text-neutral-900"
            }`}
          >
            <span>{filter.label} {filter.current.length > 0 ? `(${filter.current.length})` : ''}</span>
            <ChevronDown className={`ml-2 h-4 w-4 ${filter.current.length > 0 ? 'text-neutral-400' : 'text-neutral-500'}`} />
          </button>
          
          {openDropdown === filter.id && filter.options.length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-full flex-col rounded-2xl bg-white p-2 shadow-xl flex z-30 min-w-max border border-neutral-100 max-h-60 overflow-y-auto">
              {filter.options.map(opt => (
                <label key={opt} className="flex items-center gap-3 rounded-xl px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    checked={filter.current.includes(opt)}
                    onChange={() => toggleFilter(filter.id, opt)}
                    className="h-4 w-4 rounded border-neutral-300 accent-neutral-900 min-w-max" 
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      
    </div>
  );
}
