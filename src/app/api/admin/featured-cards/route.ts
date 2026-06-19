import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedCards, saveFeaturedCards, FeaturedCard } from '@/data/featuredCardsData';

export async function GET() {
  const cards = await getFeaturedCards();
  return NextResponse.json(cards);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cards: FeaturedCard[] = body.cards;

    if (!Array.isArray(cards)) {
      return NextResponse.json({ success: false, message: "cards must be an array" }, { status: 400 });
    }

    const success = await saveFeaturedCards(cards);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
