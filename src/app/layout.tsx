import type { Metadata } from "next";
import { Header, Footer } from "@/components/Layout";
import { siteData } from "@/data/mockData";
import { getSettings } from "@/data/settingsData";
import { getDestinations } from "@/data/destinationsData";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beaches to Mountains — Premium Bespoke Travel",
  description:
    "A modern travel brand representing the journey from serene beaches to adventurous mountains. We combine exploration, freedom, and premium curated experiences.",
  openGraph: {
    title: "Beaches to Mountains — Premium Bespoke Travel",
    description:
      "Serene beaches to adventurous mountains. Movement, freedom, and premium curated experiences.",
    siteName: "Beaches to Mountains",
    type: "website",
  },
};

import Preloader from "@/components/ui/Preloader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, destinations] = await Promise.all([
    getSettings(),
    getDestinations(),
  ]);

  return (
    <html lang="en" style={{
      "--color-primary": settings.primaryColor,
      "--color-secondary": settings.secondaryColor,
      "--color-accent-dark": settings.accentColor
    } as React.CSSProperties}>
      <body className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen antialiased">
        <Preloader />
        <Header data={siteData.header} destinations={destinations} />
        <main>{children}</main>
        <Footer data={siteData.footer} />
      </body>
    </html>
  );
}
