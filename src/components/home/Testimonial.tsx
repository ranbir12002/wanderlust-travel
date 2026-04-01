"use client";

import { motion } from "framer-motion";
import { Star, MessageCircle, Quote } from "lucide-react";
import type { SiteData } from "@/data/mockData";
import SectionContainer from "../ui/SectionContainer";
import { Heading, Text } from "../ui/Typography";

export default function Testimonial({ data }: { data: SiteData["testimonials"] }) {
  return (
    <section className="relative py-20 lg:py-32 bg-[#F9FAF5] overflow-hidden">
      {/* Floating Google Rating Badge */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="absolute top-12 right-0 z-10 hidden xl:block"
      >
        <div className="bg-white shadow-2xl p-6 rounded-l-2xl border-y border-l border-primary/5 flex items-center gap-4 backdrop-blur-xl bg-white/80">
          <div className="bg-yellow-400 p-3 rounded-xl shadow-lg">
            <Star className="text-white fill-white w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-primary leading-none">4.9/5.0</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-secondary mt-1">Excellent on Google</div>
          </div>
        </div>
      </motion.div>

      <SectionContainer>
        <div className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
          <Heading variant="section">What Travelers Say About Us</Heading>
          <Text className="max-w-xl">
            Real stories from our global community of explorers. Discover why thousands trust us with their most precious journeys.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative">
          {(data || []).map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 md:p-10 bg-white rounded-3xl border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {review.platform === "Google" ? (
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                ) : (
                  <MessageCircle className="w-6 h-6 text-pink-500 opacity-40" />
                )}
              </div>

              <Quote className="absolute top-8 right-8 text-primary/5 w-16 h-16 pointer-events-none" />

              <p className="text-primary font-headline font-bold text-lg leading-relaxed mb-8 relative z-10">
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-primary/5">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-black text-xs uppercase">
                  {review.author[0]}
                </div>
                <div>
                  <div className="text-sm font-black text-primary uppercase tracking-wider">{review.author}</div>
                  <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Verified {review.platform} Review</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
