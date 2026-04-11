import { getDb } from '@/lib/mongodb';

export interface ItineraryActivity {
  title: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: ItineraryActivity[];
  bulletPoints?: string[];
  notes?: string;
}

export interface Budgeting {
  inclusions: string[];
  exclusions: string[];
}

export interface SidebarCard {
  image: string;
  title: string;
  subtitle?: string;
  duration?: string;
  price?: string;
  buttonText: string;
  buttonLink: string;
  isVerticalTitle?: boolean;
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
  videoUrl?: string; // Optional R2 video URL
  natureOfTrip: string;
  lodgingType: string;
  subtitle: string;
  itinerary: ItineraryDay[];
  tags?: string[];
  routeWaypoints?: string[];
  category?: "domestic" | "international" | null;
  gallery?: string[];
  budgeting?: Budgeting;
  essentials?: string[];
  otherInfo?: string;
  sidebarTripSlugs?: string[];
}

export async function getTrips(): Promise<Trip[]> {
  try {
    const db = await getDb();
    const trips = await db.collection<Trip>('trips').find({}).toArray();
    
    return trips.map(trip => {
      const { _id, ...rest } = trip as any;
      return {
        ...rest,
        id: rest.id || _id.toString(),
      } as Trip;
    });
  } catch (error) {
    console.error("Error fetching trips from MongoDB:", error);
    return [];
  }
}

export async function getTripBySlug(slug: string): Promise<Trip | undefined> {
  try {
    const db = await getDb();
    const trip = await db.collection<Trip>('trips').findOne({ slug });
    
    if (!trip) return undefined;
    
    const { _id, ...rest } = trip as any;
    return {
      ...rest,
      id: rest.id || _id.toString(),
    } as Trip;
  } catch (error) {
    console.error("Error fetching trip by slug from MongoDB:", error);
    return undefined;
  }
}

export async function getTripsByCategory(category: "domestic" | "international"): Promise<Trip[]> {
  try {
    const db = await getDb();
    const trips = await db.collection<Trip>('trips').find({ category }).toArray();
    
    return trips.map(trip => {
      const { _id, ...rest } = trip as any;
      return {
        ...rest,
        id: rest.id || _id.toString(),
      } as Trip;
    });
  } catch (error) {
    console.error(`Error fetching ${category} trips from MongoDB:`, error);
    return [];
  }
}
