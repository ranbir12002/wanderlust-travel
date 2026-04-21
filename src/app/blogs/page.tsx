import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import ContactForm from "@/components/trip/ContactForm";
import Testimonials from "@/components/trip/Testimonials";
import { getBlogs } from "@/data/blogsData";
import { siteData } from "@/data/mockData";

export default async function BlogsPage() {
  const blogsData = await getBlogs();
  
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      
      {/* Hero Section */}
      <div className="relative flex min-h-[60vh] w-full flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://picsum.photos/seed/blogs-hero/1920/1080"
          alt="Writing journal at the mountains"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark Overlays for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F5] via-transparent to-transparent" />
        
        {/* Typography */}
        <div className="relative z-10 px-8 md:px-24">
          <div className="absolute -left-4 top-1/2 -z-10 -translate-y-1/2 text-[8rem] font-black tracking-tighter text-white/10 sm:text-[14rem]">
            OUR BLOGS
          </div>
          <h1 className="text-5xl font-black lowercase tracking-tight text-white drop-shadow-lg md:text-7xl">
            our blogs
          </h1>
          <p className="mt-4 max-w-xl text-lg font-light text-white/90">
            Stories, tips, and guides from our expert travelers and community.
          </p>
        </div>

        {/* Social Icons */}
        <div className="absolute left-6 top-1/4 z-20 flex flex-col gap-4 rounded-full bg-white p-2 shadow-lg">
          {siteData.social.instagramUrl && (
            <a href={siteData.social.instagramUrl} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-[#FFE400] hover:text-black">
              <Instagram className="h-4 w-4 text-neutral-900" />
            </a>
          )}
          {siteData.social.youtubeUrl && (
            <a href={siteData.social.youtubeUrl} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-[#FFE400] hover:text-black">
              <Youtube className="h-4 w-4 text-neutral-900" />
            </a>
          )}
          {siteData.social.twitterUrl && (
            <a href={siteData.social.twitterUrl} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-[#FFE400] hover:text-black">
              <Twitter className="h-4 w-4 text-neutral-900" />
            </a>
          )}
          {siteData.social.linkedinUrl && (
            <a href={siteData.social.linkedinUrl} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-[#FFE400] hover:text-black">
              <Linkedin className="h-4 w-4 text-neutral-900" />
            </a>
          )}
        </div>
      </div>

      {/* Blogs Grid */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:-mt-20 relative z-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogsData.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </main>

      <Testimonials />
      <ContactForm />
    </div>
  );
}
