import { db } from '@/lib/db';

export interface Blog {
  id: string;
  slug: string;
  title: string;
  date: string;
  thumbnail: string;
  heroImage: string;
  author: string;
  category: string;
  content: string[]; // array of paragraphs
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const rows = db.prepare('SELECT * FROM blogs').all() as any[];
    return rows.map(row => ({
      ...row,
      content: JSON.parse(row.content)
    }));
  } catch (error) {
    console.error("Error fetching blogs from DB:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  try {
    const row = db.prepare('SELECT * FROM blogs WHERE slug = ?').get(slug) as any;
    if (!row) return undefined;
    
    return {
      ...row,
      content: JSON.parse(row.content)
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return undefined;
  }
}
