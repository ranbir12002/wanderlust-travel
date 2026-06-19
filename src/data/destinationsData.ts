import { getDb } from '@/lib/mongodb';

export interface Destination {
  id?: string;
  slug: string;
  title: string;
  category: "domestic" | "international";
  tag: string;
  heroImage: string;
  description: string;
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    const db = await getDb();
    const destinations = await db.collection<Destination>('destinations').find({}).toArray();
    
    return destinations.map(dest => {
      const { _id, ...rest } = dest as any;
      return {
        ...rest,
        id: rest.id || _id.toString(),
      } as Destination;
    });
  } catch (error) {
    console.error("Error fetching destinations from MongoDB:", error);
    return [];
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  try {
    const db = await getDb();
    const dest = await db.collection<Destination>('destinations').findOne({ slug });
    
    if (!dest) return undefined;
    
    const { _id, ...rest } = dest as any;
    return {
      ...rest,
      id: rest.id || _id.toString(),
    } as Destination;
  } catch (error) {
    console.error("Error fetching destination by slug from MongoDB:", error);
    return undefined;
  }
}

export async function getDestinationsByCategory(category: "domestic" | "international"): Promise<Destination[]> {
  try {
    const db = await getDb();
    const destinations = await db.collection<Destination>('destinations').find({ category }).toArray();
    
    return destinations.map(dest => {
      const { _id, ...rest } = dest as any;
      return {
        ...rest,
        id: rest.id || _id.toString(),
      } as Destination;
    });
  } catch (error) {
    console.error(`Error fetching ${category} destinations from MongoDB:`, error);
    return [];
  }
}
