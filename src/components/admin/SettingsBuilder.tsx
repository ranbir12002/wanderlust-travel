"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, RefreshCw, Loader2 } from "lucide-react";
import type { SiteSettings } from "@/data/settingsData";

export default function SettingsBuilder({ initialSettings }: { initialSettings: SiteSettings }) {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", settings })
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setMessage({ type: 'success', text: "Settings saved successfully! Refreshing live site..." });
      router.refresh();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to restore the default color palette?")) return;
    setIsResetting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" })
      });
      if (!res.ok) throw new Error("Failed to reset settings");
      const data = await res.json();
      setSettings(data.settings);
      setMessage({ type: 'success', text: "Defaults restored successfully! Refreshing live site..." });
      router.refresh();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden mt-6">
      <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
        <div>
          <h2 className="text-xl font-bold">Theme & Colors</h2>
          <p className="text-sm text-neutral-500 mt-1">Customize global site colors. Changes apply immediately.</p>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        {message && (
          <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-700">Primary Color</label>
            <p className="text-xs text-neutral-500 mb-2">Used for thick headings, primary buttons, borders, and main accents.</p>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={settings.primaryColor} 
                onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                className="w-16 h-16 rounded cursor-pointer border-0 p-0"
              />
              <code className="px-3 py-1.5 bg-neutral-100 rounded text-sm font-mono">{settings.primaryColor}</code>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t pt-6">
            <label className="text-sm font-bold text-neutral-700">Secondary Color</label>
            <p className="text-xs text-neutral-500 mb-2">Used for navigational links, regular text in menus, and sub-titles.</p>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={settings.secondaryColor} 
                onChange={e => setSettings({...settings, secondaryColor: e.target.value})}
                className="w-16 h-16 rounded cursor-pointer border-0 p-0"
              />
              <code className="px-3 py-1.5 bg-neutral-100 rounded text-sm font-mono">{settings.secondaryColor}</code>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t pt-6">
            <label className="text-sm font-bold text-neutral-700">Dark Accent Color</label>
            <p className="text-xs text-neutral-500 mb-2">Used for contrasting background bands (e.g. Itinerary steps, Process sections).</p>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={settings.accentColor} 
                onChange={e => setSettings({...settings, accentColor: e.target.value})}
                className="w-16 h-16 rounded cursor-pointer border-0 p-0"
              />
              <code className="px-3 py-1.5 bg-neutral-100 rounded text-sm font-mono">{settings.accentColor}</code>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t">
          <button 
            onClick={handleReset}
            disabled={isResetting || isSaving}
            className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-red-500 transition-colors"
          >
            {isResetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            RESTORE DEFAULTS
          </button>
          
          <button 
            onClick={handleSave}
            disabled={isSaving || isResetting}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            SAVE THEME
          </button>
        </div>
      </div>
    </div>
  );
}
