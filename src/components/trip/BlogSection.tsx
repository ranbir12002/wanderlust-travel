import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { getBlogs } from "@/data/blogsData";

export default async function BlogSection() {
  const blogsData = await getBlogs();
  return (
    <section className="w-full overflow-hidden py-16">
      <SectionHeading title="blog" />
      
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4">
        
        {/* Carousel Prev Button */}
        <button className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-white md:flex">
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3">
          {blogsData.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group relative aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-900 shadow-lg">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white drop-shadow-md">
                  {blog.title}
                </h3>
                <span className="text-xs font-semibold text-neutral-300 text-right drop-shadow-md italic">
                  {blog.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Carousel Next Button */}
        <button className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition-transform hover:scale-105 md:flex">
          <ChevronRight className="h-5 w-5" />
        </button>

      </div>
    </section>
  );
}
