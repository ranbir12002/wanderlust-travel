import { getDb } from '@/lib/mongodb';
import { siteData as staticSiteData, SiteData } from './mockData';

export async function getSiteContent(): Promise<SiteData> {
  try {
    const db = await getDb();
    const content = await db.collection('site_content').findOne({ id: "homepage" });
    
    if (!content) {
      return staticSiteData;
    }
    
    // Merge all available sections from the database into the static site data
    // Use shallow merging for hero and other objects that have mandatory nested properties
    return {
      ...staticSiteData,
      hero: { ...staticSiteData.hero, ...content.hero },
      values: { ...staticSiteData.values, ...content.values },
      process: { ...staticSiteData.process, ...content.process },
      testimonials: content?.testimonials || staticSiteData.testimonials,
      portfolio: { ...staticSiteData.portfolio, ...(content?.portfolio || {}) },
      cta: content?.cta || staticSiteData.cta,
      footer: content?.footer || staticSiteData.footer,
    };
  } catch (error) {
    console.error("Error fetching site content from MongoDB:", error);
    return staticSiteData;
  }
}
