import { NextResponse } from "next/server";
import { updateSettings, resetSettingsToDefault, getSettings } from "@/data/settingsData";

export async function GET() {
  const currentSettings = await getSettings();
  return NextResponse.json(currentSettings);
}

export async function POST(request: Request) {
  try {
    const { action, settings } = await request.json();
    
    if (action === "reset") {
      const success = await resetSettingsToDefault();
      if (!success) {
        return NextResponse.json({ error: "Failed to reset settings" }, { status: 500 });
      }
      return NextResponse.json({ success: true, settings: await getSettings() });
    }
    
    if (action === "save" && settings) {
      const success = await updateSettings(settings);
      if (!success) {
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
      }
      return NextResponse.json({ success: true, settings: await getSettings() });
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    
  } catch (error) {
    console.error("API error settings POST:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
