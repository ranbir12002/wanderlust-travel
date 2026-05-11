import { getDb } from '@/lib/mongodb';
import { siteData as staticSiteData, SiteData } from './mockData';

export async function getSiteContent(): Promise<SiteData> {
  // During rebranding phase, we prioritize the new brand guidelines in staticSiteData
  return staticSiteData;
}
