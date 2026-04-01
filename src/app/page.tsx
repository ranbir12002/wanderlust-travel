import Hero from "@/components/home/Hero";
import Values from "@/components/home/Values";
import Process from "@/components/home/Process";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import Testimonial from "@/components/home/Testimonial";
import CTA from "@/components/home/CTA";
import ContactForm from "@/components/trip/ContactForm";
import { getSiteContent } from "@/data/siteData";

export default async function HomePage() {
  const siteData = await getSiteContent();
  
  return (
    <main>
      <Hero data={siteData.hero} />
      <Values data={siteData.values} />
      <Process data={siteData.process} />
      <Services data={siteData.services} />
      <Portfolio data={siteData.portfolio} />
      <Testimonial data={siteData.testimonial} />
      <CTA data={siteData.cta} />
      <ContactForm />
    </main>
  );
}
