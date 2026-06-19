import { getDb } from '@/lib/mongodb';

export interface FeaturedCard {
  type: "trip" | "destination";
  slug: string;
  // Optional overrides — if empty, pulled from the actual trip/destination
  customTitle?: string;
  customDesc?: string;
  customImage?: string;
}

export interface FeaturedCardsConfig {
  cards: FeaturedCard[];
}

const COLLECTION = 'settings';
const DOC_ID = 'featured_cards';

export async function getFeaturedCards(): Promise<FeaturedCard[]> {
  try {
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({ id: DOC_ID });
    if (!doc || !doc.cards) return [];
    return doc.cards as FeaturedCard[];
  } catch (error) {
    console.error("Error fetching featured cards:", error);
    return [];
  }
}

export async function saveFeaturedCards(cards: FeaturedCard[]): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection(COLLECTION).updateOne(
      { id: DOC_ID },
      { $set: { id: DOC_ID, cards } },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error("Error saving featured cards:", error);
    return false;
  }
}
