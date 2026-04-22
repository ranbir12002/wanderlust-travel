import Image from "next/image";
import DestinationBanner from "@/components/home/DestinationBanner";
import Testimonials from "@/components/trip/Testimonials";
import ContactForm from "@/components/trip/ContactForm";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
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
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#FFE400] mb-6 animate-fade-in">Our Legacy</p>
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter uppercase leading-[0.9] drop-shadow-xl mb-8">
            Beaches TO<br />Mountains
          </h1>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-xl md:text-2xl text-[#FFE400] font-medium tracking-wide uppercase italic">
              Crafting unique group trips & customized itineraries
            </p>
            <p className="text-lg text-white/80 font-light leading-relaxed">
              Beaches2Mountains is a travel company with a passion for crafting unique group trips and customized itineraries. Our team of dedicated tourism professionals curates exclusive experiences focused on customer satisfaction and safety.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">
                Our Mission <br/>& <span className="text-[#FFE400]">Values</span>
              </h2>
              <div className="h-1 w-20 bg-[#FFE400]" />
            </div>
            <div className="lg:col-span-2">
              <p className="text-2xl text-white/90 font-light leading-relaxed mb-12">
                "Our mission is to ensure a hassle-free and unique travel experience for every client, preserving the integrity of local culture while providing luxury experiences within budget."
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: "Hassle-Free", desc: "We handle the complexity so you can focus on the journey." },
                  { title: "Local Integrity", desc: "Preserving and respecting the cultures we visit." },
                  { title: "Luxury on Budget", desc: "Premium experiences without the premium price tag." },
                  { title: "Customer First", desc: "Your needs and safety are our unwavering priority." }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-sm border border-white/10 hover:border-[#FFE400]/50 transition-colors group">
                    <h3 className="text-[#FFE400] font-bold uppercase tracking-widest text-sm mb-4">{item.title}</h3>
                    <p className="text-white/60 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Content */}
      <section className="py-24 lg:py-32 bg-black relative">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Text Side */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight mb-8">
                Where it <br/><span className="text-[#FFE400]">Begins</span>
              </h2>
              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p>
                  Five years ago, travelling was considered expensive—or at least, that was the story we were told. As graduates with an MBA in tourism management, my brother and I dreamt of exploring every corner of the world.
                </p>
                <p>
                  On one of these explorations, we met a fellow travel enthusiast who shared our dream and brought a strong business sense to the table. We wanted to share the joy of these experiences with everyone around us. This shared vision gave birth to <strong>Beaches2Mountains</strong>.
                </p>
                <p>
                  We aim to put an end to expensive trips. Beaches2Mountains offers curated, budget-friendly trips and luxury stays, showing how big and accessible the world truly is.
                </p>
                <p>
                  Since June 2022, we have been creating over 100+ lasting experiences for people across the globe, and we plan on doing so until we share the joy of travel with every last person in the world.
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="order-1 md:order-2 relative aspect-square w-full rounded-sm overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1530789253518-d41d8c67a88c?q=80&w=2670&auto=format&fit=crop"
                alt="Our Founders Journey"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-sm">
                 <p className="text-sm font-medium tracking-wide uppercase">"Showing how big the world truly is."</p>
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

