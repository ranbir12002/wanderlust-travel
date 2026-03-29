import { getSettings } from "@/data/settingsData";
import SettingsBuilder from "@/components/admin/SettingsBuilder";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900">Site Settings</h1>
        <p className="text-neutral-500">Configure global platform options and visual identity.</p>
      </div>
      
      <SettingsBuilder initialSettings={settings} />
    </div>
  );
}
