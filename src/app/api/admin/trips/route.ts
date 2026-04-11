import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const trip = await request.json();
    
    // Ensure it has an ID
    if (!trip.id) {
      trip.id = Date.now().toString();
    }

    const db = await getDb();
    
    // Remove _id if it exists to avoid MongoDB Error: Performing an update on the path '_id'
    const { _id, ...updateData } = trip;

    await db.collection('trips').updateOne(
      { id: trip.id },
      { $set: updateData },
      { upsert: true }
    );

    return NextResponse.json({ success: true, trip });
  } catch (error) {
    console.error("Error saving trip to MongoDB:", error);
    return NextResponse.json({ success: false, message: 'Failed to save trip' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const trips = await db.collection('trips').find({}).toArray();
    return NextResponse.json(trips);
  } catch (error) {
    console.error("Error fetching trips from MongoDB:", error);
    return NextResponse.json({ success: false, message: 'Failed to fetch trips' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Trip ID required' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('trips').deleteOne({ id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting trip from MongoDB:", error);
    return NextResponse.json({ success: false, message: 'Failed to delete trip' }, { status: 500 });
  }
}
