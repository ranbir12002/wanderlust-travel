import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] text-white">
      {/* Sleek, aesthetic layout while loading */}
      <div className="relative overflow-hidden flex flex-col items-center">
        {/* Animated pulsating brand logo placeholder or text */}
        <div className="text-2xl font-black uppercase tracking-[0.3em] text-white animate-pulse">
          beaches <span className="text-[#FFE400]">to</span> mountains
        </div>
        
        {/* Progress indicator */}
        <div className="w-48 h-[2px] bg-white/10 mt-6 overflow-hidden rounded-full relative">
          <div className="absolute h-full bg-[#FFE400] rounded-full" style={{
            width: "60%",
            animation: "shimmer-load 1.2s infinite ease-in-out"
          }} />
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#FFE400]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
            loading experience
          </span>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer-load {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
}
