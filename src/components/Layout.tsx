"use client";

import { useState, useEffect } from "react";
import { Search, User, Menu, ArrowRight, X, Phone, Mail, MapPin, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteData, type SiteData } from "@/data/mockData";
import TripRequestModal from "./trip/TripRequestModal";
import SearchOverlay from "./ui/SearchOverlay";
import { AnimatePresence, motion } from "framer-motion";

export function Header({ data }: { data: SiteData["header"] }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const getSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    if (month >= 8 && month <= 10) return "Autumn";
    return "Winter";
  };

  const currentSeason = getSeason();

  return (
    <>
      <header className="fixed top-0 z-50 w-full transition-all duration-300">
        <div className={`w-full transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'h-16 bg-black/80 backdrop-blur-md shadow-sm border-b border-white/5' : 'h-24 bg-transparent pt-4'} flex items-center`}>
          <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 lg:px-12">
            
            <a href="/" className="flex items-center transition-transform hover:scale-105 z-[60]">
              <Image 
                src="/logo.png" 
                alt={data?.logo || "Beaches to Mountains"} 
                width={240} 
                height={80} 
                className="h-14 w-auto object-contain"
                priority
              />
            </a>

            <div className="flex items-center gap-8 xl:gap-12">
              {/* Nav Options */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
                {/* Seasonal Link */}
                <a
                  href={`/trips/seasonal`}
                  className={`text-[11px] font-medium uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors whitespace-nowrap`}
                >
                  Trips by {currentSeason}
                </a>

                {data?.navLinks?.map((link, idx) => {
                  const isActive = pathname === link.href;
                  
                  return (
                    <a
                      key={idx}
                      className={`text-[11px] uppercase tracking-[0.15em] hover:text-white transition-colors whitespace-nowrap ${
                        isActive ? "text-white font-bold" : "text-white/80 font-medium"
                      }`}
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              {/* CTA & Icons */}
              <div className="flex items-center gap-6 z-[60]">
                 <button 
                  onClick={() => setIsModalOpen(true)}
                  className="hidden sm:inline-flex items-center rounded-sm border border-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
                 >
                   Customised Trips
                 </button>
                 
                 <div className="flex items-center gap-5 sm:border-l sm:border-white/20 sm:pl-6 text-white">
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="hidden sm:block hover:opacity-70 transition-opacity"
                  >
                    <Search size={18} strokeWidth={2} />
                  </button>
                  <button className="hidden sm:block hover:opacity-70 transition-opacity">
                    <User size={18} strokeWidth={2} />
                  </button>
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-white hover:opacity-70 transition-opacity p-2"
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="absolute top-[100%] left-0 w-full z-40 bg-[#111] backdrop-blur-3xl border-b border-white/10 px-8 py-8 flex flex-col shadow-2xl max-h-[80vh] overflow-y-auto"
            >
               <nav className="flex flex-col gap-5">
                 {/* Mobile Search Trigger */}
                 <button 
                  onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
                  className="flex items-center gap-3 text-xl font-bold text-[#FFE400] mb-4"
                 >
                   <Search size={20} />
                   Search
                 </button>

                 <a
                    href={`/`}
                    className="text-xl font-bold text-white/80 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                 <a
                    href={`/trips/seasonal`}
                    className="text-xl font-bold text-white/80 hover:text-white transition-colors"
                  >
                    Trips by {currentSeason}
                  </a>
                 {data?.navLinks?.map((link, idx) => (
                    <a
                      key={idx}
                      className="text-xl font-bold text-white/80 hover:text-white transition-colors"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                 ))}
                 
                 <div className="h-px bg-white/10 my-2" />
                 
                 <button 
                  onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }}
                  className="w-full text-left text-xl font-bold text-[#FFE400]"
                 >
                   Customised Trips
                 </button>

                 <div className="flex gap-6 mt-8 text-white/60">
                    {siteData.social.instagramUrl && <a href={siteData.social.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={24} /></a>}
                    {siteData.social.youtubeUrl && <a href={siteData.social.youtubeUrl} target="_blank" rel="noreferrer"><Youtube size={24} /></a>}
                    {siteData.social.twitterUrl && <a href={siteData.social.twitterUrl} target="_blank" rel="noreferrer"><Twitter size={24} /></a>}
                    {siteData.social.linkedinUrl && <a href={siteData.social.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={24} /></a>}
                 </div>
               </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <TripRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}


export function Footer({ data }: { data: SiteData["footer"] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <footer className="bg-primary text-white pt-20 pb-12">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-20">
          
          {/* Left Section: Logo & About */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt={data?.logo || "Beaches to Mountains"} 
                width={200} 
                height={70} 
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              {data?.description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {siteData.social.instagramUrl && (
                <a href={siteData.social.instagramUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFE400] hover:text-black transition-all">
                  <Instagram size={16} />
                </a>
              )}
              {siteData.social.youtubeUrl && (
                <a href={siteData.social.youtubeUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFE400] hover:text-black transition-all">
                  <Youtube size={16} />
                </a>
              )}
              {siteData.social.twitterUrl && (
                <a href={siteData.social.twitterUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFE400] hover:text-black transition-all">
                  <Twitter size={16} />
                </a>
              )}
              {siteData.social.linkedinUrl && (
                <a href={siteData.social.linkedinUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFE400] hover:text-black transition-all">
                  <Linkedin size={16} />
                </a>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-4">
              {data?.bottomLinks?.map((link, idx) => (
                <a key={idx} href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#FFE400] transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Middle Section: Quick Links */}
          <div className="lg:col-span-2">
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFE400] mb-10">Quick Links</h5>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {data?.quickLinks?.map((link, idx) => {
                const isCustom = link.href === "/customised";
                return isCustom ? (
                  <button 
                    key={idx} 
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-3 text-sm font-bold transition-all hover:translate-x-1 text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#FFE400] transition-colors" />
                    <span className="text-white/70 group-hover:text-white">{link.label}</span>
                  </button>
                ) : (
                  <a 
                    key={idx} 
                    href={link.href} 
                    className="group flex items-center gap-3 text-sm font-bold transition-all hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#FFE400] transition-colors" />
                    <span className="text-white/70 group-hover:text-white">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Section: Contact Details */}
          <div className="space-y-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFE400]">Contact Details</h5>
            <div className="space-y-6">
              <a href={`tel:${data?.contactInfo?.phone}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FFE400] group-hover:border-[#FFE400] transition-all">
                  <Phone className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{data?.contactInfo?.phone}</span>
              </a>

              <a href={`mailto:${data?.contactInfo?.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FFE400] group-hover:border-[#FFE400] transition-all">
                  <Mail className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{data?.contactInfo?.email}</span>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mt-1">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-white/70 leading-relaxed whitespace-pre-line">
                  {data?.contactInfo?.office}
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            {data?.copyright}
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Handcrafted by Beaches to Mountains Team</span>
          </div>
        </div>
      </div>
    </footer>
    <TripRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
