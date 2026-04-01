import { getDb } from '@/lib/mongodb';

export interface SiteSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export const defaultSettings: SiteSettings = {
  primaryColor: "#153526",
  secondaryColor: "#4b6452",
  accentColor: "#3A4B39"
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const db = await getDb();
    const settingsDoc = await db.collection('settings').findOne({ id: "global" });
    
    if (!settingsDoc) {
      return defaultSettings;
    }
    
    return {
      primaryColor: settingsDoc.primaryColor || defaultSettings.primaryColor,
      secondaryColor: settingsDoc.secondaryColor || defaultSettings.secondaryColor,
      accentColor: settingsDoc.accentColor || defaultSettings.accentColor
    };
  } catch (error) {
    console.error("Error fetching settings from MongoDB:", error);
    return defaultSettings;
  }
}

export async function updateSettings(settings: SiteSettings): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('settings').updateOne(
      { id: "global" },
      { $set: settings },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error("Error updating settings in MongoDB:", error);
    return false;
  }
}

export async function resetSettingsToDefault(): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('settings').deleteOne({ id: "global" });
    return true;
  } catch (error) {
    console.error("Error resetting settings in MongoDB:", error);
    return false;
  }
}
