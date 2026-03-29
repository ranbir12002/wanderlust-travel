import { db } from '@/lib/db';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  badge?: "SPECIAL OFFERS" | "BEST SELLER" | null;
  duration: string;
  price: string;
  thumbnail: string;
  heroImage: string;
  natureOfTrip: string;
  lodgingType: string;
  subtitle: string;
  itinerary: ItineraryDay[];
  tags?: string[];
  routeWaypoints?: string[];
}

export async function getTrips(): Promise<Trip[]> {
  try {
    const rows = db.prepare('SELECT * FROM trips').all() as any[];
    return rows.map(row => ({
      ...row,
      itinerary: row.itinerary ? JSON.parse(row.itinerary) : [],
      tags: row.tags ? JSON.parse(row.tags) : [],
      routeWaypoints: row.routeWaypoints ? JSON.parse(row.routeWaypoints) : []
    }));
  } catch (error) {
    console.error("Error fetching trips from DB:", error);
    return [];
  }
}

export async function getTripBySlug(slug: string): Promise<Trip | undefined> {
  try {
    const row = db.prepare('SELECT * FROM trips WHERE slug = ?').get(slug) as any;
    if (!row) return undefined;
    
    return {
      ...row,
      itinerary: row.itinerary ? JSON.parse(row.itinerary) : [],
      tags: row.tags ? JSON.parse(row.tags) : [],
      routeWaypoints: row.routeWaypoints ? JSON.parse(row.routeWaypoints) : []
    };
  } catch (error) {
    console.error("Error fetching trip by slug:", error);
    return undefined;
  }
}
