import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const blog = await request.json();
    
    // Ensure it has an ID
    if (!blog.id) {
      blog.id = Date.now().toString();
    }

    const insertOrUpdate = db.prepare(`
        INSERT OR REPLACE INTO blogs (id, slug, title, date, thumbnail, heroImage, author, category, content)
        VALUES (@id, @slug, @title, @date, @thumbnail, @heroImage, @author, @category, @content)
    `);

    insertOrUpdate.run({
      ...blog,
      content: typeof blog.content === 'string' ? blog.content : JSON.stringify(blog.content)
    });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error saving blog to SQL:", error);
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

    const deleteStmt = db.prepare('DELETE FROM blogs WHERE id = ?');
    deleteStmt.run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, message: 'Failed to delete blog' }, { status: 500 });
  }
}
