import { getBlogBySlug } from "@/data/blogsData";
import { notFound } from "next/navigation";
import BlogBuilder from "@/components/admin/BlogBuilder";

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogBuilder initialData={blog} />;
}
