"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchResult {
  trips: any[];
  blogs: any[];
}

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({ trips: [], blogs: [] });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
    if (!isOpen) {
      setQuery("");
      setResults({ trips: [], blogs: [] });
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Fetch results
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults({ trips: [], blogs: [] });
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-6 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            className="w-full max-w-2xl bg-[#0F0F0F] border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header / Input */}
            <div className="relative border-b border-white/5 bg-[#141414]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FFE400]" size={18} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search destinations, trips or blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent pl-14 pr-14 py-5 text-lg font-medium text-white placeholder:text-white/20 focus:outline-none"
              />
              {isLoading ? (
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <Loader2 className="animate-spin text-[#FFE400]" size={18} />
                </div>
              ) : (
                <button
                  onClick={onClose}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              {/* Empty State / Suggestions */}
              {query.length < 2 && (
                <div className="p-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFE400] mb-6">Popular Suggestions</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Spiti Valley', 'Kerala', 'Mountains', 'Backpacking', 'International'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-4 py-2 bg-white/5 rounded-sm text-xs text-white/60 hover:bg-[#FFE400] hover:text-black transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Grid */}
              {(results.trips.length > 0 || results.blogs.length > 0) && (
                <div className="p-6 space-y-8">
                  
                  {/* Trips Section */}
                  {results.trips.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Trips</span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        {results.trips.map((trip) => (
                          <Link
                            key={trip.id}
                            href={`/trips/${trip.slug}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 p-3 rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                          >
                            <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-white/10">
                              <Image src={trip.thumbnail} alt={trip.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-white group-hover:text-[#FFE400] transition-colors truncate">{trip.title}</h4>
                              <p className="text-[10px] text-white/40 uppercase tracking-wider">{trip.category} • {trip.duration}</p>
                            </div>
                            <ArrowRight className="text-[#FFE400] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" size={14} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blogs Section */}
                  {results.blogs.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Blogs</span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        {results.blogs.map((blog) => (
                          <Link
                            key={blog.id}
                            href={`/blogs/${blog.slug}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 p-3 rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                          >
                            <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-white/10">
                              <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-white group-hover:text-[#FFE400] transition-colors truncate">{blog.title}</h4>
                              <p className="text-[10px] text-white/40 uppercase tracking-wider">{blog.category} • {blog.author}</p>
                            </div>
                            <ArrowRight className="text-[#FFE400] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" size={14} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* No Results State */}
              {query.length >= 2 && !isLoading && results.trips.length === 0 && results.blogs.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-white/30 text-sm font-light italic">No results found for "<span className="text-white not-italic">{query}</span>"</p>
                </div>
              )}

            </div>

            {/* Footer Tip */}
            <div className="px-6 py-3 bg-[#141414] border-t border-white/5 flex justify-between items-center">
               <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">ESC to close</span>
               <span className="text-[9px] font-bold text-[#FFE400]/40 uppercase tracking-widest">Search Beaches to Mountains</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  );
}
