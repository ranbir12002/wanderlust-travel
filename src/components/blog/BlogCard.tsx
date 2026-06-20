import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/data/blogsData";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group relative aspect-[16/10] xs:aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-900 shadow-lg">
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      <div className="absolute left-4 top-4 xs:left-6 xs:top-6 rounded-full bg-neutral-100/20 px-3 py-0.5 xs:px-4 xs:py-1 text-[10px] xs:text-xs font-semibold uppercase text-white backdrop-blur-md shadow-sm">
        {blog.category}
      </div>

      <div className="absolute bottom-4 left-4 right-4 xs:bottom-6 xs:left-6 xs:right-6 flex flex-col gap-1.5 xs:gap-2">
        <h3 className="line-clamp-2 text-base xs:text-lg font-bold leading-tight text-white drop-shadow-md sm:text-xl">
          {blog.title}
        </h3>
        <div className="flex items-center justify-between text-[10px] xs:text-xs font-semibold text-neutral-300 drop-shadow-md italic">
          <span>{blog.author}</span>
          <span>{blog.date}</span>
        </div>
      </div>
    </Link>
  );
}
