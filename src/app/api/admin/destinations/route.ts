import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const dest = await request.json();
    
    // Ensure it has an ID
    if (!dest.id) {
      dest.id = Date.now().toString();
    }

    const db = await getDb();
    
    // Remove _id if it exists
    const { _id, ...updateData } = dest;

    await db.collection('destinations').updateOne(
      { id: dest.id },
      { $set: updateData },
      { upsert: true }
    );

    return NextResponse.json({ success: true, destination: updateData });
  } catch (error) {
    console.error("Error saving destination to MongoDB:", error);
    return NextResponse.json({ success: false, message: 'Failed to save destination' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const destinations = await db.collection('destinations').find({}).toArray();
    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations from MongoDB:", error);
    return NextResponse.json({ success: false, message: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Destination ID required' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('destinations').deleteOne({ id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting destination from MongoDB:", error);
    return NextResponse.json({ success: false, message: 'Failed to delete destination' }, { status: 500 });
  }
}
