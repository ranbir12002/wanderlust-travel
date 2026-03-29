import { Hero, Values, Process } from "@/components/Sections1";
import { Services, Portfolio } from "@/components/Sections2";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { siteData } from "@/data/mockData";

export default function HomePage() {
  return (
    <main>
      <Hero data={siteData.hero} />
      <Values data={siteData.values} />
      <Process data={siteData.process} />
      <Services data={siteData.services} />
      <Portfolio data={siteData.portfolio} />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
