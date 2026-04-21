"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, ChevronDown, Calendar, Search } from "lucide-react";
import Button from "../ui/Button";

interface TripRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

export default function TripRequestModal({ isOpen, onClose }: TripRequestModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          countryCode: selectedCountry.code,
          subject: "New Custom Trip Request",
          type: "Trip Request",
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }, [isOpen]);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col max-h-[90vh] custom-scrollbar"
          >
            {/* Header / Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Request Received!</h2>
                <p className="text-white/60 max-w-md">
                  Thank you for starting your journey with Beaches to Mountains. Henriette or one of our team members will get in touch with you shortly.
                </p>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            ) : (
              <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                {/* Steps Section */}
                <div className="bg-white/5 px-8 pt-10 pb-6 flex items-center justify-center gap-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">
                          <Check size={14} strokeWidth={3} />
                       </div>
                       {step === 4 && (
                         <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ml-1">
                           Your information
                         </span>
                       )}
                    </div>
                  ))}
                </div>

                {/* Form Content */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
                      alt="Henriette Bendiksen" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                    />
                    <div>
                      <h3 className="text-white font-bold text-lg">Henriette Bendiksen</h3>
                      <p className="text-white/40 text-sm">Master of Journeys</p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 max-w-xl leading-snug">
                    We just need a few more details to create your dream journey.
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {/* Name Fields */}
                      <FormField label="First Name" required>
                        <input name="firstName" required type="text" placeholder="First Name" className="form-input" />
                      </FormField>

                      <FormField label="Last Name" required>
                        <input name="lastName" required type="text" placeholder="Last Name" className="form-input" />
                      </FormField>

                      {/* Contact Fields */}
                      <FormField label="Email" required>
                        <input name="email" required type="email" placeholder="Email" className="form-input" />
                      </FormField>

                      <FormField label="Phone" required>
                        <div className="flex gap-0 group relative h-full items-end" ref={countryRef}>
                          <div 
                            onClick={() => setIsCountryOpen(!isCountryOpen)}
                            className="flex items-center bg-transparent border-b border-white/20 pb-3 pr-3 cursor-pointer hover:border-white transition-colors h-[41px]"
                          >
                            <span className="text-sm mr-2">{selectedCountry.flag}</span>
                            <span className="text-sm text-white/50">{selectedCountry.code}</span>
                            <ChevronDown size={14} className={`ml-2 text-white/30 transition-transform ${isCountryOpen ? "rotate-180" : ""}`} />
                          </div>
                          <input name="phone" required type="tel" placeholder="Phone Number" className="form-input flex-1 ml-4" />
                          
                          {/* Country Dropdown */}
                          <AnimatePresence>
                            {isCountryOpen && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-full left-0 mb-2 w-64 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[110] backdrop-blur-xl"
                              >
                                <div className="max-h-60 overflow-y-auto p-2 custom-scrollbar">
                                  {countries.map((c, i) => (
                                    <div 
                                      key={i}
                                      onClick={() => {
                                        setSelectedCountry(c);
                                        setIsCountryOpen(false);
                                      }}
                                      className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                                    >
                                      <span className="text-lg">{c.flag}</span>
                                      <span className="text-sm text-white flex-1">{c.name}</span>
                                      <span className="text-xs text-white/40">{c.code}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </FormField>

                      {/* Logistics */}
                      <FormField label="Approximate arrival date">
                        <div className="relative group">
                          <input 
                            name="arrivalDate" 
                            type="date" 
                            className="form-input date-input-custom" 
                          />
                          <Calendar size={16} className="absolute right-0 bottom-3 text-white/20 group-hover:text-white transition-colors pointer-events-none" />
                        </div>
                      </FormField>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="Length of trip">
                          <input name="duration" type="text" placeholder="Days, weeks, months" className="form-input" />
                        </FormField>
                        <FormField label="Travelling from">
                          <input name="origin" type="text" placeholder="Your home city / country" className="form-input" />
                        </FormField>
                      </div>

                      {/* Guest Count */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="No of adults">
                          <CustomSelect 
                            name="adults" 
                            options={["1", "2", "3", "4", "5", "6+"]} 
                            placeholder="Select..." 
                          />
                        </FormField>
                        <FormField label="No of children">
                          <CustomSelect 
                            name="children" 
                            options={["0", "1", "2", "3", "4+"]} 
                            placeholder="Select..." 
                          />
                        </FormField>
                      </div>

                      {/* Budget & Referral */}
                      <FormField label="Budget per person">
                        <CustomSelect 
                          name="budget" 
                          options={["Standard ($1k-$3k)", "Luxury ($5k-$10k)", "Bespoke ($15k+)"]} 
                          placeholder="Please select budget" 
                        />
                      </FormField>

                      <FormField label="Where did you hear about us?">
                        <input name="referral" type="text" placeholder="Friend, SoMe, Press, Google..." className="form-input" />
                      </FormField>
                    </div>

                    {/* Description */}
                    <FormField label="What kind of journey are you dreaming of?">
                      <textarea
                        name="description"
                        rows={5}
                        placeholder="Hidden fjords, Arctic skies, or meaningful moments with someone special? The more you share, the better we can craft a journey that's truly yours."
                        className="form-input resize-none py-4"
                      />
                    </FormField>

                    {/* Checkboxes */}
                    <div className="space-y-4 pt-4">
                      <div className="flex items-start gap-4">
                        <div className="relative flex items-center mt-1">
                          <input 
                            type="checkbox" 
                            id="terms" 
                            name="agreeTerms" 
                            required 
                            className="peer sr-only" 
                          />
                          <label 
                            htmlFor="terms"
                            className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center transition-all cursor-pointer hover:border-white peer-checked:bg-white peer-checked:border-white group"
                          >
                             <Check size={12} className="text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </label>
                        </div>
                        <label htmlFor="terms" className="text-sm text-white/70 leading-relaxed cursor-pointer select-none">
                          When I click "Start the journey", I agree that the Beaches to Mountains team can get in touch with me about my request. <span className="text-red-500">*</span>
                        </label>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="relative flex items-center mt-1">
                          <input 
                            type="checkbox" 
                            id="newsletter" 
                            name="subscribe" 
                            className="peer sr-only" 
                          />
                          <label 
                            htmlFor="newsletter"
                            className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center transition-all cursor-pointer hover:border-white peer-checked:bg-white peer-checked:border-white"
                          >
                             <Check size={12} className="text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </label>
                        </div>
                        <label htmlFor="newsletter" className="text-sm text-white/70 leading-relaxed cursor-pointer select-none">
                          Yes, I would like to be inspired with Beaches to Mountains insider news.
                        </label>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-10 border-t border-white/10">
                      <button 
                        type="button" 
                        onClick={onClose}
                        className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:opacity-70 transition-opacity"
                      >
                        <ArrowRight size={16} className="rotate-180" />
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="bg-white text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                      >
                        {status === "submitting" ? "Processing..." : "Start the journey"}
                        <Check size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>

          <style jsx>{`
            .form-input {
              width: 100%;
              background: transparent;
              border: none;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              padding: 0.75rem 0;
              color: white;
              font-size: 0.875rem;
              transition: all 0.3s;
            }
            .form-input:focus {
              outline: none;
              border-bottom-color: white;
            }
            .form-input::placeholder {
              color: rgba(255, 255, 255, 0.3);
            }
            .date-input-custom::-webkit-calendar-picker-indicator {
              opacity: 0;
              position: absolute;
              right: 0;
              width: 24px;
              height: 24px;
              cursor: pointer;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.2);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}

function FormField({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function CustomSelect({ name, options, placeholder }: { name: string; options: string[]; placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative group" ref={containerRef}>
      <input type="hidden" name={name} value={selected} />
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border-b border-white/20 py-3 cursor-pointer group-hover:border-white transition-colors h-[41px]"
      >
        <span className={`text-sm ${selected ? "text-white" : "text-white/30"}`}>
          {selected || placeholder}
        </span>
        <ChevronDown size={14} className={`text-white/30 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[120] backdrop-blur-xl"
          >
            <div className="p-1">
              {options.map((opt, i) => (
                <div 
                  key={i}
                  onClick={() => {
                    setSelected(opt);
                    setIsOpen(false);
                  }}
                  className="p-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                >
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
