import { db } from '@/lib/db';

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
    const rows = db.prepare('SELECT key, value FROM settings').all() as {key: string, value: string}[];
    if (rows.length === 0) {
      return defaultSettings;
    }
    
    const settings = { ...defaultSettings };
    rows.forEach(row => {
      if (row.key === "primaryColor") settings.primaryColor = row.value;
      if (row.key === "secondaryColor") settings.secondaryColor = row.value;
      if (row.key === "accentColor") settings.accentColor = row.value;
    });
    
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return defaultSettings;
  }
}

export async function updateSettings(settings: SiteSettings): Promise<boolean> {
  try {
    const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    
    const updateTransaction = db.transaction((sets: SiteSettings) => {
      stmt.run("primaryColor", sets.primaryColor);
      stmt.run("secondaryColor", sets.secondaryColor);
      stmt.run("accentColor", sets.accentColor);
    });
    
    updateTransaction(settings);
    return true;
  } catch (error) {
    console.error("Error updating settings:", error);
    return false;
  }
}

export async function resetSettingsToDefault(): Promise<boolean> {
  try {
    // Alternatively, we could update the DB instead of clearing it,
    // but clearing it seamlessly forces getSettings to use defaults.
    db.prepare("DELETE FROM settings").run();
    return true;
  } catch (error) {
    console.error("Error resetting settings:", error);
    return false;
  }
}
