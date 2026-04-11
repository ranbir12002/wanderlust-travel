import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // We expect the user to set this environment variable with their Google Apps Script Web App URL
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.warn("GOOGLE_SCRIPT_URL is not set. Simulating success for development.");
      // For development, if URL isn't set, return true so the UI works
      return NextResponse.json({ success: true, message: 'Message sent successfully (Simulated)!' });
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Pass the data received from the form directly to the script
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    }

    const errorText = await response.text();
    console.error("Google Script Error Details:", {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });

    throw new Error(`Failed to post to Google Script: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message.' }, 
      { status: 500 }
    );
  }
}
