import Image from "next/image";
import DestinationBanner from "@/components/home/DestinationBanner";
import Testimonials from "@/components/trip/Testimonials";
import ContactForm from "@/components/trip/ContactForm";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2676&auto=format&fit=crop"
            alt="Beaches to Mountains Landscape"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 lg:px-12 text-center mt-20">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#FFE400] mb-6">Our Journey</p>
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter uppercase leading-[0.9] drop-shadow-xl mb-8">
            Beaches TO<br />Mountains
          </h1>
          <p className="max-w-xl mx-auto text-lg text-white/80 font-light leading-relaxed">
            We believe that travel is not just about the destination, but the transformative journey in between. From the profound serenity of untouched coasts to the majestic silence of high alpine peaks.
          </p>
        </div>
      </section>

      {/* Our Story Content */}
      <section className="py-24 lg:py-32 bg-black relative">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Text Side */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight mb-8">
                Curating the <br/><span className="text-[#FFE400]">Extraordinary</span>
              </h2>
              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p>
                  Founded by a collective of passionate explorers, Beaches to Mountains was born from a singular vision: to bridge the gap between luxury and raw, authentic adventure. 
                </p>
                <p>
                  We don't just book trips; we architect experiences. Whether you are seeking the hidden fjords of the North, the vibrant cultures of coastal paradises, or the rugged trails of the Himalayas, our dedicated team handles every detail with uncompromising precision and care.
                </p>
                <p>
                  With over a decade of expertise, our global network of local guides, premium stays, and exclusive access ensures that your journey is uniquely yours, leaving you free to simply immerse yourself in the awe of discovery.
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="order-1 md:order-2 relative aspect-[4/5] w-full rounded-sm overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop"
                alt="Exploration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-sm">
                 <p className="text-sm font-medium tracking-wide uppercase">"Travel far enough, you meet yourself."</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Components to match home style */}
      <DestinationBanner />
      <Testimonials />
      <ContactForm />

    </div>
  );
}
