import { notFound } from "next/navigation";
import BlogHero from "@/components/blog/BlogHero";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { getBlogBySlug } from "@/data/blogsData";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-white">
      <BlogHero 
        title={blog.title} 
        category={blog.category} 
        date={blog.date} 
        author={blog.author} 
        heroImage={blog.heroImage} 
        videoUrl={blog.videoUrl}
      />
      
      <main className="mx-auto max-w-3xl px-6 py-16">
        <article className="prose prose-lg prose-neutral md:prose-xl w-full max-w-none">
          {blog.content.map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
        </article>
      </main>
      
      <Testimonials />
      <ContactForm />
    </div>
  );
}
