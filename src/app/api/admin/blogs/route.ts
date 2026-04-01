import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const blog = await request.json();
    
    // Ensure it has an ID
    if (!blog.id) {
      blog.id = Date.now().toString();
    }

    const db = await getDb();
    
    // Remove _id from the blog object to avoid MongoDB immutable field error
    const { _id, ...updateData } = blog;

    await db.collection('blogs').updateOne(
      { id: blog.id },
      { $set: updateData },
      { upsert: true }
    );

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error saving blog to MongoDB:", error);
    return NextResponse.json({ success: false, message: 'Failed to save blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Blog ID required' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('blogs').deleteOne({ id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog from MongoDB:", error);
    return NextResponse.json({ success: false, message: 'Failed to delete blog' }, { status: 500 });
  }
}
