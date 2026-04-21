"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] text-white overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main Logo Container */}
          <div className="relative overflow-hidden">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <Image 
                src="/logo.png" 
                alt="Beaches to Mountains Logo" 
                width={450} 
                height={150} 
                className="h-32 w-auto object-contain brightness-0 invert"
              />
            </motion.div>
            
            {/* Elegant Loading Line */}
            <motion.div 
               className="h-[2px] bg-[#FFE400] mt-2"
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6 flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFE400]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              preparing expedition
            </span>
          </motion.div>

          {/* Splitting Panels — Entrance/Exit Effect */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[50.1%] bg-[#0A0A0A] origin-top"
            exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[50.1%] bg-[#0A0A0A] origin-bottom"
            exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
