import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const trip = await request.json();
    
    // Ensure it has an ID
    if (!trip.id) {
      trip.id = Date.now().toString();
    }

    const insertOrUpdate = db.prepare(`
        INSERT OR REPLACE INTO trips (id, slug, title, badge, duration, price, thumbnail, heroImage, natureOfTrip, lodgingType, subtitle, itinerary, routeWaypoints)
        VALUES (@id, @slug, @title, @badge, @duration, @price, @thumbnail, @heroImage, @natureOfTrip, @lodgingType, @subtitle, @itinerary, @routeWaypoints)
    `);

    insertOrUpdate.run({
      ...trip,
      badge: trip.badge || null,
      itinerary: typeof trip.itinerary === 'string' ? trip.itinerary : JSON.stringify(trip.itinerary),
      routeWaypoints: typeof trip.routeWaypoints === 'string' ? trip.routeWaypoints : JSON.stringify(trip.routeWaypoints || [])
    });

    return NextResponse.json({ success: true, trip });
  } catch (error) {
    console.error("Error saving trip to SQL:", error);
    return NextResponse.json({ success: false, message: 'Failed to save trip' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Trip ID required' }, { status: 400 });
    }

    const deleteStmt = db.prepare('DELETE FROM trips WHERE id = ?');
    deleteStmt.run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting trip:", error);
    return NextResponse.json({ success: false, message: 'Failed to delete trip' }, { status: 500 });
  }
}
