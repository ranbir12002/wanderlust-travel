"use client";

import { useState, useEffect } from "react";
import { Search, User, Menu, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import type { SiteData } from "@/data/mockData";

export function Header({ data }: { data: SiteData["header"] }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className="fixed top-0 w-full z-50 h-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(true)}
    >
      <div 
        className={`w-full transition-all duration-500 ease-in-out bg-white/60 backdrop-blur-md shadow-sm ${
          isScrolled && !isHovered 
            ? "opacity-0 -translate-y-full pointer-events-none" 
            : "opacity-100 translate-y-0 pointer-events-auto"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 max-w-[1600px] mx-auto w-full">
          
          {/* Logo - Extreme Left */}
          <div className="text-xl sm:text-2xl font-black text-primary tracking-tighter font-headline flex-shrink-0">
            {data.logo}
          </div>

          <div className="flex flex-1 justify-end items-center gap-6 xl:gap-10">
            {/* Nav Options - Extreme Right */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
              {data.navLinks.map((link, idx) => {
                const isHome = link.href === "/";
                const isContact = link.href.includes("#contact");
                const isActive = isHome ? pathname === "/" : !isContact && pathname.startsWith(link.href);
                
                return (
                  <a
                    key={idx}
                    className={`font-headline tracking-tight font-bold uppercase text-xs xl:text-sm text-secondary hover:text-primary transition-colors ${
                      isActive ? "text-primary border-b-2 border-primary pb-1" : ""
                    }`}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Icons - Right of Options */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 border-l border-primary/20 pl-4 lg:pl-8 ml-2 lg:ml-4">
              <button className="hidden sm:block text-primary hover:opacity-70 transition-opacity">
                <Search size={20} />
              </button>
              <button className="hidden sm:block text-primary hover:opacity-70 transition-opacity">
                <User size={20} />
              </button>
              <button className="lg:hidden text-primary">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer({ data }: { data: SiteData["footer"] }) {
  return (
    <footer className="bg-surface-container-highest/20 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 md:py-16 lg:py-20 max-w-7xl mx-auto font-body leading-relaxed text-secondary">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-6 sm:space-y-8">
          <div className="text-xl sm:text-2xl font-black text-primary font-headline tracking-tighter">
            {data.logo}
          </div>
          <p className="text-xs sm:text-sm max-w-xs">
            {data.description}
          </p>
          <div className="space-y-3 sm:space-y-4">
            <h6 className="text-primary font-bold text-xs uppercase tracking-[0.2em]">
              {data.newsletterTitle}
            </h6>
            <div className="flex border-b border-primary/20 pb-2 max-w-xs">
              <input
                className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm w-full italic placeholder:text-secondary/50"
                placeholder={data.newsletterPlaceholder}
                type="email"
              />
              <button className="text-primary hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {data.columns.map((col, idx) => (
          <div key={idx} className="space-y-4 sm:space-y-6">
            <h5 className="text-primary font-bold text-xs sm:text-sm uppercase tracking-widest">
              {col.title}
            </h5>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              {col.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a className="hover:text-primary hover:translate-x-1 transition-transform inline-block" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-t border-primary/5 text-[10px] sm:text-xs text-secondary gap-3 sm:gap-0">
        <p>{data.copyright}</p>
        <div className="flex gap-4 sm:gap-6 md:gap-8 mt-2 sm:mt-0">
          {data.legalLinks.map((link, idx) => (
            <a key={idx} className="hover:text-primary transition-colors" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
