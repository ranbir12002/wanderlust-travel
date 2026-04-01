import { getDb } from '@/lib/mongodb';

export interface Blog {
  id: string;
  slug: string;
  title: string;
  date: string;
  thumbnail: string;
  heroImage: string;
  videoUrl?: string; // Optional blog header video
  author: string;
  category: string;
  content: string[]; // array of paragraphs
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const db = await getDb();
    const blogs = await db.collection<Blog>('blogs').find({}).toArray();
    return blogs.map(blog => {
      const { _id, ...rest } = blog as any;
      return {
        ...rest,
        id: rest.id || _id.toString(),
      } as Blog;
    });
  } catch (error) {
    console.error("Error fetching blogs from MongoDB:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  try {
    const db = await getDb();
    const blog = await db.collection<Blog>('blogs').findOne({ slug });
    if (!blog) return undefined;
    
    const { _id, ...rest } = blog as any;
    return {
      ...rest,
      id: rest.id || _id.toString(),
    } as Blog;
  } catch (error) {
    console.error("Error fetching blog by slug from MongoDB:", error);
    return undefined;
  }
}
