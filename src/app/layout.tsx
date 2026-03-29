import type { Metadata } from "next";
import { Header, Footer } from "@/components/Layout";
import { siteData } from "@/data/mockData";
import { getSettings } from "@/data/settingsData";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeafLife — Premium Landscape Design",
  description:
    "A decade of passion for creating breathtaking outdoor living spaces. We blend architectural precision with organic beauty to transform your environment.",
  openGraph: {
    title: "LeafLife — Premium Landscape Design",
    description:
      "Elevating architecture through organic landscape artistry. Boutique design for discerning estates.",
    siteName: "LeafLife",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en" style={{
      "--color-primary": settings.primaryColor,
      "--color-secondary": settings.secondaryColor,
      "--color-accent-dark": settings.accentColor
    } as React.CSSProperties}>
      <body className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen antialiased">
        <Header data={siteData.header} />
        {children}
        <Footer data={siteData.footer} />
      </body>
    </html>
  );
}
