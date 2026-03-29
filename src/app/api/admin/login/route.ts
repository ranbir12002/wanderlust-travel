import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // In a real app, use environment variables (process.env.ADMIN_PASSWORD)
    // Using a hardcoded password for now to avoid the need of .env setup for the user
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wanderlust2024';

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'admin_token',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
  }
}
