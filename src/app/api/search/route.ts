import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ trips: [], blogs: [] });
  }

  try {
    const db = await getDb();
    const regex = new RegExp(query, 'i');

    // Search in trips
    const trips = await db.collection('trips').find({
      $or: [
        { title: regex },
        { subtitle: regex },
        { natureOfTrip: regex },
        { tags: regex },
        { routeWaypoints: regex }
      ]
    }).limit(6).toArray();

    // Search in blogs
    const blogs = await db.collection('blogs').find({
      $or: [
        { title: regex },
        { author: regex },
        { category: regex },
        { content: regex }
      ]
    }).limit(6).toArray();

    return NextResponse.json({
      trips: trips.map((t: any) => ({
        id: t._id.toString(),
        slug: t.slug,
        title: t.title,
        thumbnail: t.thumbnail,
        duration: t.duration,
        category: t.category
      })),
      blogs: blogs.map((b: any) => ({
        id: b._id.toString(),
        slug: b.slug,
        title: b.title,
        thumbnail: b.thumbnail,
        author: b.author,
        category: b.category
      }))
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 });
  }
}
